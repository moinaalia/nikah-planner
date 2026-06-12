import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class BudgetCategory {
  const BudgetCategory({
    required this.name,
    required this.budget,
    required this.spent,
    required this.color,
    required this.icon,
  });

  final String name;
  final int budget;
  final int spent;
  final Color color;
  final String icon;
}

class BudgetTransaction {
  const BudgetTransaction({
    required this.title,
    required this.amount,
    required this.date,
    required this.category,
  });

  final String title;
  final int amount;
  final String date;
  final String category;
}

class GuestItem {
  const GuestItem({
    required this.id,
    required this.name,
    required this.relation,
    required this.side,
    required this.rsvp,
    required this.table,
    required this.phone,
    required this.plusOne,
  });

  final int id;
  final String name;
  final String relation;
  final String side;
  final String rsvp;
  final int table;
  final String phone;
  final bool plusOne;
}

class WeddingEvent {
  const WeddingEvent({
    required this.id,
    required this.title,
    this.arabicTitle,
    required this.date,
    required this.time,
    required this.endTime,
    required this.location,
    required this.description,
    required this.color,
    required this.category,
    required this.tasks,
  });

  final int id;
  final String title;
  final String? arabicTitle;
  final String date;
  final String time;
  final String endTime;
  final String location;
  final String description;
  final Color color;
  final String category;
  final List<String> tasks;
}

class GalleryItem {
  const GalleryItem({
    required this.id,
    required this.title,
    required this.category,
    required this.liked,
    required this.imageUrl,
    required this.color,
  });

  final int id;
  final String title;
  final String category;
  final bool liked;
  final String imageUrl;
  final Color color;
}

class VendorItem {
  const VendorItem({
    required this.id,
    required this.name,
    required this.category,
    required this.rating,
    required this.reviews,
    required this.price,
    required this.location,
    required this.booked,
    required this.tags,
    required this.emoji,
  });

  final int id;
  final String name;
  final String category;
  final double rating;
  final int reviews;
  final String price;
  final String location;
  final bool booked;
  final List<String> tags;
  final String emoji;
}

class AppNotification {
  const AppNotification({
    required this.id,
    required this.type,
    required this.title,
    required this.body,
    required this.time,
    required this.read,
  });

  final int id;
  final String type;
  final String title;
  final String body;
  final String time;
  final bool read;
}

class WeddingTask {
  const WeddingTask({
    required this.title,
    required this.due,
    required this.done,
    required this.priority,
  });

  final String title;
  final String due;
  final bool done;
  final String priority;
}

class MockData {
  static const brideName = 'Siti Nurhaliza';
  static const groomName = 'Ahmad Fauzi';
  static const coupleShort = 'Siti & Ahmad';
  static final weddingDate = DateTime(2025, 3, 15);

  static const budgetCategories = [
    BudgetCategory(name: 'Venue & Dewan', budget: 15000, spent: 15000, color: AppColors.accent, icon: '🏛️'),
    BudgetCategory(name: 'Catering', budget: 12000, spent: 8500, color: AppColors.secondary, icon: '🍽️'),
    BudgetCategory(name: 'Attire & Hantaran', budget: 8000, spent: 5200, color: Color(0xFFD4A0A0), icon: '👗'),
    BudgetCategory(name: 'Photography', budget: 5000, spent: 4500, color: Color(0xFFA8C5A0), icon: '📸'),
    BudgetCategory(name: 'Decoration', budget: 4000, spent: 2800, color: Color(0xFFB8A4D8), icon: '🌸'),
    BudgetCategory(name: 'Makeup & Hair', budget: 2500, spent: 1000, color: Color(0xFFF0C070), icon: '💄'),
    BudgetCategory(name: 'Invitation Cards', budget: 1500, spent: 900, color: Color(0xFF90B8D8), icon: '💌'),
    BudgetCategory(name: 'Miscellaneous', budget: 2000, spent: 600, color: Color(0xFFC8B8A0), icon: '📦'),
  ];

  static const transactions = [
    BudgetTransaction(title: 'Full payment — Dewan Mulia', amount: -15000, date: '10 Jan 2025', category: 'Venue'),
    BudgetTransaction(title: 'Deposit caterer Nasi Arab Maju', amount: -3000, date: '8 Jan 2025', category: 'Catering'),
    BudgetTransaction(title: 'Baju pengantin deposit', amount: -2000, date: '5 Jan 2025', category: 'Attire'),
    BudgetTransaction(title: 'Photography 50% deposit', amount: -2250, date: '2 Jan 2025', category: 'Photography'),
    BudgetTransaction(title: 'Wedding gift from uncle', amount: 2000, date: '1 Jan 2025', category: 'Income'),
  ];

