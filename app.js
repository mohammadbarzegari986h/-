
    // Year
    document.getElementById('y').textContent = new Date().getFullYear();

    // Theme toggle (persist)
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme');
    const saved = localStorage.getItem('nexora-theme');
    if(saved === 'light') root.classList.add('light');
    themeBtn.addEventListener('click',()=>{
      root.classList.toggle('light');
      localStorage.setItem('nexora-theme', root.classList.contains('light') ? 'light' : 'dark');
    });

    // Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target);} });
    },{threshold:.14});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // Progress bar
    const prog = document.getElementById('progress');
    const setProg = ()=>{
      const h = document.documentElement;
      const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
      prog.style.transform = `scaleX(${scrolled})`;
    };
    setProg();
    addEventListener('scroll', setProg, {passive:true});

    // Active nav link
    const sections = ['services','work','stack','pricing','contact'];
    const linkMap = new Map(sections.map(id=>[id, document.querySelector(`.nav__links a[href="#${id}"]`)]));
    const secIO = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        const l = linkMap.get(e.target.id);
        if(!l) return;
        if(e.isIntersecting) l.classList.add('active'); else l.classList.remove('active');
      })
    },{threshold:.4});
    sections.forEach(id=>{ const s = document.getElementById(id); if(s) secIO.observe(s); })

    // Parallax layers
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    addEventListener('mousemove', (e)=>{
      const x = (e.clientX / innerWidth - .5);
      const y = (e.clientY / innerHeight - .5);
      p1.style.transform = `translate(${x*-10}px, ${y*-6}px)`;
      p2.style.transform = `translate(${x*8}px, ${y*4}px)`;
    }, {passive:true});

    // Tilt cards
    const tilts = document.querySelectorAll('.tilt, .tile');
    tilts.forEach(el=>{
      el.addEventListener('mousemove', (e)=>{
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width - .5;
        const y = (e.clientY - r.top)/r.height - .5;
        el.style.transform = `rotateX(${y*-6}deg) rotateY(${x*8}deg)`;
      });
      el.addEventListener('mouseleave', ()=>{ el.style.transform = 'rotateX(0) rotateY(0)'; });
    });

    // Magnetic buttons
    document.querySelectorAll('.magnet').forEach(btn=>{
      const s = 18;
      btn.addEventListener('mousemove', (e)=>{
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width/2);
        const y = e.clientY - (r.top + r.height/2);
        btn.style.transform = `translate(${x/s}px, ${y/s}px)`;
      });
      btn.addEventListener('mouseleave', ()=>{ btn.style.transform = 'translate(0,0)'; });
    });

    // Custom cursor



    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-in'));
      document.querySelectorAll('.tilt,.tile,.magnet').forEach(el=>{
        el.onmousemove = null; el.onmouseleave = null; el.style.transform = 'none';
      });
      document.getElementById('cDot').style.display='none';
      document.getElementById('cRing').style.display='none';
    }
