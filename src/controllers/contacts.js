import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertsContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { isValidContactId } from '../middlewares/isValidContactId.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res,next) => {
  try{
  const contactId = isValidContactId(req, res);

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, {

      status: 404,
      message: 'Not Found',
      data: { message: 'Contact not found' }
    });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}catch (error) {
    next(error); 
  }
};

export const createContactController = async (req, res) => {
  const { body } = req;
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  try{
  const { body } = req;
  const contactId = isValidContactId(req, res);

  const contact = await upsertsContact(contactId, body);

  if (!contact) {
    throw createHttpError(404, {
      status: 404,
      message: 'Not Found',
      data: { message: 'Contact not found' }
    });
  }

  const status = contact.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data: contact.result,
  });
} catch (error) {
  next(error);
}
};

export const putContactController = async (req, res) => {
  const { body } = req;
  const contactId = isValidContactId(req, res);

  const contact = await upsertsContact(contactId, body, {
    upsert: true,
  });

  if (contact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }

  const status = contact.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted contact!',
    data: contact.result,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  try{
  const contactId = isValidContactId(req, res);

  const contact = await deleteContactById(contactId);

  if (!contact) {
    throw createHttpError(404, {
      status: 404,
      message: 'Not Found',
      data: { message: 'Contact not found' }
    });
  }

  res.status(204).send();
} catch (error) {
  next(error);
}
};