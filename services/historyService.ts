import { HistoryItem } from '../types';

const getHistoryKey = (userIdentifier: string): string => `history_${userIdentifier}`;

export const getHistory = (userIdentifier: string): HistoryItem[] => {
    try {
        const historyJson = localStorage.getItem(getHistoryKey(userIdentifier));
        if (historyJson) {
            const history = JSON.parse(historyJson) as HistoryItem[];
            // Sort by timestamp descending to show newest first
            return history.sort((a, b) => b.timestamp - a.timestamp);
        }
        return [];
    } catch (error) {
        console.error("Failed to parse history from localStorage", error);
        return [];
    }
};

export const saveHistory = (userIdentifier: string, history: HistoryItem[]): void => {
    try {
        localStorage.setItem(getHistoryKey(userIdentifier), JSON.stringify(history));
    } catch (error) {
        console.error("Failed to save history to localStorage", error);
    }
};

export const addToHistory = (userIdentifier: string, newItem: HistoryItem): void => {
    const currentHistory = getHistory(userIdentifier);
    // Prepend the new item to the history array
    const newHistory = [newItem, ...currentHistory];
    saveHistory(userIdentifier, newHistory);
};