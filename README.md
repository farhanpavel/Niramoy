# Niramoy

Niramoy is a conversational AI-powered Mental Health Check-in Assistant designed to promote daily mental health tracking, self-care, and community support. By providing personalized insights and recommendations, this application helps users take proactive steps towards their mental well-being.

![screely-1748360541491](https://github.com/user-attachments/assets/e1d282f4-65b6-4f7e-84d6-1178e7387f31)

## Key Features

1. AI-Powered Mental Health Assistant
2. Blog
3. Forum
4. Interactive dashboards to track the patient’s mental health
5. Personalized exercise and diet plan
6. WhatsApp reminders

## Technology Stack

### Frontend

1. Framework: React/Next.js
2. Styling: TailwindCSS

### Backend

1. Framework: Node, Express
2. API Development: REST APIs
3. Database: PostgreSQL for storing user data, mood trends, and feedback, and other information

### AI & Integrations

1. Conversational AI: Google Gemini API for empathetic interactions
2. WhatsApp API: For mood updates and motivational tips

## How to Run the Project

1. Clone the repository:

```
git clone https://github.com/farhanpavel/Niramoy
```

2. For backend, navigate to the server directory and install dependencies:

```
cd server
npm nodemon install
npm prisma migrate dev
```

3. For frontend, navigate to the client directory and install dependencies:

```
cd client
npm install
npm run dev
```

4. Access the frontend at `http://localhost:3000` and backend at `http://localhost:4000`

5. env for backend

```
DATABASE_URL=""
PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_SECRET=
STORE_ID=
STORE_PASSWORD=
```
