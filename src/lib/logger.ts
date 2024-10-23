export function logError(message: string, error: unknown) {
    console.error(`${message}:`, error)
  }
  
  export function logInfo(message: string) {
    console.info(message)
  }