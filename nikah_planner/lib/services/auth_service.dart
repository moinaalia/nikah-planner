import 'package:firebase_auth/firebase_auth.dart';
import '../firebase_options.dart';
import 'wedding_repository.dart';
import 'wedding_session.dart';

class AuthService {
  AuthService({FirebaseAuth? auth}) : _auth = auth;

  FirebaseAuth? _auth;
  bool _demoMode = true;
  String? _localUserId;
  String? _localEmail;
  String? _localName;

  bool get isDemoMode => _demoMode;
  bool get isLoggedIn =>
      _demoMode ? _localUserId != null : (_auth?.currentUser != null);
  String? get currentUserId =>
      _demoMode ? _localUserId : _auth?.currentUser?.uid;
  String? get currentEmail =>
      _demoMode ? _localEmail : _auth?.currentUser?.email;
  String? get currentName =>
      _demoMode ? _localName : _auth?.currentUser?.displayName;
  User? get currentUser => _demoMode ? null : _auth?.currentUser;
  Stream<User?> get authStateChanges =>
      _demoMode ? Stream.value(null) : _auth!.authStateChanges();

  static bool firebaseAvailable = false;

  Future<void> initialize() async {
    if (!DefaultFirebaseOptions.isConfigured) {
      _demoMode = true;
      firebaseAvailable = false;
      await WeddingRepository.initialize();
      return;
    }

    try {
      _auth = FirebaseAuth.instance;
      firebaseAvailable = true;
      _demoMode = false;
      await WeddingRepository.initialize();
      final user = _auth!.currentUser;
      if (user != null) {
        await WeddingRepository.instance.activateSessionForUser(user.uid);
      }
    } catch (_) {
      _demoMode = true;
      firebaseAvailable = false;
      await WeddingRepository.initialize();
    }
  }

  Future<AuthResult> signIn({required String email, required String password}) async {
    if (_demoMode) {
      await Future<void>.delayed(const Duration(milliseconds: 400));
      if (email.isEmpty || password.isEmpty) {
        return AuthResult.failure('Please enter email and password');
      }

      final repo = WeddingRepository.instance;
      final userId = await repo.localUserIdForEmail(email);
      if (userId == null) {
        return AuthResult.failure('Account not found. Please register first.');
      }

      final valid = await repo.validateLocalLogin(email, password);
      if (!valid) {
        return AuthResult.failure('Incorrect password');
      }

      _localUserId = userId;
      _localEmail = email.trim().toLowerCase();
      _localName = await repo.localUserName(userId);
      await repo.activateSessionForUser(userId);
      return AuthResult.success();
    }

    try {
      final cred = await _auth!.signInWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );
      await WeddingRepository.instance.activateSessionForUser(cred.user!.uid);
      return AuthResult.success();
    } on FirebaseAuthException catch (e) {
      return AuthResult.failure(e.message ?? 'Sign in failed');
    }
  }

  Future<AuthResult> register({
    required String name,
    required String email,
    required String password,
    required String role,
    required String brideName,
    required String groomName,
    required DateTime weddingDate,
    required String countryCode,
    required String weddingTypeId,
    String? venue,
  }) async {
    if (name.isEmpty || email.isEmpty || password.length < 8) {
      return AuthResult.failure('Please fill all fields (password min 8 chars)');
    }
    if (brideName.isEmpty || groomName.isEmpty) {
      return AuthResult.failure('Please enter bride and groom names');
    }

    if (_demoMode) {
      await Future<void>.delayed(const Duration(milliseconds: 500));
      final repo = WeddingRepository.instance;

      if (await repo.emailExists(email)) {
        return AuthResult.failure('This email is already registered. Sign in instead.');
      }

      final userId = 'usr_${DateTime.now().millisecondsSinceEpoch}';
      await repo.registerWedding(
        userId: userId,
        email: email.trim().toLowerCase(),
        password: password,
        ownerName: name,
        brideName: brideName,
        groomName: groomName,
        weddingDate: weddingDate,
        role: role,
        countryCode: countryCode,
        weddingTypeId: weddingTypeId,
        venue: venue,
      );

      _localUserId = userId;
      _localEmail = email.trim().toLowerCase();
      _localName = name;
      return AuthResult.success();
    }

    try {
      final cred = await _auth!.createUserWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );
      await cred.user?.updateDisplayName(name);

      await WeddingRepository.instance.registerWedding(
        userId: cred.user!.uid,
        email: email.trim().toLowerCase(),
        password: password,
        ownerName: name,
        brideName: brideName,
        groomName: groomName,
        weddingDate: weddingDate,
        role: role,
        countryCode: countryCode,
        weddingTypeId: weddingTypeId,
        venue: venue,
      );

      return AuthResult.success();
    } on FirebaseAuthException catch (e) {
      return AuthResult.failure(e.message ?? 'Registration failed');
    }
  }

  Future<void> signOut() async {
    WeddingSession.clear();
    _localUserId = null;
    _localEmail = null;
    _localName = null;
    if (!_demoMode && _auth != null) {
      await _auth!.signOut();
    }
  }
}

class AuthResult {
  AuthResult._({this.error});

  final String? error;
  bool get isSuccess => error == null;

  factory AuthResult.success() => AuthResult._();
  factory AuthResult.failure(String message) => AuthResult._(error: message);
}
