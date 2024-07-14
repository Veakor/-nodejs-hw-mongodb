import { isValidObjectId } from "mongoose";
import createHttpError from 'http-errors';

export const isValidContactId  = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createHttpError (400, `${contactId} is not valid id`));
  }
  next();
};