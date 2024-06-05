import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const isValidContactId = (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, { message: 'Invalid contact ID' });
  }
  return contactId;
};