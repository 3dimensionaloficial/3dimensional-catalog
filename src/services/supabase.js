import { createClient } from '@supabase/supabase-js';

// 3Dimensional Production Supabase credentials (shared with ERP backend)
export const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://nafolbsuyzprhcujdvnx.supabase.co';
export const DEFAULT_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_eg0FJnORSDvyplOAEuE7Sw_xoRVZwIn';

export const getStoredCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY;

  const url = envUrl || localStorage.getItem('3d_supabase_url') || DEFAULT_SUPABASE_URL;
  const key = envKey || localStorage.getItem('3d_supabase_key') || DEFAULT_SUPABASE_KEY;
  return { url, key };
};

export const initSupabaseClient = (url, key) => {
  const targetUrl = url || getStoredCredentials().url;
  const targetKey = key || getStoredCredentials().key;
  if (url && key) {
    localStorage.setItem('3d_supabase_url', targetUrl);
    localStorage.setItem('3d_supabase_key', targetKey);
  }
  return (targetUrl && targetKey) ? createClient(targetUrl, targetKey) : null;
};

const creds = getStoredCredentials();

export const supabase = (creds.url && creds.key) 
  ? createClient(creds.url, creds.key) 
  : null;
