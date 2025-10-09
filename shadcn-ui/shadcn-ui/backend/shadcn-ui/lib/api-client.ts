import { supabase, supabaseAdmin } from './supabase'
import { Database } from './database.types'

type Tables = Database['public']['Tables']

export class ApiClient {
  // User Management
  static async createUser(userData: Tables['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()

    if (error) throw new Error(`Failed to create user: ${error.message}`)
    return data
  }

  static async updateUser(userId: string, userData: Tables['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw new Error(`Failed to update user: ${error.message}`)
    return data
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw new Error(`Failed to fetch user profile: ${error.message}`)
    return data
  }

  // Account Management
  static async createAccount(accountData: Tables['accounts']['Insert']) {
    // Generate unique account number
    const accountNumber = await this.generateAccountNumber()
    
    const { data, error } = await supabase
      .from('accounts')
      .insert([{ ...accountData, account_number: accountNumber }])
      .select()
      .single()

    if (error) throw new Error(`Failed to create account: ${error.message}`)
    return data
  }

  static async getUserAccounts(userId: string) {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch accounts: ${error.message}`)
    return data
  }

  static async updateAccountBalance(accountId: string, newBalance: number) {
    const { data, error } = await supabase
      .from('accounts')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', accountId)
      .select()
      .single()

    if (error) throw new Error(`Failed to update account balance: ${error.message}`)
    return data
  }

  // Transaction Management
  static async createTransaction(transactionData: Tables['transactions']['Insert']) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select()
      .single()

    if (error) throw new Error(`Failed to create transaction: ${error.message}`)
    
    // Log transaction for audit trail
    await this.logAuditEvent(transactionData.user_id, 'CREATE_TRANSACTION', 'transaction', data.id)
    
    return data
  }

  static async updateTransactionStatus(transactionId: string, status: string, metadata?: any) {
    const { data, error } = await supabase
      .from('transactions')
      .update({ 
        status, 
        metadata: metadata || {},
        updated_at: new Date().toISOString() 
      })
      .eq('id', transactionId)
      .select()
      .single()

    if (error) throw new Error(`Failed to update transaction status: ${error.message}`)
    return data
  }

  static async getUserTransactions(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        accounts (
          account_number,
          currency
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw new Error(`Failed to fetch transactions: ${error.message}`)
    return data
  }

  // Remittance Management
  static async createRemittance(remittanceData: Tables['remittance_transactions']['Insert']) {
    const { data, error } = await supabase
      .from('remittance_transactions')
      .insert([remittanceData])
      .select()
      .single()

    if (error) throw new Error(`Failed to create remittance: ${error.message}`)
    
    // Log remittance for audit trail
    await this.logAuditEvent(remittanceData.sender_id, 'CREATE_REMITTANCE', 'remittance', data.id)
    
    return data
  }

  static async updateRemittanceStatus(remittanceId: string, status: string) {
    const { data, error } = await supabase
      .from('remittance_transactions')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', remittanceId)
      .select()
      .single()

    if (error) throw new Error(`Failed to update remittance status: ${error.message}`)
    return data
  }

  // Provider Management
  static async getMobileMoneyProviders(country?: string) {
    let query = supabase
      .from('mobile_money_providers')
      .select('*')
      .eq('is_active', true)

    if (country) {
      query = query.contains('supported_currencies', [country])
    }

    const { data, error } = await query.order('name')

    if (error) throw new Error(`Failed to fetch mobile money providers: ${error.message}`)
    return data
  }

  static async getBillProviders(country?: string, category?: string) {
    let query = supabase
      .from('bill_providers')
      .select('*')
      .eq('is_active', true)

    if (country) {
      query = query.eq('country', country)
    }
    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query.order('name')

    if (error) throw new Error(`Failed to fetch bill providers: ${error.message}`)
    return data
  }

  // Marketplace Management
  static async getMarketplaceProducts(category?: string, limit = 20) {
    let query = supabase
      .from('marketplace_products')
      .select('*')
      .eq('is_available', true)

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw new Error(`Failed to fetch marketplace products: ${error.message}`)
    return data
  }

  static async createMarketplaceProduct(productData: Tables['marketplace_products']['Insert']) {
    const { data, error } = await supabase
      .from('marketplace_products')
      .insert([productData])
      .select()
      .single()

    if (error) throw new Error(`Failed to create marketplace product: ${error.message}`)
    return data
  }

  // Audit and Security
  static async logAuditEvent(
    userId: string | null, 
    action: string, 
    resourceType: string, 
    resourceId?: string,
    metadata?: any
  ) {
    try {
      await supabaseAdmin
        .from('audit_logs')
        .insert([{
          user_id: userId,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          metadata: metadata || {},
          ip_address: null, // Can be added from request context
          user_agent: null  // Can be added from request context
        }])
    } catch (error) {
      console.error('Failed to log audit event:', error)
    }
  }

  static async getUserAuditLogs(userId: string, limit = 100) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw new Error(`Failed to fetch audit logs: ${error.message}`)
    return data
  }

  // Utility Functions
  private static async generateAccountNumber(): Promise<string> {
    // Generate a unique 10-digit account number
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `NP${timestamp}${random}`
  }

  static async generateTransactionReference(): Promise<string> {
    // Generate a unique transaction reference
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substr(2, 8).toUpperCase()
    return `TXN-${timestamp}-${random}`
  }

  // Health Check
  static async healthCheck() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1)

      return !error
    } catch {
      return false
    }
  }
}

// Export individual functions for easier testing
export const {
  createUser,
  updateUser,
  getUserProfile,
  createAccount,
  getUserAccounts,
  createTransaction,
  getUserTransactions,
  createRemittance,
  getMobileMoneyProviders,
  getBillProviders,
  getMarketplaceProducts,
  logAuditEvent,
  healthCheck
} = ApiClient