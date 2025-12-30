// ===== Constants & Data =====
const toolsData = {
  "tools-ai": [
    { name: "ChatGPT", iconClass: "bi bi-robot" },
    { name: "GitHub Copilot", iconClass: "bi bi-github" },
    { name: "LangChain", iconClass: "bi bi-diagram-3" },
    { name: "OpenAI API", iconClass: "bi bi-braces" },
    { name: "Hugging Face", iconClass: "bi bi-emoji-smile" },
    { name: "Zapier AI", iconClass: "bi bi-lightning-charge" },
    { name: "Pinecone", iconClass: "bi bi-diagram-3-fill" },
    { name: "Weaviate", iconClass: "bi bi-grid-1x2" },
  ],
  "tools-bi": [
    { name: "Tableau with Copilot", iconClass: "bi bi-bar-chart-line" },
    { name: "Power BI with Copilot", iconClass: "bi bi-graph-up" },
    { name: "Flourish", iconClass: "bi bi-palette2" },
    { name: "Gapminder", iconClass: "bi bi-pie-chart" },
    { name: "Google Sheets", iconClass: "bi bi-table" },
    { name: "Microsoft Excel", iconClass: "bi bi-file-earmark-spreadsheet" },
    { name: "PromptLoop", iconClass: "bi bi-arrow-repeat" },
    { name: "SheetAI", iconClass: "bi bi-cpu" },
  ],
  "tools-dev": [
    { name: "Python", iconClass: "bi bi-code-slash" },
    { name: "JupyterLab", iconClass: "bi bi-journal-code" },
    { name: "VS Code", iconClass: "bi bi-code-square" },
    { name: "Matplotlib", iconClass: "bi bi-graph-up-arrow" },
    { name: "Seaborn", iconClass: "bi bi-droplet-half" },
    { name: "Plotly", iconClass: "bi bi-bezier" },
    { name: "statsmodels", iconClass: "bi bi-sliders" },
    { name: "scipy", iconClass: "bi bi-slash-square" },
  ],
  "tools-de": [
    { name: "PostgreSQL", iconClass: "bi bi-server" },
    { name: "MySQL", iconClass: "bi bi-database" },
    { name: "SQL GPT", iconClass: "bi bi-clipboard-data" },
    { name: "Hex", iconClass: "bi bi-diagram-2" },
    { name: "Deepnote AI", iconClass: "bi bi-stickies" },
    { name: "Apache Airflow", iconClass: "bi bi-wind" },
    { name: "Prefect", iconClass: "bi bi-check-circle" },
    { name: "Make.com", iconClass: "bi bi-diagram-2-fill" },
  ],
};

const testimonials = [
  {
    heading: "“From confused to confident in 10 weeks.”",
    message: "I had zero technical background. Today, I build dashboards, write SQL queries, and even use GenAI to automate insights. This program gave me momentum I was missing for years.",
    name: "— Divya S., MBA Graduate",
    image: "femaleT.png",
  },
  {
    heading: "“It's not just a course. It's a career reset.”",
    message: "I was stuck in a support role for 5 years. This program gave me clarity, structure, and skills to finally make the shift. Landed my first analytics job within 2 months of completion.",
    name: "— Prashant R., Career Switcher",
    image: "maleT.png",
  },
  {
    heading: "“The GenAI part blew my mind.”",
    message: "I never imagined using AI tools to build reports or automate workflows. This isn’t theoretical — you actually build things that matter.",
    name: "— Ankita T., MIS Executive",
    image: "femaleT.png",
  },
  {
    heading: "“The weekend structure worked perfectly.”",
    message: "As a working professional, I couldn't afford to quit. The live + self-paced format was intense but manageable. The mentors were outstanding.",
    name: "— Karan J., Marketing Analyst",
    image: "maleT.png",
  },
  {
    heading: "“Way better than YouTube or recorded courses.”",
    message: "I had tried self-learning for months and kept quitting. This program's structure, doubt support, and live guidance made all the difference.",
    name: "— Rhea N., Graduate",
    image: "femaleT.png",
  },
  {
    heading: "“It made me believe in myself again.”",
    message: "I used to feel intimidated by tech. Today, I present data stories to clients. This course didn't just teach me — it transformed me.",
    name: "— Mohammed A., Small Business Owner",
    image: "maleT.png",
  },
];

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});


// ===== Utility Functions =====
function getUTMParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || '';
}

function showError(id, msg) { document.getElementById(id + 'Error').innerHTML = msg }


function validateForm({ fName, lName, email, phone, city }) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const cityRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!nameRegex.test(fName)) return { id: "fName", message: "First name must contain only letters." };
  if (!nameRegex.test(lName)) return { id: "lName", message: "Last name must contain only letters." };
  if (!emailRegex.test(email)) return { id: "email", message: "Enter a valid email." };
  if (!phoneRegex.test(phone)) return { id: "phone", message: "Please enter a valid phone number." };
  if (!cityRegex.test(city)) return { id: "city", message: "Please enter a valid city." };
  return null;
}


