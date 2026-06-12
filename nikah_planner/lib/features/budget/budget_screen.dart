import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class BudgetScreen extends StatelessWidget {
  const BudgetScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final categories = MockData.budgetCategories;
    final totalBudget = MockData.totalBudget;
    final totalSpent = MockData.totalSpent;
    final remaining = totalBudget - totalSpent;
    final pct = ((totalSpent / totalBudget) * 100).round();

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Budget Tracker',
            subtitle: 'Track every ringgit wisely',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFFDF3E7), AppColors.background],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              WeddingCard(
                borderRadius: 24,
                padding: const EdgeInsets.all(20),
                gradient: AppColors.goldGradient,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.account_balance_wallet_outlined, color: Colors.white70, size: 18),
                        const SizedBox(width: 8),
                        Text('Total Wedding Budget', style: dmSans(context, size: 13, color: Colors.white70)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text('RM ${_fmt(totalBudget)}', style: playfair(context, size: 32, color: Colors.white)),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(child: _BudgetStat(label: 'Spent', value: 'RM ${_fmt(totalSpent)}')),
                        const SizedBox(width: 12),
                        Expanded(child: _BudgetStat(label: 'Remaining', value: 'RM ${_fmt(remaining)}')),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: pct / 100,
                        backgroundColor: Colors.white30,
                        valueColor: const AlwaysStoppedAnimation(Colors.white),
                        minHeight: 8,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text('Used $pct%', style: dmSans(context, size: 11, color: Colors.white70)),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              WeddingCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Spending Breakdown', style: playfair(context, size: 18)),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        SizedBox(
                          width: 120,
                          height: 120,
                          child: PieChart(
                            PieChartData(
                              sectionsSpace: 2,
                              centerSpaceRadius: 32,
                              sections: categories.map((c) {
                                return PieChartSectionData(
                                  value: c.spent.toDouble(),
                                  color: c.color,
                                  radius: 22,
                                  showTitle: false,
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            children: categories.take(5).map((cat) {
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 6),
                                child: Row(
                                  children: [
                                    Container(width: 10, height: 10, decoration: BoxDecoration(color: cat.color, shape: BoxShape.circle)),
                                    const SizedBox(width: 8),
                                    Expanded(child: Text(cat.name, style: dmSans(context, size: 11))),
                                    Text('${((cat.spent / totalSpent) * 100).round()}%', style: dmSans(context, size: 10, color: AppColors.textMuted)),
                                  ],
                                ),
                              );
                            }).toList(),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Categories', style: playfair(context, size: 18)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(gradient: AppColors.goldGradient, borderRadius: BorderRadius.circular(20)),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.add, color: Colors.white, size: 14),
                        SizedBox(width: 4),
                        Text('Add', style: TextStyle(color: Colors.white, fontSize: 12)),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              ...categories.map((cat) {
                final catPct = ((cat.spent / cat.budget) * 100).round();
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: WeddingCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(cat.icon, style: const TextStyle(fontSize: 20)),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(cat.name, style: dmSans(context, size: 14, weight: FontWeight.w500)),
                                  Text(
                                    'RM ${_fmt(cat.spent)} / ${_fmt(cat.budget)}',
                                    style: dmSans(
                                      context,
                                      size: 12,
                                      color: cat.spent >= cat.budget ? AppColors.error : AppColors.textBrown,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: (catPct / 100).clamp(0, 1),
                            backgroundColor: AppColors.muted,
                            valueColor: AlwaysStoppedAnimation(cat.color),
                            minHeight: 6,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text('$catPct% used', style: dmSans(context, size: 10, color: AppColors.textMuted)),
                      ],
                    ),
                  ),
                );
              }),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Recent Transactions', style: playfair(context, size: 18)),
                  const Text('View all', style: TextStyle(color: AppColors.primary, fontSize: 13)),
                ],
              ),
              const SizedBox(height: 12),
              ...MockData.transactions.map((tx) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: WeddingCard(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: tx.amount > 0 ? AppColors.successBg : const Color(0xFFFDF3E7),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          tx.amount > 0 ? Icons.trending_up : Icons.trending_down,
                          color: tx.amount > 0 ? AppColors.secondary : AppColors.accent,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(tx.title, style: dmSans(context, size: 13)),
                            Text('${tx.date} · ${tx.category}', style: dmSans(context, size: 11, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      Text(
                        '${tx.amount > 0 ? '+' : ''}RM ${_fmt(tx.amount.abs())}',
                        style: dmSans(
                          context,
                          size: 14,
                          color: tx.amount > 0 ? AppColors.success : AppColors.accent,
                          weight: FontWeight.w600,
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

  String _fmt(int n) => n.toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},');
}

class _BudgetStat extends StatelessWidget {
  const _BudgetStat({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: dmSans(context, size: 11, color: Colors.white70)),
          Text(value, style: playfair(context, size: 18, color: Colors.white)),
        ],
      ),
    );
  }
}
