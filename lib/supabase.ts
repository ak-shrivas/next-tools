import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,      // <-- server-side env
  process.env.SUPABASE_ANON_KEY!  // <-- server-side env
)
