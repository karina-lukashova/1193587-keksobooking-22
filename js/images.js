import {deleteChildren, pasteImage} from './utils.js';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('.ad-form-header__input');
const avatarContainerElement = document.querySelector('.ad-form-header__preview');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const stayPhotoChooserElement = document.querySelector('.ad-form__input');
const stayPhotosContainerElement = document.querySelector('.ad-form__photo');
const stayPhotoPreviewElement = document.querySelector('.ad-form__photo img');

const readImageWithSubscribe = (file, fileName, preview, container) => {
  const matches = IMAGE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      pasteImage(preview, container, reader.result);
    });

    reader.readAsDataURL(file);
  }
}

const onAvatarChooserChange = (chooser, preview, container) => {
  deleteChildren(container);

  const avatarFile = chooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  readImageWithSubscribe(avatarFile, avatarFileName, preview, container);
}

const onImageChooserChange = (chooser, preview, container) => {
  deleteChildren(container);

  for (let i = 0; i < chooser.files.length; i++) {
    const avatarFileName = chooser.files[i].name.toLowerCase();

    readImageWithSubscribe(chooser.files[i], avatarFileName, preview, container);
  }
}

avatarChooserElement.addEventListener('change', () => {
  onAvatarChooserChange(avatarChooserElement, avatarPreviewElement, avatarContainerElement);
});

stayPhotoChooserElement.addEventListener('change', () => {
  onImageChooserChange(stayPhotoChooserElement, stayPhotoPreviewElement, stayPhotosContainerElement);
});

export {avatarContainerElement, avatarPreviewElement, stayPhotosContainerElement, stayPhotoPreviewElement};
