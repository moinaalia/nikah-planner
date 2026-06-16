import 'package:flutter/material.dart';
import '../core/data/wedding_models.dart';

/// Profil mariage complet d'un couple (donnees isolees par compte).
class WeddingProfile {
  WeddingProfile({
    required this.id,
    required this.ownerUserId,
    required this.ownerEmail,
    required this.ownerName,
    required this.brideName,
    required this.groomName,
    required this.weddingDate,
    required this.venue,
    required this.theme,
    required this.guestLimit,
    required this.budgetCategories,
    required this.transactions,
    required this.guests,
    required this.events,
    required this.tasks,
    required this.vendors,
    required this.notifications,
    required this.galleryItems,
    this.role = 'bride',
    this.countryCode = 'INT',
    this.countryName = 'International',
    this.weddingTypeId = 'standard',
    this.weddingTypeName = 'Mariage standard',
  });

  final String id;
  final String ownerUserId;
  final String ownerEmail;
  final String ownerName;
  final String brideName;
  final String groomName;
  final DateTime weddingDate;
  final String venue;
  final String theme;
  final String guestLimit;
  final String role;
  final String countryCode;
  final String countryName;
  final String weddingTypeId;
  final String weddingTypeName;
  final List<BudgetCategory> budgetCategories;
  final List<BudgetTransaction> transactions;
  final List<GuestItem> guests;
  final List<WeddingEvent> events;
  final List<WeddingTask> tasks;
  final List<VendorItem> vendors;
  final List<AppNotification> notifications;
  final List<GalleryItem> galleryItems;

  String get traditionLabel => '$countryName — $weddingTypeName';

  String get coupleShort => '$brideName & $groomName';

  String get weddingDateLabel {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return '${weddingDate.day} ${months[weddingDate.month - 1]} ${weddingDate.year}';
  }

  String get weddingDateShort {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return '${weddingDate.day} ${months[weddingDate.month - 1]} ${weddingDate.year}';
  }

  List<Map<String, String>> get upcomingEvents {
    return events.take(3).map((e) {
      final parts = e.date.split(' ');
      final shortDate = parts.length >= 2 ? '${parts[0]} ${parts[1]}' : e.date;
      return {'title': e.title, 'date': shortDate, 'time': e.time, 'location': e.location};
    }).toList();
  }

  int get totalBudget => budgetCategories.fold(0, (sum, c) => sum + c.budget);
  int get totalSpent => budgetCategories.fold(0, (sum, c) => sum + c.spent);

  int get daysUntilWedding {
    final now = DateTime.now();
    return weddingDate.difference(DateTime(now.year, now.month, now.day)).inDays.clamp(0, 9999);
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'ownerUserId': ownerUserId,
        'ownerEmail': ownerEmail,
        'ownerName': ownerName,
        'brideName': brideName,
        'groomName': groomName,
        'weddingDate': weddingDate.toIso8601String(),
        'venue': venue,
        'theme': theme,
        'guestLimit': guestLimit,
        'role': role,
        'countryCode': countryCode,
        'countryName': countryName,
        'weddingTypeId': weddingTypeId,
        'weddingTypeName': weddingTypeName,
        'budgetCategories': budgetCategories.map(_budgetToJson).toList(),
        'transactions': transactions.map(_txToJson).toList(),
        'guests': guests.map(_guestToJson).toList(),
        'events': events.map(_eventToJson).toList(),
        'tasks': tasks.map(_taskToJson).toList(),
        'vendors': vendors.map(_vendorToJson).toList(),
        'notifications': notifications.map(_notifToJson).toList(),
        'galleryItems': galleryItems.map(_galleryToJson).toList(),
      };

