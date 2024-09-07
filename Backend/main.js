const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// const path = require('path')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
 app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],

 }));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
};

app.get('/', (req, res) => {
  res.send("Hello Gemini AI");
});

// Ensure this endpoint matches exactly with what's in your React app
app.post('/api/content', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    const result = await generate(question);
    res.json({ result });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



