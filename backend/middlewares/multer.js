import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");

// For profile update: support both resume and profilePhoto fields
export const profileUpdateUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);
