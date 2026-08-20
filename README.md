# femi.ai

A cinematic, persona-based chat app built with React, TypeScript, Vite, and Tailwind CSS. The app presents a minimal monochrome interface with multiple AI personalities, voice input, text-to-speech, conversation persistence in memory, and PDF export for chat sessions.

This repository is the front-end implementation for a lightweight AI assistant experience, with the actual model call being routed through a remote HTTP endpoint configured in the app.

## Features

- Persona-driven chat flow with multiple assistant styles
- Onboarding screen for persona selection
- Conversational history with sidebar navigation
- New chat creation and switching between sessions
- Voice input using browser speech recognition
- Text-to-speech playback for assistant messages
- PDF export of the active conversation
- Animated, glassmorphism-inspired visual design
- Built as a Vite single-page app

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- TanStack Query
- Radix UI primitives
- GSAP for motion effects
- jsPDF for chat export
- Sonner for toast notifications

## Project Structure

```text
.
├── src/
│   ├── components/
│   │   ├── Background.tsx
│   │   ├── Chat.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── InputBar.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── ui/
│   ├── hooks/
│   │   ├── useChat.ts
│   │   └── useSpeech.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── exportPdf.ts
│   │   ├── personas.ts
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── types/
│   │   └── index.ts
│   ├── main.tsx
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   └── styles.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.cjs
├── postcss.config.cjs
├── components.json
├── eslint.config.js
├── bunfig.toml
├── bun.lockb
├── .gitignore
├── .prettierrc
├── .prettierignore
└── README.md
```

## Personas

The app ships with four personas defined in `src/lib/personas.ts`:

- Focus — direct, structured, goal-oriented
- Vibe — casual, friendly, conversational
- Support — warm, patient, empathetic
- Explain — clear step-by-step teaching style

Each persona has a name, shorthand tag, system prompt, and greeting used in the onboarding flow and chat session.

## App Flow

- The user lands on the onboarding screen and selects a persona.
- `useChat` manages the active persona, message state, conversation list, and loading state.
- `sendMessage` in `src/lib/api.ts` formats the conversation and sends it to the configured backend endpoint.
- The returned reply is appended to the active chat.
- Browser speech APIs enable microphone input and message playback.
- Conversation export generates a PDF using `jsPDF`.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or Bun

### Install dependencies

```bash
npm install
```

Or:

```bash
bun install
```

### Run the app in development mode

```bash
npm run dev
```

This starts the Vite dev server, typically at:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## API Configuration

The chat backend is configured in `src/lib/api.ts`:

```ts
const ENDPOINT = "https://q5j3ckrjwl7dtncyil2ihkqlpy0ndeao.lambda-url.eu-north-1.on.aws/";
```

This URL is used to POST the assembled prompt payload to the backend service. If the model endpoint changes, update this constant in `src/lib/api.ts`.

## Notes

- The project currently stores conversations in local React state rather than a persistent database.
- Browser speech recognition and speech synthesis depend on browser support and permissions.
- The interface is designed for a very lightweight, high-contrast chat experience and is optimized for a single-page app flow.

## Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

## License

This project does not currently include a license file. If you plan to distribute or reuse it publicly, add an appropriate open-source license before publishing.
