# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://app.supabase.com)에 접속하여 계정을 생성하거나 로그인합니다.
2. "New Project"를 클릭하여 새 프로젝트를 생성합니다.
3. 프로젝트 이름과 데이터베이스 비밀번호를 설정합니다.

## 2. 테이블 생성

Supabase 대시보드에서 SQL Editor를 열고 다음 SQL을 실행하세요:

```sql
-- 커리어 진단 결과 테이블 생성
CREATE TABLE career_results (
  id BIGSERIAL PRIMARY KEY,
  share_id TEXT UNIQUE NOT NULL,
  scores JSONB NOT NULL,
  top_type TEXT NOT NULL,
  selected_keywords TEXT[] NOT NULL,
  top_keywords TEXT[] NOT NULL,
  selected_values TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX idx_share_id ON career_results(share_id);
CREATE INDEX idx_created_at ON career_results(created_at DESC);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE career_results ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 공유 링크로 결과를 읽을 수 있도록 정책 추가
CREATE POLICY "공유된 결과는 누구나 읽을 수 있음"
  ON career_results
  FOR SELECT
  USING (true);

-- 누구나 결과를 저장할 수 있도록 정책 추가 (로그인 불필요)
CREATE POLICY "누구나 결과를 저장할 수 있음"
  ON career_results
  FOR INSERT
  WITH CHECK (true);
```

## 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase URL과 Key 확인 방법:

1. Supabase 대시보드에서 프로젝트 선택
2. 좌측 메뉴에서 "Settings" > "API" 클릭
3. 다음 정보를 복사:
   - **Project URL**: `VITE_SUPABASE_URL`에 입력
   - **anon public key**: `VITE_SUPABASE_ANON_KEY`에 입력

## 4. 개발 서버 재시작

환경 변수를 추가한 후 개발 서버를 재시작하세요:

```bash
npm run dev
```

## 테이블 구조 설명

- `id`: 자동 증가하는 고유 ID
- `share_id`: 공유 링크에 사용되는 고유 문자열 (UNIQUE)
- `scores`: RIASEC 유형별 점수 (JSON 형식)
- `top_type`: 최고 점수 유형 (R, I, A, S, E, C 중 하나)
- `selected_keywords`: 선택된 모든 키워드 배열
- `top_keywords`: 최종 선택된 Top 3 키워드 배열
- `selected_values`: 선택된 가치관 배열
- `created_at`: 결과 생성 시간 (자동)

## 보안 정책

### 현재 설정
- ✅ **SELECT (조회)**: 누구나 `share_id`로 결과 조회 가능
- ✅ **INSERT (저장)**: 누구나 결과 저장 가능 (로그인 불필요)
- ❌ **UPDATE/DELETE**: 기본적으로 차단 (공유 링크로 접속한 사용자는 수정/삭제 불가)

### 사용 시나리오
1. 구매자가 검사 완료 후 "결과 공유하기" 클릭
2. 결과가 Supabase에 저장되고 `share_id` 생성
3. 공유 링크 생성: `?share={share_id}`
4. 구매자가 링크를 판매자에게 전달
5. 판매자가 링크로 접속하여 결과 확인 (읽기 전용)

## 주의사항

- 공유 링크를 받은 사람은 결과를 읽기만 가능합니다
- 결과 수정/삭제는 불가능합니다
- `share_id`를 알고 있으면 누구나 결과를 볼 수 있으므로, 링크를 신뢰할 수 있는 사람에게만 공유하세요
