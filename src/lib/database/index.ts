import { DatabaseProvider, DatabaseConfig } from './types';
import { SupabaseProvider } from './supabase-provider';

export class DatabaseFactory {
  private static instance: DatabaseProvider | null = null;

  // Get database provider instance (singleton)
  static getInstance(): DatabaseProvider {
    if (!this.instance) {
      this.instance = this.createProvider();
    }
    return this.instance;
  }

  // Create provider based on environment
  private static createProvider(): DatabaseProvider {
    const config: DatabaseConfig = {
      provider: (process.env.DATABASE_PROVIDER as any) || 'supabase',
      url: process.env.SUPABASE_URL!,
      key: process.env.SUPABASE_ANON_KEY,
    //   options: {
    //     auth: {
    //       persistSession: false,
    //       autoRefreshToken: false,
    //     }
    //   }
    };

    switch (config.provider) {
      case 'supabase':
        return new SupabaseProvider(config);
      
      // Future providers can be added here
      // case 'postgresql':
      //   return new PostgreSQLProvider(config);
      // case 'mysql':
      //   return new MySQLProvider(config);
      
      default:
        throw new Error(`Unsupported database provider: ${config.provider}`);
    }
  }

  // Test connection
  static async testConnection(): Promise<boolean> {
    try {
      const provider = this.getInstance();
      return await provider.testConnection();
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  // Reset instance (useful for testing)
  static reset(): void {
    this.instance = null;
  }
}

// Export convenience instance
export const db = DatabaseFactory.getInstance();