const images = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];


const gallery = document.querySelector('.gallery');
let currentIndex = null;
let instance = null;

function createGalleryItems(images) {
  return images.map(({ preview, original, description }, index) => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  }).join('');
}

gallery.innerHTML = createGalleryItems(images);

// Event listener
gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') return;

  currentIndex = Number(target.dataset.index);
  openModal(currentIndex);
}

function openModal(index) {
  instance = basicLightbox.create(
    `
    <div class="modal-overlay" style="position: relative">
      <img src="${images[index].original}" alt="${images[index].description}" class="modal-image" />
      <button class="nav-button left">&#8592;</button>
      <button class="nav-button right">&#8594;</button>
    </div>
    `,
    {
      onShow: (instance) => {
        document.addEventListener('keydown', onKeyPress);
        instance.element().querySelector('.modal-overlay').addEventListener('click', onOverlayClick);
        instance.element().querySelector('.left').addEventListener('click', showPrevImage);
        instance.element().querySelector('.right').addEventListener('click', showNextImage);
      },
      onClose: () => {
        document.removeEventListener('keydown', onKeyPress);
      }
    }
  );

  instance.show();
}

function onOverlayClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
      instance.close();
    }
  }

function onKeyPress(e) {
  if (e.key === 'ArrowRight') showNextImage();
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'Escape') instance.close();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  instance.close();
  openModal(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  instance.close();
  openModal(currentIndex);
}
