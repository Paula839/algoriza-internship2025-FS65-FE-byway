export const Level = {
  AllLevels: "AllLevels",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Expert: "Expert",
} as const;

export type Level = typeof Level[keyof typeof Level];