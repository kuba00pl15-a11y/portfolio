// Create floating particles
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 20 + 10 + 's';
    particle.style.animationDelay = Math.random() * 20 + 's';
    container.appendChild(particle);
  }
}
createParticles();

// Typing effect
const phrases = [
  'Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  });
});

// Scroll reveal animation
function reveal() {
  const reveals =
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal();

// Skill bar animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');

  skillBars.forEach(bar => {
    const windowHeight = window.innerHeight;
    const elementTop = bar.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      bar.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars();

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const windowHeight = window.innerHeight;
    const elementTop = counter.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100 &&
        !counter.classList.contains('counted')) {
      counter.classList.add('counted');
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const increment = target / 50;

      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.textContent = Math.ceil(count) + '+';
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = target + '+';
        }
      };
      updateCount();
    }
  });
}

window.addEventListener('scroll', animateCounters);
animateCounters();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});

// Magnetic button effect
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Parallax effect for particles on mouse move
document.addEventListener('mousemove', (e) => {
  const particles = document.querySelectorAll('.particle');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  particles.forEach((particle, index) => {
    const speed = (index % 5 + 1) * 0.5;
    particle.style.transform =
        `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
  });
});

// Obsługa wysyłki formularza kontaktowego
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form.space-y-6');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = form.querySelectorAll('input, textarea');
      const name = inputs[0].value;
      const email = inputs[1].value;
      const message = inputs[2].value;

      fetch('http://localhost:3001/send', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, message})
      })
          .then(res => res.json())
          .then(data => {
            alert(data.message);
            form.reset();
          })
          .catch(err => {
            alert('Błąd wysyłania');
          });
    });
  }
});