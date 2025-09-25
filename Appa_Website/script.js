const projects = {
  muthunagar: {
    title: "Muthu Nagar",
    cards: [
      { type: "image", src: "Muthunagar_FP.png", text: "Brochure" },
      { type: "pdf", src: "Muthu_Nagar_PDF.pdf", text: "Project Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=13.0714555,80.0529758&output=embed", text: "Site Map" }
    ]
  },
  kowsalya1: {
    title: "Kowsalya Nagar Phase - 1",
    cards: [
      { type: "image", src: "KN-I.png", text: "Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=Orathur,+Tamil+Nadu+603203&output=embed", text: "Site Map" }
    ]
  },
  kowsalya2: {
    title: "Kowsalya Nagar Phase - 2",
    cards: [
      { type: "image", src: "KN-II.png", text: "Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=Orathur,+Tamil+Nadu+603203&output=embed", text: "Site Map" }
    ]
  },
  sailakshmi: {
    title: "Sai Lakshmi Township",
    cards: [
      { type: "image", src: "SaiLakshmi_Township.png", text: "Brochure" },
      { type: "pdf", src: "SaiLakshmiTown_PDF.pdf", text: "Project Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=Orathur,+Tamil+Nadu+603203&output=embed", text: "Site Map" }
    ]
  },
  colorcity: {
    title: "Color City",
    cards: [
      { type: "image", src: "Color_City.png", text: "Brochure" },
      { type: "pdf", src: "admire color city_PDF.pdf", text: "Project Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=10.7067742,79.0285205&output=embed", text: "Site Map" }
    ]
  },
  kowsalya3: {
    title: "Kowsalya Nagar Phase - 3",
    cards: [
      { type: "image", src: "KN-III-1.png", text: "Brochure" },
      { type: "pdf", src: "kou3_PDF.pdf", text: "Project Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=Orathur,+Tamil+Nadu+603203&output=embed", text: "Site Map" }
    ]
  },
  guru_raghavendra: {
    title: "Guru Raghavendra Enclave",
    cards: [
      { type: "image", src: "Guru Raghavendra Enclave_Coimbatore.png", text: "Brochure" },
      { type: "pdf", src: "Final_Raghavendra Enclave_Coimbatore_PDF.pdf", text: "Project Brochure" },
  { type: "map", src: "https://www.google.com/maps?q=11.092896,76.9973255&output=embed", text: "Site Map" }
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('projectTitle');
const projectCardsContainer = document.querySelector('.project-cards');

const lightbox = document.getElementById('lightbox');
lightbox.addEventListener('click', () => lightbox.style.display = 'none');

function openProjectModal(projectKey) {
  const project = projects[projectKey];
  modalTitle.textContent = project.title;
  projectCardsContainer.innerHTML = '';

  project.cards.forEach(item => {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.innerHTML = `<h4>${item.text}</h4>`;

    if(item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.text;
      img.style.cursor = 'pointer';
      img.addEventListener('click', e => {
        e.stopPropagation();
        lightbox.innerHTML = `<img src="${item.src}" style="max-width:90%; max-height:90%; border-radius:12px;">`;
        lightbox.style.display = 'flex';
      });
      div.appendChild(img);
    } else if(item.type === 'video') {
      div.innerHTML += `<video src="${item.src}" controls></video>`;
    } else if(item.type === 'pdf') {
      const a = document.createElement('a');
      a.href = item.src;
      a.target = "_blank";
      a.textContent = "View PDF";
      a.style.cursor = 'pointer';
      a.style.color = '#f39c12';
      a.style.textDecoration = 'underline';
      div.appendChild(a);
    } else if(item.type === 'map') {
      div.innerHTML += `<iframe src="${item.src}" width="100%" height="200" style="border:0;"></iframe>`;
    }

    projectCardsContainer.appendChild(div);
  });

  modal.style.display = 'flex';
}

function closeProjectModal() {
  modal.style.display = 'none';
  lightbox.style.display = 'none';
}

/* ----------------- Particle Background ----------------- */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

const particles = [];
for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: (Math.random()-0.5)*0.5,
    dy: (Math.random()-0.5)*0.5,
    alpha: Math.random()*0.5+0.3
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
  // Brighter, more highlighted orange (e.g., #FFA500) with higher opacity
  ctx.fillStyle = `rgba(255,165,0,${Math.max(p.alpha,0.7)})`;
    ctx.fill();
    ctx.closePath();
    p.x+=p.dx; p.y+=p.dy;
    if(p.x>canvas.width) p.x=0;
    if(p.x<0) p.x=canvas.width;
    if(p.y>canvas.height) p.y=0;
    if(p.y<0) p.y=canvas.height;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ----------------- Parallax Scroll for Cards ----------------- */
const allCards = document.querySelectorAll('.card');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  allCards.forEach((card,index)=>{
    // Reduce the parallax speed for less movement
    const speed = 0.015 + index*0.004;
    card.style.transform = `translateY(${scrollY*speed}px) scale(1)`;
  });
});
