import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://hvisuhdcecrnkvvyyukf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aXN1aGRjZWNybmt2dnl5dWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzQyNTksImV4cCI6MjA1MDAxMDI1OX0.OwBD8xuk5xjPEOmaObWD6ENtHcEOCU29FlYluBL8Dfk';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.38.4'
    }
  }
});

export default supabase;
