import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-lite", // Menggunakan gemini-2.5-flash-lite sesuai list model terbaru dari user
  systemInstruction: `Anda adalah "The Elephant", bestie mediator yang asik banget.
  Tugas utama Anda adalah menjadi MEDIATOR antara dua orang (Pihak A dan Pihak B) yang sedang berdiskusi.
  
  Aturan bicara WAJIB:
  1. SINGKAT & PADAT: Maksimal 2-3 paragraf pendek per respon. Jangan kasih ceramah panjang!
  2. CONVERSATIONAL: Bicara kayak lagi chat di WhatsApp. Pake bahasa gaul Indonesia yang santai (gue/lo, aku/kamu, asik, oke, siap, dll).
  3. MEDIASI: Tugas Anda adalah menghaluskan kalimat yang kasar, membantu menyampaikan maksud tanpa menuduh, dan menjaga agar diskusi tetap dingin.
  4. EMPATI & AKSI: Dengerin dulu curhatnya, kasih validasi perasaan, baru kasih saran praktis yang gampang dilakuin.
  5. NO ROBOT: Jangan pake "Halo, saya asisten AI". Langsung aja masuk ke topik kayak temen deket.
  6. VISUAL: Gunakan emoji yang relevan tapi gak lebay.`,
  safetySettings: [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
  ],
});

export const generateGameContent = async (gameType, category = '') => {
  try {
    const prompt = `Generate 5 high-quality, fun, and engaging content for a game called "${gameType}" ${category ? `with category "${category}"` : ''}.
    The language MUST be casual Indonesian (bahasa gaul/santai).
    Format the output as a JSON array of strings or objects depending on the game.
    - If it's "Would You Rather", return an array of strings like ["Would you rather A or B?", ...].
    - If it's "Truth or Dare", return an array of strings.
    - If it's "Deep Talk", return an array of strings.
    - If it's "Secret Mission", return an array of strings.
    - If it's "Brainstorm Blitz", return an array of objects: [{ "problem": "...", "prompts": ["...", "...", "..."] }].
    - If it's "Ice Breaker", return an array of strings.
    - If it's "Culture Quest", return an array of objects: [{ "value": "...", "scenario": "...", "options": [{ "text": "...", "correct": true/false }], "feedback": "..." }].
    
    ONLY return the JSON array, no extra text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Clean potential markdown code blocks
    const text = response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating game content:", error);
    return null;
  }
};

export const generateEQFeedback = async (score, breakdown) => {
  const prompt = `Analisis skor EQ Test berikut:
  Skor Total: ${score}%
  Breakdown Parameter: ${JSON.stringify(breakdown)}
  
  Berikan feedback yang personal, santai (bahasa gaul), dan membangun. 
  Sebutkan 1 kekuatan dan 1 area yang perlu ditingkatkan secara spesifik berdasarkan breakdown parameter tersebut.
  
  Format output harus JSON:
  {
    "feedback": "string",
    "strength": "string",
    "improvement": "string"
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating EQ feedback:", error);
    return null;
  }
};

export const generateCommPractice = async (scenarioTitle, category) => {
  const prompt = `Berperan sebagai lawan bicara dalam simulasi komunikasi.
  Skenario: "${scenarioTitle}" (${category})
  
  Mulai percakapan dengan satu kalimat pembuka yang menantang user sesuai skenario.
  Gunakan bahasa Indonesia yang natural/kasual sesuai konteks (misal: profesional untuk B2B, santai untuk pasangan).
  
  Output HANYA string kalimat pembuka, tanpa tanda kutip.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error generating CommPractice intro:", error);
    return "Halo, ada yang ingin dibicarakan?";
  }
};

export const analyzeChat = async (messages) => {
  const prompt = `Analisis percakapan berikut dan berikan:
  1. Skor Kesehatan Hubungan (0-100).
  2. Ringkasan masalah utama (The Elephant in the room).
  3. 3 Saran konkret untuk kedua pihak.
  4. Analisis sentimen singkat.

  Percakapan:
  ${messages.map(m => `${m.role === 'user' ? 'User' : 'Partner'}: ${m.content}`).join('\n')}
  
  Format output harus JSON:
  {
    "score": number,
    "mainIssue": "string",
    "tips": ["tip1", "tip2", "tip3"],
    "sentiment": "string"
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean JSON if necessary
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
