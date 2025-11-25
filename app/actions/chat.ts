"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function chatWithNova(history: { role: "user" | "model"; parts: string }[], message: string) {
    try {
        if (!process.env.GOOGLE_API_KEY) {
            return { error: "API key not configured" };
        }

        await connectDB();

        // 1. Fetch product context (RAG)
        // In a real app, we'd use vector search. For now, we'll fetch a summary of top products.
        const products = await Product.find({})
            .select("name category price description")
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        const productContext = products.map(p =>
            `- ${p.name} (${p.category}): $${p.price}. ${p.description.substring(0, 100)}...`
        ).join("\n");

        // 2. Construct System Prompt
        const systemPrompt = `
      You are Nova, the advanced AI assistant for NovaTech, a premium e-commerce store selling futuristic gadgets.
      
      Your Persona:
      - Helpful, knowledgeable, and slightly futuristic/tech-savvy.
      - You prioritize sales but are honest about specs.
      - Keep responses concise (under 3 sentences usually).
      
      Product Context (Available Inventory):
      ${productContext}
      
      Rules:
      - Only recommend products from the context above.
      - If asked about something we don't have, politely say we don't carry it yet.
      - Format prices as $X,XXX.
    `;

        // 3. Initialize Model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // 4. Start Chat
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Nova, ready to assist with NovaTech's futuristic inventory." }],
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

        return { text };
    } catch (error: any) {
        const fs = require('fs');
        const logData = JSON.stringify({
            timestamp: new Date().toISOString(),
            message: error.message,
            stack: error.stack,
            apiKeyPresent: !!process.env.GOOGLE_API_KEY,
            apiKeyLength: process.env.GOOGLE_API_KEY?.length
        }, null, 2);
        fs.writeFileSync('debug_error.log', logData);

        console.error("Gemini Chat Error Details:", logData);
        return { error: "I'm having trouble connecting to the neural network right now." };
    }
}
