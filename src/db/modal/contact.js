import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: false },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      require: false,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// Визначення константи SORT_ORDER
const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// Експорт моделі контакту і SORT_ORDER
export const Contact = model('contacts', contactSchema);
export { SORT_ORDER };