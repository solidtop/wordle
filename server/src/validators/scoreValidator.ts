interface ValidationStatus {
    isValid: boolean;
    error?: string;
}

export default function validateHighscore(name: string): ValidationStatus {
    if (!name) {
        return {
            isValid: false,
            error: 'Invalid name',
        }
    }
    return {
        isValid: true,
    }
}