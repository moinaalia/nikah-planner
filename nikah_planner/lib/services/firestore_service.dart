import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../core/data/mock_data.dart';
import 'auth_service.dart';

class FirestoreService {
  FirestoreService({FirebaseFirestore? firestore}) : _db = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _db;

  CollectionReference<Map<String, dynamic>> get _weddings => _db.collection('weddings');

  Future<void> createWeddingProfile({
    required String userId,
    required String brideName,
    required String groomName,
    required DateTime weddingDate,
    required String role,
  }) async {
    if (!AuthService.firebaseAvailable) return;

    final weddingRef = _weddings.doc();
    await weddingRef.set({
      'brideName': brideName,
      'groomName': groomName,
      'weddingDate': Timestamp.fromDate(weddingDate),
      'memberIds': [userId],
      'createdAt': FieldValue.serverTimestamp(),
      'theme': 'Elegant Gold & Sage Green',
      'venue': 'Dewan Mulia, Shah Alam',
    });

    await _db.collection('users').doc(userId).set({
      'role': role,
      'weddingId': weddingRef.id,
      'updatedAt': FieldValue.serverTimestamp(),
    }, SetOptions(merge: true));
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
    'venue': 'Dewan Mulia, Shah Alam',
    'theme': 'Elegant Gold & Sage Green',
  };
}
