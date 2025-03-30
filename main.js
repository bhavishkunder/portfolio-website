// Opening or closing side bar
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active")
}

const sidebar = document.querySelector("[data-sidebar]")
const sidebarBtn = document.querySelector("[data-sidebar-btn]")

sidebarBtn.addEventListener("click", () => {
  elementToggleFunc(sidebar)
})

// Activating Filter Select and filtering options
const select = document.querySelector("[data-select]")
const selectItems = document.querySelectorAll("[data-select-item]")
const selectValue = document.querySelector("[data-select-value]")
const filterBtn = document.querySelectorAll("[data-filter-btn]")

select.addEventListener("click", function () {
  elementToggleFunc(this)
})

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    elementToggleFunc(select)
    filterFunc(selectedValue)
  })
}

const filterItems = document.querySelectorAll("[data-filter-item]")

const filterFunc = (selectedValue) => {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue == "all") {
      filterItems[i].classList.add("active")
    } else if (selectedValue == filterItems[i].dataset.category) {
      filterItems[i].classList.add("active")
    } else {
      filterItems[i].classList.remove("active")
    }
  }
}

// Enabling filter button for larger screens
let lastClickedBtn = filterBtn[0]

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    filterFunc(selectedValue)

    lastClickedBtn.classList.remove("active")
    this.classList.add("active")
    lastClickedBtn = this
  })
}


// Enabling Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]")
const pages = document.querySelectorAll("[data-page]")

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() == pages[i].dataset.page) {
        pages[i].classList.add("active")
        navigationLinks[i].classList.add("active")
        window.scrollTo(0, 0)
      } else {
        pages[i].classList.remove("active")
        navigationLinks[i].classList.remove("active")
      }
    }
  })
}

// Honeycomb Skills Animation
// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
}

// Initialize hexagons
document.addEventListener("DOMContentLoaded", () => {
  const hexagons = document.querySelectorAll(".hex")
  const skillCategoryBtns = document.querySelectorAll(".skill-category-btn")

  // Add event listeners to category buttons
  skillCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      skillCategoryBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const category = this.dataset.category

      // Filter hexagons based on category
      hexagons.forEach((hex) => {
        if (category === "all" || hex.dataset.skill === category) {
          hex.style.display = "block"
          setTimeout(() => {
            hex.classList.add("visible")
          }, 100)
        } else {
          hex.classList.remove("visible")
          setTimeout(() => {
            hex.style.display = "none"
          }, 500)
        }
      })
    })
  })

  // Initial animation on page load
  animateHexagonsOnScroll()

  // Add scroll event listener
  window.addEventListener("scroll", animateHexagonsOnScroll)
})

function animateHexagonsOnScroll() {
  const hexagons = document.querySelectorAll(".hex")
  const honeycombContainer = document.querySelector(".honeycomb-container")

  if (honeycombContainer && isInViewport(honeycombContainer)) {
    hexagons.forEach((hex, index) => {
      setTimeout(() => {
        hex.classList.add("visible")
      }, index * 50) // Stagger the animations
    })
  } else if (honeycombContainer && !isInViewport(honeycombContainer)) {
    hexagons.forEach((hex) => {
      hex.classList.remove("visible")
    })
  }
}

// Add hover effect to highlight connected technologies
document.addEventListener("DOMContentLoaded", () => {
  const hexagons = document.querySelectorAll(".hex")

  hexagons.forEach((hex) => {
    hex.addEventListener("mouseenter", function () {
      // Add active class to hovered hexagon
      this.classList.add("active")

      // Get the skill category
      const skill = this.dataset.skill

      // Highlight other hexagons with the same skill (subtle effect)
      hexagons.forEach((otherHex) => {
        if (otherHex.dataset.skill === skill && otherHex !== this) {
          otherHex.classList.add("related")
        }
      })
    })

    hex.addEventListener("mouseleave", () => {
      // Remove active class from all hexagons
      hexagons.forEach((h) => {
        h.classList.remove("active")
        h.classList.remove("related")
      })
    })
  })
})

