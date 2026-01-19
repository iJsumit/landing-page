document.addEventListener('DOMContentLoaded', () => {

    // Form logic here
    const form = document.getElementById('enquiryForm');

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

            if (!el.value.trim() ||
                (el.type === 'email' && !emailRegex.test(el.value)) ||
                (el.name === 'phone' && !phoneRegex.test(el.value))) {
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

            const result = await res.text(); // or res.json()
            console.log('SERVER:', result);

            // form.reset();

        } catch (err) {
            console.error('API ERROR:', err);
        }
    });


    // Logo slider logic here 
    const track = document.getElementById('logo-track');
    const totalLogos = 25;
    const logoPath = 'images/logos'; // change if needed

    // Create logo items
    function createLogo(index) {
        const div = document.createElement('div');
        div.className =
            'flex-shrink-0 w-[200px] h-[200px] bg-white border border-gray-200 ' +
            'rounded-md flex items-center justify-center';

        const img = document.createElement('img');
        img.src = `${logoPath}/${index}.png`;
        img.alt = `Logo ${index}`;
        img.className = 'max-h-[180px] max-w-[180px] object-contain';

        div.appendChild(img);
        return div;
    }

    // Add logos twice (for infinite effect)
    for (let i = 1; i <= totalLogos; i++) {
        track.appendChild(createLogo(i));
    }
    for (let i = 1; i <= totalLogos; i++) {
        track.appendChild(createLogo(i));
    }

    let position = 0;
    const speed = 0.8; // 👉 increase = faster

    function animate() {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
            position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    // Pause on hover
    track.addEventListener('mouseenter', () => speed = 0);
    track.addEventListener('mouseleave', () => speed = 0.5);


});
