// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navMenu = document.getElementById("navMenu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Toggle icon
      const icon = mobileMenuBtn.querySelector("i")
      if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        const icon = mobileMenuBtn.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  })
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.firstName || !data.lastName || !data.email || !data.phone) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  if (!isValidEmail(data.email)) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    showNotification("Thank you! Your quote request has been sent. We'll get back to you within 24 hours.", "success")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `

  // Add to page
  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".service-card, .pricing-card, .portfolio-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Portfolio filter functionality (if needed in future)
function filterPortfolio(category) {
  const items = document.querySelectorAll(".portfolio-item")

  items.forEach((item) => {
    const itemCategory = item.querySelector(".category").textContent

    if (category === "all" || itemCategory === category) {
      item.style.display = "block"
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "scale(1)"
      }, 100)
    } else {
      item.style.opacity = "0"
      item.style.transform = "scale(0.8)"
      setTimeout(() => {
        item.style.display = "none"
      }, 300)
    }
  })
}

// Pricing calculator (basic implementation)
function calculatePrice(size, plan) {
  const prices = {
    basic: 15,
    professional: 22,
    premium: 35,
  }

  const sizes = {
    "2x4": 8,
    "3x6": 18,
    "4x8": 32,
  }

  if (prices[plan] && sizes[size]) {
    return prices[plan] * sizes[size]
  }

  return 0
}

// Add click handlers for service cards
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    const orderBtn = card.querySelector(".btn")
    if (orderBtn) {
      orderBtn.addEventListener("click", (e) => {
        e.preventDefault()
        // Scroll to contact form
        const contactSection = document.getElementById("contact")
        if (contactSection) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = contactSection.offsetTop - headerHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Focus on the form
          setTimeout(() => {
            const firstInput = contactSection.querySelector("input")
            if (firstInput) {
              firstInput.focus()
            }
          }, 1000)
        }
      })
    }
  })
})

// Add click handlers for pricing cards
document.addEventListener("DOMContentLoaded", () => {
  const pricingBtns = document.querySelectorAll(".pricing-card .btn")

  pricingBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()

      // Get the plan name
      const planName = this.closest(".pricing-card").querySelector("h3").textContent

      // Scroll to contact form
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = contactSection.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Pre-fill the form with plan information
        setTimeout(() => {
          const projectDetails = contactSection.querySelector("#projectDetails")
          if (projectDetails) {
            projectDetails.value = `I'm interested in the ${planName} plan. `
            projectDetails.focus()
          }
        }, 1000)
      }
    })
  })
})

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img)
    }
  })
})
