import { v2 as cloudinary } from "cloudinary";

const cloudnaryConfig = () => {
  return cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`, // Click 'View API Keys' above to copy your API secret
  });
};

export default cloudnaryConfig;
