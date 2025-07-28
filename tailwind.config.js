/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"  // React fayllarni qamrab oladi
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6A5AE0",
                soft: "#F4F7FE",
                card: "#FFFFFF",
                textMain: "#2F2F2F"
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"]
            }
        }
    },
    plugins: []
}