  factory WeddingProfile.fromJson(Map<String, dynamic> json) {
    return WeddingProfile(
      id: json['id'] as String,
      ownerUserId: json['ownerUserId'] as String,
      ownerEmail: json['ownerEmail'] as String,
      ownerName: json['ownerName'] as String,
      brideName: json['brideName'] as String,
      groomName: json['groomName'] as String,
      weddingDate: DateTime.parse(json['weddingDate'] as String),
      venue: json['venue'] as String? ?? 'Venue a confirmer',
      theme: json['theme'] as String? ?? 'Elegant Gold & Sage Green',
      guestLimit: json['guestLimit'] as String? ?? '200 pax',
      role: json['role'] as String? ?? 'bride',
      countryCode: json['countryCode'] as String? ?? 'INT',
      countryName: json['countryName'] as String? ?? 'International',
      weddingTypeId: json['weddingTypeId'] as String? ?? 'standard',
      weddingTypeName: json['weddingTypeName'] as String? ?? 'Mariage standard',
      budgetCategories: (json['budgetCategories'] as List<dynamic>? ?? [])
          .map((e) => _budgetFromJson(e as Map<String, dynamic>))
          .toList(),
      transactions: (json['transactions'] as List<dynamic>? ?? [])
          .map((e) => _txFromJson(e as Map<String, dynamic>))
          .toList(),
      guests: (json['guests'] as List<dynamic>? ?? [])
          .map((e) => _guestFromJson(e as Map<String, dynamic>))
          .toList(),
      events: (json['events'] as List<dynamic>? ?? [])
          .map((e) => _eventFromJson(e as Map<String, dynamic>))
          .toList(),
      tasks: (json['tasks'] as List<dynamic>? ?? [])
          .map((e) => _taskFromJson(e as Map<String, dynamic>))
          .toList(),
      vendors: (json['vendors'] as List<dynamic>? ?? [])
          .map((e) => _vendorFromJson(e as Map<String, dynamic>))
          .toList(),
      notifications: (json['notifications'] as List<dynamic>? ?? [])
          .map((e) => _notifFromJson(e as Map<String, dynamic>))
          .toList(),
      galleryItems: (json['galleryItems'] as List<dynamic>? ?? [])
          .map((e) => _galleryFromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  static Map<String, dynamic> _budgetToJson(BudgetCategory c) => {
        'name': c.name,
        'budget': c.budget,
        'spent': c.spent,
        'color': c.color.toARGB32(),
        'icon': c.icon,
      };

  static BudgetCategory _budgetFromJson(Map<String, dynamic> j) => BudgetCategory(
        name: j['name'] as String,
        budget: j['budget'] as int,
        spent: j['spent'] as int,
        color: Color(j['color'] as int),
        icon: j['icon'] as String,
      );

  static Map<String, dynamic> _txToJson(BudgetTransaction t) => {
        'title': t.title,
        'amount': t.amount,
        'date': t.date,
        'category': t.category,
      };

  static BudgetTransaction _txFromJson(Map<String, dynamic> j) => BudgetTransaction(
        title: j['title'] as String,
        amount: j['amount'] as int,
        date: j['date'] as String,
        category: j['category'] as String,
      );

  static Map<String, dynamic> _guestToJson(GuestItem g) => {
        'id': g.id,
        'name': g.name,
        'relation': g.relation,
        'side': g.side,
        'rsvp': g.rsvp,
        'table': g.table,
        'phone': g.phone,
        'plusOne': g.plusOne,
      };

  static GuestItem _guestFromJson(Map<String, dynamic> j) => GuestItem(
        id: j['id'] as int,
        name: j['name'] as String,
        relation: j['relation'] as String,
        side: j['side'] as String,
        rsvp: j['rsvp'] as String,
        table: j['table'] as int,
        phone: j['phone'] as String,
        plusOne: j['plusOne'] as bool,
      );

  static Map<String, dynamic> _eventToJson(WeddingEvent e) => {
        'id': e.id,
        'title': e.title,
        'arabicTitle': e.arabicTitle,
        'date': e.date,
        'time': e.time,
        'endTime': e.endTime,
        'location': e.location,
        'description': e.description,
        'color': e.color.toARGB32(),
        'category': e.category,
        'tasks': e.tasks,
      };

  static WeddingEvent _eventFromJson(Map<String, dynamic> j) => WeddingEvent(
        id: j['id'] as int,
        title: j['title'] as String,
        arabicTitle: j['arabicTitle'] as String?,
        date: j['date'] as String,
        time: j['time'] as String,
        endTime: j['endTime'] as String,
        location: j['location'] as String,
        description: j['description'] as String,
        color: Color(j['color'] as int),
        category: j['category'] as String,
        tasks: (j['tasks'] as List<dynamic>).cast<String>(),
      );

  static Map<String, dynamic> _taskToJson(WeddingTask t) => {
        'title': t.title,
        'due': t.due,
        'done': t.done,
        'priority': t.priority,
      };

  static WeddingTask _taskFromJson(Map<String, dynamic> j) => WeddingTask(
        title: j['title'] as String,
        due: j['due'] as String,
        done: j['done'] as bool,
        priority: j['priority'] as String,
      );

  static Map<String, dynamic> _vendorToJson(VendorItem v) => {
        'id': v.id,
        'name': v.name,
        'category': v.category,
        'rating': v.rating,
        'reviews': v.reviews,
        'price': v.price,
        'location': v.location,
        'booked': v.booked,
        'tags': v.tags,
        'emoji': v.emoji,
      };

  static VendorItem _vendorFromJson(Map<String, dynamic> j) => VendorItem(
        id: j['id'] as int,
        name: j['name'] as String,
        category: j['category'] as String,
        rating: (j['rating'] as num).toDouble(),
        reviews: j['reviews'] as int,
        price: j['price'] as String,
        location: j['location'] as String,
        booked: j['booked'] as bool,
        tags: (j['tags'] as List<dynamic>).cast<String>(),
        emoji: j['emoji'] as String,
      );

  static Map<String, dynamic> _notifToJson(AppNotification n) => {
        'id': n.id,
        'type': n.type,
        'title': n.title,
        'body': n.body,
        'time': n.time,
        'read': n.read,
      };

  static AppNotification _notifFromJson(Map<String, dynamic> j) => AppNotification(
        id: j['id'] as int,
        type: j['type'] as String,
        title: j['title'] as String,
        body: j['body'] as String,
        time: j['time'] as String,
        read: j['read'] as bool,
      );

  static Map<String, dynamic> _galleryToJson(GalleryItem g) => {
        'id': g.id,
        'title': g.title,
        'category': g.category,
        'liked': g.liked,
        'imageUrl': g.imageUrl,
        'color': g.color.toARGB32(),
      };

  static GalleryItem _galleryFromJson(Map<String, dynamic> j) => GalleryItem(
        id: j['id'] as int,
        title: j['title'] as String,
        category: j['category'] as String,
        liked: j['liked'] as bool,
        imageUrl: j['imageUrl'] as String,
        color: Color(j['color'] as int),
      );
}
