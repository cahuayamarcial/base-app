import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Para habilitar el modo oscuro basado en clases
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "dark-main": "#13161c",
                "dark-second": "#1e2229",
                "mb-success": {
                    DEFAULT: "#0ae98a",
                    100: "rgba(10, 233, 138, 0.1)",
                    200: "rgba(10, 233, 138, 0.2)",
                    300: "rgba(10, 233, 138, 0.3)",
                    400: "rgba(10, 233, 138, 0.4)",
                    500: "rgba(10, 233, 138, 0.5)",
                    600: "rgba(10, 233, 138, 0.6)",
                    700: "rgba(10, 233, 138, 0.7)",
                    800: "rgba(10, 233, 138, 0.8)",
                    900: "rgba(10, 233, 138, 0.9)"
                },
                "light-white": "rgba(255, 255, 255, 0.18)",
            }
        },
    },

    plugins: [forms, typography],
};
