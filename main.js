// theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const root = document.body;
    const saved = localStorage.getItem('site-theme');
    if(saved){ root.setAttribute('data-theme', saved); themeToggle.textContent = saved === 'dark' ? 'LIGHT THEME' : 'DARK THEME'; }

    themeToggle.addEventListener('click', ()=>{
      const curr = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = curr === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('site-theme', next);
      themeToggle.textContent = next === 'dark' ? 'LIGHT THEME' : 'DARK THEME';
    });

//nav bar

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

/* Mobile toggle open/close */
hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

/* ✅ Close menu when clicking a link */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

/* ✅ Highlight active menu item on scroll */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
  });


// set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // smooth scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        // guard: make sure target exists before calling scrollIntoView
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
        } else {
          // If target is missing, log a warning (helps debugging) and fallback to top
          console.warn('Anchor target not found for', href);
          window.scrollTo({top:0, behavior:'smooth'});
        }
      }
    })
  });

// intersection observer for reveal 
const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent =>{
      if(ent.isIntersecting){ ent.target.classList.add('visible'); io.unobserve(ent.target); }
    });
  }, {threshold:0.12});
  reveals.forEach(r => io.observe(r));

// Form submission handle
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
  });

  if (response.ok) {
    alert("✅ Message sent successfully!");
    form.reset();
  } else {
    alert("❌ Failed to send message. Try again later.");
  }
});