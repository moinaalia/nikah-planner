# Lancer Nikah Planner sur Android (Flutter)

## Configuration déjà faite

- Flutter SDK : `C:\src\flutter`
- Android SDK : `C:\Android\Sdk`
- Émulateur : **Pixel_7_API_34**
- `local.properties` configuré
- Dépendances Flutter installées (`flutter pub get`)
- Compilation Android validée (`app-debug.apk` généré)
- `flutter doctor` : Android toolchain OK

**Il reste une seule étape manuelle** : installer le pilote hyperviseur (voir ci-dessous), puis redémarrer le PC.

## Étape obligatoire : pilote hyperviseur (une fois)

L'émulateur Android a besoin de l'accélération matérielle.

### Option A — Android Studio (recommandé)

1. **Tools** → **SDK Manager** → onglet **SDK Tools**
2. Cochez **Android Emulator hypervisor driver (installer)**
3. **Apply** → redémarrez le PC

### Option B — Script automatique (recommandé)

Clic droit sur PowerShell → **Exécuter en tant qu'administrateur**, puis :

```powershell
cd "c:\Users\Abdourazak Mlazema\Downloads\Wedding Planning App UI\nikah_planner\scripts"
.\install_hypervisor.ps1
```

Redémarrez le PC après l'installation.

### Option C — Installation manuelle

```powershell
cd C:\Android\Sdk\extras\google\Android_Emulator_Hypervisor_Driver
.\silent_install.bat
```

Redémarrez le PC après l'installation.

### Option D — Fonctionnalités Windows

1. **Win + R** → `optionalfeatures`
2. Cochez **Plateforme d'hyperviseur Windows** et **Machine virtuelle**
3. Redémarrez

---

## Lancer l'émulateur

```powershell
cd "c:\Users\Abdourazak Mlazema\Downloads\Wedding Planning App UI\nikah_planner"
flutter emulators --launch Pixel_7_API_34
```

Attendez 1–2 minutes que le téléphone virtuel s'affiche.

---

## Lancer l'application

```powershell
flutter run
```

Mode démo : connectez-vous avec **n'importe quel e-mail et mot de passe**.

---

## Android Studio

1. **File** → **Open** → dossier `nikah_planner`
2. Démarrez **Pixel 7 API 34** dans **Device Manager**
3. Bouton vert **Run ▶**

---

## Téléphone réel (sans émulateur)

1. Activez **Options développeur** + **Débogage USB**
2. Branchez le téléphone en USB
3. `flutter devices` doit afficher votre téléphone
4. `flutter run`

---

## VS Code

1. Ouvrez le dossier racine **Wedding Planning App UI**
2. **F5** → **Nikah Planner (Flutter)**
3. Choisissez l'émulateur ou le téléphone

---

## Vérifier la configuration

```powershell
flutter doctor
flutter emulators
flutter devices
```
