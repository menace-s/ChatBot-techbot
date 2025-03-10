# Chatbot Expert en Maintenance Informatique

Un chatbot interactif spécialisé en maintenance informatique, développé avec l'API Gemini de Google. Ce projet fournit une interface utilisateur intuitive pour interagir avec un expert virtuel en maintenance informatique.

## Fonctionnalités Détaillées

- Interface utilisateur moderne et responsive avec Tailwind CSS
- Expertise en maintenance informatique avec réponses contextualisées
- Réponses limitées à 100 mots pour plus de concision
- Historique des conversations en temps réel
- Gestion des erreurs et messages de fallback

## Technologies Utilisées

- HTML/CSS (Tailwind CSS) pour l'interface utilisateur
- JavaScript vanilla pour la logique frontend
- API Gemini 1.5 de Google pour le traitement du langage naturel
- Système de chat asynchrone avec gestion des promesses

## Installation

1. Clonez le repository :

```bash
git clone menace-s/ChatBot-techbot
```

2. Configurez votre clé API dans `script.js` :

- Créez un compte Google Cloud
- Activez l'API Gemini
- Remplacez `API_KEY` par votre clé

3. Ouvrez `index.html` dans votre navigateur

## Structure du Code

### Fonctions Principales (script.js)

#### `addMessageToChat(message, isUser)`

- Ajoute un message dans l'interface de chat
- Paramètres :
  - `message` : Contenu du message
  - `isUser` : Boolean indiquant si c'est un message utilisateur

#### `sendMessage()`

- Gère l'envoi des messages
- Communique avec l'API Gemini
- Met à jour l'historique des conversations
- Gère les erreurs de communication

#### `chatHistory`

- Tableau stockant l'historique des conversations
- Format : `[{role: "user/bot", message: "contenu"}]`
