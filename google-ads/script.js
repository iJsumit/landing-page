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

const modulesData = [
    {
        number: "01",
        title: "Google Ads Overview",
        chapters: [
            "Google Ads Introduction & Account Setup",
            "Google Ads Auction, Network, Ad Rank, Quality Score",
            "Google Ads Account Stucture, Metrics, Account Navigation",
            "Search Campaign"
        ]
    },
    {
        number: "02",
        title: "Introduction To Keywords",
        chapters: [
            "Keyword Research, Selection & Planner Tool",
            "Keyword Match Types",
            "Negative Keywords & Lists",
            "Search Terms"
        ]
    },
    {
        number: "03",
        title: "Introduction To Ads & Extensions",
        chapters: [
            "Google Ads Formats Overview",
            "Responsive Search Ad",
            "Dynamic Search Ad",
            "Responsive Display Ad",
            "Call Ad",
            "Google Ads Extensions Overview",
            "Sitelink Extension",
            "Call Extension",
            "Callout Extension",
            "Location Extension",
            "Structured Snippet Extension",
            "Price Extension",
            "Promotion Extension",
            "Lead Form Extension",
            "Google My Business",
            "App Extensions",
            "Business Name & Business Logo",
            "Keyword Insertion",
            "Countdown",
            "Location Insertion"

        ]
    },
    {
        number: "04",
        title: "Bidding Strategies",
        chapters: [
            "Bidding Strategies Overview",
            "Manual CPC",
            "Maximize Clicks",
            "Max Conversion",
            "Max Conversion Value",
            "Target Impression Share",
            "Target CPA",
            "Target ROAS",
            "Enhanced CPC",
            "CPM Bidding",
            "CPV Bidding"
        ]
    },
    {
        number: "05",
        title: "Introduction to Display Network",
        chapters: [
            "Display Network & Targeting",
            "Affinity",
            "Demographics",
            "Detailed Demographics",
            "In-Market",
            "Life Events",
            "Topics",
            "Placements",
            "Display Keywords",
            "Custom Audiences",
            "Combined Audiences",
            "Standard Disaplay Campaign"
        ]
    },
    {
        number: "06",
        title: "Introduction to Conversion Tracking",
        chapters: [
            "Conversion Tracking Overview",
            "Website Conversion Tracking",
            "App Conversion Tracking",
            "Phone Conversion Tracking",
            "Import - Google Analytics Conversion Tracking",
            "Measurement - Attribution"
        ]
    },
    {
        number: "07",
        title: "Introduction to Remarketing",
        chapters: [
            "Remarketing Overview",
            "Audience Manager",
            "Remarketing Campaign",
            "App Users",
            "Youtube Remarket",
            "Customer List",
            "Custom Combination",
            "Google Analytics",
            "Lead Form Segment",
        ]
    },
    {
        number: "08",
        title: "Introduction to Video Ads",
        chapters: [
            "Youtube Overview",
            "Skippable Ad Campaign",
            "In-Feed Ad Campaign",
            "Bumper Ad Campaign",
            "15 Sec Non-Skippable Ad Campaign",
            "Ad Sequence Campaign",
            "Target Frequency Campaign",
            "Audio Ads Campaign"
        ]
    },
    {
        number: "09",
        title: "Introduction to Shopping Ads",
        chapters: [
            "Shopping Ads Overview",
            "Google Merchant Centre Account",
            "Create Shopping Campaign"
        ]
    },
    {
        number: "10",
        title: "Introduction To Performance Max",
        chapters: ["Performance Max Campaign Creation"]
    },
    {
        number: "11",
        title: "Introduction: Mobile App, Smart and Demand Gen Campaign",
        chapters: ["Universal App Campaigns", "Smart Campaigns", "Demand Gen Campaigns"]
    },
    {
        number: "12",
        title: "Introduction to Reports",
        chapters: ["Reports"]
    },
    {
        number: "13",
        title: "Introduction to Shared Library",
        chapters: [
            "Audience Manager",
            "Location Groups",
            "Exclusion Lists",
            "Asset Library",
            "Brand Lists"
        ]
    },
    {
        number: "14",
        title: "Introduction to Bulk Actions",
        chapters: ["Automated Rules", "Scripts", "Solutions"]
    },
    {
        number: "15",
        title: "Budgets & Bidding",
        chapters: ["Shared Budgets", "Portfolio Bid Strategies", "Seasonality Adjustments"]
    },
    {
        number: "16",
        title: "Introduction to Planning",
        chapters: [
            "Keyword Planner Tool",
            "Performance Planner Tool",
            "Reach Planner Tool",
            "App Advertising Hub"
        ]
    },
    {
        number: "17",
        title: "Introduction to More Tools",
        chapters: [
            "Google Tag",
            "Content Suitability",
            "Ad Customizers",
            "Page Feed",
            "Dynamic Ad Feed",
            "Hotel Properties feed",
            "Policy Manager",
            "Ad Preview & Diagnosis"
        ]
    },
    {
        number: "18",
        title: "Campaign Drafts & Experiments",
        chapters: ["Drafts & Experiments"]
    },
    {
        number: "19",
        title: "Introduction to Billing",
        chapters: ["Google Ads Billing Navigation"]
    },
    {
        number: "20",
        title: "Introduction to Google Ads Editor",
        chapters: ["Google Ads Editor"]
    },
    {
        number: "21",
        title: "Introduction to Manager Accounts",
        chapters: ["Manager Accounts"]
    },
    {
        number: "22",
        title: "Introduction To Google Ads Online Resources",
        chapters: ["Google Ads Online Resources"]
    },
    {
        number: "23",
        title: "Introduction To Google Ads Certifications",
        chapters: ["Google Ads Certifications"]
    },
    {
        number: "24",
        title: "Google Ads Using AI",
        chapters: ["Suggestions Based On Bard - Google AI", "Suggestions Based On ChatGPT"]
    },
    {
        number: "25",
        title: "Industry/Business Case Studies",
        chapters: ["Case Studies & Best Practices"]
    },
    {
        number: "26",
        title: "Google Ads Optimizations",
        chapters: [
            "Setting up a high-performing Google Ads account",
            "Bidding Strategies & Budget Optimization",
            "Quality Score Optimization",
            "Audience Targeting & Retargeting",
            "Negative Keywords & Search Term Optimization",
            "PMax Campaign Optimization",
            "Landing Page Optimization",
            "Competitor Analysis & Ad Spy Tools",
            "Google Ads Policy Compliance & Common Mistakes"
        ]
    }
];



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

