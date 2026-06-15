# AI Financial Assistant

AI Financial Assistant is a full-stack web application that helps users analyze their bank transactions using Google's Gemini API. Users can securely log in, upload a bank statement in CSV format, and receive AI-generated insights about their spending patterns and financial habits.

## Features

* Secure authentication with Auth0
* Upload bank statement CSV files
* Parse and process transaction data
* AI-generated spending analysis using Gemini
* Financial summaries and recommendations
* Responsive user interface

## Tech Stack

**Frontend**

* React.js
* CSS
* Axios
* Auth0

**Backend**

* Node.js
* Express.js
* Multer
* csv-parser

**AI**

* Gemini API

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key
```

### Frontend

```bash
cd frontend/my-app
npm install
npm start
```

## How It Works

1. User logs in using Auth0.
2. Uploads a bank statement CSV file.
3. Backend parses transaction data.
4. Gemini analyzes the transactions.
5. Financial insights are displayed on the dashboard.

## Future Improvements

* Interactive charts and analytics
* AI chatbot for financial queries
* MongoDB integration
* PDF bank statement support
* Budget tracking and recommendations

## Author

Abhishek Sakhare
