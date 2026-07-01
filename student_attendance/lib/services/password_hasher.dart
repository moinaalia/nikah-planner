import 'dart:convert';
import 'dart:math';

import 'package:crypto/crypto.dart';

/// Hashes passwords before SQLite storage (never store plain text).
class PasswordHasher {
  static String hash(String plainPassword) {
    final salt = _generateSalt();
    final digest = sha256.convert(utf8.encode('$salt$plainPassword'));
    return '$salt:${digest.toString()}';
  }

  static bool verify(String plainPassword, String storedHash) {
    final parts = storedHash.split(':');
    if (parts.length != 2) return false;
    final salt = parts[0];
    final expected = parts[1];
    final digest = sha256.convert(utf8.encode('$salt$plainPassword'));
    return digest.toString() == expected;
  }

  static String _generateSalt() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    final random = Random.secure();
    return List.generate(16, (_) => chars[random.nextInt(chars.length)]).join();
  }
}
