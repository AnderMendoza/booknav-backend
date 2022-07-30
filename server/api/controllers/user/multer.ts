import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});
export const multerOpts: multer.Options = {
  storage: storage,
  limits: { fileSize: 1000000000 },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
};

const upload = multer(multerOpts);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkFileType(file: Express.Multer.File, cb: any) {
  console.log(file);
  // Allowed ext
  const filetypes = /gif|jpe?g|tiff?|png|webp|bmp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    throw new Error('Invalid File !');
  }
}

export default upload;
