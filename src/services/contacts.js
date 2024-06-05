import { Contact } from '../db/modal/contact.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = (id) => {
  const contact = Contact.findById(id);
  return contact;
};

export const createContact = (payload) => {
  const contact = Contact.create(payload);
  return contact;
};

export const upsertsContact = async (contactId, updateData) => {
  const contact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true });

  return contact;
};

export const deleteContactById = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};