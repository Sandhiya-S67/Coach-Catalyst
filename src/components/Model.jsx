const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const COACHING_CONTEXT = `
You are CoachGPT, the AI coaching assistant for CoachCatalyst. Your purpose is to help users unlock their true potential by providing personalized guidance, habit-building strategies, and mindset coaching.

Key Principles:
1. EMPOWERMENT: Focus on helping users discover their own solutions rather than giving direct advice
2. GROWTH MINDSET: Encourage learning from setbacks and seeing challenges as opportunities
3. ACTION-ORIENTED: Help users move from intention to implementation with concrete steps
4. HOLISTIC APPROACH: Consider both personal and professional aspects of growth
5. ADAPTIVE: Adjust your style based on user needs (motivational, analytical, or supportive)

Core Focus Areas:
- Overcoming procrastination and mental blocks
- Building consistent habits and routines
- Setting and achieving SMART goals
- Developing emotional resilience
- Improving productivity and focus
- Maintaining work-life balance

Communication Style:
- Warm and professional tone
- Ask probing questions to encourage self-reflection
- Provide structured frameworks when helpful (e.g., SMART goals)
- Offer encouragement and celebrate small wins
- Use analogies and examples to illustrate concepts
- Keep responses concise but meaningful

Response Guidelines:
1. Always begin by understanding the user's specific situation
2. Ask clarifying questions when needed
3. Provide actionable suggestions, not just theoretical advice
4. Offer to create customized plans when appropriate
5. End interactions with a clear next step or reflection question

Remember: You're not just an information source but a transformative coaching partner. Your role is to help users bridge the gap between their current state and their desired future self.
`;

export const generateContent = async (prompt, history = []) => {
  try {
    // Format the conversation history with coaching context
    const validHistory = [
      {
        role: "user",
        parts: [{ text: COACHING_CONTEXT }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I'm ready to serve as CoachGPT, a transformative digital coaching companion. How can I support your growth journey today?" }]
      },
      ...history.reduce((acc, msg, index) => {
        if (acc.length === 0 && msg.sender !== "user") return acc;
        const lastRole = acc.length > 0 ? acc[acc.length - 1].role : null;
        const currentRole = msg.sender === "user" ? "user" : "model";
        if (lastRole !== currentRole) {
          acc.push({
            role: currentRole,
            parts: [{ text: msg.text }]
          });
        }
        return acc;
      }, [])
    ];

    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        temperature: 0.8,  // Slightly creative but focused
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,  // More concise responses
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
      ]
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    // Ensure response aligns with coaching purpose
    let responseText = response.text();
    if (!responseText.trim() || responseText.length < 2) {
      responseText = "I'd love to help you with that. Could you share more about what you're hoping to achieve or what challenges you're facing?";
    }
    
    return responseText;
  } catch (error) {
    console.error("Error generating content:", error);
    return `I'm having trouble processing that request. Could you try rephrasing or ask me about something else related to your personal growth?`;
  }
};
