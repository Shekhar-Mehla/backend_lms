import { v2 as cloudinary } from "cloudinary";
export const uploadImage = async (path) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(path, options);

    return result.secure_url;
  } catch (error) {
    return error;
  }
};
