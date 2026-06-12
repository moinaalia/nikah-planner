import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class GuestListScreen extends StatefulWidget {
  const GuestListScreen({super.key});

  @override
  State<GuestListScreen> createState() => _GuestListScreenState();
}

class _GuestListScreenState extends State<GuestListScreen> {
  String _search = '';
  String _sideFilter = 'all';
  String _rsvpFilter = 'all';

  @override
  Widget build(BuildContext context) {
    final guests = MockData.guests;
    final filtered = guests.where((g) {
      final matchSearch = g.name.toLowerCase().contains(_search.toLowerCase()) ||
          g.relation.toLowerCase().contains(_search.toLowerCase());
      final matchSide = _sideFilter == 'all' || g.side == _sideFilter;
      final matchRsvp = _rsvpFilter == 'all' || g.rsvp == _rsvpFilter;
      return matchSearch && matchSide && matchRsvp;
    }).toList();

    final confirmed = guests.where((g) => g.rsvp == 'confirmed').length;
    final pending = guests.where((g) => g.rsvp == 'pending').length;
    final declined = guests.where((g) => g.rsvp == 'declined').length;
    final totalPax = guests.where((g) => g.rsvp == 'confirmed').fold<int>(
      0,
      (sum, g) => sum + (g.plusOne ? 2 : 1),
    );

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Guest List',
            subtitle: '${guests.length} guests total · $totalPax pax expected',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFE8F4F3), AppColors.background],
            ),
            trailing: const AddFabButton(),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              Row(
                children: [
                  _StatCard(count: confirmed, label: 'Confirmed', color: AppColors.success, bg: AppColors.successBg),
                  const SizedBox(width: 12),
                  _StatCard(count: pending, label: 'Pending', color: AppColors.warning, bg: AppColors.warningBg),
                  const SizedBox(width: 12),
                  _StatCard(count: declined, label: 'Declined', color: AppColors.error, bg: AppColors.errorBg),
                ],
              ),
              const SizedBox(height: 16),
              WeddingCard(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: TextField(
                  onChanged: (v) => setState(() => _search = v),
                  decoration: const InputDecoration(
                    hintText: 'Search guest name or relation...',
                    border: InputBorder.none,
                    prefixIcon: Icon(Icons.search, color: AppColors.textMuted),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  FilterChipButton(label: 'All Guests', selected: _sideFilter == 'all', onTap: () => setState(() => _sideFilter = 'all')),
                  FilterChipButton(label: "Bride's Side", selected: _sideFilter == 'bride', onTap: () => setState(() => _sideFilter = 'bride')),
                  FilterChipButton(label: "Groom's Side", selected: _sideFilter == 'groom', onTap: () => setState(() => _sideFilter = 'groom')),
                  FilterChipButton(label: 'All RSVP', selected: _rsvpFilter == 'all', onTap: () => setState(() => _rsvpFilter = 'all'), selectedColor: AppColors.secondary),
                  FilterChipButton(label: 'Confirmed', selected: _rsvpFilter == 'confirmed', onTap: () => setState(() => _rsvpFilter = 'confirmed'), selectedColor: AppColors.secondary),
                  FilterChipButton(label: 'Pending', selected: _rsvpFilter == 'pending', onTap: () => setState(() => _rsvpFilter = 'pending'), selectedColor: AppColors.secondary),
                  FilterChipButton(label: 'Declined', selected: _rsvpFilter == 'declined', onTap: () => setState(() => _rsvpFilter = 'declined'), selectedColor: AppColors.secondary),
                ],
              ),
              const SizedBox(height: 16),
              if (filtered.isEmpty)
                const Padding(
                  padding: EdgeInsets.all(40),
                  child: Center(child: Text('No guests found', style: TextStyle(color: AppColors.textMuted))),
                )
              else
                ...filtered.map((guest) => _GuestCard(guest: guest)),
              const SizedBox(height: 80),
            ]),
          ),
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.count, required this.label, required this.color, required this.bg});

  final int count;
  final String label;
  final Color color;
  final Color bg;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(16)),
        child: Column(
          children: [
            Text('$count', style: playfair(context, size: 22, color: color)),
            Text(label, style: dmSans(context, size: 11, color: color)),
          ],
        ),
      ),
    );
  }
}

class _GuestCard extends StatelessWidget {
  const _GuestCard({required this.guest});

  final GuestItem guest;

  @override
  Widget build(BuildContext context) {
    final initials = guest.name.split(' ').take(2).map((w) => w.isNotEmpty ? w[0] : '').join().toUpperCase();
    final status = _rsvpStyle(guest.rsvp);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: WeddingCard(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: LinearGradient(
                  colors: guest.side == 'bride'
                      ? [const Color(0x55D4A0A0), AppColors.accent.withValues(alpha: 0.33)]
                      : [AppColors.secondary.withValues(alpha: 0.33), const Color(0x55A8C5A0)],
                ),
              ),
              alignment: Alignment.center,
              child: Text(initials, style: dmSans(context, size: 12, weight: FontWeight.w600, color: guest.side == 'bride' ? AppColors.primary : const Color(0xFF5A9090))),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(guest.name, style: dmSans(context, size: 14, weight: FontWeight.w500)),
                            Text(guest.relation, style: dmSans(context, size: 11, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: status.bg, borderRadius: BorderRadius.circular(12)),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(status.icon, size: 12, color: status.color),
                            const SizedBox(width: 4),
                            Text(status.label, style: TextStyle(color: status.color, fontSize: 10)),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: guest.side == 'bride' ? const Color(0xFFFDF3E7) : const Color(0xFFE8F4F3),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          guest.side == 'bride' ? "Bride's" : "Groom's",
                          style: TextStyle(fontSize: 10, color: guest.side == 'bride' ? AppColors.primary : const Color(0xFF5A9090)),
                        ),
                      ),
                      if (guest.table > 0) Text('Table ${guest.table}', style: dmSans(context, size: 11, color: AppColors.textMuted)),
                      if (guest.plusOne)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(color: AppColors.muted, borderRadius: BorderRadius.circular(8)),
                          child: Text('+1', style: dmSans(context, size: 10, color: AppColors.textMuted)),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  ({String label, Color color, Color bg, IconData icon}) _rsvpStyle(String rsvp) {
    switch (rsvp) {
      case 'confirmed':
        return (label: 'Confirmed', color: AppColors.success, bg: AppColors.successBg, icon: Icons.check);
      case 'declined':
        return (label: 'Declined', color: AppColors.error, bg: AppColors.errorBg, icon: Icons.close);
      default:
        return (label: 'Pending', color: AppColors.warning, bg: AppColors.warningBg, icon: Icons.schedule);
    }
  }
}
