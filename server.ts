import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const SETTINGS_FILE = path.join(process.cwd(), "settings.json");
const ORDERS_FILE = path.join(process.cwd(), "orders.json");

async function getSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {
      whatsappNumber: "1234567890",
      systemInstruction: "You are a helpful customer support assistant for Lumina Bakery & Eats...",
      socials: { instagram: "#", facebook: "#", tiktok: "#" },
      contact: { address: "123 Culinary Avenue", phone: "+1 (234) 567-890", email: "hello@luminabakery.com", hours: "Mon-Fri 7 AM - 9 PM" }
    };
  }
}

async function getOrders() {
  try {
    const data = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const verifyAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const settings = await getSettings();
    if (!settings.pin) return next();
    
    const providedPin = req.headers['x-admin-pin'];
    if (settings.pin !== providedPin) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  app.post("/api/verify-pin", async (req, res) => {
    const { pin } = req.body;
    const settings = await getSettings();
    
    if (!settings.pin) {
      res.json({ success: true, isSetup: true });
    } else if (settings.pin === pin) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid PIN", hint: settings.hint });
    }
  });

  app.get("/api/settings", async (req, res) => {
    const settings = await getSettings();
    const { pin, ...safeSettings } = settings;
    res.json({ ...safeSettings, hasPin: !!pin });
  });

  app.post("/api/settings", verifyAdmin, async (req, res) => {
    try {
      const newSettings = req.body;
      const currentSettings = await getSettings();
      // Keep existing pin if not provided in newSettings
      if (!newSettings.pin && currentSettings.pin) {
        newSettings.pin = currentSettings.pin;
      }
      await fs.writeFile(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save settings" });
    }
  });

  app.get("/api/orders", verifyAdmin, async (req, res) => {
    const orders = await getOrders();
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const order = req.body;
      const newOrder = {
        id: Date.now().toString(),
        ...order,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      
      const orders = await getOrders();
      orders.unshift(newOrder); // Add to beginning
      await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
      
      res.json(newOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to place order" });
    }
  });

  app.patch("/api/orders/:id", verifyAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const orders = await getOrders();
      const index = orders.findIndex((o: any) => o.id === id);
      
      if (index === -1) return res.status(404).json({ error: "Order not found" });
      
      orders[index].status = status;
      await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
      
      res.json(orders[index]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  // API route for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const settings = await getSettings();
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [
          ...history,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: settings.systemInstruction,
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
