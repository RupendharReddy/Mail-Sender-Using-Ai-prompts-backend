import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use process.env to get the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.clear();

async function generateResponseWithDetails(prompt, details) {
    try {
        const detailsString = Object.entries(details)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");

        const fullPrompt = `${prompt}\n\nHere are my details if needed:\n${detailsString}\n${process.env.RESPONSE_INSTRUCTIONS}`;

        // console.log(detailsString);
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: fullPrompt,
                            
                        }
                    ],
                }

            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            }
        });
        const responseText = await result.response.text();

        // Parse subject and body
        const [subjectLine, ...bodyLines] = responseText.split("\n"); // Split by line breaks
        const subject = subjectLine.replace("Subject:", "").trim(); // Remove "Subject:"
        const body = bodyLines.join("\n").trim(); // Join remaining lines as body
        console.log("--------------------------------------- with details ---------------------------------------");
        console.log("Subject:", subject);
        console.log("Body:", body);
    } catch (error) {
        console.error("Error:", error);
    }
}
async function generateResponse(prompt) {
    try {
        // console.log(prompt+process.env.RESPONSE_INSTRUCTIONS);
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: prompt+process.env.RESPONSE_INSTRUCTIONS,
                            
                        }
                    ],
                }

            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            }
        });
        const responseText = await result.response.text();

        // Parse subject and body
        const [subjectLine, ...bodyLines] = responseText.split("\n"); // Split by line breaks
        const subject = subjectLine.replace("Subject:", "").trim(); // Remove "Subject:"
        const body = bodyLines.join("\n").trim(); // Join remaining lines as body
        console.log("--------------------------------------- without details ---------------------------------------");
        console.log("Subject:", subject);
        console.log("Body:", body);
    } catch (error) {
        console.error("Error:", error);
    }
}
const details = {
    "my_name": "Rupendhar",
    "my_email": "rupendhar@gmail.com",
    "my_phone": "1234567890",
    "my_address": "123 Main St, Anytown, USA",
    "About_me": "I am a software developer with experience in React, Node.js, and MongoDB.",
}
const prompt = "generate a letter to HR for the job ";
console.log("Prompt - "+prompt+"\n");

generateResponseWithDetails(prompt, details);
generateResponse(prompt);