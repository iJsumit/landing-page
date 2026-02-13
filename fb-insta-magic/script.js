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

const validStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];


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

            // sendOtpBtn.disabled = true;
            // const originalText = sendOtpBtn.innerHTML;
            // sendOtpBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';

            // try {
            //     const response = await fetch("otp-handler.php", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ action: "send_otp", phone: phone }),
            //     });
            //     const data = await response.json();
            //     if (data.status === "success") showStep(1);
            //     else alert("Error: " + data.message);
            // } catch (error) {
            //     alert("Server Error. Please try again.");
            // } finally {
            //     sendOtpBtn.disabled = false;
            //     sendOtpBtn.innerHTML = originalText;
            // }
            showStep(1);
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

            // verifyOtpBtn.disabled = true;
            // const originalText = verifyOtpBtn.innerHTML;
            // verifyOtpBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Verifying...';

            // try {
            //     const response = await fetch("otp-handler.php", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ action: "verify_otp", otp: otp }),
            //     });
            //     const data = await response.json();
            //     if (data.status === "success") showStep(2);
            //     else {
            //         alert("Opps! OTP galat hai.");
            //         otpInputs.forEach(i => i.value = "");
            //         otpInputs[0].focus();
            //     }
            // } catch (error) {
            //     alert("Verification Failed.");
            // } finally {
            //     verifyOtpBtn.disabled = false;
            //     verifyOtpBtn.innerHTML = originalText;
            // }
            showStep(2);
        });
    }

    // --- Final Submit (Magic Checkout Flow) ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fName = form.querySelector('input[placeholder="First Name*"]').value.trim();
        const lName = form.querySelector('input[placeholder="Last Name*"]').value.trim();
        const email = form.querySelector('input[placeholder="Email Address*"]').value.trim();
        const phone = phoneInput.value.trim();

        const state = form.querySelector('input[name="state"]').value.trim();

        if (!validStates.includes(state)) {
            alert("Please select a valid state from the list.");
            return;
        }


        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> Processing...';

        const savedUTM = JSON.parse(localStorage.getItem("utm_data")) || {};

        const leadData = {
            fName,
            lName,
            email,
            phone,
            utm_source: savedUTM.utm_source || "",
            utm_medium: savedUTM.utm_medium || "",
            utm_campaign: savedUTM.utm_campaign || "",
            utm_content: savedUTM.utm_content || "",
            utm_term: savedUTM.utm_term || ""
        };

        console.log(leadData);
        

        try {
            const res = await fetch("action.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData),
            });

            const data = await res.json();
            // const leadId = data.leadId;
            console.log("Yahi h kya ID", JSON.parse(data));



            if (data.status !== "success") {
                alert("Something went wrong. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Submit";
                return;
            }

            const options = {
                key: data.key,                 // Razorpay Key from backend
                amount: data.amount,           // Amount in paise
                currency: "INR",
                order_id: data.order_id,
                name: "Your Company Name",
                description: "Course Payment",
                prefill: {
                    name: fName,
                    email: email,
                    contact: phone
                },
                handler: async function (response) {
                    console.log(response);


                    // const verifyRes = await fetch("verify-payment.php", {
                    //     method: "POST",
                    //     headers: { "Content-Type": "application/json" },
                    //     body: JSON.stringify({
                    //         ...response,
                    //         leadId: leadId
                    //     })
                    // });

                    const verifyData = await verifyRes.json();
                    console.log("VERIFY RESPONSE", verifyData);

                    if (verifyData.status === "success") {
                        console.log("aagyi ID");

                    } else {
                        alert("Payment verification failed");
                    }
                }
                ,
                theme: {
                    color: "#122E5D"
                }
            };

            const rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            alert("Server error. Please try again.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Submit";
        }
    });
});