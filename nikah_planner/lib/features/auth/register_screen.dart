import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';
import '../../services/auth_service.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key, required this.authService});

  final AuthService authService;

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _password = TextEditingController();
  bool _showPass = false;
  bool _loading = false;
  bool _terms = false;
  String _role = 'bride';
  String? _error;

  Future<void> _register() async {
    if (!_terms) {
      setState(() => _error = 'Please accept the Terms of Service');
      return;
    }
    setState(() { _loading = true; _error = null; });
    final result = await widget.authService.register(
      name: _name.text,
      email: _email.text,
      password: _password.text,
      role: _role,
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
    _name.dispose();
    _email.dispose();
    _phone.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [AppColors.beige, AppColors.background],
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextButton.icon(
                      onPressed: () => context.go('/login'),
                      icon: const Icon(Icons.arrow_back, color: AppColors.primary, size: 20),
                      label: const Text('Back', style: TextStyle(color: AppColors.primary)),
                    ),
                    Text('Create Account', style: playfair(context, size: 26)),
                    const SizedBox(height: 4),
                    Text('Begin your wedding journey today', style: dmSans(context, size: 14, color: AppColors.textMuted)),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: WeddingCard(
                  borderRadius: 24,
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (_error != null) ...[
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(color: AppColors.errorBg, borderRadius: BorderRadius.circular(12)),
                          child: Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
                        ),
                        const SizedBox(height: 16),
                      ],
                      Text('I am a...', style: dmSans(context, size: 13, color: AppColors.textBrown, weight: FontWeight.w500)),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          _RoleChip(label: 'Bride', emoji: '👰', id: 'bride', selected: _role == 'bride', onTap: () => setState(() => _role = 'bride')),
                          const SizedBox(width: 8),
                          _RoleChip(label: 'Groom', emoji: '🤵', id: 'groom', selected: _role == 'groom', onTap: () => setState(() => _role = 'groom')),
                          const SizedBox(width: 8),
                          _RoleChip(label: 'Planner', emoji: '📋', id: 'planner', selected: _role == 'planner', onTap: () => setState(() => _role = 'planner')),
                        ],
                      ),
                      const SizedBox(height: 20),
                      WeddingInputField(label: 'Full Name', controller: _name, icon: Icons.person_outline, hint: 'Full Name'),
                      const SizedBox(height: 16),
                      WeddingInputField(label: 'Email Address', controller: _email, icon: Icons.mail_outline, hint: 'your@email.com', keyboardType: TextInputType.emailAddress),
                      const SizedBox(height: 16),
                      WeddingInputField(label: 'Phone Number', controller: _phone, icon: Icons.phone_outlined, hint: '+60 12-345 6789', keyboardType: TextInputType.phone),
                      const SizedBox(height: 16),
                      WeddingInputField(
                        label: 'Password',
                        controller: _password,
                        icon: Icons.lock_outline,
                        hint: 'Min 8 characters',
                        obscureText: !_showPass,
                        suffix: IconButton(
                          icon: Icon(_showPass ? Icons.visibility_off : Icons.visibility, color: AppColors.textMuted, size: 20),
                          onPressed: () => setState(() => _showPass = !_showPass),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Checkbox(
                            value: _terms,
                            onChanged: (v) => setState(() => _terms = v ?? false),
                            activeColor: AppColors.primary,
                          ),
                          Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(top: 10),
                              child: RichText(
                                text: TextSpan(
                                  style: dmSans(context, size: 12, color: AppColors.textMuted),
                                  children: const [
                                    TextSpan(text: 'I agree to the '),
                                    TextSpan(text: 'Terms of Service', style: TextStyle(color: AppColors.primary)),
                                    TextSpan(text: ' and '),
                                    TextSpan(text: 'Privacy Policy', style: TextStyle(color: AppColors.primary)),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      PrimaryButton(label: 'Create Account', onPressed: _register, loading: _loading),
                    ],
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Already have an account? ', style: dmSans(context, size: 14, color: AppColors.textMuted)),
                  GestureDetector(
                    onTap: () => context.go('/login'),
                    child: const Text('Sign in', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w600)),
                  ),
                ],
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}

class _RoleChip extends StatelessWidget {
  const _RoleChip({
    required this.label,
    required this.emoji,
    required this.id,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final String emoji;
  final String id;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            gradient: selected ? AppColors.goldGradient : null,
            color: selected ? null : AppColors.inputBg,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: selected ? AppColors.accent : AppColors.primary.withValues(alpha: 0.2)),
          ),
          child: Column(
            children: [
              Text(emoji, style: const TextStyle(fontSize: 20)),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  color: selected ? Colors.white : AppColors.textBrown,
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
