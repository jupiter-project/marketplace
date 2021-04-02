
const FILE_TYPES = Object.freeze({
  IMAGE: {
    LABEL: 'Image',
    VALUE: 'IMAGE',
    ACCEPT: 'image/*',
    PLACEHOLDER: 'PNG, GIF, WEBP. Max 50MB.'
  },
  VIDEO: {
    LABEL: 'Video',
    VALUE: 'VIDEO',
    ACCEPT: 'video/*',
    PLACEHOLDER: 'MP4, AVI. Max 50MB.'
  },
  // AUDIO: {
  //   LABEL: 'Audio',
  //   VALUE: 'AUDIO',
  //   ACCEPT: 'audio/*',
  //   PLACEHOLDER: 'MP3. Max 50MB.'
  // },
})

const FILE_TYPES_ARRAY = [
  FILE_TYPES.IMAGE,
  FILE_TYPES.VIDEO,
  // FILE_TYPES.AUDIO,
]

export {
  FILE_TYPES,
  FILE_TYPES_ARRAY
};
