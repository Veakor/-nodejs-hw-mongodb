import { Contact } from '../db/modal/contact.js';
import {SORT_ORDER} from '../db/modal/contact.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactCount, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    Contact.find()
      .merge(contactQuery)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = createPaginationData(contactCount, perPage, page);

  const result = {
    contacts, // Масив контактів
    totalItems: contactCount, // Загальна кількість елементів
    ...paginationData,
  };

  return result;
};

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationPrams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const { contacts, totalItems, totalPages, hasPreviousPage, hasNextPage } = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts, // Масив контактів
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};
 
 /*try{

const [contactCount, contacts] = await Promise.all([
  Contact.find().merge(contactQuery).countDocuments(),
  Contact.find()
    .merge(contactQuery)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec(),
]);

  const paginationData = createPaginationData(contactCount, perPage, page);

  console.log('Contacts found:', contacts); 

  return {
    data: contacts,
    ...paginationData,
  };
} catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getContactById =  (id) => {
  const contact = Contact.findById(id);
  return contact;
};

export const createContact = (payload) => {
  const contact = Contact.create(payload);
  return contact;
};

export const upsertsContact = async (id, payload, options ={}) => {
  const result = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includesResultMetadata: true,
    ...options,
  });
  return {
    result
  };
};


export const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};*/