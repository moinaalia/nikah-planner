import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final notifications = MockData.notifications;
    final unread = notifications.where((n) => !n.read).toList();
    final read = notifications.where((n) => n.read).toList();

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Notifications',
            subtitle: '${unread.length} unread notifications',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFF0EEF8), AppColors.background],
            ),
            trailing: TextButton(
              onPressed: () {},
              child: const Text('Mark all read', style: TextStyle(color: AppColors.primary, fontSize: 13)),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              if (unread.isNotEmpty) ...[
                Text('NEW', style: dmSans(context, size: 11, color: AppColors.textMuted).copyWith(letterSpacing: 1)),
                const SizedBox(height: 8),
                ...unread.map((n) => _NotifCard(notif: n)),
                const SizedBox(height: 16),
              ],
              Text('EARLIER', style: dmSans(context, size: 11, color: AppColors.textMuted).copyWith(letterSpacing: 1)),
              const SizedBox(height: 8),
              ...read.map((n) => _NotifCard(notif: n)),
            ]),
          ),
        ),
      ],
    );
  }
}

class _NotifCard extends StatelessWidget {
  const _NotifCard({required this.notif});

  final AppNotification notif;

  @override
  Widget build(BuildContext context) {
    final style = _style(notif.type);
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: WeddingCard(
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(color: style.bg, borderRadius: BorderRadius.circular(12)),
              child: Icon(style.icon, color: style.color, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          notif.title,
                          style: dmSans(context, size: 14, weight: notif.read ? FontWeight.normal : FontWeight.w600),
                        ),
                      ),
                      if (!notif.read)
                        Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(color: style.color, shape: BoxShape.circle),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(notif.body, style: dmSans(context, size: 12, color: const Color(0xFF5A4A3A))),
                  const SizedBox(height: 6),
                  Text(notif.time, style: dmSans(context, size: 11, color: AppColors.textMuted)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  ({IconData icon, Color color, Color bg}) _style(String type) {
    switch (type) {
      case 'rsvp':
        return (icon: Icons.people_outline, color: AppColors.secondary, bg: const Color(0xFFE8F4F3));
      case 'payment':
        return (icon: Icons.payments_outlined, color: AppColors.error, bg: AppColors.errorBg);
      case 'message':
        return (icon: Icons.message_outlined, color: const Color(0xFF7080C0), bg: const Color(0xFFEEF0F8));
      case 'success':
        return (icon: Icons.check_circle_outline, color: AppColors.success, bg: AppColors.successBg);
      case 'alert':
        return (icon: Icons.warning_amber_outlined, color: AppColors.warning, bg: AppColors.warningBg);
      default:
        return (icon: Icons.notifications_outlined, color: AppColors.primary, bg: const Color(0xFFFDF3E7));
    }
  }
}
