const { readJSONFile, writeJSONFile} = require('./src/inventoryController.js')
const {createItem, showAllItems, showItem, deleteItem, updateItem, addToCart, viewCart, cancelCart } = require("./src/helpers.js");
let chalk = require('chalk');

const log = console.log;


let action = process.argv[2];
let argument = process.argv[3];

function runApp() {
    let inventory = readJSONFile("./data", "data.json") || [];
    let updatedInventory = [];
    let writeToFile = false;

    switch (action) {
        case 'index':
        case 'show-all':
            log(showAllItems(inventory));
            break;

        case 'create':
            updatedInventory = createItem(inventory, argument, process.argv[4], process.argv[5]);
            writeToFile = true;
            break;

        case 'show':
            log(showItem(inventory, argument));
            break;

        case 'delete':
            updatedInventory = deleteItem(inventory, argument);
            writeToFile = true;
            break;

        case 'update':
            let updatedResult = updateItem(inventory, argument, process.argv[4], process.argv[5], process.argv[6]);
            if (typeof updatedResult === 'string') {
                log(updatedResult);
            } else {
                updatedInventory = updatedResult;
                writeToFile = true;
            }
            break;

        case 'add-to-cart':
            log(addToCart(inventory, argument));
            break;

        case 'view-cart':
            log(viewCart());
            break;

        case 'cancel-cart':
            log(cancelCart());
            break;

        default:
            log("Invalid action");
    }

    if (writeToFile) {
        writeJSONFile("./data", "data.json", updatedInventory);
    }
}

runApp();
