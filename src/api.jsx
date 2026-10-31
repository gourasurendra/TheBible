import { books, slug } from "./data.jsx";
import { getOfflineChapter, saveOfflineChapter, hasOfflineChapter } from "./offlineBible";

const API = "https://bible-api.com";
const STATIC_BASE = "/bible-data";
const TELUGU_RAW_BASE = "https://raw.githubusercontent.com/aruljohn/Bible-telugu/main";

const TELUGU_FILES = {
  Genesis: "Genesis.json",
  Exodus: "Exodus.json",
  Leviticus: "Leviticus.json",
  Numbers: "Numbers.json",
  Deuteronomy: "Deuteronomy.json",
  Joshua: "Joshua.json",
  Judges: "Judges.json",
  Ruth: "Ruth.json",
  "1 Samuel": "1 Samuel.json",
  "2 Samuel": "2 Samuel.json",
  "1 Kings": "1 Kings.json",
  "2 Kings": "2 Kings.json",
  "1 Chronicles": "1 Chronicles.json",
  "2 Chronicles": "2 Chronicles.json",
  Ezra: "Ezra.json",
  Nehemiah: "Nehemiah.json",
  Esther: "Esther.json",
  Job: "Job.json",
  Psalms: "Psalms.json",
  Proverbs: "Proverbs.json",
  Ecclesiastes: "Ecclesiastes.json",
  "Song of Solomon": "Song of Songs.json",
  Isaiah: "Isaiah.json",
  Jeremiah: "Jeremiah.json",
  Lamentations: "Lamentations.json",
  Ezekiel: "Ezekiel.json",
  Daniel: "Daniel.json",
  Hosea: "Hosea.json",
  Joel: "Joel.json",
  Amos: "Amos.json",
  Obadiah: "Obadiah.json",
  Jonah: "Jonah.json",
  Micah: "Micah.json",
  Nahum: "Nahum.json",
  Habakkuk: "Habakkuk.json",
  Zephaniah: "Zephaniah.json",
  Haggai: "Haggai.json",
  Zechariah: "Zechariah.json",
  Malachi: "Malachi.json",
  Matthew: "Matthew.json",
  Mark: "Mark.json",
  Luke: "Luke.json",
  John: "John.json",
  Acts: "Acts.json",
  Romans: "Romans.json",
  "1 Corinthians": "1 Corinthians.json",
  "2 Corinthians": "2 Corinthians.json",
  Galatians: "Galatians.json",
  Ephesians: "Ephesians.json",
  Philippians: "Philippians.json",
  Colossians: "Colossians.json",
  "1 Thessalonians": "1 Thessalonians.json",
  "2 Thessalonians": "2 Thessalonians.json",
  "1 Timothy": "1 Timothy.json",
  "2 Timothy": "2 Timothy.json",
  Titus: "Titus.json",
  Philemon: "Philemon.json",
  Hebrews: "Hebrews.json",
  James: "James.json",
  "1 Peter": "1 Peter.json",
  "2 Peter": "2 Peter.json",
  "1 John": "1 John.json",
  "2 John": "2 John.json",
  "3 John": "3 John.json",
  Jude: "Jude.json",
  Revelation: "Revelation.json"
};

// Telugu source files contain a complete book. Keep each fetched book in memory
// during a download so we do not request the same large file once per chapter.
const teluguBookMemoryCache = new Map();

async function fetchJsonWithRetry(url, { attempts = 3, delayMs = 350 } = {}) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (response.status === 404) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }
      if (!response.ok) {
        const error = new Error(`Request failed (${response.status})`);
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      // A missing optional static file should fall through immediately.
      if (error.status === 404) throw error;
      if (attempt < attempts - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }
  throw lastError || new Error("Unable to fetch Bible content.");
}

const staticManifestCache = new Map();

async function hasStaticTranslation(translation) {
  if (staticManifestCache.has(translation)) return staticManifestCache.get(translation);
  const promise = fetch(`${STATIC_BASE}/${translation}/manifest.json`, {
    headers: { Accept: "application/json" }
  }).then(async response => {
    if (!response.ok) return false;
    const manifest = await response.json();
    return manifest?.translation === translation && manifest?.formatVersion === 1;
  }).catch(() => false);
  staticManifestCache.set(translation, promise);
  const available = await promise;
  staticManifestCache.set(translation, available);
  return available;
}

async function fetchStaticChapter(book, chapter, translation) {
  if (!(await hasStaticTranslation(translation))) return null;
  const url = `${STATIC_BASE}/${translation}/${slug(book)}/${chapter}.json`;
  try {
    const data = await fetchJsonWithRetry(url, { attempts: 1 });
    if (Array.isArray(data?.verses) && data.verses.length) return data;
  } catch (error) {
    if (error.status !== 404 && !/Failed to fetch|NetworkError/i.test(error.message)) {
      // Continue to the API fallback for an optional static-file failure.
    }
  }
  return null;
}

