let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  const slides = document.querySelectorAll('.spg-sublong-image');
  const dots = document.querySelectorAll('.dot');

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
}

setInterval(() => {
  changeSlide(1);
}, 5000);