import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateMailContent = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
        return { subject: "Generated Email", body: await result.response.text() };
    } catch (error) {
        console.error('AI Error:', error);
        return { subject: "Error", body: "Failed to generate email content." };
    }
};
