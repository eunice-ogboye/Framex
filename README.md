# 📱 Framex - Instagram Clone

A modern social media app built with React Native, Expo, TypeScript, and Supabase. Share posts, like content, and connect with others!

## ✨ Features

- 🔐 User authentication (Sign up/Login)
- 📝 Create posts with text and images
- ❤️ Like and share posts
- 💬 Comment on posts
- 👤 User profiles with post gallery
- 📊 Activity stats (posts, likes, comments)
- 🎨 Beautiful purple/lilac theme
- 📱 Responsive design for all devices

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Expo Go app** on your phone:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **Supabase account** - [Sign up free](https://supabase.com)

---

## 📦 Installation

### Step 1: Clone or Create Project
```bash
# Create new project
npx create-expo-app framex --template blank-typescript
cd framex
```

### Step 2: Install Dependencies
```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# Supabase
npm install @supabase/supabase-js

# Utilities
npx expo install expo-image-picker @react-native-async-storage/async-storage

# Styling (NativeWind)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2

# Initialize Tailwind
npx tailwindcss init
```

### Step 3: Setup Configuration Files

#### Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#DDD6FE',
      }
    },
  },
  plugins: [],
}
```

#### Create `babel.config.js`:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

#### Create `app.d.ts`:
```typescript
/// <reference types="nativewind/types" />
```

### Step 4: Copy Project Files





---

## 🎮 Running the App

### Start Development Server
```bash
npx expo start --clear
```

### Run on Your Device

#### Option 1: Physical Phone (Recommended)

1. Open **Expo Go** app on your phone
2. Scan the **QR code** shown in terminal
   - **iPhone**: Use Camera app
   - **Android**: Use Expo Go scanner

#### Option 2: Emulator

- Press **`a`** for Android Emulator
- Press **`i`** for iOS Simulator (Mac only)

---

## 🐛 Troubleshooting

### Blank Screen
```bash
# Clear all caches
rm -rf node_modules
rm -rf .expo
rm package-lock.json
npm install
npx expo start --clear
```


## 📱 Using the App

### Sign Up
1. Open app
2. Click **"Sign Up"**
3. Enter full name, username, email, password
4. Click **"Sign Up"**
5. Sign in with your credentials

### Create a Post
1. Tap **➕** button (center tab)
2. Write your content
3. Optionally add an image
4. Tap **"Post"**

### Like & Comment
- Tap **❤️** to like a post
- Tap **💬** to comment (feature ready, simplified UI)
- Tap **🔗** to share

### View Profile
1. Tap **Profile** tab
2. See your stats and posts
3. Tap **Sign Out** to logout

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#8B5CF6',    // Main purple
  secondary: '#A78BFA',  // Light purple
  accent: '#DDD6FE',     // Very light purple
}
```

### Modify App Name

Edit `app.json`:
```json
{
  "expo": {
    "name": "YourAppName",
    "slug": "yourappname"
  }
}
```

---

## 📂 Project Structure
```
Framex/
├── app/
│   ├── _layout.tsx          
│   ├── index.tsx    # Main app entry     
│   
└── tailwind.config.js  # Tailwind configuration
```

---

## 🔑 Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Supabase** - Backend & Database
- **NativeWind** - Tailwind for React Native
- **React Navigation** - Navigation library

---

## 📝 Common Commands
```bash
# Start development server
npx expo start

# Start with cleared cache
npx expo start --clear

# Install new package
npx expo install package-name

# Update dependencies
npx expo install --fix

# Build for production (future)
eas build
```

---

## 🆘 Getting Help

### Issues?

1. Check terminal for **red errors**
2. Shake phone → **Reload** app
3. Clear cache: `npx expo start -c`
4. Check Supabase credentials
5. Verify all files are in correct locations

### Common Error Messages

| Error | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "Port already in use" | Run `npx kill-port 8081` |
| "MIME type error" | Don't use `--web` flag |
| "Blank screen" | Check Supabase keys |
| "Network request failed" | Check internet connection |

---

## 🚀 Next Steps

Want to add more features?

- [ ] Edit/Delete posts
- [ ] Follow users
- [ ] Direct messaging
- [ ] Push notifications
- [ ] Stories feature
- [ ] Search functionality
- [ ] User avatars
- [ ] Dark mode

---

## 📄 License

MIT License - Feel free to use this project!

---

## 👨‍💻 Author

Built with ❤️ using React Native & Supabase

---

## 🎉 You're All Set!

Your social app is ready to go. Start by running:
```bash
npx expo start --clear
```

Then scan the QR code with Expo Go on your phone!

Happy coding! 🚀