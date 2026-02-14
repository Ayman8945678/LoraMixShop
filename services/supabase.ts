
import { createClient } from '@supabase/supabase-js';
import { User } from '../types';

const supabaseUrl = 'https://qegbbelftdvnsqajatxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ2JiZWxmdGR2bnNxYWphdHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMjMwOTgsImV4cCI6MjA4NjU5OTA5OH0.8RiyncrLvgGe02Sleiigy31ahxfoE9-jjaYt2Ka-Jb8';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const profileService = {
  async getProfile(email: string): Promise<Partial<User> | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Error fetching profile:', e);
      return null;
    }
  },

  async upsertProfile(user: User): Promise<{ success: boolean; error?: any }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' });

      if (error) throw error;
      return { success: true };
    } catch (e) {
      console.error('Error updating profile:', e);
      return { success: false, error: e };
    }
  }
};
