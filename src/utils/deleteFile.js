import fs from "fs";
import path from "path";
const deleteFile = (files) => {
  const pathsListToDelete = files.map((file) => file.path);
  pathsListToDelete.map((filepPath) => {
    fs.unlinkSync(path.resolve(filepPath));
  });
};
export const deleteOneFile = (filePath) => {
  fs.unlinkSync(path.resolve(filePath));
};
export default deleteFile;
