import os

# Create the missing PostCSS config
content = """module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};"""

with open("postcss.config.js", "w") as f:
    f.write(content)

print("✅ FIXED: postcss.config.js created.")