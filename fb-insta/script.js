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

/* ============================================================
   1. MODAL HELPERS
   ============================================================ */
function openEnrollModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        showStep(0);
    }
}

function closeEnrollModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

window.openEnrollModal = openEnrollModal;
window.closeEnrollModal = closeEnrollModal;
window.toggleModal = closeEnrollModal; // For the close button & background click

/* ============================================================
   MODULES TOGGLE LOGIC
   ============================================================ */
const moduleBtn = document.getElementById('moduleToggleBtn');
const extraModules = document.getElementById('extraModules');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');

if (moduleBtn && extraModules) {
    moduleBtn.addEventListener('click', () => {
        const isHidden = extraModules.classList.contains('hidden');

        if (isHidden) {
            // Show Modules
            extraModules.classList.remove('hidden');
            btnText.innerText = "See Less";
            btnIcon.classList.remove('fa-chevron-down');
            btnIcon.classList.add('fa-chevron-up');
            // Scroll to view if needed
            extraModules.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Hide Modules
            extraModules.classList.add('hidden');
            btnText.innerText = "See Full Curriculum";
            btnIcon.classList.remove('fa-chevron-up');
            btnIcon.classList.add('fa-chevron-down');
            // Scroll back up to the start of modules
            moduleBtn.parentElement.parentElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ============================================================
   2. DOM LOADED & EVENT LISTENERS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("myModal");
    const closeButton = document.getElementById("closeModal");

    if (closeButton) closeButton.addEventListener("click", closeEnrollModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeEnrollModal();
        });
    }

    /* --- FAQ LOGIC --- */
    document.querySelectorAll("details").forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            document.querySelectorAll("details").forEach((detail) => {
                if (detail !== targetDetail) detail.removeAttribute("open");
            });
        });
    });

    /* ============================================================
       3. LEAD FORM & OTP LOGIC
       ============================================================ */
    const form = document.getElementById("leadForm");
    if (!form) return;

    // Mapping inputs as per your HTML
    const phoneInput = document.getElementById('phone');
    const otpInputs = document.querySelectorAll(".otp-input");
    const sendOtpBtn = form.querySelector('[data-action="send-otp"]');
    const verifyOtpBtn = form.querySelector('[data-action="verify-otp"]');

    // --- Step Handler (Modified to use your HTML IDs) ---
    function showStep(stepIndex) {
        // Hide all steps using IDs
        const stepIds = ['step0', 'step1', 'step2'];
        stepIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        // Show target
        const target = document.getElementById('step' + stepIndex);
        if (target) {
            target.classList.remove("hidden");

            // Auto Focus
            if (stepIndex === 1 && otpInputs[0]) setTimeout(() => otpInputs[0].focus(), 200);
            if (stepIndex === 2) {
                const firstInput = target.querySelector("input");
                if (firstInput) setTimeout(() => firstInput.focus(), 200);
            }
        }
    }
    window.nextStep = showStep;

    // --- Phone Input Guard ---
    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    // --- Send OTP ---
    if (sendOtpBtn) {
        sendOtpBtn.addEventListener("click", async () => {
            const phone = phoneInput.value.trim();
            if (!/^[6-9]\d{9}$/.test(phone)) {
                alert("Enter a valid 10 digit Indian mobile number");
                return;
            }

            sendOtpBtn.disabled = true;
            const originalText = sendOtpBtn.innerHTML;
            sendOtpBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await fetch("otp-handler.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "send_otp", phone: phone }),
                });
                const data = await response.json();
                if (data.status === "success") showStep(1);
                else alert("Error: " + data.message);
            } catch (error) {
                alert("Server Error. Please try again.");
            } finally {
                sendOtpBtn.disabled = false;
                sendOtpBtn.innerHTML = originalText;
            }
        });
    }

    // --- OTP Auto-Move ---
    otpInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "");
            if (input.value && otpInputs[index + 1]) otpInputs[index + 1].focus();
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && otpInputs[index - 1]) otpInputs[index - 1].focus();
        });
    });

    // --- Verify OTP ---
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener("click", async () => {
            const otp = Array.from(otpInputs).map(i => i.value).join("");
            if (otp.length !== 6) {
                alert("Please enter complete 6 digit OTP");
                return;
            }

            verifyOtpBtn.disabled = true;
            const originalText = verifyOtpBtn.innerHTML;
            verifyOtpBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Verifying...';

            try {
                const response = await fetch("otp-handler.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "verify_otp", otp: otp }),
                });
                const data = await response.json();
                if (data.status === "success") showStep(2);
                else {
                    alert("Opps! OTP galat hai.");
                    otpInputs.forEach(i => i.value = "");
                    otpInputs[0].focus();
                }
            } catch (error) {
                alert("Verification Failed.");
            } finally {
                verifyOtpBtn.disabled = false;
                verifyOtpBtn.innerHTML = originalText;
            }
        });
    }

    // --- Final Submit ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fName = form.querySelector('input[placeholder="First Name*"]').value.trim();
        const lName = form.querySelector('input[placeholder="Last Name*"]').value.trim();
        const email = form.querySelector('input[placeholder="Email Address*"]').value.trim();
        const phone = phoneInput.value.trim();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> Processing...';

        /* ============================================================
   FINAL SUBMIT LOGIC (Inside your submit event listener)
   ============================================================ */
        // localStorage se saved UTM data nikalna
        const savedUTM = JSON.parse(localStorage.getItem("utm_data")) || {};

        const leadData = {
            fName: fName, // Jo aapne variable form se uthaya hai
            lName: lName,
            email: email,
            phone: phone,
            // Direct localStorage se uthaya hua data
            utm_source: savedUTM.utm_source || "",
            utm_medium: savedUTM.utm_medium || "",
            utm_campaign: savedUTM.utm_campaign || "",
            utm_content: savedUTM.utm_content || "",
            utm_term: savedUTM.utm_term || ""
        };

        // LeadSquared API Call (action.php)
        console.log("🚀 Sending Lead with UTMs:", leadData);

        try {
            await fetch("action.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData),
            });
        } catch (error) {
            console.error("API Error");
        } finally {
            const params = new URLSearchParams({
                FirstName: fName, LastName: lName, EmailAddress: email,
                PhoneNumber: phone, Course: "fbinsta", Cart: "50635",
            });
            window.location.href = `https://www.ijaipuria.com/aidm/process.php?${params.toString()}`;
        }
    });
});