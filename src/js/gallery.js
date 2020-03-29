"use strick";

import galleryItems from "./../gallery-items.js";

console.log(galleryItems);

const ref = {
  gallery: document.querySelector(".js-gallery"),
  closeButton: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector("div.lightbox__content")
};

console.log("Gallery:", ref.gallery);
console.log("Btn:", ref.closeButton);
console.log("Overlay:", ref.overlay);
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
  const open = document.querySelector("div.lightbox");
  open.classList.add("is-open");
  // Подмена значения атрибута src элемента img.lightbox__image.
  const img = document.querySelector(".lightbox__image");
  img.alt = targetImage.alt;
  img.src = targetImage.dataset.source;
  window.addEventListener("keyup", handleEscape);
  window.addEventListener("keypress", handleScrolling);
}
// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
function hangeleCloseButton() {
  const open = document.querySelector("div.lightbox");
  open.classList.remove("is-open");
  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
  // чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  const img = document.querySelector(".lightbox__image");
  img.alt = "";
  img.src = "";
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
console.log(originItems);

function handleScrolling(evt) {
  // console.dir(evt.keyCode); // 46
  // console.log(evt.target.nodeName); // BODY
  // console.log(evt.key); // .
  // console.dir(evt.code); // Period
  const item = document.querySelector(".lightbox__image");
  console.log(item.src);
  let index = originItems.indexOf(item.src);
  console.log(index);

  // console.dir(item);
  if (evt.target !== evt.currentTarget) {
    if (evt.code === "Period") {
      console.log("Yep!, see next");
      console.log(originItems[index + 1]);
      item.setAttribute("src", originItems[index + 1]);
    } else if (evt.code === "Comma") {
      console.log("No! Lets see prev");
      console.log(originItems[index - 1]);
      item.setAttribute("src", originItems[index - 1]);
    } else {
      return item.src;
    }
  }
}
