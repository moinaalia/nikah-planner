import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../../core/data/mock_data.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/wedding_widgets.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key, required this.onNavigate});

  final void Function(String route) onNavigate;

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Container(
            padding: const EdgeInsets.fromLTRB(20, 24, 20, 48),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [AppColors.beige, AppColors.sageLight],
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Our Profile', style: playfair(context, size: 22)),
                CircleAvatar(
                  backgroundColor: Colors.white54,
                  child: IconButton(
                    icon: const Icon(Icons.edit_outlined, color: AppColors.primary, size: 20),
                    onPressed: () {},
                  ),
                ),
              ],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              Transform.translate(
                offset: const Offset(0, -40),
                child: Column(
                  children: [
                    WeddingCard(
                      borderRadius: 24,
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              _PersonAvatar(
                                name: MockData.brideName,
                                label: 'Bride 👰',
                                imageUrl: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=128&h=128&fit=crop&auto=format',
                                badgeColor: AppColors.accent,
                                labelBg: const Color(0xFFFDF3E7),
                              ),
                              Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 16),
                                child: Column(
                                  children: [
                                    const Icon(Icons.favorite, color: AppColors.accent, size: 28),
                                    Container(
                                      width: 40,
                                      height: 1,
                                      margin: const EdgeInsets.symmetric(vertical: 4),
                                      decoration: const BoxDecoration(
                                        gradient: LinearGradient(
                                          colors: [Colors.transparent, AppColors.accent, Colors.transparent],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              _PersonAvatar(
                                name: MockData.groomName,
                                label: 'Groom 🤵',
                                imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&auto=format',
                                badgeColor: AppColors.secondary,
                                labelBg: const Color(0xFFE8F4F3),
                              ),
                            ],
                          ),
                          const Divider(height: 32, color: Color(0x26B8956A)),
                          _InfoRow(icon: Icons.calendar_today, iconColor: AppColors.accent, label: 'Wedding Date', value: MockData.weddingDateLabel),
                          const SizedBox(height: 12),
                          _InfoRow(icon: Icons.location_on_outlined, iconColor: AppColors.secondary, label: 'Venue', value: MockData.venue),
                          const SizedBox(height: 12),
                          _InfoRow(icon: Icons.favorite_outline, iconColor: Color(0xFFD4A0A0), label: 'Theme', value: MockData.theme),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    const _DetailCard(
                      title: "Bride's Details",
                      emoji: '👰',
                      color: AppColors.accent,
                      fields: {
                        'Full Name': 'Siti Nurhaliza binti Ibrahim',
                        'IC Number': '960314-03-1234',
                        'Phone': '+60 12-345 6789',
                        'Email': 'siti.nurhaliza@gmail.com',
                        'Address': 'No. 12, Jalan Cempaka 3, Shah Alam, Selangor',
                        'Father (Wali)': "Dato' Hj. Ibrahim bin Yusof",
                      },
                    ),
                    const SizedBox(height: 16),
                    const _DetailCard(
                      title: "Groom's Details",
                      emoji: '🤵',
                      color: AppColors.secondary,
                      fields: {
                        'Full Name': 'Ahmad Fauzi bin Hassan',
                        'IC Number': '940815-14-5678',
                        'Phone': '+60 19-876 5432',
                        'Email': 'ahmad.fauzi@gmail.com',
                        'Address': 'No. 8, Jalan Melati 5, Ampang, Selangor',
                        'Father': 'En. Hassan bin Mahmud',
                      },
                    ),
                    const SizedBox(height: 16),
                    WeddingCard(
                      padding: EdgeInsets.zero,
                      child: Column(
                        children: [
                          _LinkRow(emoji: '💌', label: 'Invitation Card Preview', onTap: () => onNavigate('/invitation')),
                          const Divider(height: 1, indent: 20, endIndent: 20),
                          _LinkRow(emoji: '💰', label: 'Wedding Budget', onTap: () => onNavigate('/budget')),
                          const Divider(height: 1, indent: 20, endIndent: 20),
                          _LinkRow(emoji: '👥', label: 'Guest List', onTap: () => onNavigate('/guests')),
                          const Divider(height: 1, indent: 20, endIndent: 20),
                          _LinkRow(emoji: '⚙️', label: 'Settings', onTap: () => onNavigate('/settings')),
                        ],
                      ),
                    ),
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

class _PersonAvatar extends StatelessWidget {
  const _PersonAvatar({
    required this.name,
    required this.label,
    required this.imageUrl,
    required this.badgeColor,
    required this.labelBg,
  });

  final String name;
  final String label;
  final String imageUrl;
  final Color badgeColor;
  final Color labelBg;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Stack(
          children: [
            CircleAvatar(
              radius: 32,
              backgroundImage: CachedNetworkImageProvider(imageUrl),
            ),
            Positioned(
              bottom: 0,
              right: 0,
              child: CircleAvatar(
                radius: 10,
                backgroundColor: badgeColor,
                child: const Icon(Icons.camera_alt, size: 10, color: Colors.white),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Text(name.split(' ').take(2).join(' '), style: playfair(context, size: 14), textAlign: TextAlign.center),
        const SizedBox(height: 4),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(color: labelBg, borderRadius: BorderRadius.circular(8)),
          child: Text(label, style: const TextStyle(fontSize: 10, color: AppColors.primary)),
        ),
      ],
    );
  }
}

class _InfoRow extends StatelessWidget {
  const _InfoRow({required this.icon, required this.iconColor, required this.label, required this.value});

  final IconData icon;
  final Color iconColor;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 18, color: iconColor),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: dmSans(context, size: 11, color: AppColors.textMuted)),
              Text(value, style: dmSans(context, size: 14)),
            ],
          ),
        ),
      ],
    );
  }
}

class _DetailCard extends StatelessWidget {
  const _DetailCard({required this.title, required this.emoji, required this.color, required this.fields});

  final String title;
  final String emoji;
  final Color color;
  final Map<String, String> fields;

  @override
  Widget build(BuildContext context) {
    return WeddingCard(
      borderRadius: 24,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(emoji, style: const TextStyle(fontSize: 20)),
              const SizedBox(width: 8),
              Text(title, style: playfair(context, size: 16)),
              Expanded(child: Container(height: 1, margin: const EdgeInsets.only(left: 12), color: color.withValues(alpha: 0.25))),
            ],
          ),
          const SizedBox(height: 16),
          ...fields.entries.map((e) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(width: 100, child: Text(e.key, style: dmSans(context, size: 12, color: AppColors.textMuted))),
                Expanded(child: Text(e.value, style: dmSans(context, size: 13), textAlign: TextAlign.right)),
              ],
            ),
          )),
        ],
      ),
    );
  }
}

class _LinkRow extends StatelessWidget {
  const _LinkRow({required this.emoji, required this.label, required this.onTap});

  final String emoji;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      leading: Text(emoji, style: const TextStyle(fontSize: 20)),
      title: Text(label, style: dmSans(context, size: 14)),
      trailing: const Icon(Icons.chevron_right, color: AppColors.primary),
    );
  }
}
