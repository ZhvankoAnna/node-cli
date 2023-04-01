const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(`${__dirname}/db/contacts.json`);

// console.log(contactsPath)

const getAllContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (id) => {
  const allContacts = await getAllContacts();
  const contactById = allContacts.find((item) => item.id === id);
  return contactById || null;
};

const addContact = async (name, email, phone) => {
  const allContacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    console.log(null);
    return null;
  }
  const [removedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removedContact;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};
