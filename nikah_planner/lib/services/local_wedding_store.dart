import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/wedding_profile.dart';

/// Stockage local multi-comptes (mode demo sans Firebase).
class LocalWeddingStore {
  LocalWeddingStore(this._prefs);

  final SharedPreferences _prefs;
  static const _usersKey = 'nikah_local_users';
  static const _weddingsKey = 'nikah_local_weddings';
  static const _emailIndexKey = 'nikah_email_index';

  static Future<LocalWeddingStore> create() async {
    return LocalWeddingStore(await SharedPreferences.getInstance());
  }

  Future<bool> emailExists(String email) async {
    final index = _readMap(_emailIndexKey);
    return index.containsKey(email.trim().toLowerCase());
  }

  Future<String?> userIdForEmail(String email) async {
    final index = _readMap(_emailIndexKey);
    return index[email.trim().toLowerCase()] as String?;
  }

  Future<Map<String, dynamic>?> getUser(String userId) async {
    final users = _readMap(_usersKey);
    final data = users[userId];
    return data is Map<String, dynamic> ? data : null;
  }

  Future<void> saveUser({
    required String userId,
    required String email,
    required String password,
    required String name,
    required String role,
    required String weddingId,
  }) async {
    final users = _readMap(_usersKey);
    users[userId] = {
      'email': email.trim().toLowerCase(),
      'password': password,
      'name': name,
      'role': role,
      'weddingId': weddingId,
    };
    await _prefs.setString(_usersKey, jsonEncode(users));

    final index = _readMap(_emailIndexKey);
    index[email.trim().toLowerCase()] = userId;
    await _prefs.setString(_emailIndexKey, jsonEncode(index));
  }

  Future<bool> validateLogin(String email, String password) async {
    final userId = await userIdForEmail(email);
    if (userId == null) return false;
    final user = await getUser(userId);
    return user != null && user['password'] == password;
  }

  Future<void> saveWedding(WeddingProfile profile) async {
    final weddings = _readMap(_weddingsKey);
    weddings[profile.id] = profile.toJson();
    await _prefs.setString(_weddingsKey, jsonEncode(weddings));
  }

  Future<WeddingProfile?> getWedding(String weddingId) async {
    final weddings = _readMap(_weddingsKey);
    final data = weddings[weddingId];
    if (data is! Map<String, dynamic>) return null;
    return WeddingProfile.fromJson(data);
  }

  Future<WeddingProfile?> getWeddingForUser(String userId) async {
    final user = await getUser(userId);
    if (user == null) return null;
    return getWedding(user['weddingId'] as String);
  }

  Map<String, dynamic> _readMap(String key) {
    final raw = _prefs.getString(key);
    if (raw == null || raw.isEmpty) return {};
    final decoded = jsonDecode(raw);
    if (decoded is Map<String, dynamic>) return Map<String, dynamic>.from(decoded);
    if (decoded is Map) {
      return decoded.map((k, v) => MapEntry(k.toString(), v));
    }
    return {};
  }
}
