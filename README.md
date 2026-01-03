# ArXiv Bulk Fetcher 📄⬇️

A lightweight Progressive Web App (PWA) that extracts arXiv IDs from any text block or table and batch downloads the PDFs automatically.

Designed for researchers and students who need to grab multiple papers from a chat summary, reference list, or bibliography without clicking download on each one manually.

## 🚀 Features

* **Smart Scanning:** Pasting a block of text (e.g., a chatGPT summary, a bibliography, or a Markdown table) automatically detects valid arXiv IDs (e.g., `2502.16923`).
* **Batch Download:** Select which papers you want and download them all with one click.
* **PWA Ready:** Installs as a native app on ChromeOS, Windows, and macOS. Works offline (interface only).
* **Privacy First:** Runs entirely in your browser. No data is sent to any external server.

## 📦 How to Install (ChromeOS / Desktop)

This app is designed to be installed as a PWA via GitHub Pages.

### 1. Deploy
1.  Fork or upload these files (`index.html`, `manifest.json`, `sw.js`) to a GitHub repository.
2.  Go to **Settings** > **Pages**.
3.  Set **Source** to `Deploy from a branch` (usually `main` / `root`).
4.  Wait for the "Your site is live" link.

### 2. Install to Device
1.  Visit your GitHub Pages URL (e.g., `https://your-username.github.io/arxiv-fetcher`).
2.  Look for the **Install icon** in the right side of your browser's address bar (or in the "three dots" menu > "Install ArXiv Bulk Fetcher").
3.  The tool will launch in its own window and pin to your shelf/dock.

## 🛠 Usage

1.  **Paste:** Copy a list of papers, a markdown table, or a conversation summary into the text box.
2.  **Scan:** Click **Scan Text**. The app will list all detected papers.
3.  **Initialize Permissions:**
    * *Important:* Click the **⚠️ Allow Multi-DL** button once.
    * Chrome will likely block the batch download initially. Look for a **"Pop-up blocked"** icon in your address bar.
    * Click it and select **"Always allow..."**.
4.  **Download:** Select the papers you want and click **Download Selected**.

## 📂 Project Structure

* `index.html`: The core application logic and interface.
* `manifest.json`: Configuration file that allows the website to be installed as a standalone app.
* `sw.js`: A simple Service Worker required to satisfy PWA installation criteria.

## 📝 License

Unlicense / Public Domain. Feel free to use, modify, and share.
