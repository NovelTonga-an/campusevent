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

const normalizeSupabaseUrl = (value) => {
  if (!value) {
    return '';
  }

  try {
    const parsed = new URL(value);
    return parsed.origin;
  } catch {
    return value;
  }
};

const supabaseUrl = normalizeSupabaseUrl(sanitizeEnvValue(import.meta.env.VITE_SUPABASE_URL));
const supabaseAnonKey = sanitizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

const isLikelySupabaseUrl = /^https:\/\//i.test(supabaseUrl);

const hasValidConfig =
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey.trim().length > 0 &&
  isLikelySupabaseUrl;

export const supabaseConfigError = hasValidConfig
  ? ''
  : 'Invalid Supabase config. Set VITE_SUPABASE_URL (https://<project-ref>.supabase.co) and VITE_SUPABASE_ANON_KEY (anon public key).';

if (supabaseConfigError) {
  console.error(supabaseConfigError);
}

if (hasValidConfig && !/supabase\.co/i.test(supabaseUrl)) {
  console.warn('VITE_SUPABASE_URL does not look like a standard Supabase project URL.');
}

export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
