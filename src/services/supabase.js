import { createClient } from '@supabase/supabase-js';

// 3Dimensional Production Supabase credentials (shared with ERP backend)
export const DEFAULT_SUPABASE_URL = 'https://nafolbsuyzprhcujdvnx.supabase.co';
export const DEFAULT_SUPABASE_KEY = 'sb_publishable_eg0FJnORSDvyplOAEuE7Sw_xoRVZwIn';

export const getStoredCredentials = () => {
  const url = localStorage.getItem('3d_supabase_url') || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem('3d_supabase_key') || DEFAULT_SUPABASE_KEY;
  return { url, key };
};

const creds = getStoredCredentials();

export const supabase = (creds.url && creds.key) 
  ? createClient(creds.url, creds.key) 
  : null;
