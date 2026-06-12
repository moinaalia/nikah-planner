import 'package:firebase_auth/firebase_auth.dart';
import '../firebase_options.dart';

class AuthService {
  AuthService({FirebaseAuth? auth}) : _auth = auth;

  FirebaseAuth? _auth;
  bool _demoMode = true;

  bool get isDemoMode => _demoMode;
  User? get currentUser => _demoMode ? null : _auth?.currentUser;
  Stream<User?> get authStateChanges =>
      _demoMode ? Stream.value(null) : _auth!.authStateChanges();

  static bool firebaseAvailable = false;

  Future<void> initialize() async {
    if (!DefaultFirebaseOptions.isConfigured) {
      _demoMode = true;
      firebaseAvailable = false;
      return;
    }

    try {
      _auth = FirebaseAuth.instance;
      firebaseAvailable = true;
      _demoMode = false;
    } catch (_) {
      _demoMode = true;
      firebaseAvailable = false;
    }
  }

  Future<AuthResult> signIn({required String email, required String password}) async {
    if (_demoMode) {
      await Future<void>.delayed(const Duration(milliseconds: 600));
      if (email.isEmpty || password.isEmpty) {
        return AuthResult.failure('Please enter email and password');
      }
      return AuthResult.success();
    }
    try {
      await _auth!.signInWithEmailAndPassword(email: email.trim(), password: password);
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
  }) async {
    if (_demoMode) {
      await Future<void>.delayed(const Duration(milliseconds: 800));
      if (name.isEmpty || email.isEmpty || password.length < 8) {
        return AuthResult.failure('Please fill all fields (password min 8 chars)');
      }
      return AuthResult.success();
    }
    try {
      final cred = await _auth!.createUserWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );
      await cred.user?.updateDisplayName(name);
      return AuthResult.success();
    } on FirebaseAuthException catch (e) {
      return AuthResult.failure(e.message ?? 'Registration failed');
    }
  }

  Future<void> signOut() async {
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
