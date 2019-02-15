export function prettifyDate(dateStr) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: '2-digit',
    hour: 'numeric', 
    minute: 'numeric'
  }).format(date)
}