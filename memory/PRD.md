# AquaNexus — PRD

## Overview
AquaNexus is a UI-only React Native (Expo) mobile MVP for aquarium monitoring. All data is mocked. The architecture is structured for easy backend (FastAPI/Node) and database (Supabase) integration later.

## Stack
- React Native + Expo SDK 54 + TypeScript
- expo-router (file-based routing)
- React Navigation Drawer
- Zustand (auth + chat state)
- React Native Paper + custom glassmorphism styles
- expo-camera (real camera preview), expo-linear-gradient

## Theme
Aquatic, cozy, minimal — pastel teal (#38B2AC), mint (#81E6D9), soft blue (#63B3ED) on white/mint backgrounds. Soft gradients, glassmorphism, rounded corners (12–20px), subtle water feel. No cartoon fish.

## Screens
1. **Auth** — Sign In (email/password) and Sign Up (name/email/password). Mock auth: any non-empty values succeed.
2. **Drawer Layout** — Left collapsible drawer with: AI Interface (default), Dashboard, Camera, Products. Includes user greeting and Sign Out.
3. **AI Interface** — Chat UI with welcome message, user bubbles (blue, right) and AI bubbles (white, left). Bottom input "Ask anything about your aquarium…" sends the message and a canned mock reply (~900ms typing indicator).
4. **Dashboard** — 3 metric cards (Temperature 24°C, pH 7.2, Food 85%) each with icon, label, value, status pill, and 7-day sparkline placeholder. Plus a "Today's Tip" card.
5. **Camera** — Real device camera (expo-camera) with permission prompt. Overlay shows dashed teal bounding box with animated corner markers and a label pill "Fish Type: Goldfish • 92%". Capture button shows "Captured" toast. On web, shows aquatic gradient placeholder.
6. **Products** — 2-column grid of aquarium products (Filter, Fish Food, Driftwood, Temp Sensor, pH Meter, Auto Dispenser, Glass Tank, LED Light) with category filter chips and per-card "Reorder" button.

## Folder Structure
```
/app/frontend/
├── app/
│   ├── _layout.tsx            # PaperProvider, GestureHandler, SafeArea
│   ├── index.tsx              # Auth gate redirect
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   └── (main)/
│       ├── _layout.tsx        # Drawer + custom drawer content
│       ├── ai.tsx
│       ├── dashboard.tsx
│       ├── camera.tsx
│       └── products.tsx
└── src/
    ├── theme/colors.ts, paperTheme.ts
    ├── store/authStore.ts, chatStore.ts
    ├── data/mockData.ts
    └── components/GlassCard.tsx, ScreenHeader.tsx
```

## Future Ready (not implemented)
- Real sensor data via FastAPI → MongoDB/Supabase
- LLM-powered AI chatbot (replace `chatStore.send` mock with API call)
- TensorFlow/CoreML fish detection model integrated with `CameraView`
- Real product catalog with cart + checkout
