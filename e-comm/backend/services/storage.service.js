import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config();

const storageInstance = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL
});
export const IKsend = async (file, fileName) => {
  return await storageInstance.upload({
    file,              // base64 OR buffer OR URL
    fileName,
    folder: "e-comm"
  });
};
