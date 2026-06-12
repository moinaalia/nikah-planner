import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTheme {
  static ThemeData get light {
    final playfair = GoogleFonts.playfairDisplayTextTheme();
    final dmSans = GoogleFonts.dmSansTextTheme();

    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: AppColors.background,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        surface: Colors.white,
        onSurface: AppColors.textDark,
      ),
      textTheme: dmSans.copyWith(
        headlineLarge: playfair.headlineLarge?.copyWith(
          color: AppColors.textBrown,
          fontWeight: FontWeight.w500,
        ),
        headlineMedium: playfair.headlineMedium?.copyWith(
          color: AppColors.textBrown,
          fontWeight: FontWeight.w500,
        ),
        headlineSmall: playfair.headlineSmall?.copyWith(
          color: AppColors.textBrown,
          fontWeight: FontWeight.w500,
        ),
        titleLarge: playfair.titleLarge?.copyWith(color: AppColors.textBrown),
        bodyMedium: dmSans.bodyMedium?.copyWith(color: AppColors.textDark),
        bodySmall: dmSans.bodySmall?.copyWith(color: AppColors.textMuted),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        color: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.inputBg,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: AppColors.primary.withValues(alpha: 0.25)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: AppColors.primary.withValues(alpha: 0.25)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
      appBarTheme: AppBarTheme(
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: AppColors.textBrown,
        titleTextStyle: GoogleFonts.playfairDisplay(
          color: AppColors.textBrown,
          fontSize: 20,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

TextStyle playfair(BuildContext context, {double? size, Color? color, FontWeight? weight}) {
  return GoogleFonts.playfairDisplay(
    fontSize: size ?? 20,
    color: color ?? AppColors.textBrown,
    fontWeight: weight ?? FontWeight.w500,
  );
}

TextStyle dmSans(BuildContext context, {double? size, Color? color, FontWeight? weight}) {
  return GoogleFonts.dmSans(
    fontSize: size ?? 14,
    color: color ?? AppColors.textDark,
    fontWeight: weight ?? FontWeight.normal,
  );
}
