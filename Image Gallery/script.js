const images = document.querySelectorAll('.images-wrapper .image');
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('.image img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let visibleImages = Array.from(images);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    images.forEach(img => {
      if (filterValue === 'all') {
        img.style.display = 'block';
      } else {
        if (img.getAttribute('data-category') === filterValue) {
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
        }
      }
    });

    visibleImages = Array.from(images).filter(img => img.style.display !== 'none');
  });
});

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    visibleImages = Array.from(images).filter(img => img.style.display !== 'none');
    currentIndex = visibleImages.indexOf(img);
    showModal();
  });
});

function showModal() {
  modal.style.display = 'flex';
  modalImg.src = visibleImages[currentIndex].querySelector('img').src;
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= visibleImages.length) {
    currentIndex = 0;
  }
  modalImg.src = visibleImages[currentIndex].querySelector('img').src;
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = visibleImages.length - 1;
  }
  modalImg.src = visibleImages[currentIndex].querySelector('img').src;
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'Escape') {
      closeBtn.click();
    }
  }
});