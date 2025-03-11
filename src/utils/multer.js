import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = path.resolve("public/img");
    console.log(dest, "dest 8s");
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

export const upload = multer({ storage: storage });
