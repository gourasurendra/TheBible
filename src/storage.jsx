const KEY = "bibleverse-v1";
const defaults = {
  bookmarks: [],
  notes: {},
  highlights: {},
  collections: { "Favorite Verses": [] },
  completed: [],
  history: [],
  streak: { current: 0, longest: 0, totalDays: 0, lastDate: null, days: [] },
  goal: 2,
  daily: { date: null, count: 0, completedRefs: [] },
  plans: {},
  settings: { fontSize: 19, lineHeight: 1.85, width: 720, font: "serif", theme: "light" }
};

export function loadStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      ...defaults,
      ...saved,
      streak: { ...defaults.streak, ...(saved.streak || {}) },
      daily: { ...defaults.daily, ...(saved.daily || {}) },
      settings: { ...defaults.settings, ...(saved.settings || {}) }
    };
  } catch {
    return structuredClone(defaults);
  }
}
export function saveStore(store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}
export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
export function markRead(store, ref) {
  const next = structuredClone(store);
  next.history = [ref, ...next.history.filter(x => x !== ref)].slice(0, 30);
  if (next.daily.date !== today()) next.daily = { date: today(), count: 0, completedRefs: [] };
  return next;
}
export function completeChapter(store, ref) {
  const next = structuredClone(store);
  if (!next.completed.includes(ref)) next.completed.push(ref);

  const now = today();
  if (next.daily.date !== now) next.daily = { date: now, count: 0, completedRefs: [] };
  next.daily.completedRefs ||= [];
  // Count each chapter only once toward today's goal, even if the button is clicked again.
  if (!next.daily.completedRefs.includes(ref)) {
    next.daily.completedRefs.push(ref);
    next.daily.count += 1;
  }

  const last = next.streak.lastDate;
  if (last !== now) {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth()+1).padStart(2,"0")}-${String(yesterdayDate.getDate()).padStart(2,"0")}`;
    next.streak.current = last === yesterday ? next.streak.current + 1 : 1;
    next.streak.longest = Math.max(next.streak.longest, next.streak.current);
    next.streak.totalDays += 1;
    next.streak.lastDate = now;
    next.streak.days ||= [];
    next.streak.days = [...new Set([...next.streak.days, now])].slice(-365);
  }
  return next;
}
