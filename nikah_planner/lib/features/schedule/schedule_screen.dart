import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  State<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  int? _expandedId = 1;

  @override
  Widget build(BuildContext context) {
    final events = MockData.events;

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Wedding Schedule',
            subtitle: 'March 14–16, 2025',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [AppColors.cream, AppColors.background],
            ),
            trailing: const AddFabButton(),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
          sliver: SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, i) {
                final event = events[i];
                final expanded = _expandedId == event.id;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Column(
                        children: [
                          const SizedBox(height: 16),
                          Container(
                            width: 16,
                            height: 16,
                            decoration: BoxDecoration(color: event.color, shape: BoxShape.circle),
                          ),
                          if (i < events.length - 1)
                            Container(
                              width: 2,
                              height: expanded ? 180 : 80,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [event.color.withValues(alpha: 0.4), Colors.transparent],
                                ),
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          children: [
                            WeddingCard(
                              padding: EdgeInsets.zero,
                              child: Column(
                                children: [
                                  Container(height: 4, decoration: BoxDecoration(color: event.color, borderRadius: const BorderRadius.vertical(top: Radius.circular(16)))),
                                  InkWell(
                                    onTap: () => setState(() => _expandedId = expanded ? null : event.id),
                                    borderRadius: BorderRadius.circular(16),
                                    child: Padding(
                                      padding: const EdgeInsets.all(16),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                  children: [
                                                    Text(event.title, style: playfair(context, size: 16, color: AppColors.textDark)),
                                                    if (event.arabicTitle != null)
                                                      Text(
                                                        event.arabicTitle!,
                                                        style: dmSans(context, size: 13, color: AppColors.primary),
                                                        textDirection: TextDirection.rtl,
                                                      ),
                                                  ],
                                                ),
                                              ),
                                              Icon(expanded ? Icons.expand_less : Icons.expand_more, color: AppColors.textMuted, size: 20),
                                            ],
                                          ),
                                          const SizedBox(height: 8),
                                          _InfoRow(icon: Icons.calendar_today, text: event.date),
                                          _InfoRow(icon: Icons.access_time, text: '${event.time} – ${event.endTime}'),
                                          _InfoRow(icon: Icons.location_on_outlined, text: event.location, iconColor: event.color),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            if (expanded)
                              Container(
                                margin: const EdgeInsets.only(top: 8, left: 8, right: 8),
                                padding: const EdgeInsets.all(16),
                                decoration: BoxDecoration(
                                  color: AppColors.inputBg,
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(event.description, style: dmSans(context, size: 13, color: const Color(0xFF5A4A3A))),
                                    const SizedBox(height: 12),
                                    Text('Checklist:', style: dmSans(context, size: 13, color: AppColors.textBrown, weight: FontWeight.w600)),
                                    const SizedBox(height: 8),
                                    ...event.tasks.map((task) => Padding(
                                      padding: const EdgeInsets.only(bottom: 6),
                                      child: Row(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Container(
                                            width: 16,
                                            height: 16,
                                            margin: const EdgeInsets.only(top: 2),
                                            decoration: BoxDecoration(color: event.color, shape: BoxShape.circle),
                                            child: const Icon(Icons.check, size: 10, color: Colors.white),
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(child: Text(task, style: dmSans(context, size: 12, color: const Color(0xFF5A4A3A)))),
                                        ],
                                      ),
                                    )),
                                  ],
                                ),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
              childCount: events.length,
            ),
          ),
        ),
      ],
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.icon, required this.text, this.iconColor});

  final IconData icon;
  final String text;
  final Color? iconColor;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        children: [
          Icon(icon, size: 13, color: iconColor ?? AppColors.textMuted),
          const SizedBox(width: 6),
          Expanded(child: Text(text, style: dmSans(context, size: 11, color: iconColor != null ? const Color(0xFF5A4A3A) : AppColors.textMuted))),
        ],
      ),
    );
  }
}
