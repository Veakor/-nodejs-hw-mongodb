import { Contact } from '../db/modal/contact.js';

export const getAllContacts = () => {
  return Contact.find();
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = (payload) => {
  const contact = Contact.create(payload);
  return contact;
};

export const upsertsContact = async (contactId, body, options ={}) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
    upsert: false,
    ...options,
  });
  return contact ? { result: contact, isNew: false } : null;
};

export const deleteContactById = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};