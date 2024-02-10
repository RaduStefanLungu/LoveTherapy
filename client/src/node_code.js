const fs = require('fs');
const { getUsers } = require('./firebase_admin'); // Adjust the path as needed

// Define a function to save data to a JSON file
function saveToJSON(data, filename) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log('Data saved to', filename);
}

// Define an async function to fetch users and save them to a JSON file
async function fetchAndSaveUsers() {
    try {
        // Call the async getUsers function and await its result
        const users = await getUsers();

        // Specify the filename for the JSON file
        const filename = 'users.json';

        // Save the users data to the JSON file
        saveToJSON(users, filename);
    } catch (error) {
        console.error('Error fetching or saving users:', error);
    }
}

// Call the fetchAndSaveUsers function to initiate the process
fetchAndSaveUsers();
