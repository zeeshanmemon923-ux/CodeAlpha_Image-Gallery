const gallery = document.querySelector('.gallery');
const filterButtons = document.querySelectorAll('.filter-buttons button');

// Categories and Images
const categories = {
  t_shirt: ['t_shirt1.jpg', 't_shirt2.jpg', 't_shirt3.jpg', 't_shirt4.jpg', 't_shirt5.jpg', 't_shirt6.jpg', 't_shirt7.jpg', 't_shirt8.jpg'],
  shirt: ['shirt1.jpg', 'shirt2.jpg', 'shirt3.jpg', 'shirt4.jpg', 'shirt5.jpg', 'shirt6.jpg', 'shirt7.jpg', 'shirt8.jpg'],
  jeans: ['jeans1.jpg', 'jeans2.jpg', 'jeans3.jpg', 'jeans4.jpg', 'jeans5.jpg', 'jeans6.jpg', 'jeans7.jpg', 'jeans8.jpg' ],
  shoes: ['shoes1.jpg', 'shoes2.jpg', 'shoes3.jpg', 'shoes4.jpg', 'shoes5.jpg', 'shoes6.jpg', 'shoes7.jpg', 'shoes8.jpg'],
  watches: ['watches1.jpg', 'watches2.jpg', 'watches3.jpg', 'watches4.jpg', 'watches5.jpg', 'watches6.jpg', 'watches7.jpg', 'watches8.jpg'],
};

// Display gallery
function displayImages(category) {
  gallery.innerHTML = '';
  let images = [];

  if (category === 'all') {
    Object.values(categories).forEach(arr => images.push(...arr));
    images = images.sort(() => Math.random() - 0.5); // Random order for All
  } else {
    images = categories[category];
  }

  images.forEach(img => {
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    div.innerHTML = `<img src="${img}" alt="">`;
    gallery.appendChild(div);
  });
}

// Initial load
displayImages('all');

// Filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    displayImages(button.dataset.filter);
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
let currentImages = [];

function openLightbox(index) {
  lightbox.style.display = 'flex';
  lightboxImg.src = currentImages[index];
  currentIndex = index;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

// Open lightbox when clicking image
gallery.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    currentImages = Array.from(gallery.querySelectorAll('img')).map(img => img.src);
    openLightbox(Array.from(gallery.querySelectorAll('img')).indexOf(e.target));
  }
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
