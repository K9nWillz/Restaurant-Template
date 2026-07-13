import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are a helpful customer support assistant for Lumina Bakery & Eats, a premium fast-food restaurant and bakery. 
You can answer questions about the menu, specials, delivery, hours, and business policies.
Always be polite, concise, and helpful. Do not use Markdown formatting if it's not supported well, keep text plain if possible.
Address the user naturally. 

Business Info:
- Address: 123 Culinary Avenue, Food District, NY 10001
- Phone: +1 (234) 567-890
- Email: hello@luminabakery.com
- Delivery: 10-mile radius, 30-45 mins. Hours: 8 AM to 9:30 PM.
- Store Hours: Mon-Fri 7 AM - 9 PM, Sat 8 AM - 10 PM, Sun 9 AM - 8 PM.
- Specialties: Sourdough bread, Butter Croissant, Truffle Mushroom Burger, Spicy Honey Fried Chicken.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [
          ...history,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
