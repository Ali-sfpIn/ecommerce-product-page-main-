"use strict";
//SELECTIONS...
const mainImg = document.querySelector(".main-img");
const lightBoxImg = document.querySelector(".modal-main-img");
const thumbnailContainer = document.querySelector(".thumbnail-slider");
const thumbnails = document.querySelectorAll(".thumbnail");
const modalThumbnails = document.querySelectorAll(".modal-thumbnail");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const itemController = document.querySelector(".cart-controller");
const amount = document.querySelector(".amount");
const lightBox = document.querySelector(".light-box");
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".bi-chevron-right");
const prevBtn = document.querySelector(".bi-chevron-left");
const chevronContainer = document.querySelector(
  ".light-box-chevrones-container"
);
const badge = document.querySelector(".cart-amount-badge");
const overlay = document.querySelector(".overlay");
const cartItemCatcher = document.querySelector(".cart-item-catcher");
const cartModal = document.querySelector(".cart-modal");
const navbarBrand = document.querySelector(".navbar-brand");
const navbar = document.querySelector(".navbar-nav");
const navLink = document.querySelector(".nav-link");
const sidebar = document.querySelector(".sidebar");
const headContainer = document.querySelector(".container-fluid");
const sidebarCloseBtn = document.querySelector(".menu-close-btn");
const minWidthChevronRight = document.querySelector(".min-width-chevron-right");
const minWidthChevronLeft = document.querySelector(".min-width-chevron-left");
const galleryCol = document.querySelector(".gallery-col");
// STATE VARIABLES//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let clickNum = 0;
let cartAmount = 0;
let minWidthChevNum = 1;
let thumbnailNum;
// HELPER - FUNCTIONS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const thumbActiveManager = function (el, src) {
  document
    .querySelectorAll(`.${src}`)
    .forEach((thumb) => thumb.classList.remove("active-thumbnail"));
  el.classList.add("active-thumbnail");
};

const thumbHandler = function (e) {
  const clicked = e.target;
  if (!clicked.classList.contains("thumbnail")) return;
  if (!clicked.classList.contains("modal-thumbnail"))
    thumbActiveManager(clicked, "thumbnail-reg");
  else thumbActiveManager(clicked, "modal-thumbnail");
  thumbnailNum = clicked.classList[1].slice(10);
  !clicked.classList.contains("modal-thumbnail")
    ? imgPathManager(mainImg, thumbnailNum)
    : imgPathManager(lightBoxImg, thumbnailNum);
};
const hidder = (element) => element.classList.add("d-none");
const shower = (element) => element.classList.remove("d-none");
const imgPathManager = (img, pathNum) =>
  (img.src = `images/image-product-${pathNum}.jpg`);
// REGULAR FUNCTIONS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const cartItemHandler = function () {
  const html = `
  <div class="cart-item w-100 d-flex p-2">
    <img class="cart-item-thumbnail" src="images/image-product-1-thumbnail.jpg" alt="">
    <div class="item-des w-100 d-flex"> 
      <div>
        <h1 class="ms-2 cart-item-title mb-2">Fall Limited edition Sneakers</h1>
        <span class="cart-item-price ps-2">
          $125.00 x <span class="cart-item-amount">${badge.textContent}</span>
        </span>
        <span class="total-price font-700 text-black">${
          badge.textContent * 125
        }.00$</span>
      </div>
      <svg class="d-inline-block delete-icon ms-4 mt-3" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/>
      </svg>
    </div>
  </div>
  <button type="submit" class="checkout-btn default-btn rounded border-0 p-3 font-700 mb-4 mt-2">Checkout</button>
  `;
  cartItemCatcher.innerHTML = "";
  cartItemCatcher.insertAdjacentHTML("beforeend", html);
};
//EVENT HANDLERS...////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//if click happen on thumbnails in the main page
thumbnailContainer.addEventListener("click", thumbHandler);

// if click happens on main image of the page=> show light box
mainImg.addEventListener("click", function () {
  if (document.body.clientWidth < 768) return;
  imgPathManager(lightBoxImg, mainImg.src.slice(43, 44));
  shower(lightBox);
  thumbnailNum = this.src.slice(78, 79);
  console.log(mainImg.src, thumbnailNum);
  thumbActiveManager(
    document.querySelector(`[data-number="${thumbnailNum}"]`),
    "modal-thumbnail"
  );
  shower(overlay);
});

// handling clicks on thumbnails on lightbox
lightBox.addEventListener("click", thumbHandler);

closeBtn.addEventListener("click", () => {
  hidder(lightBox);
  hidder(overlay);
});

overlay.addEventListener("click", () => {
  hidder(overlay);
  hidder(lightBox);
  navbar.classList.remove("navbar-slide");
  sidebar.style.left = "-350px";
  sidebar.classList.remove("hard-shadow");
});
itemController.addEventListener("click", function (e) {
  if (e.target.classList.contains("adder")) clickNum++;
  if (e.target.classList.contains("remove")) clickNum--;
  amount.textContent = clickNum >= 0 ? clickNum : (clickNum = 0);
});

chevronContainer.addEventListener("click", function (e) {
  const chevron = e.target;
  if (chevron.classList.contains("right")) +thumbnailNum++;
  if (chevron.classList.contains("left")) +thumbnailNum--;
  if (thumbnailNum > 4 || thumbnailNum < 1) thumbnailNum = 1;
  imgPathManager(lightBoxImg, thumbnailNum);
  const targetThumb = document.querySelector(`[data-number="${thumbnailNum}"]`);
  thumbActiveManager(targetThumb, "modal-thumbnail");
});

addToCartBtn.addEventListener("click", function () {
  badge.classList.remove("invisible");
  cartAmount += +amount.textContent;
  badge.textContent = cartAmount;
  cartItemHandler();
  clickNum = amount.textContent = 0;
});

cartModal.addEventListener("click", function (e) {
  const clicked = e.target.closest(".delete-icon");
  if (!clicked) return;
  cartItemCatcher.innerHTML = `<p class="cart-des text-center p-5 font-700">Your cart is empty!</p>`;
  badge.classList.add("invisible");
  cartAmount = 0;
});

navbarBrand.addEventListener("click", function (e) {
  if (!e.target.classList.contains("bi-list")) return;
  sidebar.style.left = "0";
  shower(overlay);
  sidebar.classList.add("hard-shadow");
});

sidebarCloseBtn.addEventListener("click", function () {
  hidder(overlay);
  sidebar.style.left = "-350px";
  sidebar.classList.remove("hard-shadow");
});

galleryCol.addEventListener("click", function (e) {
  const clicked = e.target;
  if (!clicked.classList.contains("min-width-chev")) return;
  if (clicked.classList.contains("min-width-chevron-right")) minWidthChevNum++;
  if (clicked.classList.contains("min-width-chevron-left")) minWidthChevNum--;
  if (minWidthChevNum > 4 || minWidthChevNum < 1) minWidthChevNum = 1;
  thumbnailNum = minWidthChevNum;
  console.log(minWidthChevNum);
  imgPathManager(mainImg, thumbnailNum);
});
