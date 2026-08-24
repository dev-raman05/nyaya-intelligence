import os
import json

base_dir = r"C:\Users\yoram\.gemini\antigravity\scratch\nyaya-intelligence\frontend"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

files = {}

files["package.json"] = """
{
  "name": "nyaya-intelligence",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.29",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-force-graph-2d": "^1.26.10",
    "lucide-react": "^0.470.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.4"
  }
}
"""

files["next.config.js"] = """
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*'
      }
    ]
  }
}
module.exports = nextConfig
"""

files["tailwind.config.js"] = """
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nyaya: {
          bg: '#08111F',
          surface: '#101D2D',
          border: '#263548',
          accent: '#F59E0B',
          verified: '#10B981',
          info: '#38BDF8',
          warning: '#F59E0B',
          critical: '#EF4444',
          text: '#F8FAFC',
          secondary: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-source-serif)']
      }
    },
  },
  plugins: [],
}
"""

files["postcss.config.js"] = """
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"""

files["jsconfig.json"] = """
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
"""

files["src/app/globals.css"] = """
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  background-color: #08111F;
  color: #F8FAFC;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #08111F; 
}
::-webkit-scrollbar-thumb {
  background: #263548; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94A3B8; 
}
"""

for path, content in files.items():
    write_file(path, content)

print("Config files written.")
