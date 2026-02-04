import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "PASTE_YOUR_OPENAI_KEY_HERE"
});

/* =========================
   AI ENDPOINT
========================= */

app.post("/ask-ai", async (req, res) => {

  try{

    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast + cheap + powerful
      messages: [
        {
          role:"system",
          content:`
You are Ragelite AI — an elite growth strategist.

Speak like a high-level AI advisor.

Give sharp, confident marketing insights.

Never sound like a chatbot.
`
        },
        {
          role:"user",
          content:message
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  }catch(err){

    console.log(err);
    res.status(500).send("AI error");

  }

});

app.listen(3000,()=>{
  console.log("🔥 Ragelite AI running on port 3000");
});
