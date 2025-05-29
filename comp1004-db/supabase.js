import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gkhejfrrckaaoxjpxjti.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdraGVqZnJyY2thYW94anB4anRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMDk4NDcsImV4cCI6MjA2MjU4NTg0N30.ZqGQNBghFwiBQdputTrJlDzDbJQs2qQ9Bn6iHwj2MNM';                 
export const supabase = createClient(supabaseUrl, supabaseKey);
