import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:nikah_planner/core/theme/app_theme.dart';
import 'package:nikah_planner/router/app_router.dart';
import 'package:nikah_planner/services/auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Generates submission screenshots into ../../screenshots/
/// Run: flutter test test/generate_screenshots_test.dart
Future<void> main() async {
  TestWidgetsFlutterBinding.ensureInitialized();
  GoogleFonts.config.allowRuntimeFetching = false;
  await _loadFonts();

  final originalOnError = FlutterError.onError;
  FlutterError.onError = (details) {
    final text = details.exceptionAsString();
    if (text.contains('overflowed') || text.contains('RenderFlex')) {
      return;
    }
    originalOnError?.call(details);
  };

  const phone = Size(412, 915);
  final outDir = Directory('../../screenshots');
  if (!outDir.existsSync()) outDir.createSync(recursive: true);

  Future<void> saveShot(WidgetTester tester, String name) async {
    await tester.pump(const Duration(milliseconds: 300));
    final boundary = tester.renderObject<RenderRepaintBoundary>(
      find.byType(RepaintBoundary).first,
    );
    final image = await boundary.toImage(pixelRatio: 2.0);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    await File('${outDir.path}/$name').writeAsBytes(bytes!.buffer.asUint8List());
  }

  Future<AppRouter> setupRouter(WidgetTester tester) async {
    SharedPreferences.setMockInitialValues({});
    final authService = AuthService();
    await authService.initialize();
    final appRouter = AppRouter(authService);

    tester.view.physicalSize = phone;
    tester.view.devicePixelRatio = 1.0;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);

    await tester.pumpWidget(
      ProviderScope(
        child: RepaintBoundary(
          child: MaterialApp.router(
            debugShowCheckedModeBanner: false,
            theme: AppTheme.light,
            routerConfig: appRouter.router,
          ),
        ),
      ),
    );
    return appRouter;
  }

  testWidgets('generate all screenshots', (tester) async {
    final router = await setupRouter(tester);

    router.router.go('/splash');
    await tester.pump(const Duration(milliseconds: 1200));
    await saveShot(tester, '01_splash.png');

    router.router.go('/login');
    await tester.pump(const Duration(milliseconds: 800));
    await saveShot(tester, '02_login.png');

    router.router.go('/register');
    await tester.pump(const Duration(milliseconds: 800));
    await saveShot(tester, '03_register.png');

    router.router.go('/home');
    await tester.pump(const Duration(milliseconds: 800));
    await saveShot(tester, '04_dashboard.png');

    router.router.go('/budget');
    await tester.pump(const Duration(milliseconds: 800));
    await saveShot(tester, '05_budget.png');

    router.router.go('/guests');
    await tester.pump(const Duration(milliseconds: 800));
    await tester.tap(find.text("Bride's Side"));
    await tester.pump(const Duration(milliseconds: 400));
    await saveShot(tester, '06_guests.png');

    router.router.go('/schedule');
    await tester.pump(const Duration(milliseconds: 800));
    await saveShot(tester, '07_schedule.png');

    router.router.go('/settings');
    await tester.pump(const Duration(milliseconds: 800));
    await saveShot(tester, '08_settings.png');

    router.router.go('/login');
    await tester.pump(const Duration(milliseconds: 600));
    await tester.enterText(find.byType(TextField).first, 'inconnu@test.com');
    await tester.enterText(find.byType(TextField).last, 'mauvais');
    await tester.tap(find.text('Sign In'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 500));
    await saveShot(tester, '09_error.png');
  });
}

Future<void> _loadFonts() async {
  for (final family in ['Playfair Display', 'PlayfairDisplay']) {
    final loader = FontLoader(family)
      ..addFont(rootBundle.load('assets/fonts/PlayfairDisplay.ttf'));
    await loader.load();
  }
  for (final family in ['DM Sans', 'DMSans']) {
    final loader = FontLoader(family)
      ..addFont(rootBundle.load('assets/fonts/DMSans.ttf'));
    await loader.load();
  }
}
