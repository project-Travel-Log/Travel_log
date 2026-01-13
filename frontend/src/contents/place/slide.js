
let slideIndex = 1
let intervalId = null

export function initSlider() {
  showSlide(slideIndex)

  document.querySelectorAll('.slider-btn').forEach(btn => {
    btn.onclick = () => {
      const dir = Number(btn.dataset.dir)
      changeSlide(dir)
    }
  })

  document.querySelectorAll('.dot').forEach(dot => {
    dot.onclick = () => {
      const n = Number(dot.dataset.slide)
      showSlide(slideIndex = n)
    }
  })

  intervalId = setInterval(() => {
    changeSlide(1)
  }, 5000)
}

export function destroySlider() {
  if (intervalId) clearInterval(intervalId)
}

function changeSlide(n) {
  showSlide(slideIndex += n)
}

function showSlide(n) {
  const slides = document.querySelectorAll('.spg-sublong-image')
  const dots = document.querySelectorAll('.dot')

  if (n > slides.length) slideIndex = 1
  if (n < 1) slideIndex = slides.length

  slides.forEach(slide => slide.classList.remove('active'))
  dots.forEach(dot => dot.classList.remove('active'))

  slides[slideIndex - 1].classList.add('active')
  dots[slideIndex - 1].classList.add('active')
}
