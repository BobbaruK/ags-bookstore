import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger-background))",
          foreground: "hsl(var(--danger-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning-background))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success-background))",
          foreground: "hsl(var(--success-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info-background))",
          foreground: "hsl(var(--info-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontSize: {
        heading1: "clamp(1.5rem, 1.1053rem + 1.9737vw, 3rem)", // 320 -> 1536; 24 -> 48
        heading2: "clamp(1.25rem, 0.9211rem + 1.6447vw, 2.5rem)", // 320 -> 1536; 20 -> 40
        heading3: "clamp(1.125rem, 0.8947rem + 1.1513vw, 2rem)", // 320 -> 1536; 18 -> 32
        heading4: "clamp(1rem, 0.8026rem + 0.9868vw, 1.75rem)", // 320 -> 1536; 16 -> 28
        heading5: "clamp(0.875rem, 0.7105rem + 0.8224vw, 1.5rem)", // 320 -> 1536; 14 -> 24
        heading6: "clamp(0.75rem, 0.6184rem + 0.6579vw, 1.25rem)", // 320 -> 1536; 12 -> 20
      },
      gridTemplateRows: {
        siteGrid: "auto 1fr auto",
      },
      lineHeight: {
        heading1: "clamp(2rem, 1.6053rem + 1.9737vw, 3.5rem)", // 320 -> 1536; 32 -> 56
        heading2: "clamp(1.75rem, 1.4211rem + 1.6447vw, 3rem)", // 320 -> 1536; 28 -> 48
        heading3: "clamp(1.5rem, 1.2368rem + 1.3158vw, 2.5rem)", // 320 -> 1536; 24 -> 40
        heading4: "clamp(1.375rem, 1.1447rem + 1.1513vw, 2.25rem)", // 320 -> 1536; 22 -> 36
        heading5: "clamp(1.25rem, 1.0526rem + 0.9868vw, 2rem)", // 320 -> 1536; 20 -> 32
        heading6: "clamp(1.125rem, 0.9605rem + 0.8224vw, 1.75rem)", // 320 -> 1536; 18 -> 28
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
