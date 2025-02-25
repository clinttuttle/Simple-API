# 🍽️ Simple API - Menu Management

A simple API to manage a restaurant menu! 🚀

## 📥 Getting Started

1. **Clone this repo** 📂:
   ```sh
   git clone https://github.com/datvly/Simple-API
   ```
2. **Navigate to the backend** 📁:
   ```sh
   cd backend
   ```
3. **Start the server** ▶️:
   ```sh
   node server.js
   ```

4. **Use Postman** or `curl` to test the API! 🛠️

---

## 📖 API Endpoints

### 📜 Get the Menu
**GET** all menu items:
```sh
curl -X GET http://localhost:3001/menu
```
**Response:** JSON array of menu items.

---

### ⛔ Mark an Item as Unavailable
**PUT** request to update availability:
```sh
curl -X PUT http://localhost:3001/menu/3 \  
  -H "Content-Type: application/json" \  
  -d '{"available": false}'
```
**Response:** Updated item data.

---

### ➕ Add a New Menu Item
**POST** request:
```sh
curl -X POST http://localhost:3001/menu \  
  -H "Content-Type: application/json" \  
  -d '{
    "name": "Dat Special",
    "description": "Mozzarella Sticks 🧀",
    "price": 8.99,
    "available": true
  }'
```
**Response:** Newly created menu item.

---

### 🗑️ Delete a Menu Item
**DELETE** request:
```sh
curl -X DELETE http://localhost:3001/menu/3
```
**Response:** Confirmation of deletion.

---

🎉 Now you're all set to manage your menu with this API! Happy coding! 😃
