import { promises as fs } from 'fs';
import { PATH_DB } from '../constants/constants.js';

async function getAllContacts() {
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error reading contacts:', error);
  }
}

// Виклик функції та обробка результату
getAllContacts()
  .then(contacts => {
    if (contacts) {
      console.log(contacts);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


















/*import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';

export const getAllContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB);
    return JSON.parse(data);
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }
};

console.log(getAllContacts());*/