  static const guests = [
    GuestItem(id: 1, name: "Dato' Hj. Ibrahim & Family", relation: 'Father of Bride', side: 'bride', rsvp: 'confirmed', table: 1, phone: '+60 12-888 1234', plusOne: true),
    GuestItem(id: 2, name: 'Puan Salmah binti Yusof', relation: 'Mother of Groom', side: 'groom', rsvp: 'confirmed', table: 1, phone: '+60 11-777 5678', plusOne: false),
    GuestItem(id: 3, name: 'Nur Aisyah & Husband', relation: 'Sister of Bride', side: 'bride', rsvp: 'confirmed', table: 2, phone: '+60 19-444 9012', plusOne: true),
    GuestItem(id: 4, name: 'Mohd Fadzil bin Hassan', relation: 'Best Friend', side: 'groom', rsvp: 'pending', table: 3, phone: '+60 17-333 3456', plusOne: false),
    GuestItem(id: 5, name: 'Dr. Rozana & Dr. Azman', relation: 'Family Friend', side: 'bride', rsvp: 'confirmed', table: 4, phone: '+60 16-222 7890', plusOne: true),
    GuestItem(id: 6, name: 'Ustaz Hafiz bin Malik', relation: 'Imam', side: 'groom', rsvp: 'confirmed', table: 1, phone: '+60 13-111 2345', plusOne: false),
    GuestItem(id: 7, name: 'Cik Nora binti Ramli', relation: 'Colleague', side: 'bride', rsvp: 'pending', table: 5, phone: '+60 18-555 6789', plusOne: false),
    GuestItem(id: 8, name: 'En. Kamal & Keluarga', relation: 'Uncle of Groom', side: 'groom', rsvp: 'declined', table: 0, phone: '+60 14-666 0123', plusOne: true),
  ];

  static const events = [
    WeddingEvent(
      id: 1,
      title: 'Akad Nikah',
      arabicTitle: 'عقد النكاح',
      date: '15 March 2025',
      time: '9:00 AM',
      endTime: '11:00 AM',
      location: 'Masjid Al-Ikhlas, Petaling Jaya',
      description: 'The sacred Islamic marriage contract ceremony. Wali, witnesses, and Imam required.',
      color: AppColors.accent,
      category: 'akad',
      tasks: ['Confirm Imam Ustaz Hafiz', 'Prepare mahar (RM1,500 + Al-Quran)', "Wali confirmed: Dato' Ibrahim", 'Two witnesses arranged'],
    ),
    WeddingEvent(
      id: 2,
      title: 'Majlis Walimah — Sesi Pagi',
      date: '15 March 2025',
      time: '11:00 AM',
      endTime: '2:00 PM',
      location: 'Dewan Mulia, Shah Alam',
      description: 'Morning reception for family and close relatives.',
      color: AppColors.secondary,
      category: 'reception',
      tasks: ['Decor setup complete by 8AM', 'Caterer arrives 7AM', 'Photo & video team briefed', 'Sound system check'],
    ),
    WeddingEvent(
      id: 3,
      title: 'Bersanding & Pelamin',
      date: '16 March 2025',
      time: '10:00 AM',
      endTime: '1:00 PM',
      location: 'Dewan Mulia, Shah Alam',
      description: 'Bersanding ceremony at the pelamin. Traditional Malay wedding ceremony.',
      color: Color(0xFFD4A0A0),
      category: 'reception',
      tasks: ['Pelamin decoration by Dekor Seri', 'Kompang group confirmed (12 pax)', 'Sireh junjung prepared', 'Bunga telur ready (300 pcs)'],
    ),
    WeddingEvent(
      id: 4,
      title: 'Majlis Walimah — Sesi Malam',
      date: '16 March 2025',
      time: '6:00 PM',
      endTime: '10:00 PM',
      location: 'Dewan Mulia, Shah Alam',
      description: 'Evening reception for friends and extended family.',
      color: Color(0xFFB8A4D8),
      category: 'reception',
      tasks: ['DJ / Nasyid group booked', 'Buffet dinner for 300 pax', 'Photo booth setup'],
    ),
    WeddingEvent(
      id: 5,
      title: 'Hantaran Exchange',
      date: '14 March 2025',
      time: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Rumah Pengantin Perempuan',
      description: 'Exchange of hantaran gifts between families.',
      color: Color(0xFFA8C5A0),
      category: 'hantaran',
      tasks: ["Groom's hantaran: 9 trays", "Bride's hantaran: 7 trays", 'Photographer booked for hantaran session'],
    ),
    WeddingEvent(
      id: 6,
      title: 'Pre-Wedding Photoshoot',
      date: '1 March 2025',
      time: '7:00 AM',
      endTime: '12:00 PM',
      location: 'Putrajaya Gardens & Masjid Putra',
      description: 'Pre-wedding photography session at iconic Putrajaya locations.',
      color: Color(0xFF90B8D8),
      category: 'prep',
      tasks: ['Stylist: Puan Reza Makeup', 'Outfits: 3 changes ready', 'Props list confirmed with photographer'],
    ),
  ];

