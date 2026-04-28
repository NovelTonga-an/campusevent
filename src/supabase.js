import { createClient } from '@supabase/supabase-js';

const sanitizeEnvValue = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();

  // Vercel env values are sometimes pasted with surrounding quotes.
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const supabaseUrl = sanitizeEnvValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = sanitizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

const isLikelySupabaseUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl);
const isLikelyAnonKey = supabaseAnonKey.startsWith('eyJ');

const hasValidConfig =
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey.trim().length > 0 &&
  isLikelySupabaseUrl &&
  isLikelyAnonKey;

export const supabaseConfigError = hasValidConfig
  ? ''
  : 'Invalid Supabase config. Set VITE_SUPABASE_URL (https://<project-ref>.supabase.co) and VITE_SUPABASE_ANON_KEY (anon public key).';

if (supabaseConfigError) {
  console.error(supabaseConfigError);
}

export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
