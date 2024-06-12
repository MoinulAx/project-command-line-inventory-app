


const inventory = require('../data/data.json')



function generateId(inventory) {
    return inventory.length ? Math.max(...inventory.map(item => item.id)) + 1 : 1;
}

function createItem(inventory, name, priceInCents, inStock) {
    const newItem = {
        id: generateId(inventory),
        name,
        priceInCents: parseInt(priceInCents),
        inStock: inStock === 'true'
    };
    inventory.push(newItem);
    return inventory;
}

function showAllItems(inventory) {
    return inventory;
}

function showItem(inventory, id) {
    return inventory.find(item => item.id == id) || `Item with id ${id} not found`;
}

function deleteItem(inventory, id) {
    return inventory.filter(item => item.id != id);
}

function updateItem(inventory, id, name, priceInCents, inStock) {
    const itemIndex = inventory.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
        inventory[itemIndex].name = name || inventory[itemIndex].name;
        inventory[itemIndex].priceInCents = priceInCents !== undefined ? parseInt(priceInCents) : inventory[itemIndex].priceInCents;
        inventory[itemIndex].inStock = inStock !== undefined ? inStock === 'true' : inventory[itemIndex].inStock;
        return inventory;
    } else {
        return `Item with id ${id} not found`;
    }
}

let cart = [];

function addToCart(inventory, id) {
    const cartItem = inventory.find(item => item.id == id);
    if (cartItem) {
        cart.push(cartItem);
        return `Added item ${cartItem.name} to cart`;
    } else {
        return `Item with id ${id} not found`;
    }
}

function viewCart() {
    const total = cart.reduce((sum, item) => sum + item.priceInCents, 0);
    return { cart, total };
}

function cancelCart() {
    cart = [];
    return "Cart emptied";
}

module.exports = {
    
    createItem,
    showAllItems,
    showItem,
    deleteItem,
    updateItem,
    addToCart,
    viewCart,
    cancelCart
};