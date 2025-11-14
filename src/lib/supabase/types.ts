/**
 * Tipos TypeScript gerados do schema do Supabase
 * Baseado na estrutura do banco de dados
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          content: string | null;
          category_id: string | null;
          city_id: string | null;
          author_id: string | null;
          status: 'draft' | 'pending' | 'approved';
          source: string | null;
          image_url: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          content?: string | null;
          category_id?: string | null;
          city_id?: string | null;
          author_id?: string | null;
          status?: 'draft' | 'pending' | 'approved';
          source?: string | null;
          image_url?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string;
          content?: string | null;
          category_id?: string | null;
          city_id?: string | null;
          author_id?: string | null;
          status?: 'draft' | 'pending' | 'approved';
          source?: string | null;
          image_url?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      cities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          state: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          state?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          state?: string;
          created_at?: string;
        };
      };
      authors: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'collaborator';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: 'admin' | 'collaborator';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'collaborator';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ads: {
        Row: {
          id: string;
          image_url: string;
          link: string;
          position: 'header' | 'sidebar' | 'infeed' | 'top';
          label: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          link: string;
          position: 'header' | 'sidebar' | 'infeed' | 'top';
          label: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          link?: string;
          position?: 'header' | 'sidebar' | 'infeed' | 'top';
          label?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Tipos auxiliares para facilitar uso
export type Article = Database['public']['Tables']['articles']['Row'];
export type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
export type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

export type Category = Database['public']['Tables']['categories']['Row'];
export type City = Database['public']['Tables']['cities']['Row'];
export type Author = Database['public']['Tables']['authors']['Row'];
export type Ad = Database['public']['Tables']['ads']['Row'];

// Tipo compatível com NewsItem antigo (para migração gradual)
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string;
  city: string;
  category: string;
  status: 'draft' | 'pending' | 'approved';
  publishedAt: string;
  source: string;
  image: string;
}