// Typewriter effect for name
document.addEventListener("DOMContentLoaded", () => {
  const nameElement = document.querySelector(".name")
  const fullName = "Bhavish Kunder"

  if (nameElement) {
    // Clear the existing text
    nameElement.innerHTML = ""

    // Create a span for the cursor
    const cursorSpan = document.createElement("span")
    cursorSpan.className = "cursor"
    cursorSpan.innerHTML = ""

    // Append the cursor to the name element
    nameElement.appendChild(cursorSpan)

    let charIndex = 0
    let isDeleting = false
    let typingDelay = 150 // Delay between each character typing
    const deletingDelay = 75 // Faster when deleting
    const pauseDelay = 2000 // Pause when name is fully typed

    function typeWriter() {
      // If we're not deleting, add characters
      if (!isDeleting) {
        // Insert the next character before the cursor
        nameElement.insertBefore(document.createTextNode(fullName.charAt(charIndex)), cursorSpan)
        charIndex++

        // If we've typed the full name
        if (charIndex === fullName.length) {
          isDeleting = true
          // Pause before starting to delete
          typingDelay = pauseDelay
        }
      } else {
        // Remove the last character (which is before the cursor)
        if (nameElement.childNodes.length > 1) {
          nameElement.removeChild(nameElement.childNodes[nameElement.childNodes.length - 2])
        }
        charIndex--

        // If we've deleted everything
        if (charIndex === 0) {
          isDeleting = false
          // Short pause before typing again
          typingDelay = 500
        }
      }

      // Set the appropriate delay based on whether we're typing or deleting
      setTimeout(typeWriter, isDeleting ? deletingDelay : typingDelay)
    }

    // Start the typewriter effect
    setTimeout(typeWriter, typingDelay)
  }
})

// Animated timeline
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item")

  function animateTimeline() {
    timelineItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (itemTop < windowHeight * 0.8) {
        item.classList.add("timeline-visible")

        // Animate the connecting line for this item
        if (index > 0) {
          const prevItem = timelineItems[index - 1]
          if (prevItem.classList.contains("timeline-visible")) {
            const connector = item.querySelector(".timeline-connector")
            if (connector) {
              connector.classList.add("timeline-connector-visible")
            }
          }
        }
      }
    })
  }

  // Initial check on page load
  animateTimeline()

  // Check on scroll
  window.addEventListener("scroll", animateTimeline)
})

// Enhanced animated timeline for resume section
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item")

  function animateTimeline() {
    timelineItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (itemTop < windowHeight * 0.8) {
        // Add a staggered delay based on the item index
        setTimeout(() => {
          item.classList.add("timeline-visible")
        }, index * 150)
      }
    })
  }

  // Initial check on page load
  setTimeout(animateTimeline, 300)

  // Check on scroll
  window.addEventListener("scroll", animateTimeline)

  // Add hover effects for timeline items
  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
      this.style.boxShadow = "0 20px 30px rgba(0, 0, 0, 0.2)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    })
  })

  // Add progress bar animation for skills
  const skillBars = document.querySelectorAll(".skill-progress-bar")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (barTop < windowHeight * 0.9) {
        const targetWidth = bar.getAttribute("data-progress")
        bar.style.width = targetWidth
        bar.style.opacity = 1
      }
    })
  }

  // Initial check and scroll listener for skill bars
  setTimeout(animateSkillBars, 500)
  window.addEventListener("scroll", animateSkillBars)
})

// Initialize EmailJS
let emailjs = window.emailjs
document.addEventListener('DOMContentLoaded', function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("4xOgnQ0S5JTVaiHHd");
  }
});

