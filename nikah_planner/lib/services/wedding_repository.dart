import '../models/wedding_profile.dart';
import 'auth_service.dart';
import 'firestore_service.dart';
import 'local_wedding_store.dart';
import 'wedding_data_factory.dart';
import 'wedding_session.dart';

class WeddingRepository {
  WeddingRepository({
    LocalWeddingStore? localStore,
    FirestoreService? firestore,
  })  : _local = localStore,
        _firestore = firestore;

  final LocalWeddingStore? _local;
  final FirestoreService? _firestore;

  static WeddingRepository? _instance;
  static WeddingRepository get instance {
    assert(_instance != null, 'Call WeddingRepository.initialize() first');
    return _instance!;
  }

  static Future<void> initialize() async {
    if (AuthService.firebaseAvailable) {
      _instance = WeddingRepository(firestore: FirestoreService());
    } else {
      _instance = WeddingRepository(localStore: await LocalWeddingStore.create());
    }
  }

  Future<bool> emailExists(String email) async {
    if (AuthService.firebaseAvailable) return false;
    return _local!.emailExists(email);
  }

  Future<bool> validateLocalLogin(String email, String password) async {
    final result = await _local?.validateLogin(email, password);
    return result ?? false;
  }

  Future<String?> localUserIdForEmail(String email) async {
    return _local?.userIdForEmail(email);
  }

  Future<WeddingProfile> registerWedding({
    required String userId,
    required String email,
    required String password,
    required String ownerName,
    required String brideName,
    required String groomName,
    required DateTime weddingDate,
    required String role,
    required String countryCode,
    required String weddingTypeId,
    String? venue,
  }) async {
    if (AuthService.firebaseAvailable) {
      await _firestore!.createWeddingProfile(
        userId: userId,
        brideName: brideName,
        groomName: groomName,
        weddingDate: weddingDate,
        role: role,
        ownerEmail: email,
        ownerName: ownerName,
        countryCode: countryCode,
        weddingTypeId: weddingTypeId,
        venue: venue,
      );
      final loaded = await loadForUser(userId);
      if (loaded != null) {
        WeddingSession.activate(loaded);
        return loaded;
      }
      final fallback = WeddingDataFactory.createNew(
        userId: userId,
        email: email,
        ownerName: ownerName,
        brideName: brideName,
        groomName: groomName,
        weddingDate: weddingDate,
        role: role,
        countryCode: countryCode,
        weddingTypeId: weddingTypeId,
        venue: venue,
      );
      WeddingSession.activate(fallback);
      return fallback;
    }

    final profile = WeddingDataFactory.createNew(
      userId: userId,
      email: email,
      ownerName: ownerName,
      brideName: brideName,
      groomName: groomName,
      weddingDate: weddingDate,
      role: role,
      countryCode: countryCode,
      weddingTypeId: weddingTypeId,
      venue: venue,
    );

    await _local!.saveUser(
      userId: userId,
      email: email,
      password: password,
      name: ownerName,
      role: role,
      weddingId: profile.id,
    );
    await _local.saveWedding(profile);
    WeddingSession.activate(profile);
    return profile;
  }

  Future<WeddingProfile?> loadForUser(String userId) async {
    if (AuthService.firebaseAvailable) {
      final data = await _firestore!.getWeddingForUser(userId);
      if (data == null) return null;
      return _firestore!.mapToProfile(data, userId);
    }
    return _local?.getWeddingForUser(userId);
  }

  Future<void> activateSessionForUser(String userId) async {
    final profile = await loadForUser(userId);
    if (profile != null) {
      WeddingSession.activate(profile);
    }
  }

  Future<String?> localUserName(String userId) async {
    final user = await _local?.getUser(userId);
    return user?['name'] as String?;
  }

  Future<void> saveProfile(WeddingProfile profile) async {
    if (AuthService.firebaseAvailable) {
      await _firestore!.saveWeddingProfile(profile);
    } else {
      await _local?.saveWedding(profile);
    }
    WeddingSession.activate(profile);
  }
}
