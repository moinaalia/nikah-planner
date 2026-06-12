import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';
import '../features/splash/splash_screen.dart';
import '../features/auth/login_screen.dart';
import '../features/auth/register_screen.dart';
import '../features/home/home_screen.dart';
import '../features/budget/budget_screen.dart';
import '../features/guests/guest_list_screen.dart';
import '../features/gallery/gallery_screen.dart';
import '../features/more/more_screen.dart';
import '../features/schedule/schedule_screen.dart';
import '../features/vendors/vendor_screen.dart';
import '../features/profile/profile_screen.dart';
import '../features/invitation/invitation_screen.dart';
import '../features/notifications/notifications_screen.dart';
import '../features/settings/settings_screen.dart';
import '../features/shell/main_shell.dart';

class AppRouter {
  AppRouter(this.authService);

  final AuthService authService;
  late final GoRouter router = _buildRouter();

  GoRouter _buildRouter() {
    final rootNavigatorKey = GlobalKey<NavigatorState>();

    return GoRouter(
      navigatorKey: rootNavigatorKey,
      initialLocation: '/splash',
      routes: [
        GoRoute(path: '/splash', builder: (_, __) => const SplashScreen()),
        GoRoute(path: '/login', builder: (_, __) => LoginScreen(authService: authService)),
        GoRoute(path: '/register', builder: (_, __) => RegisterScreen(authService: authService)),
        StatefulShellRoute.indexedStack(
          builder: (_, __, navigationShell) => MainShell(navigationShell: navigationShell),
          branches: [
            StatefulShellBranch(
              routes: [
                GoRoute(
                  path: '/home',
                  builder: (context, __) => HomeScreen(
                    onNavigate: (route) => _navigate(context, route),
                  ),
                ),
              ],
            ),
            StatefulShellBranch(
              routes: [GoRoute(path: '/budget', builder: (_, __) => const BudgetScreen())],
            ),
            StatefulShellBranch(
              routes: [GoRoute(path: '/guests', builder: (_, __) => const GuestListScreen())],
            ),
            StatefulShellBranch(
              routes: [GoRoute(path: '/gallery', builder: (_, __) => const GalleryScreen())],
            ),
            StatefulShellBranch(
              routes: [
                GoRoute(
                  path: '/more',
                  builder: (context, __) => MoreScreen(
                    onNavigate: (route) => _navigate(context, route),
                  ),
                ),
              ],
            ),
          ],
        ),
        GoRoute(
          parentNavigatorKey: rootNavigatorKey,
          path: '/schedule',
          builder: (_, __) => const _SubPageWrapper(title: 'Schedule', child: ScheduleScreen()),
        ),
        GoRoute(
          parentNavigatorKey: rootNavigatorKey,
          path: '/vendors',
          builder: (_, __) => const _SubPageWrapper(title: 'Vendors', child: VendorScreen()),
        ),
        GoRoute(
          parentNavigatorKey: rootNavigatorKey,
          path: '/profile',
          builder: (context, __) => _SubPageWrapper(
            title: 'Profile',
            child: ProfileScreen(onNavigate: (route) => _navigate(context, route)),
          ),
        ),
        GoRoute(
          parentNavigatorKey: rootNavigatorKey,
          path: '/invitation',
          builder: (_, __) => const _SubPageWrapper(title: 'Invitations', child: InvitationScreen()),
        ),
        GoRoute(
          parentNavigatorKey: rootNavigatorKey,
          path: '/notifications',
          builder: (_, __) => const _SubPageWrapper(title: 'Notifications', child: NotificationsScreen()),
        ),
        GoRoute(
          parentNavigatorKey: rootNavigatorKey,
          path: '/settings',
          builder: (_, __) => _SubPageWrapper(
            title: 'Settings',
            child: SettingsScreen(authService: authService),
          ),
        ),
      ],
    );
  }

  void _navigate(BuildContext context, String route) {
    if (['/home', '/budget', '/guests', '/gallery', '/more'].contains(route)) {
      context.go(route);
    } else {
      context.push(route);
    }
  }
}

class _SubPageWrapper extends StatelessWidget {
  const _SubPageWrapper({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18),
          onPressed: () => context.pop(),
        ),
        title: Text(title),
      ),
      body: child,
    );
  }
}
