import 'package:flutter/material.dart';

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
