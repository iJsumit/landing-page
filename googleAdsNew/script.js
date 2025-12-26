tailwind.config = {
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
};


// Countdown Timer
let time = 48 * 60 * 60;
setInterval(() => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;
    document.getElementById("timer").innerText = `${h
        .toString()
        .padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    time--;
}, 1000);



const popup = document.getElementById("enrollPopup");

function openPopup() {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closePopup() {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
    document.body.style.overflow = "";
}

// Bind all buttons with data-popup
document.querySelectorAll("[data-popup]").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        openPopup();
    });
});

// Outside click close
popup.addEventListener("click", e => {
    if (e.target === popup) closePopup();
});

// Form submission handling 

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("enrollForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();

        // ❌ Empty check
        if (!firstName || !lastName || !email || !phone) {
            alert("Please fill all required fields");
            return;
        }

        // ❌ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            form.email.focus();
            return;
        }

        // ❌ Phone validation (India-safe)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number");
            form.phone.focus();
            return;
        }

        // ✅ ALL GOOD
        const formData = {
            firstName,
            lastName,
            email,
            phone
        };

        console.log("ENROLL FORM DATA 👉", formData);

        // OPTIONAL
        // form.reset();
        // closePopup();  // agar popup band karna ho
    });
});
