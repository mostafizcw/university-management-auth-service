import { RequestHandler } from 'express';
import { UsersService } from './users.service';

const createUserCL: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UsersService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user create successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const UserController = {
  createUserCL,
};
