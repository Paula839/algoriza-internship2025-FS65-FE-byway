export const SortBy = {
    TheNewest: "TheLatest",
    TheOldest: "TheOldest",
    HighestPrice: "HighestPrice",
    LowestPrice: "LowestPrice",
    HighestRated: "HighestRated",
    LowestRated: "LowestRated"
} as const;

export type SortBy = typeof SortBy[keyof typeof SortBy];