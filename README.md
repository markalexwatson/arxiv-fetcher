# arXiv Batch Downloader

A Progressive Web App (PWA) for downloading multiple arXiv papers as a single ZIP file.

**Version:** 0.1.2

## Features

- **Paste & Parse**: Paste tables from spreadsheets, markdown, or plain text containing arXiv links
- **Smart Extraction**: Automatically extracts arXiv IDs and associated paper titles, including Google redirect URLs
- **Batch Download**: Download selected papers as a single ZIP file
- **CORS Proxy Support**: Configurable proxy with fallback chain (includes Cloudflare Worker for reliable self-hosting)
- **Offline Ready**: PWA with service worker — install to your device for quick access
- **Progress Tracking**: Real-time console logging and per-paper status indicators
- **Fallback Options**: "Open Failed in Browser" button for manual download when proxies fail

## Quick Start

1. Visit the app (GitHub Pages or local)
2. Paste a table containing arXiv links
3. Click **Parse Content**
4. Select papers to download
5. Click **Download Selected as ZIP**

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
- Versioned papers: `2301.12345v2`

## Deployment

### GitHub Pages

1. Fork or clone this repository
2. Enable GitHub Pages in repository settings (Settings → Pages)
3. Set source to deploy from branch (main/master)
4. Access at `https://yourusername.github.io/repo-name/`

The app works correctly in subdirectories — no path configuration needed.

### Local Development

Open `index.html` directly, or serve with any static file server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## CORS Proxy Setup

arXiv doesn't serve CORS headers, so requests must go through a proxy. The app includes fallback public proxies, but they're rate-limited and unreliable.

### Recommended: Self-Hosted Cloudflare Worker (Free)

Deploy your own proxy in 5 minutes for reliable, fast downloads.

#### Quick Deploy (No CLI)

1. Sign up at [Cloudflare](https://dash.cloudflare.com/sign-up) (free)
2. Go to **Workers & Pages** → **Create Application** → **Create Worker**
3. Name it (e.g., `arxiv-proxy`)
4. Click **Edit Code** and paste the contents of `cloudflare-worker/worker.js`
5. Click **Save and Deploy**
6. Copy your worker URL

#### Configure the App

In the app's **Settings**, set CORS Proxy URL to:
```
https://your-worker-name.your-subdomain.workers.dev/?url=
```

Note the `?url=` at the end — this is required.

#### Benefits

- **Free tier**: 100,000 requests/day
- **Fast**: Cloudflare's global edge network
- **Secure**: Only proxies arxiv.org domains
- **Reliable**: You control it

See `cloudflare-worker/README.md` for advanced configuration.

### Fallback Public Proxies

The app falls back to these if your configured proxy fails:
- `corsproxy.io`
- `api.allorigins.win`
- `api.codetabs.com`

These are rate-limited and may fail during heavy use.

## Configuration

Access settings via the **⚙ Settings** panel:

| Setting | Default | Description |
|---------|---------|-------------|
| CORS Proxy URL | `https://corsproxy.io/?` | Proxy endpoint (add your Cloudflare Worker here) |
| Request Delay | 1000ms | Delay between downloads to avoid rate limiting |

Settings persist in localStorage.

## PWA Installation

The app can be installed as a standalone application:

**Chrome/Edge:**
- Click the install icon in the address bar, or
- Menu → "Install arXiv Batch Downloader"

**Safari (iOS):**
- Share → "Add to Home Screen"

**Firefox:**
- Not supported (Firefox removed PWA support on desktop)

## Troubleshooting

### "All proxies failed" errors
- Deploy your own Cloudflare Worker (see above)
- Try increasing the request delay in Settings
- Use "Open Failed in Browser" button for manual download

### Papers marked as "Not found" (404)
- Verify the arXiv ID is correct
- Some very old papers may not have PDFs available

### Proxy test fails with 405
- Ensure your proxy URL ends with `?url=`
- If using Cloudflare Worker, redeploy with the latest `worker.js`

### PWA won't install
- Check DevTools → Application → Manifest for errors
- Ensure you're on HTTPS (required for PWA)
- Try unregistering old service workers and hard refresh

### ZIP file is empty
- Check the console for error messages
- Ensure at least one paper downloaded successfully

## File Structure

```
├── index.html              # Main application (CSS/JS inlined)
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline support
├── icon-192.png            # App icon (192x192)
├── icon-512.png            # App icon (512x512)
├── README.md               # This file
└── cloudflare-worker/
    ├── worker.js           # Cloudflare Worker proxy script
    ├── wrangler.toml       # Wrangler CLI configuration
    └── README.md           # Worker deployment guide
```

## Privacy

- No analytics or tracking
- No data sent to external servers except:
  - Your configured CORS proxy
  - arxiv.org (to fetch PDFs)
- Paper lists are not persisted (only settings stored in localStorage)
- Works entirely client-side

## Browser Support

| Browser | Supported | PWA Install |
|---------|-----------|-------------|
| Chrome 80+ | ✅ | ✅ |
| Edge 80+ | ✅ | ✅ |
| Firefox 75+ | ✅ | ❌ |
| Safari 14+ | ✅ | ✅ (iOS) |

## Known Limitations

1. **CORS dependency**: Requires a proxy for arXiv downloads
2. **Memory usage**: Large batches (50+ papers) may consume significant memory
3. **No resume**: Progress lost if browser tab is closed mid-download
4. **Title extraction**: Titles come from pasted content, not arXiv metadata API

## Changelog

### v0.1.2
- Fixed PWA installation for subdirectory hosting (GitHub Pages)
- Fixed manifest and service worker paths

### v0.1.1
- Reduced console spam (Google redirect warning now shows once)
- Increased default request delay to 1000ms
- Added third fallback proxy (codetabs.com)
- Added exponential backoff on consecutive failures
- Added "Open Failed in Browser" button for manual fallback
- Added Cloudflare Worker for self-hosted proxy

### v0.1.0
- Initial release
- Markdown, TSV, HTML, and plain text parsing
- Google redirect URL extraction
- ZIP download with JSZip
- Console logging
- Offline support via service worker

## License

MIT License — use freely for personal or commercial projects.
