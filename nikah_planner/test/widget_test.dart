import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nikah_planner/main.dart';
import 'package:nikah_planner/services/auth_service.dart';

void main() {
  testWidgets('Nikah Planner app launches', (WidgetTester tester) async {
    final authService = AuthService();
    await authService.initialize();

    await tester.pumpWidget(
      ProviderScope(
        child: NikahPlannerApp(authService: authService),
      ),
    );
    await tester.pump();

    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
