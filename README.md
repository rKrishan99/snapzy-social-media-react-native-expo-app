# Snapzy 📸

Snapzy is a modern mobile photo sharing app built with [Expo](https://expo.dev), [React Native](https://reactnative.dev/), [Convex](https://convex.dev/), and [Clerk](https://clerk.com/) for authentication.

## 🚀 Features

- 📷 Share photos instantly
- 🧑‍🤝‍🧑 Follow other users
- ❤️ Like and bookmark posts
- 💬 Comment on photos
- 🔒 Secure authentication with Clerk
- ☁️ Real-time backend with Convex
  
![Bandmate – Connect Musicians   Bands (6)](https://github.com/user-attachments/assets/134a9ed7-c894-4a46-99f2-c02d195a3465)


## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/snapzy-app.git](https://github.com/rKrishan99/snapzy-social-media-react-native-expo-app.git)
cd snapzy-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your Clerk and Convex keys:

```
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CONVEX_DEPLOYMENT_URL=your_convex_url
```

### 4. Start the development server

```bash
npx expo start
```

Open the app in your simulator, device, or web browser.

## 📂 Project Structure

```
app/                # Expo app directory (screens, navigation)
components/         # Reusable React Native components
convex/             # Convex backend functions (queries, mutations)
styles/             # StyleSheet files
assets/             # Images and static assets
```

## 🧑‍💻 Tech Stack

- **Frontend:** React Native, Expo
- **Backend:** Convex
- **Auth:** Clerk
- **Image Upload:** Expo ImagePicker, Convex Storage

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## 📄 License

This project is [MIT](LICENSE) licensed.

---

Made with ❤️ using Expo, Convex, and Clerk.
