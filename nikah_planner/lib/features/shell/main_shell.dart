import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';

class MainShell extends StatelessWidget {
  const MainShell({super.key, required this.navigationShell});

  final StatefulNavigationShell navigationShell;

  static const _tabs = [
    _TabItem(path: '/home', icon: Icons.home_outlined, activeIcon: Icons.home, label: 'Home'),
    _TabItem(path: '/budget', icon: Icons.account_balance_wallet_outlined, activeIcon: Icons.account_balance_wallet, label: 'Budget'),
    _TabItem(path: '/guests', icon: Icons.people_outline, activeIcon: Icons.people, label: 'Guests'),
    _TabItem(path: '/gallery', icon: Icons.image_outlined, activeIcon: Icons.image, label: 'Gallery'),
    _TabItem(path: '/more', icon: Icons.more_horiz, activeIcon: Icons.more_horiz, label: 'More'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.95),
          border: Border(top: BorderSide(color: AppColors.primary.withValues(alpha: 0.15))),
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withValues(alpha: 0.1),
              blurRadius: 20,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            child: Row(
              children: List.generate(_tabs.length, (i) {
                final tab = _tabs[i];
                final selected = navigationShell.currentIndex == i;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => navigationShell.goBranch(i),
                    behavior: HitTestBehavior.opaque,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        gradient: selected
                            ? LinearGradient(
                                colors: [
                                  AppColors.accent.withValues(alpha: 0.08),
                                  AppColors.secondary.withValues(alpha: 0.08),
                                ],
                              )
                            : null,
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          if (selected)
                            Container(
                              width: 4,
                              height: 4,
                              margin: const EdgeInsets.only(bottom: 2),
                              decoration: const BoxDecoration(color: AppColors.accent, shape: BoxShape.circle),
                            ),
                          Icon(
                            selected ? tab.activeIcon : tab.icon,
                            color: selected ? AppColors.primary : const Color(0xFFA09080),
                            size: 22,
                          ),
                          const SizedBox(height: 2),
                          Text(
                            tab.label,
                            style: TextStyle(
                              fontSize: 10,
                              color: selected ? AppColors.primary : const Color(0xFFA09080),
                              fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        ),
      ),
    );
  }
}

class _TabItem {
  const _TabItem({required this.path, required this.icon, required this.activeIcon, required this.label});

  final String path;
  final IconData icon;
  final IconData activeIcon;
  final String label;
}