  static const galleryItems = [
    GalleryItem(id: 1, title: 'Grand Pelamin Setup', category: 'Pelamin', liked: true, imageUrl: 'https://images.unsplash.com/photo-1519741497674-4f5e0b9f7c8a?w=400&h=300&fit=crop&auto=format', color: AppColors.cream),
    GalleryItem(id: 2, title: 'Floral Arch', category: 'Florals', liked: false, imageUrl: 'https://images.unsplash.com/photo-1465495976275-dac563d3e291?w=400&h=300&fit=crop&auto=format', color: Color(0xFFE8F4F3)),
    GalleryItem(id: 3, title: 'Rose Gold Table', category: 'Table Setting', liked: true, imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d9f560?w=400&h=300&fit=crop&auto=format', color: Color(0xFFFDF3E7)),
    GalleryItem(id: 4, title: 'Dewan Mulia Interior', category: 'Venue', liked: false, imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop&auto=format', color: AppColors.muted),
    GalleryItem(id: 5, title: 'White Orchid Centerpiece', category: 'Florals', liked: true, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop&auto=format', color: Color(0xFFE8F4F3)),
    GalleryItem(id: 6, title: 'Baju Pengantin — Gold Songket', category: 'Attire', liked: true, imageUrl: 'https://images.unsplash.com/photo-1548449122-a79f75a37d1f?w=400&h=300&fit=crop&auto=format', color: Color(0xFFFDF3E7)),
    GalleryItem(id: 7, title: 'Fairy Lights Canopy', category: 'Lighting', liked: false, imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&auto=format', color: AppColors.cream),
    GalleryItem(id: 8, title: 'Pelamin Minimalist', category: 'Pelamin', liked: false, imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&auto=format', color: AppColors.muted),
    GalleryItem(id: 9, title: 'Garden Ceremony Setup', category: 'Decoration', liked: true, imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop&auto=format', color: Color(0xFFE8F4F3)),
  ];

  static const galleryCategories = ['All', 'Venue', 'Decoration', 'Florals', 'Attire', 'Pelamin', 'Table Setting', 'Lighting'];

  static const vendors = [
    VendorItem(id: 1, name: 'Dewan Mulia Shah Alam', category: 'Venue', rating: 4.9, reviews: 312, price: 'RM 15,000 – 25,000', location: 'Shah Alam, Selangor', booked: true, tags: ['Air-conditioned', '1000 pax', 'Halal'], emoji: '🏛️'),
    VendorItem(id: 2, name: 'Nasi Arab Maju Catering', category: 'Catering', rating: 4.7, reviews: 189, price: 'RM 45/pax', location: 'Subang Jaya', booked: true, tags: ['Halal certified', 'Malay & Arabic', '300–1000 pax'], emoji: '🍽️'),
    VendorItem(id: 3, name: 'Studio Imago Photography', category: 'Photography', rating: 4.8, reviews: 245, price: 'RM 4,500 – 8,000', location: 'Kuala Lumpur', booked: true, tags: ['Full day', '2 Photographers', 'Drone'], emoji: '📸'),
    VendorItem(id: 4, name: 'Puan Reza Artistry', category: 'Makeup', rating: 5.0, reviews: 98, price: 'RM 800 – 1,500', location: 'Ampang, KL', booked: false, tags: ['Bridal specialist', 'Tudung styling', 'Airbrush'], emoji: '💄'),
    VendorItem(id: 5, name: 'Bunga Raya Decoration', category: 'Decoration', rating: 4.6, reviews: 167, price: 'RM 3,500 – 7,000', location: 'Petaling Jaya', booked: false, tags: ['Pelamin', 'Floral arch', 'Table deco'], emoji: '🌸'),
    VendorItem(id: 6, name: 'Songket Warisan Boutique', category: 'Attire', rating: 4.7, reviews: 134, price: 'RM 1,200 – 4,000', location: 'Jalan Masjid India, KL', booked: false, tags: ['Custom made', 'Rental available', 'Songket & Lace'], emoji: '👗'),
    VendorItem(id: 7, name: 'Kompang Seni Budaya', category: 'Entertainment', rating: 4.5, reviews: 56, price: 'RM 400 – 800', location: 'Shah Alam', booked: false, tags: ['12 pax group', 'Traditional', 'Nasyid'], emoji: '🥁'),
  ];

  static const vendorCategories = ['All', 'Venue', 'Catering', 'Photography', 'Makeup', 'Decoration', 'Attire', 'Entertainment'];

  static const notifications = [
    AppNotification(id: 1, type: 'reminder', title: 'Fitting appointment tomorrow!', body: "Don't forget your 2nd baju pengantin fitting at Songket Warisan Boutique, 10:00 AM.", time: '1 hour ago', read: false),
    AppNotification(id: 2, type: 'rsvp', title: 'New RSVP received', body: 'En. Kamal & Keluarga have declined the invitation. Your guest count updated to 142.', time: '3 hours ago', read: false),
    AppNotification(id: 3, type: 'payment', title: 'Payment due in 7 days', body: 'Balance payment for Studio Imago Photography: RM 2,250 due on 20 Jan 2025.', time: 'Yesterday', read: false),
    AppNotification(id: 4, type: 'success', title: 'Venue booking confirmed! 🎉', body: 'Dewan Mulia Shah Alam has confirmed your booking for 15–16 March 2025.', time: '2 days ago', read: true),
    AppNotification(id: 5, type: 'message', title: 'Message from caterer', body: "Nasi Arab Maju: 'Menu tasting session available this Saturday. Please confirm your slot.'", time: '2 days ago', read: true),
    AppNotification(id: 6, type: 'alert', title: 'Budget alert', body: 'Photography category is at 90% of budget. Consider reviewing if additional services are needed.', time: '3 days ago', read: true),
    AppNotification(id: 7, type: 'rsvp', title: '5 new RSVPs received', body: 'Dr. Rozana, Puan Salmah, Nur Aisyah and 2 others have confirmed attendance.', time: '4 days ago', read: true),
    AppNotification(id: 8, type: 'reminder', title: 'Send invitations soon', body: 'Wedding is in 54 days. Recommended to send invitations at least 4 weeks before.', time: '5 days ago', read: true),
  ];

  static const tasks = [
    WeddingTask(title: 'Book Dewan Mulia Ballroom', due: '15 Jan 2025', done: true, priority: 'high'),
    WeddingTask(title: 'Confirm caterer — Nasi Arab Maju', due: '20 Jan 2025', done: true, priority: 'high'),
    WeddingTask(title: 'Fitting baju pengantin — 2nd visit', due: '28 Jan 2025', done: false, priority: 'medium'),
    WeddingTask(title: 'Send invitation cards', due: '1 Feb 2025', done: false, priority: 'high'),
    WeddingTask(title: 'Hantaran arrangement photoshoot', due: '5 Feb 2025', done: false, priority: 'low'),
  ];

  static const upcomingEvents = [
    {'title': 'Akad Nikah', 'date': '15 Mar', 'time': '9:00 AM', 'location': 'Masjid Al-Ikhlas'},
    {'title': 'Majlis Walimah', 'date': '15 Mar', 'time': '11:00 AM', 'location': 'Dewan Mulia, Shah Alam'},
    {'title': 'Bersanding Ceremony', 'date': '16 Mar', 'time': '2:00 PM', 'location': 'Dewan Mulia, Shah Alam'},
  ];

  static int get totalBudget => budgetCategories.fold(0, (sum, c) => sum + c.budget);
  static int get totalSpent => budgetCategories.fold(0, (sum, c) => sum + c.spent);
  static int get daysUntilWedding {
    final now = DateTime.now();
    return weddingDate.difference(DateTime(now.year, now.month, now.day)).inDays.clamp(0, 9999);
  }
}
