/**
 * @description: Controller that allows the upload of files to server.
 * in the Database
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */
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
