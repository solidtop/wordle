export type Result = {
    letter: string;
    result: string;
}

export type Status = {
    isValid: boolean;
    isExactMatch?: boolean;
    error?: string;
    results?: Result[];
}