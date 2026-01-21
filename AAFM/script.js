document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initLogoSlider();
});

/* =========================
   UNIVERSAL DOM REFERENCES
========================= */

const form = document.getElementById('enquiryForm');
const successBox = document.getElementById('successBox');
const errorBox = document.getElementById('errorBox');

/* =========================
   UI STATE HANDLER
========================= */

function showState(state) {
    // reset
    form?.classList.remove('hidden');
    successBox?.classList.add('hidden');
    errorBox?.classList.add('hidden');

    if (state === 'success') {
        form?.classList.add('hidden');
        successBox?.classList.remove('hidden');
    }

    if (state === 'error') {
        form?.classList.add('hidden');
        errorBox?.classList.remove('hidden');
    }
}

// retry button hook
window.retryForm = function () {
    showState('form');
};

/* =========================
   FORM HANDLING
========================= */

function initForm() {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        let isValid = true;

        [...form.elements].forEach(el => {
            if (!['INPUT', 'SELECT'].includes(el.tagName)) return;

            const error = el.nextElementSibling;
            el.classList.remove('border-red-500');
            error?.classList.add('hidden');

            if (
                !el.value.trim() ||
                (el.type === 'email' && !emailRegex.test(el.value)) ||
                (el.name === 'phone' && !phoneRegex.test(el.value))
            ) {
                isValid = false;
                el.classList.add('border-red-500');
                error?.classList.remove('hidden');
            }
        });

        if (!isValid) return;

        try {
            const res = await fetch('action.php', {
                method: 'POST',
                body: new FormData(form)
            });

            const data = await res.json();
            console.log('SERVER:', data);

            if (res.ok && data.statusCode === 200) {
                showState('success');
            } else {
                showState('error');
            }

        } catch (err) {
            console.error('API ERROR:', err);
            showState('error');
        }
    });
}

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
        img.className = 'max-h-[80px] max-w-[80px] md:max-h-[180px] md:max-w-[180px] object-contain';

        div.appendChild(img);
        return div;
    }

    for (let i = 1; i <= totalLogos * 2; i++) {
        const index = ((i - 1) % totalLogos) + 1;
        track.appendChild(createLogo(index));
    }

    let position = 0;
    let speed = 0.9;

    function animate() {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
            position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    track.addEventListener('mouseenter', () => speed = 0);
    track.addEventListener('mouseleave', () => speed = 0.5);
}
