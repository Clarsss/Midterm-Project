const menuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('main > section');

if (menuBtn && navLinks) {
	menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
}

function showSection(hash) {
	const id = (hash || '#profile').replace('#', '');
	sections.forEach(sec => {
		const isVisible = sec.id === id;
		sec.style.display = isVisible ? 'block' : 'none';
		if (isVisible) {
			sec.classList.add('fade-in');
			setTimeout(() => sec.classList.remove('fade-in'), 600);
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('mobile-menu');
  const nav = document.querySelector('.nav-links');
  const sections = [...document.querySelectorAll('main > section')];

  menu?.addEventListener('click', () => nav?.classList.toggle('active'));

  const show = (hash = '#profile') => {
    const id = hash.replace('#', '');
    sections.forEach(s => {
      const visible = s.id === id;
      s.style.display = visible ? 'block' : 'none';
      if (visible) {
        s.classList.remove('fade-in');
        void s.offsetWidth;
        s.classList.add('fade-in');
        setTimeout(() => s.classList.remove('fade-in'), 600);
      }
    });
  };

  show(location.hash || '#profile');

  nav?.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    show(a.getAttribute('href'));
    nav.classList.remove('active');
  });

  let lb = document.getElementById('js-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'js-lightbox';
    Object.assign(lb.style, {
      position: 'fixed', inset: '0', display: 'none', alignItems: 'center',
      justifyContent: 'center', background: 'rgba(0,0,0,0.85)', zIndex: '9999', padding: '20px'
    });

    const img = document.createElement('img');
    Object.assign(img.style, { maxWidth: '90%', maxHeight: '80vh', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' });

    const close = document.createElement('button');
    close.textContent = '✕';
    Object.assign(close.style, {
      position: 'absolute', top: '18px', right: '18px', background: '#fff', border: 'none',
      width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px'
    });

    lb.appendChild(img);
    lb.appendChild(close);
    document.body.appendChild(lb);

    const open = src => { img.src = src; lb.style.display = 'flex'; document.body.style.overflow = 'hidden'; };
    const closeLb = () => { lb.style.display = 'none'; img.src = ''; document.body.style.overflow = ''; };

    close.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  document.querySelector('main')?.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    if (img.classList.contains('contact-logo')) return;
    if (!img.closest('main')) return;
    e.preventDefault();
    const src = img.getAttribute('src');
    if (src) document.getElementById('js-lightbox')?.firstElementChild && (document.getElementById('js-lightbox').firstElementChild.src = src);
    document.getElementById('js-lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
