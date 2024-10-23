export class AuthError extends Error {
    constructor(message: string, public code: string) {
      super(message);
      this.name = 'AuthError';
    }
  }
  
  export class SessionError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'SessionError';
    }
  }
  
  export function handleAuthError(error: unknown) {
    console.error('Auth error:', error);
    
    if (error instanceof AuthError) {
      return {
        error: error.message,
        code: error.code
      };
    }
  
    return {
      error: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }