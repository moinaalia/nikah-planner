enum AttendanceStatus { present, absent, late }

extension AttendanceStatusX on AttendanceStatus {
  String get label => switch (this) {
        AttendanceStatus.present => 'present',
        AttendanceStatus.absent => 'absent',
        AttendanceStatus.late => 'late',
      };

  static AttendanceStatus fromLabel(String value) => switch (value) {
        'present' => AttendanceStatus.present,
        'absent' => AttendanceStatus.absent,
        _ => AttendanceStatus.late,
      };
}

class AttendanceRecord {
  const AttendanceRecord({
    required this.attendanceId,
    required this.enrollmentId,
    required this.studentId,
    required this.fullName,
    required this.attendanceDate,
    required this.status,
  });

  final int attendanceId;
  final int enrollmentId;
  final String studentId;
  final String fullName;
  final DateTime attendanceDate;
  final AttendanceStatus status;
}

class AttendanceReportRow {
  const AttendanceReportRow({
    required this.studentId,
    required this.fullName,
    required this.courseName,
    required this.presentCount,
    required this.absentCount,
    required this.lateCount,
    required this.attendancePercent,
  });

  final String studentId;
  final String fullName;
  final String courseName;
  final int presentCount;
  final int absentCount;
  final int lateCount;
  final double attendancePercent;
}
