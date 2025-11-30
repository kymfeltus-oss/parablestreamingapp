import os
import urllib.request

print("⬇️ Downloading Images...")

if not os.path.exists("public"):
    os.makedirs("public")

def download(url, filename):
    try:
        # Pretend to be a browser so it doesn't get blocked
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            out_file.write(response.read())
        print(f"✅ Saved: {filename}")
    except Exception as e:
        print(f"❌ Error downloading {filename}: {e}")

# High-Quality Images
download("https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600", "public/hero.jpg")
download("https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=800", "public/pastor_mike.jpg")
download("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", "public/course_lead.jpg")
download("https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800", "public/course_conf.jpg")
download("https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800", "public/course_music.jpg")