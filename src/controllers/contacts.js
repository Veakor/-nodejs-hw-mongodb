import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertsContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { isValidContactId } from '../middlewares/isValidContactId.js';
import { parsePaginationPrams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { createPaginationData } from '../utils/createPaginationData.js';
export const getContactsController = async (req, res, next) => {
  try{
  const { page, perPage } = parsePaginationPrams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const { data:  totalItems } = await getAllContacts({ page, perPage, sortBy, sortOrder, filter });

  

  const paginationData = createPaginationData(totalItems, perPage, page);
 
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      ...paginationData,
      data: contacts,
      
    },
  });
} catch (error) {
  next(error);
}
};

 /* const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};*/

export const getContactByIdController = async (req, res) => {

  const contactId = isValidContactId(req,res);

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
};

export const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await createContact(body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
export const patchContactController = async (req, res, next) => {
  try {
  const { body } = req;
  const contactId = isValidContactId(req, res);

  const contact = await upsertsContact(contactId, body);

  if (!contact.result) {
    throw createHttpError(404, 'Not Found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
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

export const deleteContactByIdController = async (req, res) => {
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
};