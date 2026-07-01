import 'package:flutter_test/flutter_test.dart';

import 'package:student_attendance/main.dart';

void main() {
  testWidgets('Home screen loads', (WidgetTester tester) async {
    await tester.pumpWidget(const StudentAttendanceApp());
    await tester.pumpAndSettle();

    expect(find.text('Student Attendance'), findsOneWidget);
    expect(find.text('Register Student'), findsOneWidget);
  });
}
