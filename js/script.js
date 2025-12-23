
      // Theme Toggle
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;
      
      // Check for saved theme or prefer-color-scheme
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
      }
      
      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
      });
      
      // Back to top button
      const backToTopButton = document.querySelector(".back-to-top");

      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add("show");
        } else {
          backToTopButton.classList.remove("show");
        }
      });

      // Form submission
      document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent!';
        submitBtn.disabled = true;
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      });

      // Animation on scroll
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animation]');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
            const animation = element.getAttribute('data-animation');
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
              element.classList.add('animate__' + animation);
            }, delay);
          }
        });
      };

      // Initialize animations on load and scroll
      window.addEventListener('load', animateOnScroll);
      window.addEventListener('scroll', animateOnScroll);

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          const navbarToggler = document.querySelector(".navbar-toggler");
          const navbarNav = document.querySelector("#navbarNav");

          if (navbarToggler && !navbarToggler.classList.contains("collapsed")) {
            navbarToggler.click();
          }
        });
      });

      // Add pulse animation to CTA button periodically
      setInterval(() => {
        const ctaButton = document.querySelector('.pulse');
        ctaButton.classList.remove('pulse');
        void ctaButton.offsetWidth; // Trigger reflow
        ctaButton.classList.add('pulse');
      }, 4000);

      // Animated counter for stats
      const counters = document.querySelectorAll('.stat-number');
      const speed = 200;
      
      const animateCounters = () => {
        counters.forEach(counter => {
          const target = parseInt(counter.innerText.replace('%', '').replace('+', '').replace('<', ''));
          let count = 0;
          const increment = target / speed;
          
          const updateCount = () => {
            if (count < target) {
              count += increment;
              counter.innerText = counter.innerText.includes('%') ? 
                Math.ceil(count) + '%' : 
                counter.innerText.includes('+') ? 
                  Math.ceil(count) + '+' : 
                  counter.innerText.includes('<') ? 
                    '<' + Math.ceil(count) + 's' : 
                    Math.ceil(count);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target + 
                (counter.innerText.includes('%') ? '%' : 
                counter.innerText.includes('+') ? '+' : 
                counter.innerText.includes('<') ? 's' : '');
            }
          };
          
          updateCount();
        });
      };
      
      // Trigger counter animation when stats section is in view
      const statsSection = document.getElementById('stats');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(statsSection);
    