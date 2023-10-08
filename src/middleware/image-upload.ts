import multer from 'multer';
import { CARS_IMG_DIR } from '../utils/contant';

const accecptedMimeTypeForImage = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/avif',
];

const storage = multer.diskStorage({
  destination: (_, file, cb) =>
    accecptedMimeTypeForImage.includes(file.mimetype)
      ? cb(null, CARS_IMG_DIR)
      : cb(
          new Error(
            `Image upload operation failed! File type is: ${file.mimetype}`
          ),
          ''
        ),

  filename: (_, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${file.originalname.split('.').pop()}`;
    cb(null, uniqueName);
  },
});

export default multer({ storage, limits: { fileSize: 5000000 } });
