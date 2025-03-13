import multer from "multer";
import path from "path";
import fs from "fs";
import { error } from "console";

//   destination: function (req, file, cb) {
//     const dest = path.resolve("/public/img");
//     console.log(req);

//     if (!fs.existsSync(dest)) {
//       fs.mkdirSync(dest, { recursive: true });
//     }
//     cb(null, "./public/img");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
//     );
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync("./public/img")) {
        fs.mkdirSync(path.resolve("public/img"), { recursive: true });
      }
      cb(null, "./public/img");
    } catch (err) {
      console.error(err);
      cb(Error(error), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const acceptedFile = /png|jpg|jpeg|png|gif|svg|webp/;
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  const filetype = file.mimetype.split("/")[1];

  const fileExtension = path.extname(file.originalname);

  if (
    acceptedFile.test(fileExtension.toLowerCase()) &&
    acceptedFile.test(filetype.toLowerCase())
  ) {
    cb(null, true);
  } else {
    // You can always pass an error if something goes wrong:
    cb(
      new Error(`Only png|jpg|jpeg|png|gif|svg|webp files are allowed  `),
      false
    );
  }

  // To reject this file pass `false`, like so:

  // To accept the file pass `true`, like so:
}
export const upload = multer({ storage: storage, fileFilter });
