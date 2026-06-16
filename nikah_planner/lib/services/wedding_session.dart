import '../models/wedding_profile.dart';

/// Session utilisateur connecte — chaque compte voit uniquement son mariage.
class WeddingSession {
  WeddingSession._();

  static WeddingProfile? _profile;

  static bool get isActive => _profile != null;

  static WeddingProfile get profile {
    if (_profile == null) {
      throw StateError('No active wedding session');
    }
    return _profile!;
  }

  static void activate(WeddingProfile profile) => _profile = profile;

  static void clear() => _profile = null;
}
