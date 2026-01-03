# arXiv Batch Downloader

A Progressive Web App (PWA) for downloading multiple arXiv papers as a single ZIP file.

**Version:** 0.1.0

## Features

- **Paste & Parse**: Paste tables from spreadsheets, markdown, or plain text containing arXiv links
- **Smart Extraction**: Automatically extracts arXiv IDs and associated paper titles
- **Batch Download**: Download selected papers as a single ZIP file
- **CORS Proxy Support**: Configurable proxy chain for bypassing arXiv's CORS restrictions
- **Offline Ready**: PWA with service worker for offline access to the app shell
- **Progress Tracking**: Real-time console logging and status indicators

## Supported Input Formats

- **Markdown tables** with `|` delimiters
- **Tab-separated values** (copy from Excel/Google Sheets)
- **HTML tables**
- **Plain text** with arXiv URLs inline

The parser handles various URL formats including:
- Direct arXiv links: `arxiv.org/abs/2301.12345` or `arxiv.org/pdf/2301.12345.pdf`
- Google search redirects: `google.com/search?q=https://arxiv.org/pdf/...`
- ar5iv.org alternative domain
- Legacy arXiv format: `hep-th/9901001`

## Usage

1. **Paste content**: Copy a table or text containing arXiv links and paste into the input area
2. **Parse**: Click "Parse Content" to extract papers
3. **Select**: Use checkboxes to select which papers to download (all selected by default)
4. **Download**: Click "Download Selected as ZIP" to fetch PDFs and create the archive

## Installation

### GitHub Pages Deployment

1. Fork or clone this repository
2. Enable GitHub Pages in repository settings (Settings → Pages)
3. Set source to the branch containing these files
4. Access at `https://yourusername.github.io/repository-name/`

### Local Development

Simply open `index.html` in a web browser, or serve with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## Configuration

### CORS Proxy

arXiv doesn't serve CORS headers, so requests must go through a proxy. The app uses a fallback chain:

1. `https://corsproxy.io/?` (default)
2. `https://api.allorigins.win/raw?url=`

You can configure a custom proxy URL in Settings. The proxy must:
- Accept the target URL as a query parameter
- Return the response with appropriate CORS headers

### Request Delay

To avoid rate limiting, requests are spaced by a configurable delay (default: 500ms). Adjust in Settings if you encounter 429 errors.

## Known Limitations

1. **CORS Dependency**: Relies on third-party CORS proxies which may be unreliable or rate-limited
2. **Memory Usage**: Large batches (50+ papers) may consume significant browser memory
3. **No Resume**: If the browser tab is closed, progress is lost
4. **Title Extraction**: Titles are extracted from the pasted content, not fetched from arXiv metadata

## Troubleshooting

### "All proxies failed" errors

- Try a different CORS proxy in Settings
- Reduce batch size and try again
- Wait a few minutes (may be rate limited)

### Papers marked as "Not found"

- Verify the arXiv ID is correct
- Some very old papers may not be available as PDF

### ZIP file is empty

- Check the console for error messages
- Ensure at least one paper downloaded successfully

## Privacy

- No data is sent to any server except the configured CORS proxy and arXiv
- Paper lists are not persisted (only settings are stored in localStorage)
- Works entirely client-side

## File Structure

```
├── index.html      # Main application (CSS/JS inlined)
├── manifest.json   # PWA manifest
├── sw.js          # Service worker
├── icon-192.png   # App icon (192x192)
├── icon-512.png   # App icon (512x512)
└── README.md      # This file
```

## Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 14+ (limited PWA features)

## License

MIT License - feel free to modify and redistribute.

## Changelog

### v0.1.0
- Initial release
- Basic parsing for markdown tables, TSV, HTML tables, and plain text
- Google redirect URL extraction
- CORS proxy fallback chain
- ZIP download with JSZip
- Console logging
- Offline support via service worker
