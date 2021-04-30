
const FILE_TYPES = Object.freeze({
  IMAGE: {
    LABEL: 'Image',
    VALUE: 'IMAGE',
    ACCEPT: 'image/*',
    PLACEHOLDER: 'PNG, JPEG, GIF, WEBP. Max 20MB.',
  },
  VIDEO: {
    LABEL: 'Video',
    VALUE: 'VIDEO',
    ACCEPT: 'video/*',
    PLACEHOLDER: 'MP4, AVI, MPEG. Max 20MB.'
  },
})

const FILE_TYPES_ARRAY = [
  FILE_TYPES.IMAGE,
  FILE_TYPES.VIDEO,
]

export {
  FILE_TYPES,
  FILE_TYPES_ARRAY
};
