# ▶️ YouTube Play Next In Order — Chrome Extension

A simple Chrome extension that adds a **"Play next in order"** button on YouTube video pages.

Instead of YouTube recommending random videos, this extension finds the **next uploaded video from the same creator** and plays it — perfect for watching tutorials or series sequentially.

---

## 🚀 Features

- ✅ Adds "Play next in order" button on video page
- ✅ Detects channel automatically
- ✅ Fetches uploads using YouTube Data API
- ✅ Opens next video in upload order
- ✅ Works on most channels
- ✅ Lightweight and fast

---

## 🛠️ Tech Stack

- JavaScript
- Chrome Extensions API (Manifest V3)
- YouTube Data API v3

---

## 📦 Installation (Local)

1. Download or clone repo:

git clone https://github.com/SachinKumar15193/youtube-next-extension.git

2. Open Chrome:

chrome://extensions/

3. Enable **Developer Mode**

4. Click **Load unpacked**

5. Select project folder

Done ✅

---

## 🔑 Setup — YouTube API Key

1. Go to Google Cloud Console  
2. Enable **YouTube Data API v3**
3. Create API key
4. Paste key in:
If you see this at top of content.js:
const API_KEY = "your_real_key"
👉 Replace it with your real key like this:
const API_KEY = "AIzaSyXXXXXXX_your_real_key_here";

🔄 After pasting — VERY IMPORTANT
Reload extension:
1. Open :chrome://extensions/
2. Click: Reload

▶️ Usage
1. Open any YouTube video
2. Click "Play next in order"
3. Extension navigates to next uploaded video

📊 How It Works
1. Detect channel from video page
2. Get uploads playlist ID
3. Fetch latest uploads
4. Compare current video position
5. Open next video