export async function fetchChapter(book, chapter, translation = "web", options = {}) {
  const chapterNumber = Number(chapter);
  if (!Number.isInteger(chapterNumber) || chapterNumber < 1) {
    throw new Error("Invalid chapter number.");
  }

  // 1) Device storage is the fastest and works without internet.
  const saved = await getOfflineChapter(translation, book, chapterNumber);
  if (saved) return saved;

  if (!navigator.onLine) {
    throw new Error(`${book} ${chapterNumber} is not downloaded yet. Connect to the internet and download this chapter first.`);
  }

  // 2) Try our own static/CDN JSON file first.
  const staticData = await fetchStaticChapter(book, chapterNumber, translation);
  if (staticData) {
    await saveOfflineChapter(translation, book, chapterNumber, staticData);
    return staticData;
  }

  // 3) Fallback to the existing live Bible API/source.
  let data;
  if (translation === "telotsa") {
    data = await fetchTeluguChapter(book, chapterNumber);
  } else {
    const url = `${API}/${encodeURIComponent(`${book} ${chapterNumber}`)}?translation=${encodeURIComponent(translation)}`;
    data = await fetchJsonWithRetry(url, { attempts: 3 });
  }

  await saveOfflineChapter(translation, book, chapterNumber, data);
  return data;
}

export async function fetchReference(reference, translation = "web") {
  const match = reference.trim().match(/^(.+?)\\s+(\\d+)(?::(\\d+))?$/);
  if (!match) throw new Error("Use a reference such as John 3:16.");
  const [, book, chapterText, verseText] = match;
  const data = await fetchChapter(book, Number(chapterText), translation);
  if (!verseText) return data;
  const verseNumber = Number(verseText);
  const verses = (data.verses || []).filter(item => Number(item.verse) === verseNumber);
  if (!verses.length) throw new Error(`${book} ${chapterText}:${verseNumber} was not found.`);
  return { ...data, verses, reference: `${book} ${chapterText}:${verseNumber}` };
}

async function fetchTeluguChapter(book, chapter) {
  const fileName = TELUGU_FILES[book];
  if (!fileName) throw new Error(`No Telugu Bible data is configured for ${book}.`);

  let bookData = teluguBookMemoryCache.get(book);
  if (!bookData) {
    const url = `${TELUGU_RAW_BASE}/${encodeURIComponent(fileName)}`;
    bookData = await fetchJsonWithRetry(url, { attempts: 3 });
    teluguBookMemoryCache.set(book, bookData);
  }

  const chapterData = Array.isArray(bookData.chapters)
    ? bookData.chapters.find(item => Number(item.chapter) === Number(chapter))
    : null;
  if (!chapterData || !Array.isArray(chapterData.verses)) {
    throw new Error(`Telugu ${book} chapter ${chapter} was not found.`);
  }

  const verses = chapterData.verses
    .map(item => ({
      verse: Number(item.verse),
      text: String(item.text || "").replace(/\\s+/g, " ").trim()
    }))
    .filter(item => Number.isFinite(item.verse) && item.text)
    .sort((a, b) => a.verse - b.verse);

  if (!verses.length) throw new Error(`No Telugu verses were found for ${book} ${chapter}.`);
  return {
    reference: `${book} ${chapter}`,
    translation_name: "Telugu Bible",
    translation_note: "Telugu Bible JSON • aruljohn/Bible-telugu",
    verses
  };
}

// Downloads a translation one chapter at a time. It checks IndexedDB first,
// so interrupted downloads resume without downloading saved chapters again.
export async function downloadEntireBible(translation, onProgress = () => {}, shouldCancel = () => false) {
  let completed = 0;
  let failed = [];
  const total = books.reduce((sum, book) => sum + book.chapters, 0);

  for (const book of books) {
    for (let chapter = 1; chapter <= book.chapters; chapter += 1) {
      if (shouldCancel()) {
        const error = new Error("Download paused. You can resume it later.");
        error.name = "DownloadCancelled";
        throw error;
      }

      try {
        const alreadySaved = await hasOfflineChapter(translation, book.name, chapter);
        if (!alreadySaved) await fetchChapter(book.name, chapter, translation);
        completed += 1;
        onProgress({ completed, total, book: book.name, chapter, failed: failed.length });
      } catch (error) {
        failed.push(`${book.name} ${chapter}: ${error.message}`);
        onProgress({ completed, total, book: book.name, chapter, failed: failed.length });
        // Do not stop at the first failed chapter; finish other chapters.
      }

      // Gentle pacing reduces the chance of hitting public API rate limits.
      if (translation !== "telotsa" && navigator.onLine) {
        await new Promise(resolve => setTimeout(resolve, 180));
      }
    }
  }

  return { completed, total, failed };
}
