import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key, required this.onNavigate});

  final void Function(String route) onNavigate;

  static const _items = [
    _MoreItem(emoji: '💑', label: 'Bride & Groom Profile', desc: 'Your personal wedding details', route: '/profile', bg: Color(0xFFFDF3E7)),
    _MoreItem(emoji: '💌', label: 'Invitation Cards', desc: 'Digital & physical invitations', route: '/invitation', bg: Color(0xFFE8F4F3)),
    _MoreItem(emoji: '📅', label: 'Wedding Schedule', desc: 'Events & ceremony timeline', route: '/schedule', bg: Color(0xFFF0EEF8)),
    _MoreItem(emoji: '🛍️', label: 'Vendor Booking', desc: 'Manage your service vendors', route: '/vendors', bg: Color(0xFFEEF5EE)),
    _MoreItem(emoji: '🔔', label: 'Notifications', desc: 'Reminders & updates', route: '/notifications', bg: Color(0xFFFAF0F0)),
    _MoreItem(emoji: '⚙️', label: 'Settings', desc: 'App preferences & account', route: '/settings', bg: Color(0xFFEEF2F8)),
  ];

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'More Features',
            subtitle: 'Everything you need for your big day',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [AppColors.beige, AppColors.background],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 80),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              ..._items.map((item) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: WeddingCard(
                  child: InkWell(
                    onTap: () => onNavigate(item.route),
                    borderRadius: BorderRadius.circular(16),
                    child: Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(color: item.bg, borderRadius: BorderRadius.circular(16)),
                          alignment: Alignment.center,
                          child: Text(item.emoji, style: const TextStyle(fontSize: 22)),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(item.label, style: dmSans(context, size: 14, weight: FontWeight.w500)),
                              Text(item.desc, style: dmSans(context, size: 12, color: AppColors.textMuted)),
                            ],
                          ),
                        ),
                        const Icon(Icons.chevron_right, color: AppColors.primary),
                      ],
                    ),
                  ),
                ),
              )),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppColors.accent.withValues(alpha: 0.13), AppColors.secondary.withValues(alpha: 0.13)],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: AppColors.primary.withValues(alpha: 0.2)),
                ),
                child: Column(
                  children: [
                    Text(
                      '"And of His signs is that He created for you from yourselves mates that you may find tranquility in them."',
                      style: playfair(context, size: 14).copyWith(fontStyle: FontStyle.italic),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    Text('— Surah Ar-Rum, 30:21', style: dmSans(context, size: 12, color: AppColors.primary), textAlign: TextAlign.center),
                  ],
                ),
              ),
            ]),
          ),
        ),
      ],
    );
  }
}

class _MoreItem {
  const _MoreItem({
    required this.emoji,
    required this.label,
    required this.desc,
    required this.route,
    required this.bg,
  });

  final String emoji;
  final String label;
  final String desc;
  final String route;
  final Color bg;
}
