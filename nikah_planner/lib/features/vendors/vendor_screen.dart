import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class VendorScreen extends StatefulWidget {
  const VendorScreen({super.key});

  @override
  State<VendorScreen> createState() => _VendorScreenState();
}

class _VendorScreenState extends State<VendorScreen> {
  String _category = 'All';
  String _search = '';

  @override
  Widget build(BuildContext context) {
    final vendors = MockData.vendors.where((v) {
      final matchCat = _category == 'All' || v.category == _category;
      final matchSearch = v.name.toLowerCase().contains(_search.toLowerCase());
      return matchCat && matchSearch;
    }).toList();
    final bookedCount = MockData.vendors.where((v) => v.booked).length;

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Vendor Booking',
            subtitle: '$bookedCount/${MockData.vendors.length} vendors confirmed',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFF5F0FF), AppColors.background],
            ),
            trailing: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(gradient: AppColors.goldGradient, borderRadius: BorderRadius.circular(20)),
              child: Text('$bookedCount Booked', style: const TextStyle(color: Colors.white, fontSize: 12)),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              WeddingCard(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: TextField(
                  onChanged: (v) => setState(() => _search = v),
                  decoration: const InputDecoration(
                    hintText: 'Search vendors...',
                    border: InputBorder.none,
                    prefixIcon: Icon(Icons.search, color: AppColors.textMuted),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 36,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: MockData.vendorCategories.map((cat) {
                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: FilterChipButton(
                        label: cat,
                        selected: _category == cat,
                        onTap: () => setState(() => _category = cat),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 16),
              ...vendors.map((vendor) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: WeddingCard(
                  padding: EdgeInsets.zero,
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              width: 56,
                              height: 56,
                              decoration: BoxDecoration(
                                color: AppColors.inputBg,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              alignment: Alignment.center,
                              child: Text(vendor.emoji, style: const TextStyle(fontSize: 28)),
                            ),
                            const SizedBox(width: 16),
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
                                            Text(vendor.name, style: dmSans(context, size: 14, weight: FontWeight.w500)),
                                            Row(
                                              children: [
                                                const Icon(Icons.star, size: 14, color: AppColors.accent),
                                                Text(' ${vendor.rating}', style: dmSans(context, size: 12, color: AppColors.textBrown)),
                                                Text(' (${vendor.reviews})', style: dmSans(context, size: 11, color: AppColors.textMuted)),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: vendor.booked ? AppColors.successBg : const Color(0xFFFDF3E7),
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            if (vendor.booked) const Icon(Icons.check, size: 12, color: AppColors.success),
                                            Text(
                                              vendor.booked ? 'Booked' : 'Available',
                                              style: TextStyle(
                                                fontSize: 10,
                                                color: vendor.booked ? AppColors.success : AppColors.primary,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  Row(
                                    children: [
                                      const Icon(Icons.location_on_outlined, size: 12, color: AppColors.textMuted),
                                      const SizedBox(width: 4),
                                      Text(vendor.location, style: dmSans(context, size: 11, color: AppColors.textMuted)),
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  Text(vendor.price, style: dmSans(context, size: 13, color: AppColors.primary, weight: FontWeight.w500)),
                                  const SizedBox(height: 8),
                                  Wrap(
                                    spacing: 6,
                                    runSpacing: 6,
                                    children: vendor.tags.map((tag) => Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                      decoration: BoxDecoration(color: AppColors.muted, borderRadius: BorderRadius.circular(8)),
                                      child: Text(tag, style: dmSans(context, size: 10, color: AppColors.textBrown)),
                                    )).toList(),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (!vendor.booked)
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            border: Border(top: BorderSide(color: AppColors.primary.withValues(alpha: 0.12))),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: OutlinedButton.icon(
                                  onPressed: () {},
                                  icon: const Icon(Icons.phone, size: 16, color: AppColors.primary),
                                  label: const Text('Contact', style: TextStyle(color: AppColors.primary)),
                                  style: OutlinedButton.styleFrom(
                                    backgroundColor: AppColors.inputBg,
                                    side: BorderSide.none,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: () {},
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.accent,
                                    foregroundColor: Colors.white,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                  child: const Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text('Book Now'),
                                      SizedBox(width: 4),
                                      Icon(Icons.chevron_right, size: 16),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              )),
              const SizedBox(height: 24),
            ]),
          ),
        ),
      ],
    );
  }
}
