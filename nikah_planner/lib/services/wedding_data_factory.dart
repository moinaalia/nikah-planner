import '../core/data/wedding_traditions.dart';
import '../core/data/wedding_models.dart';
import 'package:flutter/material.dart';
import '../core/theme/app_colors.dart';
import '../models/wedding_profile.dart';

/// Donnees par defaut pour un nouveau compte selon pays et type de mariage.
class WeddingDataFactory {
  static WeddingProfile createNew({
    required String userId,
    required String email,
    required String ownerName,
    required String brideName,
    required String groomName,
    required DateTime weddingDate,
    required String role,
    required String countryCode,
    required String weddingTypeId,
    String? venue,
  }) {
    final id = 'wed_${DateTime.now().millisecondsSinceEpoch}';
    final dateLabel = WeddingTraditionsCatalog.formatDate(weddingDate);
    final v = venue ?? 'Venue to be confirmed';

    final country = WeddingTraditionsCatalog.countryByCode(countryCode);
    final type = WeddingTraditionsCatalog.typeFor(countryCode, weddingTypeId);
    final countryName = country?.name ?? 'International';
    final typeName = type?.name ?? 'Mariage standard';
    final guestLimit = type?.guestLimit ?? '100–200 pax';

    final events = WeddingTraditionsCatalog.buildEvents(
      countryCode: countryCode,
      weddingTypeId: weddingTypeId,
      dateLabel: dateLabel,
      venue: v,
    );
    final tasks = WeddingTraditionsCatalog.buildTasks(
      countryCode: countryCode,
      weddingTypeId: weddingTypeId,
      weddingDate: weddingDate,
    );
    final budget = WeddingTraditionsCatalog.buildBudget(countryCode, weddingTypeId);

    return WeddingProfile(
      id: id,
      ownerUserId: userId,
      ownerEmail: email,
      ownerName: ownerName,
      brideName: brideName,
      groomName: groomName,
      weddingDate: weddingDate,
      venue: v,
      theme: 'Elegant Gold & Sage Green',
      guestLimit: guestLimit,
      role: role,
      countryCode: countryCode,
      countryName: countryName,
      weddingTypeId: weddingTypeId,
      weddingTypeName: typeName,
      budgetCategories: budget,
      transactions: const [],
      guests: const [],
      events: events,
      tasks: tasks,
      vendors: _defaultVendors(countryCode),
      notifications: [
        AppNotification(
          id: 1,
          type: 'welcome',
          title: 'Welcome to Nikah Planner!',
          body: 'Your $countryName ($typeName) planning is ready. Follow every step of your wedding.',
          time: 'Maintenant',
          read: false,
        ),
      ],
      galleryItems: _defaultGallery(),
    );
  }

  static List<VendorItem> _defaultVendors(String countryCode) => [
        VendorItem(
          id: 1,
          name: countryCode == 'KM' ? 'Salle de reception' : 'Venue / Salle',
          category: 'Venue',
          rating: 4.5,
          reviews: 0,
          price: 'A definir',
          location: 'A confirmer',
          booked: false,
          tags: const ['Halal'],
          emoji: '🏛️',
        ),
        VendorItem(
          id: 2,
          name: 'Traiteur',
          category: 'Catering',
          rating: 4.5,
          reviews: 0,
          price: 'A definir',
          location: 'A confirmer',
          booked: false,
          tags: const ['Halal', 'Buffet'],
          emoji: '🍽️',
        ),
      ];

  static List<GalleryItem> _defaultGallery() => const [
        GalleryItem(
          id: 1,
          title: 'Inspiration decoration',
          category: 'Decoration',
          liked: false,
          imageUrl: 'https://images.unsplash.com/photo-1519741497674-4f5e0b9f7c8a?w=400&h=300&fit=crop&auto=format',
          color: AppColors.cream,
        ),
        GalleryItem(
          id: 2,
          title: 'Fleurs & arche',
          category: 'Florals',
          liked: false,
          imageUrl: 'https://images.unsplash.com/photo-1465495976275-dac563d3e291?w=400&h=300&fit=crop&auto=format',
          color: Color(0xFFE8F4F3),
        ),
      ];
}
