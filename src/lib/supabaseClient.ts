import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // 缺少環境變數時仍給一組佔位值，避免整個 SPA（含前台）因此在啟動時就掛掉；
  // 後台登入會在實際呼叫 Supabase 時失敗，但不影響前台瀏覽。
  console.warn('[supabase] 缺少 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY，後台登入將無法使用，請設定 .env')
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key'
)
