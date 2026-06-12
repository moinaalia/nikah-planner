import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';
import '../../services/auth_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key, required this.authService});

  final AuthService authService;

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _notifPush = true;
  bool _notifEmail = true;
  bool _notifReminder = true;
  bool _darkMode = false;
  bool _islamicCalendar = true;
  bool _privacyLock = false;

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Settings',
            subtitle: 'Customize your app experience',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [AppColors.muted, AppColors.background],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppColors.accent.withValues(alpha: 0.13), AppColors.secondary.withValues(alpha: 0.13)],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: AppColors.primary.withValues(alpha: 0.2)),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(gradient: AppColors.goldGradient, borderRadius: BorderRadius.circular(16)),
                      alignment: Alignment.center,
                      child: Text('SA', style: playfair(context, size: 18, color: Colors.white)),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(MockData.coupleShort, style: playfair(context, size: 16)),
                          Text('siti.nurhaliza@gmail.com', style: dmSans(context, size: 12, color: AppColors.textMuted)),
                          Text('Wedding: 15 March 2025', style: dmSans(context, size: 11, color: AppColors.primary)),
                        ],
                      ),
                    ),
                    TextButton(onPressed: () {}, child: const Text('Edit', style: TextStyle(color: AppColors.primary))),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              _Section(
                title: 'Notifications',
                icon: Icons.notifications_outlined,
                children: [
                  _ToggleRow(label: 'Push Notifications', desc: 'Get alerts on your device', value: _notifPush, onChanged: (v) => setState(() => _notifPush = v)),
                  _ToggleRow(label: 'Email Notifications', value: _notifEmail, onChanged: (v) => setState(() => _notifEmail = v)),
                  _ToggleRow(label: 'Wedding Reminders', desc: 'Countdown & task alerts', value: _notifReminder, onChanged: (v) => setState(() => _notifReminder = v)),
                ],
              ),
              const SizedBox(height: 16),
              _Section(
                title: 'Appearance',
                icon: Icons.palette_outlined,
                children: [
                  _ToggleRow(label: 'Dark Mode', value: _darkMode, onChanged: (v) => setState(() => _darkMode = v)),
                  _NavRow(icon: Icons.language, label: 'Language', value: 'English'),
                  _ToggleRow(label: 'Show Islamic Calendar', desc: 'Hijri date display', value: _islamicCalendar, onChanged: (v) => setState(() => _islamicCalendar = v)),
                ],
              ),
              const SizedBox(height: 16),
              _Section(
                title: 'Wedding Details',
                icon: Icons.calendar_today,
                children: [
                  _NavRow(icon: Icons.event, label: 'Wedding Date', value: '15 Mar 2025'),
                  _NavRow(icon: Icons.people_outline, label: 'Guest Limit', value: '350 pax'),
                  _NavRow(icon: Icons.color_lens_outlined, label: 'Wedding Theme', value: 'Sage & Gold'),
                ],
              ),
              const SizedBox(height: 16),
              _Section(
                title: 'Privacy & Security',
                icon: Icons.shield_outlined,
                children: [
                  _ToggleRow(label: 'App Lock (PIN)', desc: 'Require PIN to open app', value: _privacyLock, onChanged: (v) => setState(() => _privacyLock = v)),
                  _NavRow(icon: Icons.privacy_tip_outlined, label: 'Privacy Policy'),
                  _NavRow(icon: Icons.help_outline, label: 'Help & Support'),
                ],
              ),
              const SizedBox(height: 16),
              WeddingCard(
                child: Column(
                  children: [
                    Text('Nikah Planner', style: playfair(context, size: 16)),
                    const SizedBox(height: 4),
                    Text('Version 2.4.1 · Made with ❤️ for Muslim couples', style: dmSans(context, size: 11, color: AppColors.textMuted), textAlign: TextAlign.center),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              OutlinedButton.icon(
                onPressed: () async {
                  await widget.authService.signOut();
                  if (context.mounted) context.go('/login');
                },
                icon: const Icon(Icons.logout, color: AppColors.error),
                label: const Text('Sign Out', style: TextStyle(color: AppColors.error, fontWeight: FontWeight.w500)),
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 52),
                  backgroundColor: AppColors.errorBg,
                  side: BorderSide(color: AppColors.error.withValues(alpha: 0.2)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ]),
          ),
        ),
      ],
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.title, required this.icon, required this.children});

  final String title;
  final IconData icon;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return WeddingCard(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 12),
            child: Row(
              children: [
                Icon(icon, size: 16, color: AppColors.primary),
                const SizedBox(width: 8),
                Text(title, style: playfair(context, size: 15)),
              ],
            ),
          ),
          const Divider(height: 1, color: Color(0x26B8956A)),
          ...children,
        ],
      ),
    );
  }
}

class _ToggleRow extends StatelessWidget {
  const _ToggleRow({required this.label, required this.value, required this.onChanged, this.desc});

  final String label;
  final String? desc;
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: dmSans(context, size: 14)),
                if (desc != null) Text(desc!, style: dmSans(context, size: 11, color: AppColors.textMuted)),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: AppColors.primary,
          ),
        ],
      ),
    );
  }
}

class _NavRow extends StatelessWidget {
  const _NavRow({required this.icon, required this.label, this.value});

  final IconData icon;
  final String label;
  final String? value;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(color: AppColors.inputBg, borderRadius: BorderRadius.circular(10)),
        child: Icon(icon, size: 16, color: AppColors.primary),
      ),
      title: Text(label, style: dmSans(context, size: 14)),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (value != null) Text(value!, style: dmSans(context, size: 13, color: AppColors.textMuted)),
          const Icon(Icons.chevron_right, color: AppColors.primary, size: 18),
        ],
      ),
      onTap: () {},
    );
  }
}
