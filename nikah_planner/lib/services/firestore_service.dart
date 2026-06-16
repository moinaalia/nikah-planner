import 'package:cloud_firestore/cloud_firestore.dart';
import '../core/data/mock_data.dart';
import '../models/wedding_profile.dart';
import 'auth_service.dart';
import 'wedding_data_factory.dart';

class FirestoreService {
  FirestoreService({FirebaseFirestore? firestore}) : _db = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _db;

  CollectionReference<Map<String, dynamic>> get _weddings => _db.collection('weddings');
  CollectionReference<Map<String, dynamic>> get _users => _db.collection('users');

  Future<void> createWeddingProfile({
    required String userId,
    required String brideName,
    required String groomName,
    required DateTime weddingDate,
    required String role,
    required String ownerEmail,
    required String ownerName,
    required String countryCode,
    required String weddingTypeId,
    String? venue,
  }) async {
    if (!AuthService.firebaseAvailable) return;

    final profile = WeddingDataFactory.createNew(
      userId: userId,
      email: ownerEmail,
      ownerName: ownerName,
      brideName: brideName,
      groomName: groomName,
      weddingDate: weddingDate,
      role: role,
      countryCode: countryCode,
      weddingTypeId: weddingTypeId,
      venue: venue,
    );

    final weddingRef = _weddings.doc();
    final data = profile.toJson()
      ..['id'] = weddingRef.id
      ..['memberIds'] = [userId]
      ..['createdAt'] = FieldValue.serverTimestamp();

    await weddingRef.set(data);

    await _users.doc(userId).set({
      'email': ownerEmail,
      'name': ownerName,
      'role': role,
      'weddingId': weddingRef.id,
      'updatedAt': FieldValue.serverTimestamp(),
    }, SetOptions(merge: true));
  }

  Future<Map<String, dynamic>?> getWeddingForUser(String userId) async {
    if (!AuthService.firebaseAvailable) return null;

    final userDoc = await _users.doc(userId).get();
    if (!userDoc.exists) return null;
    final weddingId = userDoc.data()?['weddingId'] as String?;
    if (weddingId == null) return null;

    final weddingDoc = await _weddings.doc(weddingId).get();
    if (!weddingDoc.exists) return null;

    return {
      ...weddingDoc.data()!,
      'id': weddingId,
      'ownerUserId': userId,
      'ownerEmail': userDoc.data()?['email'] ?? '',
      'ownerName': userDoc.data()?['name'] ?? '',
      'role': userDoc.data()?['role'] ?? 'bride',
    };
  }

  Future<void> saveWeddingProfile(WeddingProfile profile) async {
    if (!AuthService.firebaseAvailable) return;
    final data = profile.toJson()..remove('id');
    await _weddings.doc(profile.id).set(data, SetOptions(merge: true));
  }

  WeddingProfile mapToProfile(Map<String, dynamic> data, String userId) {
    if (data.containsKey('brideName') && data['weddingDate'] is String) {
      return WeddingProfile.fromJson({
        ...data,
        'id': data['id'] ?? 'unknown',
        'ownerUserId': userId,
      });
    }

    final weddingDate = data['weddingDate'] is Timestamp
        ? (data['weddingDate'] as Timestamp).toDate()
        : DateTime.now().add(const Duration(days: 90));

    return WeddingDataFactory.createNew(
      userId: userId,
      email: data['ownerEmail'] as String? ?? '',
      ownerName: data['ownerName'] as String? ?? '',
      brideName: data['brideName'] as String? ?? 'Bride',
      groomName: data['groomName'] as String? ?? 'Groom',
      weddingDate: weddingDate,
      role: data['role'] as String? ?? 'bride',
      countryCode: data['countryCode'] as String? ?? 'INT',
      weddingTypeId: data['weddingTypeId'] as String? ?? 'standard',
      venue: data['venue'] as String?,
    );
  }

  Stream<Map<String, dynamic>?> watchWedding(String weddingId) {
    if (!AuthService.firebaseAvailable) {
      return Stream.value(_demoWedding);
    }
    return _weddings.doc(weddingId).snapshots().map((s) => s.data());
  }

  Future<void> addGuest(String weddingId, Map<String, dynamic> guest) async {
    if (!AuthService.firebaseAvailable) return;
    await _weddings.doc(weddingId).collection('guests').add(guest);
  }

  Stream<List<Map<String, dynamic>>> watchGuests(String weddingId) {
    if (!AuthService.firebaseAvailable) {
      return Stream.value(
        MockData.guests.map((g) => {
          'name': g.name,
          'relation': g.relation,
          'side': g.side,
          'rsvp': g.rsvp,
          'table': g.table,
          'plusOne': g.plusOne,
        }).toList(),
      );
    }
    return _weddings
        .doc(weddingId)
        .collection('guests')
        .snapshots()
        .map((snap) => snap.docs.map((d) => {...d.data(), 'id': d.id}).toList());
  }

  Future<void> updateBudgetCategory(String weddingId, String catId, Map<String, dynamic> data) async {
    if (!AuthService.firebaseAvailable) return;
    await _weddings.doc(weddingId).collection('budgetCategories').doc(catId).set(data, SetOptions(merge: true));
  }

  static Map<String, dynamic> get _demoWedding => {
    'brideName': MockData.brideName,
    'groomName': MockData.groomName,
    'weddingDate': Timestamp.fromDate(MockData.weddingDate),
    'venue': MockData.venue,
    'theme': MockData.theme,
  };

  static const galleryCategories = ['All', 'Venue', 'Decoration', 'Florals', 'Attire', 'Pelamin', 'Table Setting', 'Lighting'];
  static const vendorCategories = ['All', 'Venue', 'Catering', 'Photography', 'Makeup', 'Decoration', 'Attire', 'Entertainment'];
}
