// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

function rem2px(input, fontSize = 16) {
    if (input == null) {
        return input
    }
    switch (typeof input) {
        case 'object':
            if (Array.isArray(input)) {
                return input.map((val) => rem2px(val, fontSize))
            }
            // eslint-disable-next-line no-case-declarations
            const ret = {}
            for (const key in input) {
                ret[key] = rem2px(input[key], fontSize)
            }
            return ret
        case 'string':
            return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * fontSize}px`)
        case 'function':
            return eval(input.toString().replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * fontSize}px`))
        default:
            return input
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        ...rem2px(defaultTheme),
        extend: {
            colors: {
                // Custom brand colors (purple/pink theme)
                brand: {
                    primary: '#7C3AED',      // Purple
                    secondary: '#EC4899',    // Pink
                    accent: '#F59E0B',       // Amber
                    light: '#F3E8FF',        // Light purple
                    dark: '#2d3748',         // Dark gray
                },
                chatbot: {
                    button: '#7C3AED',
                    'bot-bubble': '#F3E8FF',
                    'user-bubble': '#EC4899',
                    text: '#2d3748',
                }
            },
            borderRadius: {
                'chatbot': '24px',
            },
            fontFamily: {
                chatbot: ['Poppins', 'Open Sans', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    }
                },
                'slide-up': {
                    '0%': {
                        transform: 'translateY(10px)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                }
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-up': 'slide-up 0.3s ease-out'
            }
        }
    },
    plugins: [
      require('@tailwindcss/typography')
    ]
}
