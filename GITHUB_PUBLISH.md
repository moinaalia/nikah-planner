# Publish to GitHub

Your project is committed locally. Follow these steps to publish it.

## 1. Create a GitHub repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `nikah-planner` (or your choice)
3. Description: `Elegant Islamic-friendly wedding planning app — Flutter + React UI`
4. Choose **Public**
5. Do **not** add README, .gitignore, or license (already in project)
6. Click **Create repository**

## 2. Push your code

Open a terminal in this folder and run:

```powershell
cd "c:\Users\Abdourazak Mlazema\Downloads\Wedding Planning App UI"
git branch -M main
git remote add origin https://github.com/moinaalia/nikah-planner.git
git push -u origin main
```

> Remote is already configured for **moinaalia/nikah-planner**. Create the empty repo on GitHub first, then push.

## 3. Open in VS Code

```powershell
code "c:\Users\Abdourazak Mlazema\Downloads\Wedding Planning App UI"
```

Install extensions when prompted:
- **Dart**
- **Flutter**

Press **F5** → select **Nikah Planner (Flutter)** to run the app.

## 4. Open in Android Studio

1. Open Android Studio → **Open** → select the `nikah_planner` folder
2. Wait for Gradle sync
3. Connect a phone or start an emulator
4. Click the green **Run** button

## Optional: GitHub CLI

After installing GitHub CLI (`winget install GitHub.cli`):

```powershell
gh auth login
gh repo create nikah-planner --public --source=. --remote=origin --push
```
