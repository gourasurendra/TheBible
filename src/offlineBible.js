const DB_NAME = "faithsteps-offline";
const DB_VERSION = 1;
const STORE = "chapters";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("This browser does not support offline storage."));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("translation", "translation");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open offline storage."));
  });
}

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const chapterId = (translation, book, chapter) =>
  `${translation}|${book}|${chapter}`;

export async function getOfflineChapter(translation, book, chapter) {
  const db = await openDatabase();
  const tx = db.transaction(STORE, "readonly");
  const row = await requestResult(tx.objectStore(STORE).get(chapterId(translation, book, chapter)));
  db.close();
  return row?.data || null;
}

export async function saveOfflineChapter(translation, book, chapter, data) {
  const db = await openDatabase();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put({
    id: chapterId(translation, book, chapter),
    translation,
    book,
    chapter: Number(chapter),
    data,
    savedAt: Date.now()
  });
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("Could not save chapter."));
  });
  db.close();
}

export async function getOfflineStats(translation) {
  const db = await openDatabase();
  const tx = db.transaction(STORE, "readonly");
  const rows = await requestResult(tx.objectStore(STORE).index("translation").getAll(translation));
  db.close();
  return {
    chapters: rows.length,
    bytes: rows.reduce((sum, row) => sum + new Blob([JSON.stringify(row.data)]).size, 0)
  };
}

export async function removeOfflineTranslation(translation) {
  const db = await openDatabase();
  const tx = db.transaction(STORE, "readwrite");
  const index = tx.objectStore(STORE).index("translation");
  const request = index.openKeyCursor(IDBKeyRange.only(translation));
  request.onsuccess = () => {
    const cursor = request.result;
    if (cursor) {
      tx.objectStore(STORE).delete(cursor.primaryKey);
      cursor.continue();
    }
  };
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("Could not remove downloaded Bible."));
  });
  db.close();
}

export async function hasOfflineChapter(translation, book, chapter) {
  return Boolean(await getOfflineChapter(translation, book, chapter));
}
