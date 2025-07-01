export function copyToClipboards(text: string) {
    return navigator.clipboard.writeText(text);
}