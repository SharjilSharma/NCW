document.addEventListener('DOMContentLoaded', () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    const openBtn = document.getElementById('chatbot-open-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    const API_KEY = "AIzaSyAwsAk254TFsn9VCpNC8ffdGNlzxb6HrZM"; 
    const MODEL_NAME = "gemini-1.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

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

    let chatHistory = [systemInstruction];

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

    messages.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-option')) {
            const value = e.target.getAttribute('data-value');
            const optionsDiv = messages.querySelector('.chat-options');
            if (optionsDiv) optionsDiv.remove();

            if (value === 'danger_yes') {
                addMessage("Yes, I am in danger", 'user');
                const botResponse = `
                    Please stop chatting and get to safety immediately.
                    <br><br><strong>Call Police: 112</strong>
                    <br><strong>Women Helpline: 181</strong>
                    <br><br>If you are safe, please tell me what is happening.
                `;
                addMessage(botResponse, 'bot');
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

    function handleUserMessage() {
        const text = input.value.trim();
        if (text === '') return;

        addMessage(text, 'user');
        chatHistory.push({ role: "user", parts: [{ text: text }] });
        input.value = '';

        callGeminiAPI(text);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = parseMarkdown(text);
        } else {
            messageDiv.textContent = text;
        }
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function parseMarkdown(text) {
        let html = text;
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/(?:^\s*[\*\-]\s+.*\n?)+/gm, (match) => {
            const items = match.trim().split('\n');
            const listItems = items
                .map(item => `<li>${item.replace(/^\s*[\*\-]\s+/, '')}</li>`)
                .join('');
            return `<ul>${listItems}</ul>`;
        });
        html = html.replace(/\n/g, '<br>');
        return html;
    }

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

    async function callGeminiAPI() {
        const typingIndicator = showTypingIndicator();

        const payload = {
            contents: chatHistory,
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        };

        try {
            const response = await fetch(API_URL, {
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
                chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
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