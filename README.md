# 키워드 커리어 진단

RIASEC 기반의 키워드 커리어 진단 웹 애플리케이션입니다.

## 기능

- 120개의 키워드를 통해 RIASEC 성향 분석
- 핵심 키워드 3개 선택
- 직업 가치관 선택
- 종합 진단 결과 대시보드 제공
- **결과 공유 기능**: 진단 결과를 Supabase에 저장하고 공유 링크 생성 (로그인 불필요)
- **공유 링크 접속**: 공유 링크로 접속하여 결과 확인 가능 (읽기 전용)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 기술 스택

- React 18
- Vite
- Tailwind CSS
- Lucide React (아이콘)
- Supabase (결과 저장 및 공유)

## Supabase 설정

공유 기능을 사용하려면 Supabase 설정이 필요합니다. 자세한 설정 방법은 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)를 참고하세요.

### 빠른 설정

1. `.env` 파일을 프로젝트 루트에 생성
2. Supabase 프로젝트 URL과 Anon Key 입력:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Supabase 대시보드에서 `career_results` 테이블 생성 (SQL은 SUPABASE_SETUP.md 참고)

### 사용 시나리오

1. **구매자**: 검사 완료 → "결과 공유하기" 클릭 → 공유 링크 생성
2. **구매자**: 공유 링크를 판매자에게 전달
3. **판매자**: 공유 링크로 접속 → 결과 확인 (읽기 전용)

> **참고**: 로그인/인증 없이 누구나 결과를 저장하고 공유할 수 있습니다.


