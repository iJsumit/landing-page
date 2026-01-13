document.addEventListener('DOMContentLoaded', () => {

    // Form logic here
    const form = document.getElementById('enquiryForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const fields = form.querySelectorAll('input, select');

        fields.forEach(field => {
            const error = field.nextElementSibling;
            field.classList.remove('border-red-500');
            if (error) error.classList.add('hidden');

            // Empty check
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                if (error) error.classList.remove('hidden');
                return;
            }

            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    if (error) error.classList.remove('hidden');
                }
            }

            // Mobile validation (India – 10 digits)
            if (field.name === 'number') {
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    if (error) error.classList.remove('hidden');
                }
            }
        });

        if (!isValid) return;

        // ✅ LOG VALUES
        const formData = {
            firstName: form.fName.value,
            lastName: form.lName.value,
            email: form.email.value,
            mobile: form.number.value,
            experience: form.experience.value
        };

        console.log('FORM DATA:', formData);

        // OPTIONAL: reset form
        // form.reset();
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
