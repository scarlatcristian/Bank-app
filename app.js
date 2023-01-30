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

// Open modal window
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

// Button Scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Page navigation
navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component

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
