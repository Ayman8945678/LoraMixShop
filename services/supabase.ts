
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qegbbelftdvnsqajatxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ2JiZWxmdGR2bnNxYWphdHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMjMwOTgsImV4cCI6MjA4NjU5OTA5OH0.8RiyncrLvgGe02Sleiigy31ahxfoE9-jjaYt2Ka-Jb8';

export const supabase = createClient(supabaseUrl, supabaseKey);
