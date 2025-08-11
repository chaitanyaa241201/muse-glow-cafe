// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting){
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  })
},{threshold:0.15});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Pointer-follow light in hero
const hero = document.querySelector('.hero');
if(hero){
  hero.addEventListener('mousemove', (ev)=>{
    const r = hero.getBoundingClientRect();
    const x = ev.clientX - r.left; const y = ev.clientY - r.top;
    hero.style.setProperty('--mx', x+'px');
    hero.style.setProperty('--my', y+'px');
  });
}

// Footer year
const y = document.getElementById('year');
if(y){ y.textContent = new Date().getFullYear(); }
