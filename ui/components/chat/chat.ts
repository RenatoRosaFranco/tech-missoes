import data from "./chat.json";

export type ChatTopic = {
  id: string;
  title: string;
  keywords: string[];
  related?: string[];
};

export const chatCopy = data;
export const suggestedQuestions = data.suggestedQuestions;
export const welcomeMessage = data.welcome;
