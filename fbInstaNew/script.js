const modulesData = [
    {
        title: "Module 1: Introduction",
        icon: "images/Course-Introduction.png",
        points: [
            "Course Introduction",
            "Introduction to Facebook & Instagram (Meta) Ads"
        ]
    },
    {
        title: "Module 2: Meta Ads Introduction",
        icon: "images/Meta-Ads-Introduction.png",
        points: [
            "Basics of Facebook Ads/ How It Works",
            "Why Everyone Should Run Ads on Facebook",
            "Ads Manager Dashboard Walkthrough",
            "Meta Advertising Policies",
            "Pre Requisites of a Successful Campaign"
        ]
    },
    {
        title: "Module 3: Facebook Page Setup",
        icon: "images/Facebook-Page-Setup-Basics.png",
        points: [
            "Facebook Page Section Introduction",
            "Beginning to set up your Facebook page",
            "Setting the profile and brand image",
            "Facebook Cover Page Design",
            "How to Set Up Your Facebook Page Name",
            "Facebook Page SEO Checklist for Optimisation",
            "Instagram Account Creation & Optimisation",
            "Explore AI in Facebook Page Setup"
        ]
    },
    {
        title: "Module 4: Facebook Ads Manager",
        icon: "images/Knowing-the-Facebook-Ads-Manager.png",
        points: [
            "Meta (Facebook) Business Suite",
            "Ad Manager v/s Business Manager",
            "Facebook Campaign Structure"
        ]
    },
    {
        title: "Module 5: Meta Ads Funnel",
        icon: "images/Creating-Multiple-Meta-Ads.png",
        points: [
            "Introduction of Meta Ads Funnel",
            "Top of The Funnel (TOFU)",
            "Middle of The Funnel (MOFU)",
            "Bottom of The Funnel (BOFU)",
            "Explore AI in Meta Ads Funnel"
        ]
    },
    {
        title: "Module 6: Meta Ads Targeting",
        icon: "images/Facebook-Pixel-_-Retargeting.png",
        points: [
            "Demographic Based Targeting",
            "Interest Based Targeting",
            "Behaviour Based Targeting",
            "Custom Audiences Targeting",
            "Lookalike Audiences Targeting",
            "Advantage+ Audiences Targeting",
            "Explore AI in Meta Ads Targeting"
        ]
    },
    {
        title: "Module 7: Meta Andromeda",
        icon: "images/andromeda.png",
        points: [
            "What is Andromeda?",
            "Why Andromeda Matters After Targeting",
            "Key Andromeda Upgrades",
            "How To Adapt After Andromeda"
        ]
    },
    {
        title: "Module 8: Meta Ads Creatives",
        icon: "images/Module 7.png",
        points: [
            "Introduction to Ads Creative",
            "Copy Writing For Meta Ads",
            "Image Ads Creative Design",
            "Video Ads Creative Design",
            "Competitor Ads Copy Spy",
            "Explore AI tools in Ads Creative Design",
            "Understanding Placement options of Meta ads"
        ]
    },
    {
        title: "Module 9: Advantage+ Campaigns",
        icon: "images/Meta-Ads-Objective.png",
        points: [
            "Meta Advantage+Ads",
            "Awareness Ads",
            "Traffic Ads",
            "Engagement Ads",
            "Leads Ads",
            "App Promotion Ads",
            "Sales Ads",
            "Explore AI in Selecting Campaign Objective"
        ]
    },
    {
        title: "Module 10: Facebook Pixel - Retargeting",
        icon: "images/module9.png",
        points: [
            "What is Facebook Pixel",
            "Creating a Facebook Pixel",
            "Installing the Facebook Pixel on your Website",
            "Checking if the Pixel is working and capturing information",
            "Creating a Target Audience with your Facebook Pixel",
            "Creating your First Super Optimised Ad using Facebook Pixel",
            "Conversions API in Meta"
        ]
    },
    {
        title: "Module 11: Facebook Campaign Structure",
        icon: "images/Module 10 .png",
        points: [
            "Meta REACH Ad for Business",
            "Meta Brand Awareness Ads",
            "Meta Engagement Ads",
            "Meta Lead Ads",
            "Meta Lead Ads using Website",
            "Meta Traffic Ads",
            "Meta Messages Ads",
            "Meta Video Ads"
        ]
    },
    {
        title: "Module 12: Meta Ads With AI",
        icon: "images/Meta-Ads-With-AI.png",
        points: [
            "ChatGPT and its applications in marketing",
            "Exploring The Synergy Between ChatGPT & Meta Ads",
            "Applying ChatGPT To Understand Audience Preferences And Behaviors",
            "Crafting Compelling Ad Copy Visuals",
            "AI Tools For Meta Ads"
        ]
    },
    {
        title: "Module 13: Facebook Ads For E-Commerce",
        icon: "images/Facebook-Ads-for-E-Commerce.png",
        points: [
            "Introduction to Facebook Ads for E-Commerce",
            "How to Set Up Dynamic Product Ads + Catalog Sales Campaigns",
            "ROAS Calculations & Explanations",
            "A/B Testing Setup"
        ]
    },
    {
        title: "Module 14: Meta Ads Scaling",
        icon: "images/Module 13 .png",
        points: [
            "Facebook Ads Scaling",
            "Vertical & Horizontal Scaling",
            "Facebook Ads CBO",
            "Lookalike Scaling Strategy"
        ]
    },
    {
        title: "Module 15: Automated Rules, Budget Calculator",
        icon: "images/Module 14 .png",
        points: [
            "Automated Rules In Facebook Ads Campaign",
            "Ads Budget Calculator",
            "Ads Disabled Reason & Recovery",
            "Meta Verified Process"
        ]
    },
    {
        title: "Module 16: Facebook Reporting, Insight & Optimization",
        icon: "images/Facebook-Reporting,-Insights-_-Optimization.png",
        points: [
            "Ads Relevance + Scale Facebook Ads",
            "Facebook Reporting"
        ]
    },
    {
        title: "Module 17: Meta Ads Strategy & Campaign Launch For Business",
        icon: "images/Module 16.png",
        points: [
            "Meta ads for real estate",
            "Meta ads for dentist",
            "Meta ads for interior design business",
            "Meta ads for consumer business",
            "Meta ads for professional services"
        ]
    },
    {
        title: "Module 18: Getting Success in Facebook Ads",
        icon: "images/Getting-Success-in-Facebook-Ads.png",
        points: [
            "How to Get Clients for Facebook Ads Part -1",
            "How to Get Clients for Facebook Ads Part -2",
            "Facebook Blueprint Certification",
            "Interview Preparation for Meta Ads Roles"
        ]
    },
    {
        title: "Module 19: Advanced E-commerce Ads",
        icon: "images/Bonus-Video.png",
        points: [
            "New Pixel Creation For E-Commerce Store",
            "Meta Pixel Setup For Shopify Store",
            "Meta Pixel Setup For Woo Commerce Store",
            "Creative Design For E-Com Ads",
            "Audience Selection & Campaign Launch",
            "Audience Selection Using AI Tools"
        ]
    }
];