// ===== DOM Ready Logic =====
document.addEventListener("DOMContentLoaded", function () {
  initToolsCards();
  initTestimonialsCarousel();
  initFormHandler();
  initScrollBtn();
  initRecruitersMarquee();
  initAudiencePieChart();
  populateUTMFields();
});

// ===== Feature: Tool Cards =====
function initToolsCards() {
  for (const sectionId in toolsData) {
    const container = document.getElementById(sectionId);
    if (!container) continue;
    toolsData[sectionId].forEach(({ name, iconClass }) => {
      const card = document.createElement("div");
      card.className = "tool-card-ija";
      card.innerHTML = `<i class="${iconClass} tool-icon-ija"></i><p>${name}</p>`;
      container.appendChild(card);
    });
  }
}

// ===== Feature: Testimonials Carousel =====
function initTestimonialsCarousel() {
  const carouselInner = document.getElementById("testimonial-carousel-inner");
  if (!carouselInner) return;
  for (let i = 0; i < testimonials.length; i += 3) {
    const group = testimonials.slice(i, i + 3);
    const isActive = i === 0 ? "active" : "";
    const itemsHTML = group.map(item => `
      <div class="col-md-4 mb-4">
        <div class="testimonial-card p-4 bg-white shadow text-center h-100">
          <img src="images/${item.image}" alt="${item.name}" class="rounded-circle mb-3" width="70" height="70" style="object-fit: cover;">
          <h6 class="fw-bold mb-2">${item.heading}</h6>
          <p class="small fst-italic text-muted">"${item.message}"</p>
          <strong class="d-block mt-3 text-dark">${item.name}</strong>
        </div>
      </div>
    `).join("");
    carouselInner.insertAdjacentHTML("beforeend", `
      <div class="carousel-item ${isActive}">
        <div class="row justify-content-center">${itemsHTML}</div>
      </div>
    `);
  }
}

// Clear Form Error Messages 
function clearAllErrors() {
  const errorSpans = document.querySelectorAll(".error");
  errorSpans.forEach(span => {
    span.innerHTML = "";
  });
}


// Send Data To Google Sheets
function formToSheet(formData) {
  fetch("https://script.google.com/macros/s/AKfycbwWHtGRd7bQoR_xw4OfH-cWwOtSrRGSlGfqAArV4Oei_kz_mTGUzVFNkeWfiTQJGj-Ezw/exec", { method: 'POST', body: formData });
}

// ===== Feature: Form Handler =====
function initFormHandler() {
  const form = document.getElementById("hero-form-ija");
  if (!form) return;
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearAllErrors();
    const formFields = {
      fName: form.fName.value.trim(),
      lName: form.lName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      city: form.city.value.trim()
    };
    const errorMsg = validateForm(formFields);
    if (errorMsg) return showError(errorMsg.id, errorMsg.message);

    const formData = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";
    sessionStorage.setItem("formSubmitted", "true");
    try {
      const res = await fetch("mail.php", { method: "POST", body: formData });
      if (res.ok) { showThankYou(); } else { showErrorMessage(); }
      form.reset();
      formData.append('statusCode', res.status);
      formToSheet(formData);
    } catch (err) {
      formToSheet(formData);
      showErrorMessage();
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit";
    }
  });
}

function showThankYou() {
  document.getElementById("form-wrapper").style.display = "none";
  document.getElementById("thank-you-message").style.display = "block";
  sessionStorage.removeItem("formSubmitted");
}
function showErrorMessage() {
  document.getElementById("form-wrapper").style.display = "none";
  document.getElementById("thank-you-message").style.display = "none";
  document.getElementById("error-message").style.display = "block";
  sessionStorage.removeItem("formSubmitted");
}

// ===== Feature: Scroll-to-Top Button =====
function initScrollBtn() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return;
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Feature: Recruiters Marquee =====
function initRecruitersMarquee() {
  const marqueeTrack = document.getElementById("marqueeTrack");
  if (!marqueeTrack) return;
  function addImages() {
    for (let i = 1; i <= 25; i++) {
      const img = document.createElement("img");
      img.src = `images/recruiters/${i}.png`;
      img.alt = `Recruiter ${i}`;
      marqueeTrack.appendChild(img);
    }
  }
  addImages(); addImages();
}

// ===== Feature: Audience Pie Chart =====
function initAudiencePieChart() {
  const canvas = document.getElementById("audiencePieChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
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
      datasets: [{
        data: [25, 20, 18, 15, 8, 5, 4, 5],
        backgroundColor: [
          "#FF8000", "#122E5D", "#f7b733", "#4CAF50",
          "#e91e63", "#9c27b0", "#00bcd4", "#ccc"
        ],
        borderWidth: 2, borderColor: "#fff",
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom", labels: { color: "#333", font: { size: 14, weight: "500" } } },
        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.parsed}%` } },
      }
    }
  });
}

// ===== Feature: UTM Field Population =====
function populateUTMFields() {
  const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  fields.forEach((field) => {
    const el = document.getElementById(field);
    if (el) el.value = getUTMParam(field);
  });
}

document.getElementById("tryAgain").addEventListener("click", function () {
  location.reload();
});

