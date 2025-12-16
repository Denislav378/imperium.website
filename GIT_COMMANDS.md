# 📋 Git Команди - Копирай и Пусни

## ⚠️ ВАЖНО: Къде да пуснеш командите

**Отвори PowerShell** (Windows + X → Windows PowerShell или Windows Terminal)

**Навигирай до проекта:**
```powershell
cd "C:\Users\Expert\OneDrive\Desktop\echo-trades-gold-gateway-92-main"
```

---

## 🔧 СТЪПКА 1: Проверка дали Git е инсталиран

Пусни тази команда:

```powershell
git --version
```

**Ако изведе версия** (напр. `git version 2.43.0`) → Git е инсталиран, премини на СТЪПКА 2.

**Ако изведе грешка** → Git не е инсталиран. Инсталирай го:

### Опция A: Чрез winget (ако имаш Windows 11/10 с winget)
```powershell
winget install --id Git.Git -e --source winget
```

### Опция B: Ръчно
1. Отиди на: https://git-scm.com/download/win
2. Свали и инсталирай Git for Windows
3. По време на инсталацията избери "Git from the command line and also from 3rd-party software"
4. Рестартирай PowerShell след инсталацията

---

## 📦 СТЪПКА 2: Инициализация на Git Repository

**Пусни тези команди една по една в PowerShell:**

```powershell
# 1. Навигирай до проекта (ако не си там)
cd "C:\Users\Expert\OneDrive\Desktop\echo-trades-gold-gateway-92-main"

# 2. Инициализирай Git (ако още не е направено)
git init

# 3. Настрой Git user (замени с твоите данни)
git config user.name "Denislav378"
git config user.email "join.echo.trades@proton.me"

# 4. Провери какво ще се добави
git status
```

---

## 📝 СТЪПКА 3: Добавяне на файловете

```powershell
# Добави всички файлове
git add .

# Провери какво е добавено
git status
```

---

## 💾 СТЪПКА 4: Първи Commit

```powershell
git commit -m "Initial commit - Imperium Labs platform"
```

---

## 🌿 СТЪПКА 5: Настройка на Branch

```powershell
git branch -M main
```

---

## 🔗 СТЪПКА 6: Добавяне на GitHub Remote

```powershell
git remote add origin https://github.com/Denislav378/imperium.website.git
```

**Ако получиш грешка "remote origin already exists":**
```powershell
git remote remove origin
git remote add origin https://github.com/Denislav378/imperium.website.git
```

**Провери дали е добавено правилно:**
```powershell
git remote -v
```

Трябва да видиш:
```
origin  https://github.com/Denislav378/imperium.website.git (fetch)
origin  https://github.com/Denislav378/imperium.website.git (push)
```

---

## 🚀 СТЪПКА 7: Push към GitHub

```powershell
git push -u origin main
```

---

## 🔐 Ако GitHub изисква Authentication

GitHub вече не приема пароли. Трябва да използваш **Personal Access Token**.

### Как да създадеш Token:

1. Отиди на: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Note: `Imperium Labs Deployment`
4. Expiration: Избери период (напр. 90 days или No expiration)
5. Scopes: Отбележи **`repo`** (пълни права)
6. Click "Generate token"
7. **КОПИРАЙ ТОКЕНА ВЕДНАГА** (няма да можеш да го видиш отново!)

### Как да използваш Token:

Когато `git push` поиска username и password:

- **Username:** `Denislav378` (твоето GitHub username)
- **Password:** Вмъкни **TOKEN-а** (не паролата!)

**Или използвай Git Credential Manager:**

```powershell
# Първи път - ще те попита за credentials
git push -u origin main

# След това Git Credential Manager ще ги запази
```

---

## ✅ Проверка

След успешен push, отиди на:
https://github.com/Denislav378/imperium.website

Трябва да видиш всички файлове там!

---

## 🆘 Ако имаш проблеми

### Проблем: "fatal: not a git repository"
**Решение:** Пусни `git init` в правилната директория

### Проблем: "fatal: remote origin already exists"
**Решение:** 
```powershell
git remote remove origin
git remote add origin https://github.com/Denislav378/imperium.website.git
```

### Проблем: "Permission denied" или "Authentication failed"
**Решение:** Използвай Personal Access Token вместо парола

### Проблем: "error: failed to push some refs"
**Решение:** Ако GitHub repository има файлове, които локално нямаш:
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📋 Бърз списък (всички команди наведнъж)

```powershell
cd "C:\Users\Expert\OneDrive\Desktop\echo-trades-gold-gateway-92-main"
git init
git config user.name "Denislav378"
git config user.email "join.echo.trades@proton.me"
git add .
git commit -m "Initial commit - Imperium Labs platform"
git branch -M main
git remote add origin https://github.com/Denislav378/imperium.website.git
git push -u origin main
```

**Копирай и пусни в PowerShell една по една!**

