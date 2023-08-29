const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const filter = express.Router();
filter.use(express.json());

// const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

filter.use(bodyParser.json());
filter.use(cors());

// Set up the ChatGPT endpoint
filter.post("/", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              'You are a system administrator for an event form.  Your job is to read the event title and event description and determine if it\'s inflammatory.   You are to use the following description to consider if it\'s hate speech: " Hate speech is understood as any form of negative speech (ranging from offensive to direct incitement to violence) targeted at protected characteristics such as sexual orientation, race or disability. The reason for such a wide understanding of hate speech is to incorporate as many countries as possible in the resource, even if they adopt a low or high threshold of harm.  This also includes problematic far-right-leaning concepts, such as "White genocide".   You must also ban anything that can be considered exclusionary by any characteristic."    If you determine the event to be inflammatory or problematic, you are to respond with "true".   Else, you respond with "false".  You will then separate your true or false judgment with a | then add a sentence with a maximum word length of 10 explaining the reason for your decision.',
          },
        ],
        temperature: 0,
        max_tokens: 341,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await response.json();
    const reply = data;
    res.json({ reply }.reply.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = filter;
