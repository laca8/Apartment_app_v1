# Apartment Management API

Simple API for managing apartments built with Node.js, TypeScript, and MongoDB.

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── entities/          # Database Models
│   │   └── Apartment.ts
│   ├── controllers/       # Request Controllers
│   │   └── apartment.controller.ts
│   ├── services/          # Business Logic
│   │   └── apartment.service.ts
│   ├── routes/            # API Routes
│   │   └── apartment.routes.ts
│   ├── config/            # Database Configuration
│   │   └── db.ts
│   └── server.ts           # Entry Point
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── mongo-init.js
├── uploads/               # Image Storage
├── .env
├── package.json
└── tsconfig.json
```

---

## 🗂️ Main Files Explanation

### 1️⃣ **Entity (Apartment.ts)**
Defines the data structure in MongoDB:

```typescript
{
  unitName: String (required),
  unitNumber: String (required),
  project: String (required),
  description: String,
  price: Number,
  images: [String],
  timestamps: true  // createdAt, updatedAt
}
```

### 2️⃣ **Service (apartment.service.ts)**
Contains database interaction logic:
- `listApartmentsService()` - Fetch apartments list with pagination & search
- `getByIdService(id)` - Fetch single apartment
- `createApartmentService(data)` - Create new apartment

### 3️⃣ **Controller (apartment.controller.ts)**
Handles HTTP Requests and Returns Responses:
- `GET /apartments` - List apartments (with search and filters)
- `GET /apartments/:id` - Single apartment
- `POST /apartments` - Create apartment (with image upload)

### 4️⃣ **Routes (apartment.routes.ts)**
Maps URLs to Controllers:

```typescript
router.get('/apartments', listApartments);
router.get('/apartments/:id', getApartment);
router.post('/apartments', upload.array('images'), createApartment);
```

---

## ⚙️ Project Setup

### 1. Create `.env` file in backend

```env
# MongoDB Connection
MONGO_URI=mongodb://mongo:27017/apartments_app

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload
UPLOAD_PATH=./uploads
```

Create .env file in frontend

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v


```bash
npm install
```

---

## 🐳 Running with Docker

### Start MongoDB + Backend together:

```bash
cd docker
docker-compose up -d

go to 

http://localhost:3000

```

This will run:
- **MongoDB** on port `27017`
- **Backend API** on port `5000`

### Stop services:

```bash
docker-compose down
```

---

## 🚀 Running without Docker

### 1. Run MongoDB locally
Make sure MongoDB is running on `localhost:27017`

### 2. Start Backend

```bash
npm run dev
```

API will run on: `http://localhost:5000`

---

## 📡 API Usage Examples

### 1️⃣ List Apartments

```bash
GET http://localhost:5000/api/apartments?page=1&limit=10&search=luxury&project=downtown
```

**Response:**
```json
{
  "data": [
    {
      "_id": "...",
      "unitName": "Luxury Apartment",
      "unitNumber": "A101",
      "project": "Downtown Tower",
      "description": "Modern 2BR apartment",
      "price": 500000,
      "images": ["uploads/img1.jpg"],
      "createdAt": "2025-10-01T10:00:00Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10
  }
}
```

### 2️⃣ Get Single Apartment

```bash
GET http://localhost:5000/api/apartments/:id
```

### 3️⃣ Create New Apartment

```bash
POST http://localhost:5000/api/apartments
Content-Type: multipart/form-data

Body:
- unitName: "Penthouse Suite"
- unitNumber: "P501"
- project: "Sky Tower"
- description: "Luxury penthouse with city view"
- price: 1200000
- images: [file1.jpg, file2.jpg]
```

---

## 🔒 Security Notes

- Change MongoDB username/password in production
- Use `helmet` and `cors` for security
- Keep `.env` in `.gitignore`

---

## 📦 Core Dependencies

```json
{
  "express": "HTTP Server",
  "mongoose": "MongoDB ODM",
  "multer": "File Upload",
  "typescript": "Type Safety",
  "dotenv": "Environment Variables"
}
```

---

## 🛠️ Useful Commands

```bash
npm run dev          # Run Development Mode
npm run build        # Build for Production
npm start            # Run Production Build
docker-compose logs  # View Logs
```

---

**Ready to use! 🎉**