const API_KEY = "AIzaSyBIqr-3IbJ4eKctUmqOTxLdsmdTxJXQ2G4";

function init() {
  setInterval(() => {
    if (location.href.includes("watch")) {
      createButton();
    }
  }, 2000);
}

function createButton() {
  if (!location.href.includes("watch")) return;
  if (document.getElementById("playNextBtn")) return;

  const btn = document.createElement("button");
  btn.id = "playNextBtn";
  btn.innerText = "▶ Play next in order";

  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.padding = "12px 18px";
  btn.style.background = "#ff0000";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";
  btn.style.zIndex = "9999";

  btn.onclick = playNextInOrder;
  document.body.appendChild(btn);
}

async function playNextInOrder() {
  try {
    const videoId = new URLSearchParams(location.search).get("v");

    // Step 1 — Get channel from video
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet`
    );

    const videoData = await videoRes.json();
    const channelId = videoData.items?.[0]?.snippet?.channelId;

    // Step 2 — Get uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=contentDetails`
    );

    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    let nextPageToken = "";
    let previousVideoId = null;

    while (true) {
      const listRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=50&pageToken=${nextPageToken}`
      );

      const listData = await listRes.json();

      for (const item of listData.items) {
        const currentId = item.snippet.resourceId.videoId;

        if (previousVideoId === videoId) {
          location.href = `https://www.youtube.com/watch?v=${currentId}`;
          return;
        }

        previousVideoId = currentId;
      }

      if (!listData.nextPageToken) break;
      nextPageToken = listData.nextPageToken;
    }

    alert("Reached end — no next video found");

  } catch (err) {
    console.error(err);
    alert("Error occurred — check console");
  }
}

init();
