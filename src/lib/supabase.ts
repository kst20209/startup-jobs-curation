import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sjjcwcjwctequorumerc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqamN3Y2p3Y3RlcXVvcnVtZXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MzE1NjQsImV4cCI6MjA2NjQwNzU2NH0.EEWvRSM6QzkTgUIwJ_8RxRUNrrcDSpaZQN1tiFIXZW0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 