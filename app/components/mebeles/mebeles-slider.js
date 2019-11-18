export default function mebelesSlider() {
  let current = 1;
  let remove = 3;
  const svg = document.querySelector('.mebeles-slider__slide');
  const images = document.querySelectorAll('.path-image');
  const clips = document.querySelectorAll('.clip-path');

  function progress() {
    const nextNode = svg.removeChild(images[current]);
    svg.appendChild(nextNode);
    setTimeout(() => {
      images[remove].classList.remove('is-shown');
      clips[remove].classList.remove('is-scale');
      images[current].classList.add('is-shown');
      clips[current].classList.add('is-scale');
      remove = (remove + 1) % images.length;
      current = (current + 1) % images.length;
    });
  }

  function schedule() {
    progress();
    setTimeout(schedule, 4000);
  }

  if (svg && images && clips) {
    setTimeout(schedule, 500);
  }
}