const accordion = document.getElementById("modulesAccordion");

modulesData.forEach((module, index) => {
    const item = document.createElement("div");
    item.className = "border border-white/10 rounded-xl bg-slate-900 overflow-hidden";

    item.innerHTML = `
    <button
      class="w-full flex items-center justify-between p-5 text-left focus:outline-none module-toggle"
      data-index="${index}"
    >
      <div class="flex items-center gap-4">
        <img src="${module.icon}" alt="" class="w-10 h-10 object-contain" />
        <h3 class="font-medium text-lg">${module.title}</h3>
      </div>
      <span class="text-xl transition-transform duration-300">+</span>
    </button>

    <div class="module-content hidden px-6 pb-6">
      <ul class="list-disc list-inside text-slate-300 space-y-1">
        ${module.points.map(p => `<li>${p}</li>`).join("")}
      </ul>
    </div>
  `;

    accordion.appendChild(item);
});

const toggles = document.querySelectorAll(".module-toggle");

toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        const currentContent = toggle.nextElementSibling;
        const icon = toggle.querySelector("span");

        // Close all others
        document.querySelectorAll(".module-content").forEach(content => {
            if (content !== currentContent) {
                content.classList.add("hidden");
                content.previousElementSibling.querySelector("span").textContent = "+";
            }
        });

        // Toggle current
        currentContent.classList.toggle("hidden");
        icon.textContent = currentContent.classList.contains("hidden") ? "+" : "-";
    });
});

