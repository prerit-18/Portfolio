'use strict';

// Creative animations and effects
document.addEventListener('DOMContentLoaded', function() {
  // Handle entrance overlay
  const entranceOverlay = document.getElementById('entrance-overlay');
  if (entranceOverlay) {
    setTimeout(() => {
      entranceOverlay.style.display = 'none';
    }, 4000); // Hide after 4 seconds
  }

  // Typing animation for name (delayed to start after entrance)
  const nameElement = document.getElementById('typing-name');
  if (nameElement) {
    const name = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;
    
    function typeName() {
      if (i < name.length) {
        nameElement.textContent += name.charAt(i);
        i++;
        setTimeout(typeName, 150);
      }
    }
    
    setTimeout(typeName, 4500); // Start after entrance animation
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.style.width;
        skillBar.style.width = '0%';
        setTimeout(() => {
          skillBar.style.width = width;
        }, 200);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // Add floating particles
  createFloatingParticles();

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      const icon = themeToggle.querySelector('ion-icon');
      icon.name = newTheme === 'light' ? 'sunny-outline' : 'moon-outline';
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('ion-icon');
    icon.name = savedTheme === 'light' ? 'sunny-outline' : 'moon-outline';
  }
});

function createFloatingParticles() {
  const particleCount = 20;
  const body = document.body;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--orange-yellow-crayola);
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.3;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
    `;
    body.appendChild(particle);
  }
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.3;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Handle form submission
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Show loading state
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    // Submit to Formspree
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('form-error').style.display = 'none';
        form.reset();
        formBtn.setAttribute("disabled", "");
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      // Show error message
      document.getElementById('form-error').style.display = 'block';
      document.getElementById('form-success').style.display = 'none';
    })
    .finally(() => {
      // Reset button state
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}