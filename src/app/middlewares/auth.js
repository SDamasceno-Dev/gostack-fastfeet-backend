/**
 * @description: Checks if the active session is from an Admin and blocks if
 * negative
 * @author: Sandro Damasceno <sdamasceno.dev@gmail.com>
 */

import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.adminId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid!' });
  }
};
