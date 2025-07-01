export function formatDate(dateString: string, short: boolean = false, backend?: boolean) {
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
  
    return backend ? 
    `${year}-${month}-${day}`
    : new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: short ? 'short' : 'long'
    }).format(date);
}