const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const stayPhotoChooser = document.querySelector('.ad-form__input');
const stayPhotoPreview = document.querySelector('.ad-form__photo img');

const onImageChooserChange = (chooser, preview) => {
  const avatarFile = chooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = IMAGE_TYPES.some((it) => {
    return avatarFileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(avatarFile);
  }
}

avatarChooser.addEventListener('change', () => {
  onImageChooserChange(avatarChooser, avatarPreview);
});

stayPhotoChooser.addEventListener('change', () => {
  onImageChooserChange(stayPhotoChooser, stayPhotoPreview);
});

export {avatarPreview, stayPhotoPreview};
