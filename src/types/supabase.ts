export type Database = {
  public: {
    Tables: {
      // Define your tables here
      users: {
        Row: { id: string; name: string; email: string }
        Insert: { name: string; email: string }
        Update: { name?: string; email?: string }
      }
      // Add more tables as needed
    }
    Functions: {
      // Define your database functions here
    }
    Enums: {
      // Define your enums here
    }
  }
}
