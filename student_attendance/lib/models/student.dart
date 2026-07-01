class Student {
  const Student({
    required this.studentId,
    required this.fullName,
    required this.yearOfStudy,
    required this.phoneNumber,
    this.courseName,
    this.courseCode,
    this.enrollmentId,
  });

  final String studentId;
  final String fullName;
  final int yearOfStudy;
  final String phoneNumber;
  final String? courseName;
  final String? courseCode;
  final int? enrollmentId;

  Map<String, Object?> toMap({required String passwordHash}) => {
        'student_id': studentId,
        'full_name': fullName,
        'year_of_study': yearOfStudy,
        'phone_number': phoneNumber,
        'password_hash': passwordHash,
      };

  factory Student.fromMap(Map<String, Object?> map) => Student(
        studentId: map['student_id'] as String,
        fullName: map['full_name'] as String,
        yearOfStudy: map['year_of_study'] as int,
        phoneNumber: map['phone_number'] as String,
        courseName: map['course_name'] as String?,
        courseCode: map['course_code'] as String?,
        enrollmentId: map['enrollment_id'] as int?,
      );
}
