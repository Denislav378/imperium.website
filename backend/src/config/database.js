import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials in environment variables');
}

// Supabase client with service role key (for admin operations)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper function to execute queries
export const db = {
  // Users table operations
  users: {
    async findById(id) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    
    async findByEmail(email) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    
    async findByDiscordId(discordId) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_id', discordId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    
    async findByTelegramId(telegramUserId) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_user_id', telegramUserId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    
    async create(userData) {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    async update(id, updates) {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    async updateLastLogin(id, ip) {
      const user = await this.findById(id);
      const ipHistory = user.ip_history || [];
      
      // Add new IP to history (keep last 5)
      const newIpHistory = [ip, ...ipHistory].slice(0, 5);
      
      return await this.update(id, {
        last_login_at: new Date().toISOString(),
        last_login_ip: ip,
        ip_history: newIpHistory
      });
    }
  },
  
  // Payments table operations
  payments: {
    async create(paymentData) {
      const { data, error } = await supabase
        .from('payments')
        .insert(paymentData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    async findByNowPaymentsId(paymentId) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('nowpayments_payment_id', paymentId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    
    async update(id, updates) {
      const { data, error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    async findByUserId(userId) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  },
  
  // Subscriptions table operations
  subscriptions: {
    async create(subscriptionData) {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    async findByUserId(userId) {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    
    async findActiveByUserId(userId) {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    
    async update(id, updates) {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },
  
  // Events table operations
  events: {
    async create(eventData) {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    async findByUserId(userId, limit = 100) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    }
  }
};


