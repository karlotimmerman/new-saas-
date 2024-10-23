export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string | null;
          is_admin: boolean;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          name?: string | null;
          is_admin?: boolean;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          name?: string | null;
          is_admin?: boolean;
          last_login?: string | null;
        };
      };
      // Add more table definitions here as needed
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
