import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';

// Функція для підрахунку контактів
async function countContacts() {
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    const contacts = JSON.parse(data);
    const count = contacts.length;
    console.log(count);
  } catch (error) {
    console.error('Error reading contacts:', error);
  }
}

countContacts();
























/*import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';

export const countContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB);
    return JSON.parse(data).length;
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }
};

console.log(countContacts());*/