const modulesContainer = document.getElementById("modulesContainer");

modulesData.forEach((module) => {
    const details = document.createElement("details");
    details.className =
        "module-card group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300";

    details.innerHTML = `
    <summary class="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-50 transition">
      <div class="flex items-center gap-4">
        <span class="text-2xl font-black text-slate-200 group-hover:text-gBlue transition">
          ${module.number}
        </span>
        <h3 class="font-bold text-slate-800">
          ${module.title}
        </h3>
      </div>
      <i class="fa fa-plus text-slate-300 group-open:rotate-45 transition-transform"></i>
    </summary>

    <div class="px-5 pb-5 pl-16 bg-slate-50/50">
      <ul class="list-disc space-y-2 text-sm text-slate-600 pl-4 marker:text-gBlue">
        ${module.chapters.map(ch => `<li>${ch}</li>`).join("")}
      </ul>
    </div>
  `;

    modulesContainer.appendChild(details);
});




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

            if (res.ok) {
                // console.log(res);
                const params = new URLSearchParams({
                    'FirstName': encodeURIComponent(firstName),
                    'LastName': encodeURIComponent(lastName),
                    'EmailAddress': document.querySelector('[name="email"]').value,
                    'PhoneNumber': encodeURIComponent(phone),
                    'Course': 'Google_Ads', // Set the course name here
                    'Cart': '42023'          // Using the ID you provided earlier
                });
                // Redirect to your processing file
                window.location.href = `https://www.ijaipuria.com/aidm/process.php?${params.toString()}`;
            };
            if (!res.ok) throw new Error("Server error");

            form.reset();
            // if (typeof closePopup === "function") closePopup();


        } catch (err) {
            console.error("FORM SUBMIT ERROR:", err);
            // alert("Something went wrong. Please try again.");
        }
    });
});

