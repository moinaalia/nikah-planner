import 'package:flutter/material.dart';
import 'wedding_models.dart';
import '../theme/app_colors.dart';

class WeddingTypeOption {
  const WeddingTypeOption({
    required this.id,
    required this.name,
    required this.description,
    required this.guestLimit,
  });

  final String id;
  final String name;
  final String description;
  final String guestLimit;
}

class CountryTradition {
  const CountryTradition({
    required this.code,
    required this.name,
    required this.flag,
    required this.types,
  });

  final String code;
  final String name;
  final String flag;
  final List<WeddingTypeOption> types;
}

/// Catalogue des pays et types de mariage avec etapes culturelles.
class WeddingTraditionsCatalog {
  static const countries = [
    CountryTradition(
      code: 'KM',
      name: 'Comores',
      flag: '🇰🇲',
      types: [
        WeddingTypeOption(
          id: 'mdhoihiricho',
          name: 'Mdhoihiricho',
          description: 'Petit mariage — ceremonie intime en famille proche.',
          guestLimit: '50–80 pax',
        ),
        WeddingTypeOption(
          id: 'grande_mariage',
          name: 'Grande mariage',
          description: 'Grand mariage comorien — plusieurs jours, grande reception.',
          guestLimit: '200–500 pax',
        ),
      ],
    ),
    CountryTradition(
      code: 'FR',
      name: 'France',
      flag: '🇫🇷',
      types: [
        WeddingTypeOption(
          id: 'civil_religieux',
          name: 'Civil + religieux',
          description: 'Mariage civil a la mairie puis ceremonie religieuse.',
          guestLimit: '100–150 pax',
        ),
        WeddingTypeOption(
          id: 'laique',
          name: 'Ceremonie laique',
          description: 'Celebration personnalisee sans ceremonie religieuse.',
          guestLimit: '80–120 pax',
        ),
      ],
    ),
    CountryTradition(
      code: 'MY',
      name: 'Malaisie',
      flag: '🇲🇾',
      types: [
        WeddingTypeOption(
          id: 'akad_walimah',
          name: 'Akad + Walimah',
          description: 'Contrat islamique, bersanding et reception malaise.',
          guestLimit: '300–500 pax',
        ),
        WeddingTypeOption(
          id: 'hantaran',
          name: 'Avec hantaran',
          description: 'Echange de cadeaux, akad nikah et walimah complete.',
          guestLimit: '200–400 pax',
        ),
      ],
    ),
    CountryTradition(
      code: 'SN',
      name: 'Senegal',
      flag: '🇸🇳',
      types: [
        WeddingTypeOption(
          id: 'traditionnel',
          name: 'Mariage traditionnel',
          description: 'Dot, ceremonie religieuse et grande reception.',
          guestLimit: '300–800 pax',
        ),
      ],
    ),
    CountryTradition(
      code: 'MA',
      name: 'Maroc',
      flag: '🇲🇦',
      types: [
        WeddingTypeOption(
          id: 'amariya',
          name: 'Mariage Amariya',
          description: 'Henné, negafa, cérémonie sur palanquin et fête.',
          guestLimit: '200–400 pax',
        ),
      ],
    ),
    CountryTradition(
      code: 'TR',
      name: 'Turquie',
      flag: '🇹🇷',
      types: [
        WeddingTypeOption(
          id: 'nikah_dugun',
          name: 'Nikah + Düğün',
          description: 'Contrat religieux puis grande fête de mariage.',
          guestLimit: '150–300 pax',
        ),
      ],
    ),
    CountryTradition(
      code: 'INT',
      name: 'International',
      flag: '🌍',
      types: [
        WeddingTypeOption(
          id: 'standard',
          name: 'Mariage standard',
          description: 'Ceremonie, reception et fête — format universel.',
          guestLimit: '100–200 pax',
        ),
      ],
    ),
  ];

  static CountryTradition? countryByCode(String code) {
    for (final c in countries) {
      if (c.code == code) return c;
    }
    return null;
  }

  static WeddingTypeOption? typeFor(String countryCode, String typeId) {
    final country = countryByCode(countryCode);
    if (country == null) return null;
    for (final t in country.types) {
      if (t.id == typeId) return t;
    }
    return country.types.first;
  }

