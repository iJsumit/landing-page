/* ============================================================
   1. UTM PARAMETERS CAPTURE (Immediate Execution)
   ============================================================ */
const urlParams = new URLSearchParams(window.location.search);

const utmData = {
  utm_source: urlParams.get("utm_source") || "",
  utm_medium: urlParams.get("utm_medium") || "",
  utm_campaign: urlParams.get("utm_campaign") || "",
  utm_content: urlParams.get("utm_content") || "",
  utm_term: urlParams.get("utm_term") || "",
};

// Data ko browser me save kar lo
localStorage.setItem("utm_data", JSON.stringify(utmData));

const extraModules = [
  {
    img: 'img/Module 7_ Introduction to Remarketing.png',
    title: 'Module 7: Remarketing',
    list: ['Audience Manager & Lists', 'Youtube & App Users Remarketing', 'Customer List & Custom Combination', 'Lead Form Segment']
  },
  {
    img: 'img/Module 8_ Introduction to Video Ads.png',
    title: 'Module 8: Video Ads (YouTube)',
    list: ['Youtube Overview', 'Skippable & In-Feed Ads', 'Bumper & Non-Skippable Ads', 'Ad Sequence Campaign', 'Target Frequency & Audio Ads'],
    cols: true
  },
  {
    img: 'img/Module 9_ Introduction to Shopping Ads.png',
    title: 'Module 9: Shopping Ads',
    list: ['Shopping Ads Overview', 'Google Merchant Centre Account', 'Create Shopping Campaign']
  },
  {
    img: 'img/Module 10_ Introduction to Mobile App Campaign, Smart Campaign, Discovery Campaign.png',
    title: 'Module 10: Performance Max',
    list: ['Performance Max Overview', 'PMax Campaign Creation', 'Assignment']
  },
  {
    img: 'img/Module 11_ Introduction to Reports.png',
    title: 'Module 11 & 12: App, Smart & Demand Gen',
    list: ['Universal App Campaigns', 'Smart & Demand Gen Campaigns', 'Reporting Essentials']
  },
  {
    img: 'img/Module 12_ Introduction to Shared Library.png',
    title: 'Module 13: Shared Library',
    list: ['Audience Manager & Location Groups', 'Exclusion & Brand Lists', 'Asset Library']
  },
  {
    img: 'img/Module 13_ Introduction to Bulk Actions.png',
    title: 'Module 14: Bulk Actions',
    list: ['Automated Rules & Assignment', 'Scripts & Assignment', 'Solutions']
  },
  {
    img: 'img/module15.png',
    title: 'Module 15: Budgets & Bidding',
    list: ['Shared Budgets', 'Portfolio Bid Strategies', 'Seasonality Adjustments']
  },
  {
    img: 'img/Module 14_ Introduction to Planning.png',
    title: 'Module 16: Planning Tools',
    list: ['Keyword & Performance Planner', 'Reach Planner Tool', 'App Advertising Hub']
  },
  {
    img: 'img/Module 15_ Introduction to More Tools.png',
    title: 'Module 17 & 18: Advanced Tools',
    list: ['Google Tag & Content Suitability', 'Ad Customizers & Page Feed', 'Dynamic Ad & Hotel Feeds', 'Policy Manager', 'Drafts & Experiments'],
    cols: true
  },
  {
    img: 'img/Module 17_ Introduction to Billing.png',
    title: 'Modules 19-23: Admin & Certs',
    list: ['Billing Navigation', 'Google Ads Editor', 'Manager Accounts (MCC)', 'Online Resources', 'Google Ads Certifications']
  },
  {
    img: 'img/module24.png',
    title: 'Module 24: Google Ads Using AI',
    list: ['Suggestions Based On Gemini - Google AI', 'Suggestions Based On ChatGPT', 'Google Ads Practice Tests'],
    isNew: true
  },
  {
    img: 'img/25-Case studies.png',
    title: 'Module 25: Case Studies',
    list: ['Real Business Case Studies', 'Industry Best Practices']
  },
  {
    img: 'img/26-Google Ads Optimizations.png',
    title: 'Module 26: Optimizations',
    list: ['High-Performing Account Setup', 'Bidding, Budget, Quality Score', 'Audience & Negative Keywords', 'Competitor Analysis & Ad Spy Tools']
  }
];

