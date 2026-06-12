# Nikah Planner — Flutter Wedding App

Elegant, Islamic-friendly wedding planning mobile app for Android, ported from the React UI prototype.

## Features

- Splash, Login, Register
- Home dashboard with countdown & tasks
- Budget tracker with pie chart
- Guest list with RSVP filters
- Decoration gallery
- Wedding schedule timeline
- Invitation cards (digital & physical)
- Vendor booking
- Bride & groom profile
- Notifications & settings
- Firebase Auth + Firestore ready (demo mode without config)

## Prerequisites

1. Install [Flutter SDK](https://docs.flutter.dev/get-started/install)
2. Install Android Studio or Android SDK for device/emulator

## Setup

```bash
cd nikah_planner

# Generate Android/iOS platform folders (first time only)
flutter create . --project-name nikah_planner

flutter pub get
flutter run
```

## Demo Mode

Without Firebase configuration, the app runs in **demo mode**:
- Sign in with any email and password
- All data comes from built-in mock samples

## Firebase Setup (optional)

```bash
dart pub global activate flutterfire_cli
flutterfire configure
```

Then replace `lib/firebase_options.dart` with the generated file.

### Firestore collections

```
users/{userId}
weddings/{weddingId}
weddings/{weddingId}/guests/{guestId}
weddings/{weddingId}/budgetCategories/{catId}
weddings/{weddingId}/events/{eventId}
weddings/{weddingId}/vendors/{vendorId}
```

## Design

- **Colors:** Gold (#B8956A), Sage (#8FB5B0), Beige, Cream
- **Fonts:** Playfair Display + DM Sans (via google_fonts)
- **Style:** Luxury, modest, Islamic-friendly

## Project Structure

```
lib/
├── main.dart
├── core/          # theme, widgets, mock data
├── features/      # all screens
├── router/        # go_router navigation
└── services/      # Firebase auth & Firestore
```

## Build APK

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`
