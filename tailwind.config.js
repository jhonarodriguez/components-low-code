/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores del sistema (tomados del legacy)
      colors: {
        primary: {
          DEFAULT: '#304FFD',
          dark: '#263fca',
          light: '#5470ff',
        },
        secondary: {
          DEFAULT: '#8A9099',
          light: '#B0B5BA',
        },
        gray: {
          text: '#3F434A',
          secondary: '#8A9099',
          border: '#E8E9EB',
          bg: '#F7F8FA',
        },
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      
      // Sombras del sistema
      boxShadow: {
        'button': '0 4px 0px #263fca',
        'button-hover': '0 8px 16px 0 #304CFD33',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      
      // Bordes redondeados consistentes
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
      },
      
      // Transiciones estandarizadas
      transitionDuration: {
        'DEFAULT': '200ms',
      },
    },
  },
  plugins: [],
}