import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'firebase_options.dart';
import 'router/app_router.dart';
import 'services/auth_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (DefaultFirebaseOptions.isConfigured) {
    try {
      await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
    } catch (_) {
      // Falls back to demo mode when Firebase is not set up yet.
    }
  }

  final authService = AuthService();
  await authService.initialize();

  runApp(
    ProviderScope(
      child: NikahPlannerApp(authService: authService),
    ),
  );
}

class NikahPlannerApp extends StatefulWidget {
  const NikahPlannerApp({super.key, required this.authService});

  final AuthService authService;

  @override
  State<NikahPlannerApp> createState() => _NikahPlannerAppState();
}

class _NikahPlannerAppState extends State<NikahPlannerApp> {
  late final AppRouter _appRouter = AppRouter(widget.authService);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Nikah Planner',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: _appRouter.router,
    );
  }
}
