module.exports = {
    content: [
        "./index.html",
        "./script.js"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', "sans-serif"],
                mono: ['"JetBrains Mono"', "monospace"],
            },

            colors: {
                gBlue: "#1a73e8",
                gRed: "#ea4335",
                gYellow: "#fbbc04",
                gGreen: "#34a853",
                slate: {
                    850: "#151f32",
                    900: "#0f172a",
                },
            },

            boxShadow: {
                pop: "0 10px 40px -10px rgba(26,115,232,0.25)",
                "pop-hover": "0 20px 60px -15px rgba(26,115,232,0.4)",
                card: "0 0 0 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.05)",
            },

            animation: {
                "bounce-slow": "bounce 3s infinite",
                float: "float 6s ease-in-out infinite",
                draw: "draw 2s ease-out forwards",
            },

            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                draw: {
                    "0%": { strokeDasharray: "1000", strokeDashoffset: "1000" },
                    "100%": { strokeDasharray: "1000", strokeDashoffset: "0" },
                },
            },
        },
    },

    safelist: [
        // custom colors
        "text-gRed",
        "text-gBlue",
        "text-gGreen",
        "text-gYellow",
        "bg-gRed",
        "bg-gBlue",
        "bg-gGreen",
        "bg-gYellow",
        "border-gRed",
        "border-gBlue",
        "border-gGreen",
        "border-gYellow",

        // states / variants
        "group",
        "group-open:rotate-45",
        "group-open:rotate-180",
        "marker:text-gBlue",

        // JS injected classes
        "bg-white",
        "bg-slate-50",
        "bg-slate-50/50",
        "border",
        "border-slate-200",

        // arbitrary values (tumhari design ke liye CRITICAL)
        { pattern: /bg-\[.*\]/ },
        { pattern: /\[background-size:.*\]/ },
        { pattern: /blur-\[.*\]/ },
        { pattern: /z-\[.*\]/ },
        { pattern: /w-\[.*\]/ },
        { pattern: /h-\[.*\]/ },
        { pattern: /animate-\[.*\]/ },
    ],

    plugins: [],
};
