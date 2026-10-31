Optional static/CDN Bible content goes here.

For each translation create:
  web/manifest.json
  kjv/manifest.json
  telotsa/manifest.json

Each manifest must be JSON:
  {"formatVersion": 1, "translation": "web"}

Add chapter files at:
  <translation>/<book-slug>/<chapter-number>.json

Example:
  web/john/3.json

Each chapter file must contain a `verses` array:
  {"reference":"John 3","translation_name":"World English Bible",
   "translation_note":"Attribution","verses":[{"verse":1,"text":"..."}]}

If a translation manifest is absent, FaithSteps automatically falls back to
its configured live Bible API/source. Only host Bible text that you are
licensed to redistribute.
