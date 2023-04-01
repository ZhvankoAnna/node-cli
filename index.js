const contactsServices = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServices.getAllContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contactsServices.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsServices.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contactsServices.removeContact(id);
      console.log("Contact was deleted", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
