/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    // content: ["./src/**/*.{html,js}"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@shadcn/ui/components/**/*.js" // Add this line to include shadcn components
	  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
  ],
}