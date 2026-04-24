import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eaypzgtzfhhcaendwarr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVheXB6Z3R6ZmhoY2FlbmR3YXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODc0NDAsImV4cCI6MjA5MjM2MzQ0MH0.lAuFX7rvr7dOBJYz_4_-FfHNWd9jp3KpTXkT4DUBXyg'

export const supabase = createClient(supabaseUrl, supabaseKey)
