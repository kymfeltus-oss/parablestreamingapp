import os
import urllib.request

print("⬇️ Downloading Test Video...")

if not os.path.exists("public"):
    os.makedirs("public")

# Reliable Google Sample Video
video_url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"

try:
    req = urllib.request.Request(
        video_url, 
        data=None, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response, open("public/praise_break.mp4", 'wb') as out_file:
        out_file.write(response.read())
    print("✅ Video Downloaded: public/praise_break.mp4")
except Exception as e:
    print(f"❌ Error downloading video: {e}")