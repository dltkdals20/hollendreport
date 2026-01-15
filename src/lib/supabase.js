import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 환경 변수가 없어도 클라이언트는 생성하되, 사용 시 에러 처리
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase 환경 변수가 설정되지 않았습니다. 공유 기능을 사용하려면 .env 파일을 설정하세요.');
  // 더미 클라이언트 생성 (에러 방지)
  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.reject(new Error('Supabase not configured')) }) }),
      insert: () => ({ select: () => ({ single: () => Promise.reject(new Error('Supabase not configured')) }) })
    })
  };
}

export { supabase }
