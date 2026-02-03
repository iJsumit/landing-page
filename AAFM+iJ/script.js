/* =========================
   DOM READY
========================= */

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    initLogoSlider();
    initFormHandler();
});

/* =========================
   LOGO SLIDER
========================= */

function initLogoSlider() {
    const track = document.getElementById('logo-track');
    if (!track) return;

    const totalLogos = 25;
    const logoPath = 'images/logos';

    function createLogo(index) {
        const div = document.createElement('div');
        div.className =
            'flex-shrink-0 w-[120px] h-[120px] md:w-[200px] md:h-[200px] ' +
            'bg-white border border-gray-200 rounded-md flex items-center justify-center';

        const img = document.createElement('img');
        img.src = `${logoPath}/${index}.png`;
        img.alt = `Logo ${index}`;
        img.loading = 'lazy';
        img.className =
            'max-h-[80px] max-w-[80px] md:max-h-[180px] md:max-w-[180px] object-contain';

        div.appendChild(img);
        return div;
    }

    // Duplicate logos for infinite loop
    for (let i = 1; i <= totalLogos * 2; i++) {
        const index = ((i - 1) % totalLogos) + 1;
        track.appendChild(createLogo(index));
    }

    let position = 0;
    let speed = 0.9;
    let rafId = null;

    function animate() {
        position -= speed;

        if (Math.abs(position) >= track.scrollWidth / 2) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        rafId = requestAnimationFrame(animate);
    }

    animate();

    // Pause on hover (desktop)
    track.addEventListener('mouseenter', () => speed = 0);
    track.addEventListener('mouseleave', () => speed = 0.5);

    // Pause animation when tab inactive
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            animate();
        }
    });
}

/* =========================
   FORM HANDLER
========================= */

function initFormHandler() {
    const form = document.getElementById('popupForm');
    if (!form) return;
    const phoneInput = form.querySelector('input[name="phone"]');

    /* -------------------------
       PHONE INPUT HARD CONTROL
    --------------------------*/

    if (phoneInput) {

        // Only numbers + max 10 digits
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value
                .replace(/\D/g, '')
                .slice(0, 10);
        });

        // Block non-numeric keypress
        phoneInput.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });

        // Clean paste
        phoneInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text');
            phoneInput.value = paste.replace(/\D/g, '').slice(0, 10);
        });
    }

    /* -------------------------
       FORM SUBMIT
    --------------------------*/

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
        

        // Final validations (simple & safe)
        if (!data.phone || data.phone.length !== 10) {
            alert('Enter valid 10 digit mobile number');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(data.email || '')) {
            alert('Enter valid email address');
            return;
        }

        try {
            const res = await fetch('action.php', {
                method: 'POST',
                body: formData
            });

            const result = await res.json();
            console.log('SERVER RESPONSE 👉', result);

            closeAllModals();

            if (result.statusCode === 200) {
                openModal('successModal');
                form.reset();
            } else {
                openModal('errorModal');
            }

        } catch (err) {
            console.error('API ERROR 👉', err);
            closeAllModals();
            openModal('errorModal');
        }
    });
}


/* =========================
   MODAL SYSTEM (GLOBAL)
========================= */

let activeModal = null;

window.openModal = function (modalId) {
    closeAllModals();

    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    activeModal = modal;

    // Re-init icons inside modal
    if (window.lucide) {
        lucide.createIcons();
    }
};

window.closeAllModals = function () {
    ['applicationModal', 'successModal', 'errorModal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('hidden');
    });

    document.body.style.overflow = 'auto';
    activeModal = null;
};

// ESC key support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
        closeAllModals();
    }
});
