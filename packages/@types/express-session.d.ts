declare global {
  module 'express-session' {
    interface SessionData {
      num?: number;
    }
  }
}
