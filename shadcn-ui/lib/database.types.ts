export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone_number: string | null
          country: string | null
          created_at: string
          updated_at: string
          is_verified: boolean
          kyc_status: 'pending' | 'approved' | 'rejected'
          avatar_url: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone_number?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
          is_verified?: boolean
          kyc_status?: 'pending' | 'approved' | 'rejected'
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone_number?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
          is_verified?: boolean
          kyc_status?: 'pending' | 'approved' | 'rejected'
          avatar_url?: string | null
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          account_number: string
          balance: number
          currency: string
          account_type: 'main' | 'savings' | 'escrow'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_number: string
          balance?: number
          currency: string
          account_type?: 'main' | 'savings' | 'escrow'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_number?: string
          balance?: number
          currency?: string
          account_type?: 'main' | 'savings' | 'escrow'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          account_id: string
          transaction_type: 'credit' | 'debit' | 'transfer' | 'bill_payment' | 'mobile_money'
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'cancelled'
          description: string | null
          reference_id: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id: string
          transaction_type: 'credit' | 'debit' | 'transfer' | 'bill_payment' | 'mobile_money'
          amount: number
          currency: string
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          description?: string | null
          reference_id: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string
          transaction_type?: 'credit' | 'debit' | 'transfer' | 'bill_payment' | 'mobile_money'
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          description?: string | null
          reference_id?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      remittance_transactions: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string | null
          recipient_name: string
          recipient_phone: string
          recipient_country: string
          amount_sent: number
          amount_received: number
          exchange_rate: number
          fee: number
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
          payment_method: 'bank_transfer' | 'mobile_money' | 'cash_pickup'
          pickup_location: string | null
          transaction_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id?: string | null
          recipient_name: string
          recipient_phone: string
          recipient_country: string
          amount_sent: number
          amount_received: number
          exchange_rate: number
          fee: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
          payment_method: 'bank_transfer' | 'mobile_money' | 'cash_pickup'
          pickup_location?: string | null
          transaction_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string | null
          recipient_name?: string
          recipient_phone?: string
          recipient_country?: string
          amount_sent?: number
          amount_received?: number
          exchange_rate?: number
          fee?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
          payment_method?: 'bank_transfer' | 'mobile_money' | 'cash_pickup'
          pickup_location?: string | null
          transaction_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      mobile_money_providers: {
        Row: {
          id: string
          name: string
          code: string
          country: string
          logo_url: string | null
          is_active: boolean
          supported_currencies: string[]
          fee_structure: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          country: string
          logo_url?: string | null
          is_active?: boolean
          supported_currencies: string[]
          fee_structure: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          country?: string
          logo_url?: string | null
          is_active?: boolean
          supported_currencies?: string[]
          fee_structure?: Json
          created_at?: string
          updated_at?: string
        }
      }
      bill_providers: {
        Row: {
          id: string
          name: string
          category: 'electricity' | 'water' | 'internet' | 'cable_tv' | 'phone'
          country: string
          logo_url: string | null
          is_active: boolean
          fee_structure: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'electricity' | 'water' | 'internet' | 'cable_tv' | 'phone'
          country: string
          logo_url?: string | null
          is_active?: boolean
          fee_structure: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'electricity' | 'water' | 'internet' | 'cable_tv' | 'phone'
          country?: string
          logo_url?: string | null
          is_active?: boolean
          fee_structure?: Json
          created_at?: string
          updated_at?: string
        }
      }
      marketplace_products: {
        Row: {
          id: string
          vendor_id: string
          name: string
          description: string | null
          price: number
          currency: string
          category: string
          image_url: string | null
          is_available: boolean
          stock_quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          name: string
          description?: string | null
          price: number
          currency: string
          category: string
          image_url?: string | null
          is_available?: boolean
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          name?: string
          description?: string | null
          price?: number
          currency?: string
          category?: string
          image_url?: string | null
          is_available?: boolean
          stock_quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource_type: string
          resource_id: string | null
          ip_address: string | null
          user_agent: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource_type: string
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource_type?: string
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}