document.getElementById('toggle-btn').addEventListener('click', function () {
  const container = document.getElementById('extra-modules-container');
  const btn = this;

  if (container.innerHTML === "") {
    let html = '';
    extraModules.forEach(mod => {
      html += `
                <div class="bg-brand-blue rounded-xl p-6 shadow-black-box text-white transform hover:-translate-y-1 transition duration-300 ${mod.isNew ? 'border border-brand-yellow/30 relative overflow-hidden' : ''}">
                    ${mod.isNew ? '<div class="absolute top-0 right-0 bg-brand-yellow text-black text-xs font-bold px-2 py-1 rounded-bl">NEW</div>' : ''}
                    <div class="flex flex-row items-start gap-4">
                        <img src="${mod.img}" class="w-20 h-20 object-contain bg-white/10 rounded-lg p-1" alt="icon" loading="lazy">
                        <div class="${mod.cols ? 'w-full' : ''}">
                            <h3 class="text-brand-orange text-xl font-bold mb-3">${mod.title}</h3>
                            <ul class="list-disc ml-5 space-y-1 text-sm text-gray-200 ${mod.cols ? 'columns-1 md:columns-2 gap-4' : ''}">
                                ${mod.list.map(li => `<li>${li}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>`;
    });
    container.innerHTML = html;
    btn.innerHTML = 'Show Less <i class="fa fa-chevron-up"></i>';
  } else {
    container.innerHTML = "";
    btn.innerHTML = 'See Full Curriculum <i class="fa fa-chevron-down"></i>';
    document.getElementById('curriculum-grid').scrollIntoView({ behavior: 'smooth' });
  }
});

// Toast Notification Logic
function showToast(message, type = 'error') {
  // 1. Container check ya create
  let container = document.querySelector('#toast-wrapper');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-wrapper';
    // Tailwind classes for positioning
    container.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-[90%] max-w-md';
    document.body.appendChild(container);
  }

  // 2. Toast element create
  const toast = document.createElement('div');

  // Type checking for colors
  const bgColor = type === 'error' ? 'bg-red-600' : 'bg-[#152450]'; // Brand Blue
  const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';

  // Tailwind classes for look and feel
  // 'animate-toast' humari custom class hai animation ke liye
  toast.className = `${bgColor} text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border-l-4 border-[#ef7800] animate-toast transition-all duration-500`;

  toast.innerHTML = `
        <i class="fa ${icon} text-lg"></i>
        <span class="font-medium text-sm md:text-base">${message}</span>
    `;

  // 3. Add to container
  container.appendChild(toast);

  // 4. Auto-remove logic
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

/* ============================================================
   2. DOM LOADED & EVENT LISTENERS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  /* --- MODAL LOGIC --- */
  const modal = document.getElementById("myModal");
  const openButtons = document.querySelectorAll(".open-modal");
  const closeButton = document.getElementById("closeModal");

  // Open
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  // Close Button
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  }

  // Close on Outside Click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });

  /* --- FAQ LOGIC --- */
  const faqHeads = document.querySelectorAll(".faq-head");
  faqHeads.forEach((head) => {
    head.addEventListener("click", () => {
      const body = head.nextElementSibling;
      const icon = head.querySelector(".plusminus");
      if (body.classList.contains("hidden")) {
        body.classList.remove("hidden");
        icon.innerText = "-";
      } else {
        body.classList.add("hidden");
        icon.innerText = "+";
      }
    });
  });

  /* ============================================================
     3. LEAD FORM & OTP LOGIC
     ============================================================ */
  const form = document.getElementById("leadForm");
  if (!form) return;

  const steps = form.querySelectorAll("[data-step]");
  const phoneInput = form.querySelector('input[name="phone"]');
  const otpInputs = form.querySelectorAll("[data-otp]");
  const hiddenOtpInput = form.querySelector('input[name="otp"]');

  const sendOtpBtn = form.querySelector('[data-action="send-otp"]');
  const verifyOtpBtn = form.querySelector('[data-action="verify-otp"]');

  // --- Step Handler ---
  function showStep(step) {
    steps.forEach((s) => (s.hidden = true));
    const target = form.querySelector(`[data-step="${step}"]`);
    if (target) {
      target.hidden = false;
      // UX Improvement: Auto Focus
      if (step === 1 && otpInputs[0])
        setTimeout(() => otpInputs[0].focus(), 100);
      if (step === 2) {
        const firstInput = target.querySelector("input");
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  // Initialize Step 0
  showStep(0);

  // --- Phone Input Guard (Numbers Only) ---
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  // --- Send OTP Logic ---
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener("click", () => {
      const phone = phoneInput.value.trim();

      if (!/^[6-9]\d{9}$/.test(phone)) {
        // alert("Enter a valid 10 digit Indian mobile number");
        showToast("Enter a valid 10 digit Indian mobile number");
        return;
      }

      const originalText = sendOtpBtn.innerHTML;
      sendOtpBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
      sendOtpBtn.disabled = true;

      // API Call -> otp-handler.php
      fetch("otp-handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_otp", phone: phone }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log("OTP Sent Successfully");
            showStep(1);
          } else {
            alert("Error: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Server Error. Please try again.");
        })
        .finally(() => {
          sendOtpBtn.innerHTML = originalText;
          sendOtpBtn.disabled = false;
        });
    });
  }

  // --- OTP Input Auto-Move Logic ---
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      input.value = input.value.replace(/\D/g, ""); // Only numbers
      if (input.value && otpInputs[index + 1]) {
        otpInputs[index + 1].focus();
      }
      collectOtp();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && otpInputs[index - 1]) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pasteData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);
      if (pasteData) {
        pasteData.split("").forEach((char, i) => {
          if (otpInputs[i]) otpInputs[i].value = char;
        });
        collectOtp();
        const nextEmpty = Array.from(otpInputs).find((i) => !i.value);
        if (nextEmpty) nextEmpty.focus();
        else otpInputs[5].focus();
      }
    });
  });

  function collectOtp() {
    const otp = Array.from(otpInputs)
      .map((i) => i.value)
      .join("");
    hiddenOtpInput.value = otp;
  }

  // --- Verify OTP Logic ---
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener("click", () => {
      const otp = hiddenOtpInput.value;

      if (otp.length !== 6) {
        alert("Please enter complete 6 digit OTP");
        return;
      }

      const originalText = verifyOtpBtn.innerHTML;
      verifyOtpBtn.innerHTML =
        '<i class="fa fa-spinner fa-spin"></i> Verifying...';
      verifyOtpBtn.disabled = true;

      // API Call -> otp-handler.php
      fetch("otp-handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_otp", otp: otp }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log("OTP Verified");
            showStep(2); // Go to final details step
          } else {
            showToast("Opps! OTP galat hai.");
            otpInputs.forEach((i) => (i.value = ""));
            hiddenOtpInput.value = "";
            otpInputs[0].focus();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Verification Failed.");
        })
        .finally(() => {
          verifyOtpBtn.innerHTML = originalText;
          verifyOtpBtn.disabled = false;
        });
    });
  }

  /* ============================================================
     4. FINAL SUBMIT LOGIC (LeadSquared + Fail-Safe Redirect)
     ============================================================ */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // --- A. VALIDATION ---
    const fName = form.querySelector('[name="fName"]').value.trim();
    const lName = form.querySelector('[name="lName"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();

    if (!fName || !lName || !email) {
      alert("Please fill all details.");
      return;
    }

    // --- B. UI LOADING STATE ---
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML =
      '<i class="fa fa-circle-o-notch fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // --- C. DATA PREPARATION ---
    const storedUTM = JSON.parse(localStorage.getItem("utm_data")) || {};
    const leadData = {
      fName: fName,
      lName: lName,
      email: email,
      phone: phone,
      ...storedUTM,
    };

    // Redirect Function
    const proceedToPayment = () => {
      const params = new URLSearchParams({
        FirstName: fName,
        LastName: lName,
        EmailAddress: email,
        PhoneNumber: phone,
        Course: "Google_Ads",
        Cart: "42023",
      });
      console.log("✈️ Redirecting to Payment...");
      window.location.href = `https://www.ijaipuria.com/aidm/process.php?${params.toString()}`;
    };

    // --- D. API CALL (action.php) ---
    try {
      console.log("⏳ Sending Lead to LeadSquared...");

      const response = await fetch("action.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      // Just logging the response, not stopping if it's weird
      const result = await response.json().catch(() => ({ status: "unknown" }));
      console.log("✅ LeadSquared Response:", result);
    } catch (error) {
      console.error("⚠️ LeadSquared API Error:", error);
    } finally {
      // --- E. FINAL STEP: REDIRECT (Always Runs) ---
      proceedToPayment();
    }
  });
});
