/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Configuration for uploading files to be used in App
 */

// Import of the dependencies used in this controller
import multer from 'multer'; // Allow upload files
import crypto from 'crypto'; // Generate random characters to make the uploaded file name unique

// Get the extension of the file and tha path to this file
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Format the file name to prevent it from being overwritten
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
