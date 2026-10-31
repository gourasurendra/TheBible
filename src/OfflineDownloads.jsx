import React, { useEffect, useRef, useState } from "react";
import { Download, HardDrive, Pause, Trash2, Wifi, WifiOff, CheckCircle2 } from "lucide-react";
import { books, totalChapters } from "./data.jsx";
import { downloadEntireBible } from "./api.jsx";
import { getOfflineStats, removeOfflineTranslation } from "./offlineBible";

const versions = [
  { id: "web", label: "English • World English Bible (WEB)" },
  { id: "kjv", label: "English • King James Version (KJV)" },
  { id: "telotsa", label: "తెలుగు • Telugu Bible" }
];

function formatBytes(bytes) {
  if (!bytes) return "0 MB";
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function OfflineDownloads() {
  const [translation, setTranslation] = useState("web");
  const [stats, setStats] = useState({ chapters: 0, bytes: 0 });
  const [progress, setProgress] = useState({ completed: 0, total: totalChapters, book: "", chapter: 0, failed: 0 });
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  const cancelRef = useRef(false);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => {
      setOnline(false);
      if (running) cancelRef.current = true;
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [running]);

  const refreshStats = async () => {
    try {
      const next = await getOfflineStats(translation);
      setStats(next);
      setProgress(p => ({ ...p, completed: next.chapters, total: totalChapters }));
    } catch (e) {
      setError(e.message || "Unable to read offline storage.");
    }
  };

  useEffect(() => {
    refreshStats();
  }, [translation]);

  const startDownload = async () => {
    if (!online) {
      setError("Connect to the internet before starting or resuming a Bible download.");
      return;
    }
    cancelRef.current = false;
    setRunning(true);
    setError("");
    setMessage("Preparing download. Saved chapters will be skipped.");
    try {
      const result = await downloadEntireBible(
        translation,
        (next) => setProgress(next),
        () => cancelRef.current
      );
      await refreshStats();
      if (result.failed.length) {
        setMessage(`Finished with ${result.failed.length} chapter(s) still missing. Tap download again to retry only the missing chapters.`);
        setError(result.failed.slice(0, 4).join("\n") + (result.failed.length > 4 ? `\n…and ${result.failed.length - 4} more.` : ""));
      } else {
        setMessage("Bible download complete. All 1,189 chapters are saved on this device.");
        setError("");
      }
    } catch (e) {
      if (e.name === "DownloadCancelled") {
        await refreshStats();
        setMessage("Download paused. Tap Download entire Bible to resume; saved chapters will be skipped.");
      } else {
        setError(e.message || "Download could not be completed.");
      }
    } finally {
      setRunning(false);
      await refreshStats();
    }
  };

  const clearDownload = async () => {
    if (running) return;
    const confirmed = window.confirm(`Delete downloaded ${versions.find(v => v.id === translation)?.label} chapters from this device?`);
    if (!confirmed) return;
    await removeOfflineTranslation(translation);
    setMessage("Downloaded chapters removed from this device.");
    setError("");
    await refreshStats();
  };

  const percent = Math.round((progress.completed / totalChapters) * 100);

  return (
    <section className="offline-download-panel">
      <div className="offline-download-heading">
        <div>
          <span className="eyebrow">READ WITHOUT INTERNET</span>
          <h2>Offline Bible downloads</h2>
          <p>Download a translation once. FaithSteps saves chapters on this device and uses them offline.</p>
        </div>
        <HardDrive size={25} />
      </div>

      <label className="offline-version-label" htmlFor="offline-translation">Bible translation</label>
      <select id="offline-translation" value={translation} disabled={running} onChange={e => { setTranslation(e.target.value); setMessage(""); setError(""); }}>
        {versions.map(version => <option key={version.id} value={version.id}>{version.label}</option>)}
      </select>

      <div className="offline-stats-row">
        <div><strong>{stats.chapters.toLocaleString()} / {totalChapters.toLocaleString()}</strong><span>chapters saved</span></div>
        <div><strong>{formatBytes(stats.bytes)}</strong><span>stored on this device</span></div>
      </div>

      <div className="offline-progress-track" role="progressbar" aria-valuenow={stats.chapters} aria-valuemin="0" aria-valuemax={totalChapters}>
        <span style={{ width: `${Math.min(100, (stats.chapters / totalChapters) * 100)}%` }} />
      </div>

      {running && (
        <div className="offline-current">
          <span>Processing {progress.book} {progress.chapter || ""}</span>
          <strong>{progress.completed.toLocaleString()} / {totalChapters.toLocaleString()} ({percent}%)</strong>
        </div>
      )}

      <div className="offline-actions">
        <button className="btn primary" onClick={startDownload} disabled={running}>
          <Download size={16} /> {stats.chapters ? "Download / resume entire Bible" : "Download entire Bible"}
        </button>
        {running && <button className="btn secondary" onClick={() => { cancelRef.current = true; }}><Pause size={16}/> Pause</button>}
        {!running && stats.chapters > 0 && <button className="btn secondary" onClick={clearDownload}><Trash2 size={16}/> Delete</button>}
      </div>

      <div className="offline-network-note">
        {online ? <Wifi size={15}/> : <WifiOff size={15}/>}
        {online ? "Internet connected — ready to download." : "Offline — connect to the internet to download missing chapters."}
      </div>
      {message && <p className="offline-message"><CheckCircle2 size={16}/>{message}</p>}
      {error && <pre className="offline-error">{error}</pre>}
      <small className="offline-footnote">
        Downloads use your selected translation's static file (when available), then fall back to its configured Bible source. Missing chapters can be retried; saved chapters are not downloaded again. Keep FaithSteps open while downloading.
      </small>
    </section>
  );
}
