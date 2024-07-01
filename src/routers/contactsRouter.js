import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  putContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middleware/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { authenticate } from '../middleware/authenticate.js';
import { isValidContactId } from '../middleware/isValidContactId.js';




const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.use('./:contactId', isValidContactId('contactId'));


contactsRouter.get(
  '/',
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.put(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;