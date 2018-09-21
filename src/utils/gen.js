export function guid(numParts = 4, separator = '-') {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  const parts = []
  
  for (let i = 0; i < numParts; i++) {
    parts.push(`${s4()}${s4()}`)
  }

  return parts.join(separator)
}