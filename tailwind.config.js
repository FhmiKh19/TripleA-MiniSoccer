import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        display: ['Plus Jakarta Sans', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          gold:      "#F0A500",
          goldLight: "#FFD166",
          dark:      "#080C14",
          surface:   "#0F1520",
          card:      "#141B28",
          cardHover: "#1A2235",
          border:    "rgba(255,255,255,0.07)",
          borderGold:"rgba(240,165,0,0.3)",
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #F0A500, #FFD166)',
        'gradient-dark': 'linear-gradient(135deg, #0F1520, #141B28)',
        'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(240,165,0,0.1) 0%, transparent 60%)',
      },
      boxShadow: {
        'gold':    '0 4px 20px rgba(240,165,0,0.3)',
        'gold-lg': '0 8px 40px rgba(240,165,0,0.35)',
        'card':    '0 4px 24px rgba(0,0,0,0.4)',
        'card-lg': '0 12px 48px rgba(0,0,0,0.5)',
        'glow':    '0 0 30px rgba(240,165,0,0.2)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.25s ease-out',
        'float':      'float 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:     { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGold: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(240,165,0,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(240,165,0,0)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
