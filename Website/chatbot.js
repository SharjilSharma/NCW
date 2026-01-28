document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Get All Chatbot UI Elements ---
    const chatbotWindow = document.getElementById('chatbot-window');
    const openBtn = document.getElementById('chatbot-open-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    // Read whole.
    // --- 2. Gemini API Configuration ---
    // WARNING: Your API key is visible here.
    // For a real website, you should hide this on a server.
    const API_KEY = "AIzaSyChY2FwT5RTL8ci_lMBC_sLsrBV9_6Pz18"; 
    const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    // --- 3. The Chatbot's "Brain" (UPDATED System Prompt) ---
    // This new prompt is stricter and forces the AI to be concise and list laws.
    const systemInstruction = {
        role: "model",
        parts: [{
            text: `You are "NCW Sahayata Bot," a supportive, empathetic, and expert AI assistant for the National Commission for Women (India).
Your core mission is to provide concise, precise, and legally accurate information on Indian laws for women.

**Strict Rules for Response Generation:**
1.  **Triage First:** If the user implies immediate physical danger, your FIRST and ONLY action is to instruct them to call **112** (Police) or **181** (Women Helpline) immediately.
2.  **Expert Legal Focus (MANDATORY):** Your main goal is to identify the relevant laws. For any problem described (e.g., "my husband hit me," "my boss harasses me," "someone is posting my photos"), you MUST list the specific laws, articles, and sections that apply.
    * **Example:** For domestic violence, you MUST mention the **Protection of Women from Domestic Violence Act, 2005** and **IPC Section 498-A**.
    * **Example:** For cyber-stalking, you MUST mention **IPC Section 354D** and the **IT Act**.
3.  **Mandatory 3-Part Structure:** Every answer (except for danger triage) *must* follow this exact structure:
    * **Concise Summary:** One or two empathetic sentences summarizing the situation and the user's rights.
    * **Relevant Laws & Sections:** A bulleted list. This is the MOST important part. Be precise. List the specific Act names and Section numbers (e.g., **IPC Section 376**, **PoSh Act, 2013**).
    * **Actionable Steps:** A bulleted list of "What to do" steps (e.g., "Call **1930** for cybercrime," "File a Zero FIR").
4.  **Formatting:** Use Markdown. Use **bold** for all key terms, Act names, and helpline numbers. Use bullet points (\`* \`) for lists. Do NOT use headings.
5.  **Disclaimer:** Always conclude every response with this exact disclaimer: "This is not formal legal advice. For a formal complaint and legal counsel, please call the NCW 24/7 Helpline at **7827-170-170**."
`
        }]
    };


    // This holds the conversation history for the AI
    let chatHistory = [systemInstruction];

    // --- 4. Chatbot UI Interaction ---

    openBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
        openBtn.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
        openBtn.style.display = 'block';
    });

    sendBtn.addEventListener('click', handleUserMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserMessage();
        }
    });

    // Handle clicks on initial chat options
    messages.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-option')) {
            const value = e.target.getAttribute('data-value');
            
            // Remove the options
            const optionsDiv = messages.querySelector('.chat-options');
            if (optionsDiv) optionsDiv.remove();

            // Handle the choice
            if (value === 'danger_yes') {
                addMessage("Yes, I am in danger", 'user');
                const botResponse = `
                    Please stop chatting and get to safety immediately.
                    <br><br><strong>Call Police: 112</strong>
                    <br><strong>Women Helpline: 181</strong>
                    <br><br>If you are safe, please tell me what is happening.
                `;
                addMessage(botResponse, 'bot');
                // Add to history so the AI knows
                chatHistory.push({ role: "user", parts: [{ text: "I am in immediate danger." }] });
                chatHistory.push({ role: "model", parts: [{ text: "I have instructed the user to call 112 or 181 immediately." }] });

            } else {
                addMessage("No, I need advice", 'user');
                const botResponse = `I understand. Please tell me what's happening. You can ask me about your rights, what to do in a situation, or about specific laws.`;
                addMessage(botResponse, 'bot');
                chatHistory.push({ role: "user", parts: [{ text: "I am not in immediate danger, I need advice." }] });
                chatHistory.push({ role: "model", parts: [{ text: "I have asked the user to describe their situation." }] });
            }
        }
    });

    /**
     * Grabs the user's message, displays it, and sends it to the AI.
     */
    function handleUserMessage() {
        const text = input.value.trim();
        if (text === '') return;

        addMessage(text, 'user');
        chatHistory.push({ role: "user", parts: [{ text: text }] });
        input.value = '';

        callGeminiAPI(text);
    }

    /**
     * Adds a message bubble to the chat window.
     * @param {string} text - The message content.
     * @param {string} sender - 'user' or 'bot'.
     */
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        // Use the FIXED parseMarkdown function for bot messages
        if (sender === 'bot') {
            messageDiv.innerHTML = parseMarkdown(text);
        } else {
            messageDiv.textContent = text;
        }
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight; // Auto-scroll
    }

    /**
     * NEW, FIXED FUNCTION: Converts basic Markdown to HTML.
     * This version correctly handles lists and bolding.
     * @param {string} text - The raw text from the AI.
     * @returns {string} - HTML formatted text.
     */
    function parseMarkdown(text) {
        let html = text;

        // 1. Convert **bold** to <strong>
        // This handles bold tags correctly
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // 2. Convert list blocks into <ul><li>...</li></ul>
        // This regex finds one or more contiguous lines starting with * or -
        // The 'gm' flags are crucial: 'g' for global (all blocks), 'm' for multiline (so ^ matches start of each line)
        html = html.replace(/(?:^\s*[\*\-]\s+.*\n?)+/gm, (match) => {
            const items = match.trim().split('\n'); // Split the block into individual lines
            const listItems = items
                .map(item => `<li>${item.replace(/^\s*[\*\-]\s+/, '')}</li>`) // Remove the bullet and wrap in <li>
                .join(''); // Join all <li> items together
            return `<ul>${listItems}</ul>`; // Wrap the whole block in <ul>
        });

        // 3. Convert remaining newlines (which are now paragraph breaks) to <br>
        // This is now safe because the newlines inside the list block were
        // already processed and removed by the regex in step 2.
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }


    /**
     * Adds a "Bot is typing..." indicator.
     */
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-indicator';
        typingDiv.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
        return typingDiv;
    }

    /**
     * Calls the Gemini API with the full chat history.
     */
    async function callGeminiAPI() {
        const typingIndicator = showTypingIndicator();

        const payload = {
            contents: chatHistory,
            // Safety settings to allow discussion of sensitive topics
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        };

        try {
            const response = await fetchWithBackoff(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const result = await response.json();
            const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (botResponse) {
                // Add the AI's response to history
                chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
                // Remove typing indicator and add the real message
                messages.removeChild(typingIndicator);
                addMessage(botResponse, 'bot');
            } else {
                throw new Error("Invalid response from API");
            }

        } catch (error) {
            console.error("Gemini API Error:", error);
            messages.removeChild(typingIndicator);
            addMessage("I'm having trouble connecting right now. Please try again later or call the NCW Helpline at <strong>7827-170-170</strong>.", 'bot');
        }
    }
    
    /**
     * Implements exponential backoff for API retries.
     */
    async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
        try {
            const response = await fetch(url, options);
            if (!response.ok && response.status === 429 && retries > 0) { // 429: Too Many Requests
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            }
            return response;
        } catch (error) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithBackoff(url, options, retries - 1, delay * 2);
            }
            throw error;
        }
    }

    // --- Add CSS for Typing Indicator ---
    // This injects the CSS needed for the "..." typing animation.
    const style = document.createElement('style');
    style.innerHTML = `
        .typing-indicator {
            padding: 1rem 1.2rem;
        }
        .typing-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #888;
            animation: typing 1s infinite ease-in-out;
            margin: 0 2px;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1.0);
            }
        }
    `;
    document.head.appendChild(style);
});