import 'package:flutter/material.dart';

class AppColors {
  static const background = Color(0xFFFBF8F4);
  static const primary = Color(0xFFB8956A);
  static const accent = Color(0xFFC9A96E);
  static const secondary = Color(0xFF8FB5B0);
  static const textDark = Color(0xFF2D2417);
  static const textMuted = Color(0xFF8C7B6B);
  static const textBrown = Color(0xFF7A5C3A);
  static const inputBg = Color(0xFFF5F0E8);
  static const muted = Color(0xFFF0EBE3);
  static const beige = Color(0xFFE8D5BE);
  static const cream = Color(0xFFF5EDE0);
  static const sageLight = Color(0xFFD4E8E4);
  static const success = Color(0xFF408060);
  static const successBg = Color(0xFFE8F4EE);
  static const warning = Color(0xFFA08030);
  static const warningBg = Color(0xFFFFF8E0);
  static const error = Color(0xFFC04040);
  static const errorBg = Color(0xFFFFE8E8);

  static const goldGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [accent, primary],
  );

  static const splashGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [beige, cream, sageLight],
    stops: [0.0, 0.35, 1.0],
  );

  static const headerGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [beige, cream, sageLight],
    stops: [0.0, 0.6, 1.0],
  );

  static const countdownGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [accent, secondary],
  );
}
