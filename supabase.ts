import { createClient } from '@supabase/supabase-js';

// Nowy adres z Twojego nowego projektu:
const supabaseUrl = 'https://qdaddvolpnzjxmuekcwf.supabase.co';

// Twój nowy klucz:
const supabaseAnonKey = 'sb_publishable_1YY1Js25-3izjunkNkSuXg_ESegYkCq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);