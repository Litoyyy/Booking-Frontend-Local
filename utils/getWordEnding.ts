export function getWordEnding(number: number, variants: [string, string, string]): string {
    const absNumber = Math.abs(number);
    if (absNumber % 10 === 1 && absNumber % 100 !== 11) {
        return variants[0];
    }
    if (absNumber % 10 >= 2 && absNumber % 10 <= 4 && (absNumber % 100 < 10 || absNumber % 100 >= 20)) {
        return variants[1];
    }
    return variants[2];
}