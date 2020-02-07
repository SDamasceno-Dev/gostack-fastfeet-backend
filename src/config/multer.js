/**
 *  File with all the configuration for uploading files to be used in the App.
 */
import multer from 'multer'; // Allow upload files
import crypto from 'crypto'; //
import { extname, resolve } from 'path'; //

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Format the file name to prevent it from being overwritten.
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
