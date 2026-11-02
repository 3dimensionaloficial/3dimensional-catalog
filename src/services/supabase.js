import { createClient } from '@supabase/supabase-js';

// 3Dimensional Production Supabase credentials (shared with ERP backend)
export const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://wastqzjolyeuobgiupha.supabase.co';
export const DEFAULT_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_u99B8_1o3w1sSpGDbxgGDA_tuDXciWS';

export const getStoredCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY;

  const savedUrl = localStorage.getItem('3d_supabase_url');
  const savedKey = localStorage.getItem('3d_supabase_key');

  const isDeadUrl = savedUrl && savedUrl.includes('nafolbsuyzprhcujdvnx');
  if (isDeadUrl) {
    localStorage.removeItem('3d_supabase_url');
    localStorage.removeItem('3d_supabase_key');
  }

  const url = envUrl || (!isDeadUrl && savedUrl) || DEFAULT_SUPABASE_URL;
  const key = envKey || (!isDeadUrl && savedKey) || DEFAULT_SUPABASE_KEY;
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
