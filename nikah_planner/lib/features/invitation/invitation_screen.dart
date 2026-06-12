import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class InvitationScreen extends StatefulWidget {
  const InvitationScreen({super.key});

  @override
  State<InvitationScreen> createState() => _InvitationScreenState();
}

class _InvitationScreenState extends State<InvitationScreen> {
  bool _digital = true;

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: PageHeader(
            title: 'Invitation Cards',
            subtitle: 'Digital & physical invitation management',
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFFDF3E7), AppColors.background],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.all(20),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(color: AppColors.inputBg, borderRadius: BorderRadius.circular(16)),
                child: Row(
                  children: [
                    _TabButton(label: 'Digital Card', selected: _digital, onTap: () => setState(() => _digital = true)),
                    _TabButton(label: 'Physical Card', selected: !_digital, onTap: () => setState(() => _digital = false)),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              if (_digital) ...[
                WeddingCard(
                  padding: EdgeInsets.zero,
                  borderRadius: 24,
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(24),
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [AppColors.beige, AppColors.cream, AppColors.sageLight],
                            stops: [0.0, 0.5, 1.0],
                          ),
                          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                        ),
                        child: Column(
                          children: [
                            Text(
                              'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم',
                              style: dmSans(context, size: 14, color: AppColors.primary),
                              textDirection: TextDirection.rtl,
                            ),
                            const SizedBox(height: 12),
                            const Icon(Icons.auto_awesome, color: AppColors.accent, size: 24),
                            const SizedBox(height: 12),
                            Text(
                              'WITH THE BLESSINGS OF ALLAH',
                              style: dmSans(context, size: 10, color: AppColors.textMuted).copyWith(letterSpacing: 1.5),
                            ),
                            const SizedBox(height: 8),
                            Text('Siti & Ahmad', style: playfair(context, size: 24)),
                            const SizedBox(height: 8),
                            Text('cordially invite you to celebrate our', style: dmSans(context, size: 12, color: AppColors.textMuted)),
                            Text(
                              'Walimatul Urus',
                              style: playfair(context, size: 16, color: AppColors.primary).copyWith(fontStyle: FontStyle.italic),
                            ),
                            const SizedBox(height: 16),
                            Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.6),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Column(
                                children: [
                                  Text('15 March 2025', style: playfair(context, size: 18)),
                                  Text('Saturday · 11:00 AM', style: dmSans(context, size: 12, color: AppColors.textMuted)),
                                  const SizedBox(height: 4),
                                  Text('Dewan Mulia, Shah Alam', style: dmSans(context, size: 12, color: const Color(0xFF5A4A3A))),
                                ],
                              ),
                            ),
                            const SizedBox(height: 12),
                            Text('RSVP: +60 12-345 6789 · By 1 March 2025', style: dmSans(context, size: 10, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          children: [
                            _ActionBtn(icon: Icons.visibility_outlined, label: 'Preview', bg: AppColors.inputBg),
                            const SizedBox(width: 12),
                            _ActionBtn(icon: Icons.share_outlined, label: 'Share', bg: const Color(0xFFE8F4F3)),
                            const SizedBox(width: 12),
                            _ActionBtn(icon: Icons.download_outlined, label: 'Save', bg: const Color(0xFFEEF5EE)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                WeddingCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Share Invitation', style: playfair(context, size: 16)),
                      const SizedBox(height: 12),
                      GridView.count(
                        crossAxisCount: 2,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        mainAxisSpacing: 12,
                        crossAxisSpacing: 12,
                        childAspectRatio: 2.5,
                        children: const [
                          _ShareBtn(icon: Icons.chat, label: 'WhatsApp', bg: Color(0xFFE8F8EE), iconColor: Color(0xFF25D366)),
                          _ShareBtn(icon: Icons.mail_outline, label: 'Email', bg: Color(0xFFFDF3E7), iconColor: AppColors.primary),
                          _ShareBtn(icon: Icons.copy, label: 'Copy Link', bg: Color(0xFFE8F4F3), iconColor: AppColors.secondary),
                          _ShareBtn(icon: Icons.share_outlined, label: 'More', bg: Color(0xFFF0EEF8), iconColor: Color(0xFFB8A4D8)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    _StatBox(value: '284', label: 'Sent', color: AppColors.secondary, bg: const Color(0xFFE8F4F3)),
                    const SizedBox(width: 12),
                    _StatBox(value: '142', label: 'Opened', color: AppColors.accent, bg: const Color(0xFFFDF3E7)),
                    const SizedBox(width: 12),
                    _StatBox(value: '97', label: "RSVP'd", color: const Color(0xFFA8C5A0), bg: const Color(0xFFEEF5EE)),
                  ],
                ),
              ] else
                WeddingCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Physical Card Order', style: playfair(context, size: 16)),
                      const SizedBox(height: 12),
                      ...[
                        ('Card Design', 'Floral Gold Embossed', false),
                        ('Quantity Ordered', '350 cards', false),
                        ('Supplier', 'Cetak Mulia Sdn Bhd', false),
                        ('Status', 'Ready for collection', true),
                        ('Cost', 'RM 875 (RM 2.50/card)', false),
                        ('Collected', '250 distributed, 100 remaining', false),
                      ].map((row) => Padding(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(row.$1, style: dmSans(context, size: 13, color: AppColors.textMuted)),
                            Text(
                              row.$2,
                              style: dmSans(
                                context,
                                size: 13,
                                color: row.$3 ? AppColors.success : AppColors.textDark,
                                weight: row.$3 ? FontWeight.w600 : FontWeight.normal,
                              ),
                            ),
                          ],
                        ),
                      )),
                    ],
                  ),
                ),
              const SizedBox(height: 24),
            ]),
          ),
        ),
      ],
    );
  }
}

class _TabButton extends StatelessWidget {
  const _TabButton({required this.label, required this.selected, required this.onTap});

  final String label;
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
            borderRadius: BorderRadius.circular(12),
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(color: selected ? Colors.white : AppColors.textBrown, fontWeight: FontWeight.w500),
          ),
        ),
      ),
    );
  }
}

class _ActionBtn extends StatelessWidget {
  const _ActionBtn({required this.icon, required this.label, required this.bg});

  final IconData icon;
  final String label;
  final Color bg;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(16)),
        child: Column(
          children: [
            Icon(icon, color: AppColors.primary, size: 20),
            const SizedBox(height: 4),
            Text(label, style: dmSans(context, size: 11, color: AppColors.textBrown)),
          ],
        ),
      ),
    );
  }
}

class _ShareBtn extends StatelessWidget {
  const _ShareBtn({required this.icon, required this.label, required this.bg, required this.iconColor});

  final IconData icon;
  final String label;
  final Color bg;
  final Color iconColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(16)),
      child: Row(
        children: [
          Icon(icon, color: iconColor, size: 20),
          const SizedBox(width: 8),
          Text(label, style: dmSans(context, size: 13)),
        ],
      ),
    );
  }
}

class _StatBox extends StatelessWidget {
  const _StatBox({required this.value, required this.label, required this.color, required this.bg});

  final String value;
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
            Text(value, style: playfair(context, size: 22, color: color)),
            Text(label, style: dmSans(context, size: 11, color: AppColors.textMuted)),
          ],
        ),
      ),
    );
  }
}
