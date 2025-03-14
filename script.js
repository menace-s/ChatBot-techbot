// Configuration
const API_KEY = "AIzaSyCrydV3m7F0O_XduAnNdTaqpz8e7aAzlQc";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

let chatHistory = [];
const sendButton = document.getElementById("send-button");
// Ajout du contexte d'expert en maintenance
const EXPERT_CONTEXT = `Tu es un expert en maintenance informatique. 
Tu dois :
- Répondre de manière professionnelle et précise
- Répondre en maximum 150 mots
- tu peux utiliser des emojis pour rendre la conversation plus agréable
- Donner des solutions étape par étape de façon concise avec des listes à puces ou numérotées
- Expliquer les termes techniques si nécessaire
- Proposer des solutions alternatives si possible
- Donner des conseils de prévention
- Rester focalisé sur les problèmes informatiques
- Demander des précisions si nécessaire pour mieux diagnostiquer
- Utiliser un langage technique mais compréhensible
- Si la question n'est pas liée à l'informatique, réponds poliment que tu es spécialisé en maintenance informatique`;

function addMessageToChat(message, isUser = false) {
  const chatContainer = document.getElementById("chat-container");
  const messageDiv = document.createElement("div");

  // Création de la bulle de message avec les nouvelles classes
  const messageContainer = document.createElement("div");
  messageContainer.className = `message ${
    isUser ? "user-message" : "bot-message"
  }`;

  // Utiliser innerHTML avec marked pour le formatage Markdown (seulement pour les messages du bot)
  if (isUser) {
    messageContainer.textContent = message;
  } else {
    // Configuration de marked pour la sécurité
    marked.setOptions({
      breaks: true, // Permet les retours à la ligne avec un seul retour chariot
      sanitize: true, // Nettoie le HTML dangereux
    });
    messageContainer.innerHTML = marked.parse(message);
  }

  // Ajout du conteneur du message
  const wrapper = document.createElement("div");
  wrapper.className = `message-wrapper ${
    isUser ? "user-wrapper" : "bot-wrapper"
  }`;
  wrapper.appendChild(messageContainer);

  messageDiv.appendChild(wrapper);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  const inputElement = document.getElementById("user-input");
  const userMessage = inputElement.value.trim();

  if (!userMessage) return;

  // Afficher le message de l'utilisateur
  addMessageToChat(userMessage, true);

  // Vider l'input
  inputElement.value = "";

  try {
    // Modification pour inclure le contexte à chaque message
    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `${EXPERT_CONTEXT}\n\nQuestion de l'utilisateur: ${userMessage}\n\nRéponds en tant qu'expert en maintenance informatique:`,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.candidates[0].content.parts[0].text;

    // Ajouter à l'historique
    chatHistory.push(
      { role: "user", message: userMessage },
      { role: "bot", message: botResponse }
    );

    // Afficher la réponse
    addMessageToChat(botResponse, false);
  } catch (error) {
    console.error("Erreur:", error);
    addMessageToChat(
      "Désolé, une erreur est survenue. Veuillez réessayer ou contacter un support technique.",
      false
    );
  }
}

// Gérer l'envoi avec la touche Entrée
document.getElementById("user-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

sendButton.addEventListener("click", sendMessage);
