import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasValidConfig =
  typeof supabaseUrl === 'string' &&
  typeof supabaseAnonKey === 'string' &&
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey.trim().length > 0;

export const supabaseConfigError = hasValidConfig
  ? ''
  : 'Missing Supabase env vars: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY';

if (supabaseConfigError) {
  console.error(supabaseConfigError);
}

export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
