import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
};

const cannedReplies = [
  "Your tank's water parameters look healthy. Temperature at 24°C is ideal for tropical fish.",
  "I'd recommend feeding small amounts twice daily. Overfeeding can spike ammonia levels.",
  "For a balanced ecosystem, consider adding live plants like Java Fern or Anubias.",
  "Weekly 20% water changes are great for maintaining stable parameters.",
  "Your pH is slightly alkaline at 7.2 — perfect for most community fish.",
  "I notice your food level is at 85%. You're well stocked for the next two weeks.",
  "Ensure your filter media is rinsed in tank water (not tap) to preserve beneficial bacteria.",
];

type ChatState = {
  messages: ChatMessage[];
  isTyping: boolean;
  send: (text: string) => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      role: 'ai',
      text: "Hi! I'm your AquaNexus assistant. Ask me anything about your aquarium — water chemistry, fish care, or feeding schedules.",
      timestamp: Date.now(),
    },
  ],
  isTyping: false,
  send: (text: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: Date.now(),
    };
    set({ messages: [...get().messages, userMsg], isTyping: true });

    setTimeout(() => {
      const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'ai',
        text: reply,
        timestamp: Date.now(),
      };
      set({ messages: [...get().messages, aiMsg], isTyping: false });
    }, 900);
  },
}));
