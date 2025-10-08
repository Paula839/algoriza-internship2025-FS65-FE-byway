export const NumOfLectures = {
    From1To15: "From1To15",
    From16To30: "From16To30",
    From31To45: "From31To45",
    MoreThan45: "MoreThan45"
} as const;

export type NumOfLectures = typeof NumOfLectures[keyof typeof NumOfLectures];