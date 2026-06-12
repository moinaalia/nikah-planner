import 'package:firebase_core/firebase_core.dart';

/// Replace with output from `flutterfire configure`.
/// Demo mode works without valid Firebase credentials.
class DefaultFirebaseOptions {
  static bool get isConfigured =>
      apiKey != 'YOUR_API_KEY' && projectId != 'YOUR_PROJECT_ID';

  static const String apiKey = 'YOUR_API_KEY';
  static const String appId = 'YOUR_APP_ID';
  static const String messagingSenderId = 'YOUR_SENDER_ID';
  static const String projectId = 'YOUR_PROJECT_ID';
  static const String storageBucket = 'YOUR_STORAGE_BUCKET';

  static FirebaseOptions get currentPlatform {
    return const FirebaseOptions(
      apiKey: apiKey,
      appId: appId,
      messagingSenderId: messagingSenderId,
      projectId: projectId,
      storageBucket: storageBucket,
    );
  }
}
