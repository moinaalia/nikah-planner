class Course {
  const Course({
    required this.courseId,
    required this.courseCode,
    required this.courseName,
  });

  final int courseId;
  final String courseCode;
  final String courseName;

  Map<String, Object?> toMap() => {
        'course_id': courseId,
        'course_code': courseCode,
        'course_name': courseName,
      };

  factory Course.fromMap(Map<String, Object?> map) => Course(
        courseId: map['course_id'] as int,
        courseCode: map['course_code'] as String,
        courseName: map['course_name'] as String,
      );
}
