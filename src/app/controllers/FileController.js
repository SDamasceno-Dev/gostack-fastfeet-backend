/**
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 * @description: Controller that allows the upload of files to server.
 * in the Database
 */

// Import model used in this controller
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path
    });
    return res.json(file);
  }
}

export default new FileController();
