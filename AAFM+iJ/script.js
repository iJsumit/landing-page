document.addEventListener('DOMContentLoaded', () => {
    initLogoSlider();
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