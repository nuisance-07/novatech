"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function chatWithNova(history: { role: "user" | "model"; parts: string }[], message: string) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.error("API Key is missing in server action");
            return { error: "API key not configured in server environment" };
        }

        console.log("Initializing Gemini with Key:", apiKey.substring(0, 5) + "...");
        const genAI = new GoogleGenerativeAI(apiKey);

        await connectDB();

        // 1. Fetch product context (RAG)
        // We need the _id for the addToCart action
        const products = await Product.find({})
            .select("name category price description _id")
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        const productContext = products.map(p =>
            `- ${p.name} (ID: ${p._id}, Category: ${p.category}): $${p.price}. ${p.description.substring(0, 100)}...`
        ).join("\n");

        // 2. Construct System Prompt
        const systemPrompt = `
      You are Nova, the advanced AI assistant for NovaTech.
      
      Your Capabilities:
      1. Answer questions about products.
      2. Navigate the user to different pages (Shop, Cart, specific product pages).
      3. Add products to the user's cart.

      Product Inventory:
      ${productContext}
      
      RESPONSE FORMAT:
      You must respond with a JSON object. Do not include markdown formatting like \`\`\`json.
      
      Schema:
      {
        "text": "Your conversational response to the user",
        "action": {
          "type": "navigate" | "addToCart" | null,
          "payload": {
            "path": "string (e.g., '/shop', '/cart', '/product/[id]')",
            "productId": "string (exact ID from inventory)",
            "productName": "string (name of product for confirmation)",
            "price": number (price of product for cart)"
          }
        }
      }

      Examples:
      - User: "Go to the shop" -> { "text": "Taking you to the shop now.", "action": { "type": "navigate", "payload": { "path": "/shop" } } }
      - User: "Add the iPhone 15 to my cart" -> { "text": "I've added the iPhone 15 to your cart.", "action": { "type": "addToCart", "payload": { "productId": "...", "productName": "iPhone 15", "price": 799 } } }
      - User: "Hello" -> { "text": "Hi there! How can I help you today?", "action": null }
    `;

        // 3. Initialize Model with JSON generation config
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        // 4. Start Chat
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{
                        text: JSON.stringify({
                            text: "Understood. I am Nova, ready to assist with NovaTech's futuristic inventory.",
                            action: null
                        })
                    }],
                },
                ...history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.parts }],
                })),
            ],
        });

        // 5. Send Message
        console.log("Sending message to Gemini...");
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        console.log("Gemini response received:", text.substring(0, 50) + "...");

        try {
            // Parse the JSON response
            const data = JSON.parse(text);
            return { data };
        } catch (e) {
            console.error("Failed to parse JSON response:", text);
            // Fallback for malformed JSON
            return { data: { text: text, action: null } };
        }

    } catch (error: any) {
        console.error("Detailed Gemini Error:", error);
        return { error: `Connection error: ${error.message || "Unknown error"}` };
    }
}
