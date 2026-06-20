import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';
import '../../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key, required this.authService});

  final AuthService authService;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _showPass = false;
  bool _loading = false;
  String? _error;

  Future<void> _login() async {
    setState(() { _loading = true; _error = null; });
    final result = await widget.authService.signIn(
      email: _email.text,
      password: _password.text,
    );
    if (!mounted) return;
    setState(() => _loading = false);
    if (result.isSuccess) {
      context.go('/home');
    } else {
      setState(() => _error = result.error);
    }
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [AppColors.beige, AppColors.background],
            stops: [0.0, 0.4],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: [
                const SizedBox(height: 32),
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: AppColors.goldGradient,
                    boxShadow: [
                      BoxShadow(color: AppColors.primary.withValues(alpha: 0.3), blurRadius: 12),
                    ],
                  ),
                  child: const Icon(Icons.favorite, color: Colors.white, size: 36),
                ),
                const SizedBox(height: 16),
                Text('Welcome Back', style: playfair(context, size: 26)),
                const SizedBox(height: 4),
                Text(
                  'Sign in to continue planning your special day',
                  style: dmSans(context, size: 14, color: AppColors.textMuted),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                WeddingCard(
                  borderRadius: 24,
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      if (_error != null) ...[
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: AppColors.errorBg,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
                        ),
                        const SizedBox(height: 16),
                      ],
                      if (widget.authService.isDemoMode)
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(10),
                          margin: const EdgeInsets.only(bottom: 16),
                          decoration: BoxDecoration(
                            color: AppColors.successBg,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'Demo mode — sign in with any email and password, or register for your own wedding workspace.',
                            style: TextStyle(color: AppColors.success, fontSize: 12),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      WeddingInputField(
                        label: 'Email Address',
                        controller: _email,
                        icon: Icons.mail_outline,
                        hint: 'your@email.com',
                        keyboardType: TextInputType.emailAddress,
                      ),
                      const SizedBox(height: 16),
                      WeddingInputField(
                        label: 'Password',
                        controller: _password,
                        icon: Icons.lock_outline,
                        hint: '••••••••',
                        obscureText: !_showPass,
                        suffix: IconButton(
                          icon: Icon(_showPass ? Icons.visibility_off : Icons.visibility, color: AppColors.textMuted, size: 20),
                          onPressed: () => setState(() => _showPass = !_showPass),
                        ),
                      ),
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () {},
                          child: const Text('Forgot Password?', style: TextStyle(color: AppColors.primary, fontSize: 13)),
                        ),
                      ),
                      const SizedBox(height: 8),
                      PrimaryButton(label: 'Sign In', onPressed: _login, loading: _loading),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Expanded(child: Divider(color: AppColors.primary.withValues(alpha: 0.2))),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            child: Text('or continue with', style: dmSans(context, size: 12, color: AppColors.textMuted)),
                          ),
                          Expanded(child: Divider(color: AppColors.primary.withValues(alpha: 0.2))),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton(
                              onPressed: () {},
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 14),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                side: BorderSide(color: AppColors.primary.withValues(alpha: 0.2)),
                                backgroundColor: AppColors.inputBg,
                              ),
                              child: const Text('Google', style: TextStyle(color: AppColors.textBrown, fontWeight: FontWeight.w600)),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: OutlinedButton(
                              onPressed: () {},
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 14),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                side: BorderSide(color: AppColors.primary.withValues(alpha: 0.2)),
                                backgroundColor: AppColors.inputBg,
                              ),
                              child: const Text('Facebook', style: TextStyle(color: AppColors.textBrown, fontWeight: FontWeight.w600)),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Don't have an account? ", style: dmSans(context, size: 14, color: AppColors.textMuted)),
                    GestureDetector(
                      onTap: () => context.go('/register'),
                      child: const Text('Register now', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
