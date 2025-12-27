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

    // ===== STEP 1: Capture UTM from URL & store =====
    const urlParams = new URLSearchParams(window.location.search);

    const utmData = {
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        utm_content: urlParams.get("utm_content") || "",
        utm_term: urlParams.get("utm_term") || ""
    };

    localStorage.setItem("utm_data", JSON.stringify(utmData));

    // ===== STEP 2: Form Handling =====
    const form = document.getElementById("enrollForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Clear old errors
        form.querySelectorAll(".error").forEach(err => {
            err.textContent = "";
            err.classList.add("hidden");
        });

        let isValid = true;

        const firstNameInput = form.querySelector('[name="fName"]');
        const lastNameInput = form.querySelector('[name="lName"]');
        const emailInput = form.querySelector('[name="email"]');
        const phoneInput = form.querySelector('[name="phone"]');

        const firstName = firstNameInput?.value.trim() || "";
        const lastName = lastNameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const phone = phoneInput?.value.trim() || "";

        const showError = (input, msg) => {
            if (!input) return;
            const el = input.parentElement.querySelector(".error");
            if (el) {
                el.textContent = msg;
                el.classList.remove("hidden");
            }
            isValid = false;
        };

        // Validations
        if (!firstName) showError(firstNameInput, "First name required");
        if (!lastName) showError(lastNameInput, "Last name required");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) showError(emailInput, "Email required");
        else if (!emailRegex.test(email)) showError(emailInput, "Invalid email");

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone) showError(phoneInput, "Phone required");
        else if (!phoneRegex.test(phone)) showError(phoneInput, "Invalid phone");

        if (!isValid) return;

        // ===== STEP 3: Prepare Payload =====
        const payload = new FormData();

        payload.append("fName", firstName);
        payload.append("lName", lastName);
        payload.append("email", email);
        payload.append("phone", phone);

        const storedUTM = JSON.parse(localStorage.getItem("utm_data")) || {};

        payload.append("utm_source", storedUTM.utm_source);
        payload.append("utm_medium", storedUTM.utm_medium);
        payload.append("utm_campaign", storedUTM.utm_campaign);
        payload.append("utm_content", storedUTM.utm_content);
        payload.append("utm_term", storedUTM.utm_term);

        // Debug (important)
        console.log("FINAL SUBMIT DATA:");
        for (let pair of payload.entries()) {
            console.log(pair[0] + ":", pair[1]);
        }

        // ===== STEP 4: Submit =====
        try {
            const res = await fetch("mail.php", {
                method: "POST",
                body: payload
            });

            console.log(res);

            if (res.ok) {
                const razorpayURL =
                    "https://pages.razorpay.com/ijgoogleads" +
                    "?first_name=" + encodeURIComponent(firstName) +
                    "&last_name=" + encodeURIComponent(lastName) +
                    "&email=" + encodeURIComponent(email) +
                    "&phone=" + encodeURIComponent(phone);

                window.location.href = razorpayURL;

            };


            if (!res.ok) throw new Error("Server error");

            form.reset();
            if (typeof closePopup === "function") closePopup();

            // Optional redirect
            // window.location.href = "/thank-you.html";

        } catch (err) {
            console.error("FORM SUBMIT ERROR:", err);
            alert("Something went wrong. Please try again.");
        }
    });
});

