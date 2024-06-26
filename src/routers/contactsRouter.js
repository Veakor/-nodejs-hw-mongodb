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
import { upload } from '../middleware/multerUpload.js';


const contactsRouter = Router();



contactsRouter.use('./:contactId', isValidContactId('contactId'));

contactsRouter.use('/', authenticate);
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
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.put(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;