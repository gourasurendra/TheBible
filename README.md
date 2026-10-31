# BibleVerse Reader – Online Bible Reading App

**BibleVerse Reader** is a modern, responsive Bible reading application designed to make reading, exploring, and studying the Holy Bible simple and accessible. It supports English and Telugu Scripture, multiple Bible translations, chapter navigation, daily reading streaks, achievements, bookmarks, and reading plans.

Read the Bible online or download the Android application to enjoy Scripture anytime, anywhere.

### 🌐 Live Website
https://faithsteps.vercel.app/

### 📱 Download Android App
[Download BibleVerse Reader for Android](https://median.co/share/yejpqoj#apk)

---

## ✨ Key Features

### 📖 Bible Reading
- Browse all 66 books of the Bible.
- Explore the Old Testament and New Testament separately.
- Navigate easily between Bible books, chapters, and verses.
- Enjoy a clean and distraction-free reading interface.

### 🌍 Multiple Bible Translations
- Switch between available Bible translations.
- Read English and Telugu Scripture.
- Telugu Bible text uses the Ravi Prakash font.
- English Scripture uses the Merienda font.
- Verse numbers use a readable system font.

### 📅 Daily Reading Streaks
- Complete a Bible chapter to record your daily reading activity.
- Build consecutive reading-day streaks.
- Track your reading activity over the past seven days.
- View your current and longest reading streaks.
- Daily reading goals count each completed chapter only once per day.

### 🏆 Achievements and Milestones
- Unlock milestones automatically.
- Earn achievements for reading chapters.
- Track consecutive reading days.
- Unlock rewards for bookmarks and daily reading goals.

### 📚 Bible Reading Plans
- Explore structured Bible reading plans.
- Follow a practical seven-reading starter schedule.
- Open Bible passages directly from reading plans.
- Track reading plan progress.
- Mark completed readings.

### 🔖 Bookmarks and Personal Progress
- Save important Bible passages.
- Track your reading progress.
- Store reading activity locally in your browser.

### 🌙 Responsive User Interface
- Modern and minimal design.
- Theme-aware colors and dark-mode support.
- Optimized for desktop, tablets, and smartphones.
- Responsive Bible reading and chapter navigation.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript (ES6+) | Application logic |
| CSS3 | Styling and responsive layouts |
| React Router | Application navigation |
| Vite | Development and build tool |
| Google Fonts | Scripture typography |
| Vercel | Deployment and hosting |

---

## 📂 Project Structure

```text
BibleVerse/
│
├── public/
│   └── Static assets
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── data.jsx
│   ├── storage.jsx
│   └── styles.css
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run BibleVerse Reader locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd BibleVerse
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌍 Deployment

BibleVerse Reader is deployed using **Vercel**.

Live application:

https://faithsteps.vercel.app/

Android application:

https://median.co/share/yejpqoj#apk

---

## 💾 Data Storage

BibleVerse Reader stores reading progress and related user activity locally in the browser.

- Reading streaks use your device's local calendar date.
- Reading activity is stored locally.
- Progress may not synchronize across different browsers or devices.
- Clearing browser storage may remove locally saved progress.

---

## 🔮 Future Improvements

Planned enhancements include:

- Advanced Bible verse search.
- Personal Bible notes.
- Verse highlighting.
- Daily Bible verse notifications.
- Verse sharing.
- Text-to-speech Bible reading.
- Progressive Web App (PWA) support.
- Optional user accounts and cloud synchronization.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

To contribute:

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push your branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 📜 License and Copyright

This project is intended for educational and personal development purposes.

Bible translations and Scripture text may be subject to copyright and licensing restrictions. Please ensure that the appropriate permissions and attribution requirements are followed before distributing Bible text or translation data.

---

## 👨‍💻 Developer

**Surendra**

Engineering Student

Built with ❤️ using React.js, JavaScript, CSS3, and Vite.

---

## ⭐ Support the Project

If you find BibleVerse Reader useful, consider giving the project a ⭐ on GitHub and sharing it with others.

**Read, Learn, and Grow in God's Word Every Day.**

> "Your word is a lamp for my feet, a light on my path."
>
> — Psalm 119:105

---

*BibleVerse Reader – A simple and accessible way to read and explore the Holy Bible.*


## Offline Bible downloads (hybrid mode)

FaithSteps now uses a hybrid content strategy:

1. Read a chapter from the device's IndexedDB cache first.
2. If it is not on the device, check the optional static JSON files hosted with the app/CDN.
3. If static files are not deployed, fall back to the existing live Bible API/source.
4. Save the fetched chapter to IndexedDB for future offline reading.

Open **Settings → Offline Bible downloads**, choose WEB, KJV, or Telugu, then select **Download entire Bible**. The download manager processes all 1,189 chapters, skips saved chapters, retries temporary request failures, and lets the user pause and resume. Keep the app open during the download.

See [OFFLINE-ARCHITECTURE.md](./OFFLINE-ARCHITECTURE.md) for the static JSON folder structure and manifest format. Static Bible text files are optional; without them, API fallback remains active. Check the licence for each translation before hosting or redistributing its text.
