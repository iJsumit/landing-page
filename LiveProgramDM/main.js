// Add scroll effect to floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelectorAll(".floating-element");

  parallax.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Button hover effects
document.querySelectorAll(".btn-hero").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Card hover animations
document.querySelectorAll(".card-elevated").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
document
  .querySelectorAll(".card, .stats-card, .testimonial-card, .roadmap-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

document
  .querySelectorAll(".HeroInfo")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

document.addEventListener("DOMContentLoaded", () => {

  // Form Logic
  const form = document.getElementById("theForm");
  if (form) {
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Regex patterns
      const nameRegex = /^[A-Za-z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      // Values
      const fName = form.fName.value.trim();
      const lName = form.lName.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();

      // Validation
      if (!nameRegex.test(fName) || !nameRegex.test(lName)) {
        alert("Name must contain only letters.");
        return;
      }
      if (!emailRegex.test(email)) {
        alert("Enter a valid email.");
        return;
      }
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
      }

      // If we reach here, validation passed
      const formData = new FormData(form);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";
      sessionStorage.setItem("formSubmitted", "true");

      try {
        const res = await fetch("mail.php", {
          method: "POST",
          body: formData,
        });

        let data;
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          // fallback for non-JSON response
          data = await res.text();
        }

        console.log("HTTP Status Code:", data.statusCode);
        console.log("API Response:", data.apiResponse);

        if (data.statusCode === 200) {
          // Send Data TO Google Sheets
          formData.append('statusCode', data.statusCode);
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          fetch('https://script.google.com/macros/s/AKfycbzCtkNwdpyL-HXXpZG0y27jZi5OtRYDJpZBxTqBnOL4KMJHGqHhRTbTiteDM444CBJt/exec', {
            method: 'POST',
            body: formData,
          })
            .then(res => res.text())
            .then(data => alert(data))
            .catch(error => console.log(error));
          // On page load after submission: show thank you, hide form
          if (sessionStorage.getItem("formSubmitted") === "true") {
            document.getElementById("form-wrapper").style.display = "none";
            document.getElementById("thank-you-message").style.display = "block";
            sessionStorage.removeItem("formSubmitted");
          }
          form.reset();
        } else {
          console.log(data.statusCode);

          // Send Data TO Google Sheets
          formData.append('statusCode', res.status);
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          fetch('https://script.google.com/macros/s/AKfycbzCtkNwdpyL-HXXpZG0y27jZi5OtRYDJpZBxTqBnOL4KMJHGqHhRTbTiteDM444CBJt/exec', {
            method: 'POST',
            body: formData,
          })
            .then(res => res.text())
            .then(data => alert(data))
            .catch(error => console.log(error));
          // window.location.href = "error.html";
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    });
  }


  // REcruiters

  const marqueeTrack = document.getElementById("marqueeTrack");
  function addImages() {
    for (let i = 1; i <= 25; i++) {
      const img = document.createElement("img");
      img.src = `images/recruiters/${i}.png`;
      img.alt = `Recruiter ${i}`;
      marqueeTrack.appendChild(img);
    }
  }
  addImages();
  addImages();


  // Pie chart
  const ctx = document.getElementById("audiencePieChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Marketing & Sales Professionals",
        "Non-tech Working Professionals",
        "Fresh Graduates (Engineering/MBA)",
        "Small Business Owners / Entrepreneurs",
        "Operations / HR / Admin",
        "Finance & Accounting Professionals",
        "IT & Software Engineers",
        "Others",
      ],
      datasets: [
        {
          data: [25, 20, 18, 15, 8, 5, 4, 5],
          backgroundColor: [
            "#FF8000",
            "#122E5D",
            "#f7b733",
            "#4CAF50",
            "#e91e63",
            "#9c27b0",
            "#00bcd4",
            "#ccc",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#333",
            font: {
              size: 14,
              weight: "500",
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed}%`;
            },
          },
        },
      },
    },
  });

  // Sticky Footer CTA 

  const mobileCTA = document.getElementById("mobile-cta");
  const heroSection = document.getElementById("heroSection");

  if (mobileCTA && heroSection) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        mobileCTA.classList.add("show");
      } else {
        mobileCTA.classList.remove("show");
      }
    });
  }



  // Function to get URL parameter
  function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || "";
  }

  // List of UTM parameters
  const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  utmParams.forEach(param => {
    const value = getParameterByName(param);
    if (value) {
      document.getElementById(param).value = value;
    }
  });
});