  static String formatDate(DateTime d) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return '${d.day} ${months[d.month - 1]} ${d.year}';
  }

  static List<WeddingEvent> buildEvents({
    required String countryCode,
    required String weddingTypeId,
    required String dateLabel,
    required String venue,
  }) {
    switch (countryCode) {
      case 'KM':
        return weddingTypeId == 'mdhoihiricho'
            ? _comorosMdhoihiricho(dateLabel, venue)
            : _comorosGrandeMariage(dateLabel, venue);
      case 'FR':
        return _franceEvents(dateLabel, venue, weddingTypeId);
      case 'MY':
        return _malaysiaEvents(dateLabel, venue, weddingTypeId);
      case 'SN':
        return _senegalEvents(dateLabel, venue);
      case 'MA':
        return _moroccoEvents(dateLabel, venue);
      case 'TR':
        return _turkeyEvents(dateLabel, venue);
      default:
        return _standardEvents(dateLabel, venue);
    }
  }

  static List<WeddingTask> buildTasks({
    required String countryCode,
    required String weddingTypeId,
    required DateTime weddingDate,
  }) {
    final d = weddingDate;
    String due(int daysBefore) {
      final t = d.subtract(Duration(days: daysBefore));
      return '${t.day}/${t.month}/${t.year}';
    }

    switch (countryCode) {
      case 'KM':
        if (weddingTypeId == 'mdhoihiricho') {
          return [
            WeddingTask(title: 'Annoncer les fiancailles (kuzungulia)', due: due(45), done: false, priority: 'high'),
            WeddingTask(title: 'Preparer la dot (kari) — version simple', due: due(30), done: false, priority: 'high'),
            WeddingTask(title: 'Confirmer imam et temoins', due: due(14), done: false, priority: 'high'),
            WeddingTask(title: 'Liste invites famille proche', due: due(10), done: false, priority: 'medium'),
          ];
        }
        return [
          WeddingTask(title: 'Organiser les fiancailles officielles', due: due(90), done: false, priority: 'high'),
          WeddingTask(title: 'Preparer dot (kari) et hantaran', due: due(60), done: false, priority: 'high'),
          WeddingTask(title: 'Reserver salle de reception', due: due(45), done: false, priority: 'high'),
          WeddingTask(title: 'Confirmer traiteur et kompang', due: due(30), done: false, priority: 'high'),
          WeddingTask(title: 'Envoyer invitations', due: due(21), done: false, priority: 'medium'),
        ];
      case 'MY':
        return [
          WeddingTask(title: 'Reserver dewan / venue', due: due(60), done: false, priority: 'high'),
          WeddingTask(title: 'Confirmer caterer halal', due: due(45), done: false, priority: 'high'),
          WeddingTask(title: 'Preparer hantaran', due: due(30), done: false, priority: 'medium'),
          WeddingTask(title: 'Fitting baju pengantin', due: due(21), done: false, priority: 'medium'),
        ];
      default:
        return [
          WeddingTask(title: 'Reserver le lieu', due: due(60), done: false, priority: 'high'),
          WeddingTask(title: 'Confirmer le traiteur', due: due(45), done: false, priority: 'high'),
          WeddingTask(title: 'Envoyer les invitations', due: due(21), done: false, priority: 'high'),
        ];
    }
  }

  static List<BudgetCategory> buildBudget(String countryCode, String weddingTypeId) {
    final isLarge = weddingTypeId == 'grande_mariage' || weddingTypeId == 'akad_walimah' || weddingTypeId == 'traditionnel';
    final venueBudget = isLarge ? 15000 : 5000;
    final cateringBudget = isLarge ? 12000 : 4000;

    if (countryCode == 'KM') {
      return [
        BudgetCategory(name: 'Salle / Reception', budget: venueBudget, spent: 0, color: AppColors.accent, icon: '🏛️'),
        BudgetCategory(name: 'Traiteur & gateaux', budget: cateringBudget, spent: 0, color: AppColors.secondary, icon: '🍽️'),
        BudgetCategory(name: 'Dot (Kari)', budget: isLarge ? 8000 : 3000, spent: 0, color: const Color(0xFFD4A0A0), icon: '🎁'),
        BudgetCategory(name: 'Tenues & bijoux', budget: isLarge ? 6000 : 2500, spent: 0, color: const Color(0xFFB8A4D8), icon: '👗'),
        BudgetCategory(name: 'Decoration & fleurs', budget: isLarge ? 4000 : 1500, spent: 0, color: const Color(0xFFA8C5A0), icon: '🌸'),
        BudgetCategory(name: 'Photo / video', budget: isLarge ? 3500 : 1500, spent: 0, color: const Color(0xFF90B8D8), icon: '📸'),
      ];
    }

    return [
      BudgetCategory(name: 'Venue & Salle', budget: venueBudget, spent: 0, color: AppColors.accent, icon: '🏛️'),
      BudgetCategory(name: 'Catering', budget: cateringBudget, spent: 0, color: AppColors.secondary, icon: '🍽️'),
      BudgetCategory(name: 'Tenues', budget: 5000, spent: 0, color: const Color(0xFFD4A0A0), icon: '👗'),
      BudgetCategory(name: 'Decoration', budget: 3000, spent: 0, color: const Color(0xFFB8A4D8), icon: '🌸'),
      BudgetCategory(name: 'Photography', budget: 3000, spent: 0, color: const Color(0xFFA8C5A0), icon: '📸'),
    ];
  }

  // --- Comores : Mdhoihiricho ---
  static List<WeddingEvent> _comorosMdhoihiricho(String date, String venue) => [
        WeddingEvent(
          id: 1,
          title: 'Fiancailles (Kuzungulia)',
          date: date,
          time: '10:00',
          endTime: '12:00',
          location: 'Maison familiale',
          description: 'Demande officielle et accord des deux familles.',
          color: AppColors.accent,
          category: 'fiancailles',
          tasks: ['Reunir les parents', 'Definir la date du mariage', 'Annoncer aux proches'],
        ),
        WeddingEvent(
          id: 2,
          title: 'Preparation dot (Kari)',
          date: date,
          time: '14:00',
          endTime: '16:00',
          location: 'Maison de la mariee',
          description: 'Echange de la dot en version reduite pour mdhoihiricho.',
          color: const Color(0xFFD4A0A0),
          category: 'dot',
          tasks: ['Preparer les plateaux', 'Lister les cadeaux', 'Photographe famille'],
        ),
        WeddingEvent(
          id: 3,
          title: 'Akad Nikah',
          arabicTitle: 'عقد النكاح',
          date: date,
          time: '9:00',
          endTime: '10:30',
          location: 'Mosquee',
          description: 'Ceremonie religieuse du contrat de mariage.',
          color: AppColors.secondary,
          category: 'akad',
          tasks: ['Confirmer imam', 'Preparer le mahar', 'Temoins et wali'],
        ),
        WeddingEvent(
          id: 4,
          title: 'Walima familiale',
          date: date,
          time: '12:00',
          endTime: '15:00',
          location: venue,
          description: 'Repas intime en famille proche.',
          color: const Color(0xFFA8C5A0),
          category: 'reception',
          tasks: ['Menu simple', 'Decoration legere', 'Liste invites reduite'],
        ),
      ];

  // --- Comores : Grande mariage ---
  static List<WeddingEvent> _comorosGrandeMariage(String date, String venue) => [
        WeddingEvent(
          id: 1,
          title: 'Fiancailles officielles',
          date: date,
          time: '10:00',
          endTime: '13:00',
          location: 'Maison familiale',
          description: 'Ceremonie des fiancailles devant les deux familles.',
          color: AppColors.accent,
          category: 'fiancailles',
          tasks: ['Invitations famille elargie', 'Discours des parents', 'Photo officielle'],
        ),
        WeddingEvent(
          id: 2,
          title: 'Dot (Kari) & Hantaran',
          date: date,
          time: '10:00',
          endTime: '14:00',
          location: 'Maison de la mariee',
          description: 'Echange des cadeaux et de la dot entre les familles.',
          color: const Color(0xFFD4A0A0),
          category: 'dot',
          tasks: ['Plateaux kari complets', 'Hantaran marie', 'Hantaran mariee', 'Photographe'],
        ),
        WeddingEvent(
          id: 3,
          title: 'Soiree henné (Mlaguli)',
          date: date,
          time: '18:00',
          endTime: '22:00',
          location: venue,
          description: 'Soiree traditionnelle avec henné pour la mariee.',
          color: const Color(0xFFB8A4D8),
          category: 'henne',
          tasks: ['Tenue traditionnelle', 'Musique comorienne', 'Decoration salle'],
        ),
        WeddingEvent(
          id: 4,
          title: 'Akad Nikah',
          arabicTitle: 'عقد النكاح',
          date: date,
          time: '9:00',
          endTime: '11:00',
          location: 'Mosquee',
          description: 'Contrat de mariage islamique.',
          color: AppColors.secondary,
          category: 'akad',
          tasks: ['Imam confirme', 'Mahar prepare', 'Wali et temoins'],
        ),
        WeddingEvent(
          id: 5,
          title: 'Walima — Grande reception',
          date: date,
          time: '12:00',
          endTime: '18:00',
          location: venue,
          description: 'Grande reception avec famille, amis et communaute.',
          color: AppColors.accent,
          category: 'reception',
          tasks: ['Traiteur confirme', 'Salle decoree', 'Kompang / musique', 'Plan de tables'],
        ),
        WeddingEvent(
          id: 6,
          title: 'Fete & soiree dansante',
          date: date,
          time: '19:00',
          endTime: '23:00',
          location: venue,
          description: 'Soiree festive pour celebrer les jeunes maries.',
          color: const Color(0xFF90B8D8),
          category: 'fete',
          tasks: ['DJ ou groupe live', 'Tenue de soiree', 'Gateau de mariage'],
        ),
        WeddingEvent(
          id: 7,
          title: 'Visites familiales',
          date: date,
          time: '10:00',
          endTime: '16:00',
          location: 'Domiciles familles',
          description: 'Visites de courtoisie chez les parents et grands-parents.',
          color: const Color(0xFFC8B8A0),
          category: 'visite',
          tasks: ['Calendrier des visites', 'Cadeaux pour familles', 'Tenues prevues'],
        ),
      ];

  static List<WeddingEvent> _franceEvents(String date, String venue, String typeId) => [
        WeddingEvent(
          id: 1,
          title: 'Mariage civil',
          date: date,
          time: '10:00',
          endTime: '11:00',
          location: 'Mairie',
          description: 'Ceremonie civile officielle.',
          color: AppColors.accent,
          category: 'civil',
          tasks: ['Dossier mairie', 'Temoins civils', 'Tenue mairie'],
        ),
        if (typeId != 'laique')
          WeddingEvent(
            id: 2,
            title: 'Ceremonie religieuse',
            date: date,
            time: '14:00',
            endTime: '15:30',
            location: 'Lieu de culte',
            description: 'Benedicion ou ceremonie religieuse.',
            color: AppColors.secondary,
            category: 'religieux',
            tasks: ['Confirmer officiant', 'Livret de ceremonie'],
          ),
        WeddingEvent(
          id: 3,
          title: 'Vin d\'honneur & reception',
          date: date,
          time: '17:00',
          endTime: '23:00',
          location: venue,
          description: 'Cocktail et diner de mariage.',
          color: const Color(0xFFD4A0A0),
          category: 'reception',
          tasks: ['Traiteur', 'Plan de table', 'Discours'],
        ),
      ];

  static List<WeddingEvent> _malaysiaEvents(String date, String venue, String typeId) => [
        if (typeId == 'hantaran')
          WeddingEvent(
            id: 1,
            title: 'Echange Hantaran',
            date: date,
            time: '10:00',
            endTime: '12:00',
            location: 'Maison mariee',
            description: 'Echange des plateaux de cadeaux.',
            color: const Color(0xFFA8C5A0),
            category: 'hantaran',
            tasks: ['Plateaux prepares', 'Photographe'],
          ),
        WeddingEvent(
          id: 2,
          title: 'Akad Nikah',
          arabicTitle: 'عقد النكاح',
          date: date,
          time: '9:00',
          endTime: '11:00',
          location: 'Masjid',
          description: 'Contrat de mariage islamique.',
          color: AppColors.accent,
          category: 'akad',
          tasks: ['Imam', 'Mahar', 'Wali'],
        ),
        WeddingEvent(
          id: 3,
          title: 'Bersanding & Walimah',
          date: date,
          time: '11:00',
          endTime: '16:00',
          location: venue,
          description: 'Ceremonie au pelamin et reception.',
          color: AppColors.secondary,
          category: 'reception',
          tasks: ['Pelamin', 'Kompang', 'Caterer'],
        ),
      ];

  static List<WeddingEvent> _senegalEvents(String date, String venue) => [
        WeddingEvent(id: 1, title: 'Ceremonie de la dot', date: date, time: '10:00', endTime: '14:00', location: 'Maison familiale', description: 'Presentation et echange de la dot.', color: AppColors.accent, category: 'dot', tasks: ['Liste dot', 'Famille mariee', 'Famille marie']),
        WeddingEvent(id: 2, title: 'Akad / ceremonie religieuse', date: date, time: '15:00', endTime: '16:30', location: 'Mosquee', description: 'Mariage religieux.', color: AppColors.secondary, category: 'akad', tasks: ['Imam', 'Mahar']),
        WeddingEvent(id: 3, title: 'Grande reception', date: date, time: '18:00', endTime: '23:00', location: venue, description: 'Fete avec famille et communaute.', color: const Color(0xFFD4A0A0), category: 'reception', tasks: ['Traiteur', 'Tenues traditionnelles', 'Musique']),
      ];

  static List<WeddingEvent> _moroccoEvents(String date, String venue) => [
        WeddingEvent(id: 1, title: 'Hammam & henné', date: date, time: '10:00', endTime: '14:00', location: 'Hammam / domicile', description: 'Rituels de beaute et henné.', color: const Color(0xFFB8A4D8), category: 'henne', tasks: ['Negafa', 'Henné artiste']),
        WeddingEvent(id: 2, title: 'Ceremonie Amariya', date: date, time: '16:00', endTime: '18:00', location: venue, description: 'Entree sur palanquin traditionnel.', color: AppColors.accent, category: 'ceremonie', tasks: ['Amariya', 'Musiciens', 'Tenues']),
        WeddingEvent(id: 3, title: 'Dinner de fête', date: date, time: '19:00', endTime: '23:00', location: venue, description: 'Grande fete de mariage.', color: AppColors.secondary, category: 'reception', tasks: ['Traiteur', 'Gateau', 'Animation']),
      ];

  static List<WeddingEvent> _turkeyEvents(String date, String venue) => [
        WeddingEvent(id: 1, title: 'Kina gecesi (henné)', date: date, time: '18:00', endTime: '22:00', location: venue, description: 'Soiree henné avant le mariage.', color: const Color(0xFFB8A4D8), category: 'henne', tasks: ['Henné', 'Musique', 'Tenues']),
        WeddingEvent(id: 2, title: 'Nikah', date: date, time: '11:00', endTime: '12:00', location: 'Mosquee / mairie', description: 'Contrat de mariage.', color: AppColors.accent, category: 'akad', tasks: ['Imam', 'Temoins']),
        WeddingEvent(id: 3, title: 'Düğün (fête)', date: date, time: '18:00', endTime: '23:00', location: venue, description: 'Grande fete de mariage turque.', color: AppColors.secondary, category: 'reception', tasks: ['Salle', 'DJ', 'Premiere danse']),
      ];

  static List<WeddingEvent> _standardEvents(String date, String venue) => [
        WeddingEvent(id: 1, title: 'Ceremonie', date: date, time: '14:00', endTime: '15:30', location: venue, description: 'Ceremonie de mariage.', color: AppColors.accent, category: 'ceremonie', tasks: ['Officiant', 'Voeux']),
        WeddingEvent(id: 2, title: 'Reception', date: date, time: '17:00', endTime: '22:00', location: venue, description: 'Diner et fete.', color: AppColors.secondary, category: 'reception', tasks: ['Traiteur', 'Invitations', 'Decoration']),
      ];
}
