const { constants } = require('buffer');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        console.table(JSON.parse(await fs.readFile(contactsPath, "utf8")));
    } catch (error) {
        console.log(error.message);
    };
};
  
async function getContactById(contactId) {
    try {
        const contact = JSON.parse(await fs.readFile(contactsPath, "utf8")).filter(contact =>
            contact.id === contactId.toString()
        );

        if (contact.length) {
            console.table(contact);
        } else {
            console.log(`Contact with id ${contactId} not found`);
        };
    } catch (error) {
        console.log(error.message);
    };
};

async function removeContact(contactId) {
    try {
        let isFound = false;
        const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8")).filter(contact => {
            if (contact.id === contactId.toString()) {
                isFound = true;
                return false;
            };
            
            return true;
        });

        if (isFound) {
            await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
            console.log(`Contact with id ${contactId} has been deleted`);
        } else {
            console.log(`Contact with id ${contactId} not found`);
        };
    } catch (error) {
        console.log(error.message);
    };
};

async function addContact(name = "", email = "", phone = "") {
    try {
        const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
        contacts.push({
            id: (Number(contacts[contacts.length - 1].id) + 1).toString(),
            name,
            email,
            phone
        });
        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
        console.log("Contact has been created");
    } catch (error) {
        console.log(error.message);
    };
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};