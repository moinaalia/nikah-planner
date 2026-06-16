# Configurer Firebase pour Nikah Planner

Guide pour créer le projet Firebase et le connecter à l'application mobile.

---

## Étape 1 — Créer le projet sur Firebase (navigateur)

1. Ouvrez **https://console.firebase.google.com**
2. Connectez-vous avec votre compte Google
3. Cliquez **Créer un projet** (ou **Add project**)
4. Nom suggéré : **`nikah-planner`**
5. Désactivez Google Analytics si vous voulez (optionnel) → **Créer le projet**

---

## Étape 2 — Activer Authentication

1. Menu gauche → **Build** → **Authentication**
2. **Commencer** → onglet **Sign-in method**
3. Activez **E-mail/Mot de passe** → Enregistrer

---

## Étape 3 — Activer Firestore

1. Menu gauche → **Build** → **Firestore Database**
2. **Créer une base de données**
3. Mode **Production** (ou Test pour commencer)
4. Région : **asia-southeast1** (Singapour, proche Malaisie) ou la plus proche
5. **Activer**

### Règles Firestore (pour développement)

Onglet **Règles**, remplacez par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /weddings/{weddingId} {
      allow read, write: if request.auth != null;
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

Cliquez **Publier**.

---

## Étape 4 — Installer les outils (une fois sur votre PC)

PowerShell :

```powershell
npm install -g firebase-tools
dart pub global activate flutterfire_cli
```

Ajoutez Dart au PATH si besoin :

```powershell
$env:Path += ";$env:LOCALAPPDATA\Pub\Cache\bin"
```

---

## Étape 5 — Lier Firebase à l'app Flutter

```powershell
cd "c:\Users\Abdourazak Mlazema\Downloads\Wedding Planning App UI\nikah_planner"

# Connexion Google (ouvre le navigateur)
firebase login

# Configure automatiquement firebase_options.dart + google-services.json
flutterfire configure
```

Répondez aux questions :
- **Projet** : sélectionnez `nikah-planner`
- **Plateformes** : cochez **android** (espace pour sélectionner, Entrée pour valider)

---

## Étape 6 — Vérifier

```powershell
flutter pub get
flutter run
```

1. Créez un compte dans l'app (Register)
2. Vérifiez dans Firebase Console → **Authentication** → un utilisateur apparaît
3. Vérifiez **Firestore** → collections `users` et `weddings` après inscription

---

## Mariage du 14 août — après Firebase

Une fois Firebase actif, l'inscription enregistre :
- Votre compte (Auth)
- Profil mariage (Firestore : noms, date, lieu)

Pour personnaliser la date **14 août 2026**, modifiez aussi `lib/core/data/mock_data.dart` en attendant les écrans d'édition complets.

---

## Dépannage

| Problème | Solution |
|----------|----------|
| `firebase` introuvable | `npm install -g firebase-tools` puis redémarrer le terminal |
| `flutterfire` introuvable | `$env:Path += ";$env:LOCALAPPDATA\Pub\Cache\bin"` |
| App reste en mode démo | Vérifiez que `firebase_options.dart` n'a plus `YOUR_API_KEY` |
| Erreur Gradle google-services | Relancez `flutterfire configure` |

---

## Fichiers générés automatiquement

- `lib/firebase_options.dart` — clés du projet
- `android/app/google-services.json` — config Android

**Ne commitez pas de clés secrètes sensibles** si le repo est public (les clés Firebase client sont généralement OK dans une app mobile).
