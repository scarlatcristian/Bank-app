"use strict";

const nav = document.querySelector(".nav");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const navLinks = document.querySelector(".nav__links");

// OPEN MODAL WINDOW
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

// BTN SCROLL
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// PAGE NAVIGATION
navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// TABBED COMPONENT
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach((text) =>
    text.classList.remove("operations__content--active")
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// LAZY IMAGE
const featuresImages = document.querySelectorAll(".features__img");

const imgObsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  featuresImages.forEach((img) => {
    img.classList.remove("lazy-img");
    img.src = img.dataset.src;
  });

  observer.unobserve(entry.target);
};

const obsOptions = {
  root: null,
  threshold: 0,
};

const imgObserver = new IntersectionObserver(imgObsCallback, obsOptions);
featuresImages.forEach((img) => imgObserver.observe(img));

// REVEALING HIDDEN SECTION ON SCROLL
const sections = document.querySelectorAll(".section");

const sectionObsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionObsCallback, {
  root: null,
  threshold: 0.2,
});

sections.forEach((section) => sectionObserver.observe(section));

// STICKY NAVBAR
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const navObsCallback = function (entrie) {
  const [entry] = entrie;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  if (entry.isIntersecting) nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(navObsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// SLIDER
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let cursorSlider = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, index) =>
        (s.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (cursorSlider === maxSlide - 1) {
      cursorSlider = 0;
    } else {
      cursorSlider++;
    }

    goToSlide(cursorSlider);
    activateDot(cursorSlider);
  };

  const previousSlide = function () {
    if (cursorSlider === 0) {
      cursorSlider = maxSlide - 1;
    } else {
      cursorSlider--;
    }
    goToSlide(cursorSlider);
    activateDot(cursorSlider);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
