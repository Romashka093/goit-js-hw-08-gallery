"use strick";

import galleryItems from "./../gallery-items.js";

const ref = {
  gallery: document.querySelector(".js-gallery"),
  closeButton: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector("div.lightbox__content"),
  item: document.querySelector(".lightbox__image"),
  open: document.querySelector("div.lightbox"),
  img: document.querySelector(".lightbox__image")
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
let imageItem = "";
galleryItems.forEach(item => {
  imageItem = `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${item.original}
  >
    <img
      class="gallery__image"
      src=${item.preview}
      data-source=${item.original}
      alt=${item.description}
    />
  </a>
</li>`;
  ref.gallery.insertAdjacentHTML("beforeend", imageItem);
});

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
ref.gallery.addEventListener("click", handeleOpenItem);
ref.closeButton.addEventListener("click", hangeleCloseButton);
ref.overlay.addEventListener("click", hangeleCloseOverlay);

function handeleOpenItem(evt) {
  evt.preventDefault();
  const targetImage = evt.target;
  if (targetImage === evt.currentTarget) {
    return; // при нажатии на ul - мы выходим
  }
  // Открытие модального окна по клику на элементе галереи.
  ref.open.classList.add("is-open");
  // Подмена значения атрибута src элемента img.lightbox__image.
  ref.img.alt = targetImage.alt;
  ref.img.src = targetImage.dataset.source;
  window.addEventListener("keyup", handleEscape);
  window.addEventListener("keypress", handleScrolling);
}
// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
function hangeleCloseButton() {
  ref.open.classList.remove("is-open");
  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
  // чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  ref.img.alt = "";
  ref.img.src = "";
  window.removeEventListener("keyup", handleEscape);
  window.removeEventListener("keypress", handleScrolling);
}

// Закрытие модального окна по клику на div.lightbox__overlay.
function hangeleCloseOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  hangeleCloseButton();
}
// Закрытие модального окна по нажатию клавиши ESC.
function handleEscape(evt) {
  if (evt.code !== "Escape") {
    return;
  }
  hangeleCloseButton();
}
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
let originItems = [];
galleryItems.forEach(item => {
  originItems.push(item.original);
});

function handleScrolling(evt) {
  // console.log(ref.item.src);
  // let index = originItems.indexOf(ref.item.src);
  // console.log(index);
  // console.log("target:", evt.target);
  // console.log("current:", evt.currentTarget);
  // console.log("Code", evt.code);
  // console.log("Key", evt.keyCode);
  alert(evt.keyCode);

  // if (evt.target !== evt.currentTarget) {

  // }
  // if (evt.code === "Period") {
  //   ref.item.setAttribute("src", originItems[index + 1]);
  // } else if (evt.code === "Comma") {
  //   ref.item.setAttribute("src", originItems[index - 1]);
  // } else {
  //   return console.log(ref.item.src);
  // }

  /////
  // if (evt.keyCode === 39) {
  //   console.log("evt.keyCode :", evt.keyCode);
  //   ref.item.setAttribute("src", originItems[index + 1]);
  // }
  // if (evt.keyCode === 37) {
  //   console.log("evt.keyCode :", evt.keyCode);
  //   ref.item.setAttribute("src", originItems[index - 1]);
  // }
  // if (evt.code === ArrowRight) {
  //   if (index < originItems.length - 1) {
  //     refs.item.setAttribute("src", originItems[index + 1]);
  //   } else {
  //     index = -1;
  //     refs.item.setAttribute("src", originItems[index + 1]);
  //   }
  // }

  // if (evt.code === ArrowLeft) {
  //   if (index === 0) {
  //     index = originItems.length;
  //     refs.item.setAttribute("src", originItems[index - 1]);
  //   } else refs.item.setAttribute("src", originItems[index - 1]);
  // }
}
