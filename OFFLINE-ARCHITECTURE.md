# FaithSteps hybrid offline Bible architecture

## How chapter loading works

1. The app checks IndexedDB on the user's device.
2. If the chapter is not saved, it checks for a static translation manifest at:
   `/bible-data/<translation>/manifest.json`
3. If the manifest and static chapter file exist, it downloads that file from the FaithSteps host/CDN.
4. If no static manifest/file exists, it falls back to the existing Bible API (WEB/KJV) or Telugu JSON source.
5. The chapter is saved in IndexedDB so it can be read offline next time.

## Static JSON file layout

To enable the static/CDN source for a translation, place files under `public/bible-data/`:

```text
public/
  bible-data/
    web/
      manifest.json
      genesis/1.json
      genesis/2.json
      john/1.json
    kjv/
      manifest.json
      genesis/1.json
    telotsa/
      manifest.json
      genesis/1.json
```

Each chapter JSON file must have the same response shape as the current reader expects:

```json
{
  "reference": "John 3",
  "translation_name": "World English Bible",
  "translation_note": "Translation attribution",
  "verses": [
    { "verse": 1, "text": "..." }
  ]
}
```

Each `manifest.json` must contain:

```json
{
  "formatVersion": 1,
  "translation": "web"
}
```

Use `web`, `kjv`, or `telotsa` for the translation value. The manifest prevents unnecessary 404 checks when a static translation has not yet been uploaded.

## Download manager

Settings > Offline Bible downloads downloads all 1,189 chapters for the selected translation, one at a time. It:
- skips chapters already in IndexedDB;
- retries temporary network errors;
- records failed chapters and continues;
- supports pause and resume;
- shows locally stored chapter count and approximate JSON storage size.

Keep the app open while a download runs. Browser/Android operating-system background limits may pause a long download if the app is closed or suspended.

## Legal and deployment notes

Only publish translation files if their licence permits redistribution. Public API availability does not itself grant redistribution rights. The API fallback remains available if static files have not been generated and deployed.
