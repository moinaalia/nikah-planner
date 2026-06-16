import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/data/mock_data.dart';
import '../../core/widgets/wedding_widgets.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.onNavigate});

  final void Function(String route) onNavigate;

  @override
  Widget build(BuildContext context) {
    final tasks = MockData.tasks;
    final completedTasks = tasks.where((t) => t.done).length;
    final daysLeft = MockData.daysUntilWedding;

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Container(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
            decoration: const BoxDecoration(gradient: AppColors.headerGradient),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Assalamualaikum,', style: dmSans(context, size: 13, color: AppColors.textMuted)),
                          Text(MockData.coupleShort, style: playfair(context, size: 22)),
                        ],
                      ),
                    ),
                    Material(
                      color: Colors.white,
                      shape: const CircleBorder(),
                      elevation: 2,
                      child: InkWell(
                        onTap: () => onNavigate('/notifications'),
                        customBorder: const CircleBorder(),
                        child: SizedBox(
                          width: 40,
                          height: 40,
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              const Icon(Icons.notifications_outlined, color: AppColors.primary, size: 20),
                              Positioned(
                                top: 10,
                                right: 10,
                                child: Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppColors.accent, shape: BoxShape.circle)),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      width: 40,
                      height: 40,
                      decoration: const BoxDecoration(shape: BoxShape.circle, gradient: AppColors.goldGradient),
                      alignment: Alignment.center,
                      child: const Text('SA', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                WeddingCard(
                  borderRadius: 24,
                  padding: const EdgeInsets.all(20),
                  gradient: AppColors.countdownGradient,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Days until your wedding', style: dmSans(context, size: 12, color: Colors.white70)),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('$daysLeft', style: playfair(context, size: 48, color: Colors.white)),
                          const SizedBox(width: 12),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('days to go', style: dmSans(context, size: 13, color: Colors.white)),
                                Text(MockData.weddingDateLabel, style: dmSans(context, size: 11, color: Colors.white70)),
                                Text(MockData.traditionLabel, style: dmSans(context, size: 10, color: Colors.white60)),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          _StatBox(value: '${((MockData.totalSpent / MockData.totalBudget) * 100).round()}%', label: 'Budget Used'),
                          const SizedBox(width: 12),
                          const _StatBox(value: '142', label: 'Guests Confirmed'),
                          const SizedBox(width: 12),
                          _StatBox(value: '$completedTasks/${tasks.length}', label: 'Tasks Done'),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.all(20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              Text('Quick Access', style: playfair(context, size: 18)),
              const SizedBox(height: 12),
              Row(
                children: [
                  _QuickAction(icon: Icons.account_balance_wallet_outlined, label: 'Budget', color: AppColors.accent, bg: const Color(0xFFFDF3E7), onTap: () => onNavigate('/budget')),
                  _QuickAction(icon: Icons.people_outline, label: 'Guests', color: AppColors.secondary, bg: const Color(0xFFE8F4F3), onTap: () => onNavigate('/guests')),
                  _QuickAction(icon: Icons.calendar_today_outlined, label: 'Schedule', color: AppColors.primary, bg: AppColors.cream, onTap: () => onNavigate('/schedule')),
                  _QuickAction(icon: Icons.favorite_outline, label: 'Gallery', color: const Color(0xFFD4A0A0), bg: const Color(0xFFFAF0F0), onTap: () => onNavigate('/gallery')),
                ],
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Upcoming Events', style: playfair(context, size: 18)),
                  TextButton(
                    onPressed: () => onNavigate('/schedule'),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('View all', style: TextStyle(color: AppColors.primary, fontSize: 13)),
                        Icon(Icons.chevron_right, color: AppColors.primary, size: 16),
                      ],
                    ),
                  ),
                ],
              ),
              ...MockData.upcomingEvents.map((e) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: WeddingCard(
                  child: Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          gradient: LinearGradient(
                            colors: [AppColors.accent.withValues(alpha: 0.13), AppColors.secondary.withValues(alpha: 0.13)],
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text((e['date'] as String).split(' ')[0], style: playfair(context, size: 16, color: AppColors.primary)),
                            Text((e['date'] as String).split(' ')[1], style: dmSans(context, size: 10, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(e['title'] as String, style: dmSans(context, size: 14, weight: FontWeight.w500)),
                            Row(children: [
                              const Icon(Icons.access_time, size: 12, color: AppColors.textMuted),
                              const SizedBox(width: 4),
                              Text(e['time'] as String, style: dmSans(context, size: 11, color: AppColors.textMuted)),
                            ]),
                            Row(children: [
                              const Icon(Icons.location_on_outlined, size: 12, color: AppColors.secondary),
                              const SizedBox(width: 4),
                              Expanded(child: Text(e['location'] as String, style: dmSans(context, size: 11, color: AppColors.textMuted))),
                            ]),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              )),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Tasks', style: playfair(context, size: 18)),
                  Row(
                    children: [
                      SizedBox(
                        width: 80,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: completedTasks / tasks.length,
                            backgroundColor: AppColors.muted,
                            valueColor: const AlwaysStoppedAnimation(AppColors.accent),
                            minHeight: 6,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text('$completedTasks/${tasks.length}', style: dmSans(context, size: 11, color: AppColors.textMuted)),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              ...tasks.map((task) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: WeddingCard(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: task.done ? AppColors.accent : Colors.transparent,
                          border: Border.all(color: task.done ? AppColors.accent : AppColors.accent, width: 2),
                        ),
                        child: task.done ? const Icon(Icons.check, size: 12, color: Colors.white) : null,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              task.title,
                              style: dmSans(
                                context,
                                size: 13,
                                color: task.done ? AppColors.textMuted : AppColors.textDark,
                              ).copyWith(decoration: task.done ? TextDecoration.lineThrough : null),
                            ),
                            Text('Due: ${task.due}', style: dmSans(context, size: 11, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: task.priority == 'high'
                              ? AppColors.errorBg
                              : task.priority == 'medium'
                                  ? AppColors.warningBg
                                  : AppColors.successBg,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          task.priority,
                          style: TextStyle(
                            fontSize: 10,
                            color: task.priority == 'high'
                                ? AppColors.error
                                : task.priority == 'medium'
                                    ? AppColors.warning
                                    : AppColors.success,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              )),
              const SizedBox(height: 80),
            ]),
          ),
        ),
      ],
    );
  }
}

class _StatBox extends StatelessWidget {
  const _StatBox({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Text(value, style: playfair(context, size: 16, color: Colors.white)),
            Text(label, style: dmSans(context, size: 9, color: Colors.white70), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

class _QuickAction extends StatelessWidget {
  const _QuickAction({
    required this.icon,
    required this.label,
    required this.color,
    required this.bg,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final Color color;
  final Color bg;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 4),
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(16)),
          child: Column(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.13),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: color, size: 20),
              ),
              const SizedBox(height: 8),
              Text(label, style: dmSans(context, size: 11, color: AppColors.textBrown)),
            ],
          ),
        ),
      ),
    );
  }
}