function sendContactEmail() {
  // Get form values
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  // Check if all fields are filled
  if (!name || !email || !message) {
    showContactResult('Please fill all fields', false);
    return;
  }

  // Prepare template parameters
  const templateParams = {
    name: name,
    from_name: name,
    from_email: email,
    message: message
  };

  // Show loading state
  const button = document.getElementById('contact-submit-btn');
  const originalText = button.innerHTML;
  button.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  button.disabled = true;

  // Send email
  emailjs.send('service_9j7ufc5', 'template_7udoy4x', templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      showContactResult('Message sent successfully!', true);

      // Reset form
      document.getElementById('contact-name').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-message').value = '';
    })
    .catch(function (error) {
      console.error('FAILED...', error);
      showContactResult('Failed to send message: ' + error.text, false);
    })
    .finally(function () {
      // Reset button after delay
      setTimeout(function () {
        button.innerHTML = originalText;
        button.disabled = false;
      }, 2000);
    });
}

function showContactResult(message, isSuccess) {
  const resultDiv = document.getElementById('contact-result');
  resultDiv.innerHTML = message;
  resultDiv.style.display = 'block';

  if (isSuccess) {
    resultDiv.style.backgroundColor = '#dff0d8';
    resultDiv.style.color = '#3c763d';
  } else {
    resultDiv.style.backgroundColor = '#f2dede';
    resultDiv.style.color = '#a94442';
  }
}

// Premium Loading Screen Functionality
let particlesJS = window.particlesJS
document.addEventListener('DOMContentLoaded', function () {
  // Initialize particles.js if available
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#4cc9f0"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4cc9f0",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: false,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          }
        }
      },
      retina_detect: true
    });
  }

  // Loading animation
  const loaderContainer = document.querySelector('.loader-container');
  const progressFill = document.querySelector('.progress-fill');
  const progressPercentage = document.querySelector('.progress-percentage');
  const loadingText = document.querySelector('.loading-text');

  // Loading text animation
  const loadingTexts = [
    'INITIALIZING',
    'LOADING ASSETS',
    'RENDERING INTERFACE',
    'OPTIMIZING EXPERIENCE',
    'FINALIZING'
  ];

  let currentTextIndex = 0;

  // Change loading text every second
  const textInterval = setInterval(() => {
    currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;

    // Fade out current text
    loadingText.style.opacity = '0';

    // Change text and fade in after a short delay
    setTimeout(() => {
      loadingText.textContent = loadingTexts[currentTextIndex];
      loadingText.style.opacity = '1';
    }, 300);
  }, 1500);

  // Progress animation
  let progress = 0;
  const duration = 5000; // 5 seconds total
  const interval = 30; // Update every 30ms
  const increment = (interval / duration) * 100;

  // Update progress bar
  const progressInterval = setInterval(() => {
    progress += increment;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      clearInterval(textInterval);

      // Complete loading
      setTimeout(() => {
        loaderContainer.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 500);
    }

    // Update progress bar and text
    progressFill.style.width = `${progress}%`;
    progressPercentage.textContent = Math.round(progress);

    // Add special effects at milestones
    if (Math.round(progress) === 25 || Math.round(progress) === 50 || Math.round(progress) === 75) {
      // Pulse effect on logo
      document.querySelector('.logo-svg').style.filter = 'brightness(1.5)';
      setTimeout(() => {
        document.querySelector('.logo-svg').style.filter = 'brightness(1)';
      }, 200);
    }
  }, interval);

  // Create dynamic glow effect on orbital dots
  const orbitalDots = document.querySelectorAll('.orbital-dot');

  orbitalDots.forEach(dot => {
    // Random pulse animation
    setInterval(() => {
      dot.style.boxShadow = '0 0 15px #4cc9f0, 0 0 30px rgba(76, 201, 240, 0.7)';
      setTimeout(() => {
        dot.style.boxShadow = '0 0 10px #4cc9f0, 0 0 20px rgba(76, 201, 240, 0.5)';
      }, 300);
    }, 2000 + Math.random() * 2000);
  });
});