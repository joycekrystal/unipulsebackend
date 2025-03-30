import fs from "fs";
import path from "path";

export const ensureUploadDirs = () => {
  const uploadDirs = [
    "public/uploads",
    "public/uploads/events",
  ];

  uploadDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
};