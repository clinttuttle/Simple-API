const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3001;

// HTTP status codes 
const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

app.use(express.json());

const menuFile = './menu.json';

// Read menu data from file
function readMenu() {
  const data = fs.readFileSync(menuFile, 'utf8');
  return JSON.parse(data);
}

// Write menu data to file
function writeMenu(menu) {
  fs.writeFileSync(menuFile, JSON.stringify(menu, null, 2));
}

// GET - Retrieve the entire menu
app.get('/menu', (req, res) => {
  const menu = readMenu();
  res.status(STATUS.OK).json(menu);
});

// POST - Add a new menu item
app.post('/menu', (req, res) => {
  const { name, description, price, available } = req.body;

  // Validate required fields
  if (!name || !description || price === undefined) {
    return res.status(STATUS.BAD_REQUEST).json({ error: 'Name, description, and price are required' });
  }

  const menu = readMenu();
  const nextId = String(menu.length + 1); 
  const newItem = {
    id: nextId,
    name,
    description,
    price,
    available: available !== undefined ? available : true // Default to available if not specified
  };
  menu.push(newItem);
  writeMenu(menu);
  res.status(STATUS.CREATED).json(newItem);
});

// PUT - Update a menu item
app.put('/menu/:id', (req, res) => {
  const menu = readMenu();
  const id = req.params.id; 
  const itemIndex = menu.findIndex(item => item.id === id); 

  if (itemIndex === -1) {
    return res.status(STATUS.NOT_FOUND).json({ error: 'Item not found' });
  }

  // Update only the fields provided in the request
  const updatedItem = { ...menu[itemIndex], ...req.body };
  menu[itemIndex] = updatedItem;
  writeMenu(menu);
  res.status(STATUS.OK).json(updatedItem);
});

// DELETE - Remove a menu item
app.delete('/menu/:id', (req, res) => {
  let menu = readMenu();
  const id = parseInt(req.params.id); // Convert ID to integer
  const updatedMenu = menu.filter(item => item.id !== id);

  if (updatedMenu.length === menu.length) {
    return res.status(STATUS.NOT_FOUND).json({ error: 'Item not found' });
  }

  writeMenu(updatedMenu);
  res.status(STATUS.OK).json({ message: 'Item deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
