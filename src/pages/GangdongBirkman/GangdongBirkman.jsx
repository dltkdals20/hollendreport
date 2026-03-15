import React, { useState } from 'react';
import {
  ChevronRight, ArrowLeft, ArrowRight, Check, Copy, Trophy,
  Zap, AlertTriangle, Target, RefreshCw, BarChart2, TrendingUp,
  Brain, Users, Star, CheckCircle
} from 'lucide-react';

// ─────────────────────────────────────────────
// HOLLAND DATA
// ─────────────────────────────────────────────
const KEYWORD_DATA = {
  R: ['솔직', '검소', '지구력 강함', '신체적 건강', '소박', '말수 적음', '고집', '단순함', '활동적', '실용적', '현재 중심적', '사물 지향적', '직선적', '구체적', '기계적 적성', '운동 능력', '손재주', '도구 조작', '기술적', '조립', '수리', '생산적', '견고함', '강인함', '야외 활동', '기계 다루기', '몸으로 하는 일'],
  I: ['호기심 많음', '지식 체계화', '비판적 사고', '지적 추구', '합리적', '학업 열망', '내성적', '가설 검증', '논리적', '관찰적', '상징적', '체계적 사고', '지적 창의성', '자기 주도 학습', '과학적', '추상적 사고', '탐구 정신', '이론적', '연구 지향적', '객관적', '수학적', '실험적', '복잡한 사고', '지적 호기심', '연구 열정', '정보 수집', '탐구심', '심층 분석', '문제 해결'],
  A: ['표현력 풍부', '독창적', '비순응적', '감성적', '직관적', '미적 감각', '상상력', '창작 욕구', '심미안', '예술적', '감정적', '개성적', '자유로움', '혁신적', '표현 욕구', '영감적', '심미적', '감수성', '몽상적', '표현적', '즉흥적', '자발적', '비전통적', '변화 추구', '개방적', '색채 감각', '감성적 표현', '미적 완성도'],
  S: ['협력적', '헌신적', '친근함', '이타적', '공감 능력', '관계 지향적', '타인 중심적', '이상주의적', '도움 지향적', '친절함', '이해심', '배려심', '봉사 정신', '인간관계 중시', '교육적', '상담적', '치료적', '돌봄', '화합 추구', '봉사적', '동정심', '양육적', '격려적', '지지적', '공동체 의식', '인도적', '관용적', '수용적', '공감적'],
  E: ['추진력', '경영 감각', '야심적', '설득력', '지배적', '경쟁 지향적', '위험 감수', '에너지 넘침', '자신감', '네트워킹', '낙관주의', '인기', '리더십', '영향력', '목표 지향적', '성취 욕구', '권력 추구', '외향적', '적극적', '결단력', '통제력', '야망적', '협상력', '열망', '성과 지향', '성공 지향', '목표 달성', '경영적', '기업가적'],
  C: ['꼼꼼함', '문서화', '질서 선호', '보수적', '규칙 준수', '순응적', '양심적', '절제력', '효율성', '신뢰성', '절차 중심', '차분함', '사무 처리', '계획적', '체계적 실행', '정확성', '세심함', '오류 최소화', '전통적', '안정성', '일관성', '성실함', '인내심', '데이터 정리', '절차 지향적', '규범적', '규칙 기반', '반복 작업', '기록 정리'],
};

const RIASEC_DESCRIPTIONS = {
  R: { name: '현실형 (Realistic)', shortName: '현실적', desc: '솔직하고 성실하며, 기계나 도구를 다루는 실용적인 활동을 선호합니다.', icon: '🔧', color: 'bg-blue-50 text-blue-700', barColor: 'bg-blue-600', borderColor: 'border-blue-200', themeColor: 'blue' },
  I: { name: '탐구형 (Investigative)', shortName: '분석적', desc: '호기심이 많고 논리적이며, 지적 탐구와 문제 해결을 즐깁니다.', icon: '🔍', color: 'bg-sky-50 text-sky-700', barColor: 'bg-sky-500', borderColor: 'border-sky-200', themeColor: 'sky' },
  A: { name: '예술형 (Artistic)', shortName: '창의적', desc: '표현력이 풍부하고 독창적이며, 자유로운 예술 활동을 좋아합니다.', icon: '🎨', color: 'bg-orange-50 text-orange-700', barColor: 'bg-orange-500', borderColor: 'border-orange-200', themeColor: 'orange' },
  S: { name: '사회형 (Social)', shortName: '사회형', desc: '이타적이고 친절하며, 타인을 돕고 이해하는 활동에 가치를 둡니다.', icon: '🤝', color: 'bg-green-50 text-green-700', barColor: 'bg-green-600', borderColor: 'border-green-200', themeColor: 'green' },
  E: { name: '진취형 (Enterprising)', shortName: '진취적', desc: '열정적이고 도전적이며, 목표 달성과 리더십 발휘를 선호합니다.', icon: '🏆', color: 'bg-red-50 text-red-700', barColor: 'bg-red-600', borderColor: 'border-red-200', themeColor: 'red' },
  C: { name: '관습형 (Conventional)', shortName: '관습형', desc: '꼼꼼하고 책임감이 강하며, 정해진 규칙과 질서를 따르는 것을 잘합니다.', icon: '📊', color: 'bg-purple-50 text-purple-700', barColor: 'bg-purple-600', borderColor: 'border-purple-200', themeColor: 'purple' },
};

const PAGINATION_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];

const VALUES = [
  { id: '성취', text: '어려운 문제를 해결하고 목표를 달성하는 것' },
  { id: '경제적 보상', text: '높은 수입과 경제적 풍요로움' },
  { id: '인정', text: '타인과 사회로부터의 인정과 존중' },
  { id: '안정성', text: '해고 걱정 없이 오래 일할 수 있는 환경' },
  { id: '자율성', text: '내 방식대로 일하고 시간을 통제하는 것' },
  { id: '워라밸', text: '일과 개인 생활의 균형' },
  { id: '봉사', text: '타인을 돕고 사회에 기여하는 것' },
  { id: '지식 추구', text: '끊임없이 배우고 전문성을 키우는 것' },
];

// ─────────────────────────────────────────────
// BIRKMAN DATA
// ─────────────────────────────────────────────
const BIRKMAN_COLORS = [
  { id: '빨강', label: '빨강 (Red)', colorClass: 'bg-red-500', textClass: 'text-red-700', bgClass: 'bg-red-50', borderClass: 'border-red-300', desc: '실용적 · 결과 중심 · 빠른 실행', motivation: '빠른 성과 확인, 명확한 목표 달성, 즉각적 피드백', stressTrigger: '느린 의사결정, 실행 안 됨, 권한 없음', stressBehavior: '직설적/공격적, 독단적 결정, 조급함', avoidEnv: '대기업 브랜드팀, 승인 단계 많은 곳, 전략만 하는 포지션' },
  { id: '초록', label: '초록 (Green)', colorClass: 'bg-green-500', textClass: 'text-green-700', bgClass: 'bg-green-50', borderClass: 'border-green-300', desc: '사람 중심 · 협력 · 관계 지향', motivation: '팀 화합, 긍정적 관계, 협력 성공, 소속감', stressTrigger: '갈등 상황, 냉정한 분위기, 혼자 고립', stressBehavior: '과도한 양보, 눈치 보기, 의견 못 냄', avoidEnv: '경쟁 심한 조직, 개인 성과 중심, 정치적 환경' },
  { id: '노랑', label: '노랑 (Yellow)', colorClass: 'bg-yellow-400', textClass: 'text-yellow-700', bgClass: 'bg-yellow-50', borderClass: 'border-yellow-300', desc: '체계적 · 분석 · 규칙 기반', motivation: '논리적 설명, 데이터 기반 결정, 전문성 인정', stressTrigger: '비논리적 결정, 감정적 지시, 일관성 없음', stressBehavior: '냉소적, 비판적, 고립, 완고함', avoidEnv: '즉흥적 의사결정 조직, 감성 중심 조직, 체계 없는 스타트업' },
  { id: '파랑', label: '파랑 (Blue)', colorClass: 'bg-blue-500', textClass: 'text-blue-700', bgClass: 'bg-blue-50', borderClass: 'border-blue-300', desc: '창의적 · 혁신 · 아이디어 지향', motivation: '창의적 표현, 새로운 시도, 혁신 기회, 아이디어 채택', stressTrigger: '창의성 제한, 정해진 틀만, 루틴 반복', stressBehavior: '산만함, 집중 못함, 이탈, 무기력', avoidEnv: '매뉴얼 중심 업무, 혁신 없는 조직, 반복 작업 많은 곳' },
];

const BIRKMAN_COLOR_MAP = Object.fromEntries(BIRKMAN_COLORS.map(c => [c.id, c]));

const WORK_STYLE_MAP = {
  '초록→빨강': { style: '협력하되 빠른 실행 주도', desc: '팀과 소통하며 명확한 목표를 빠르게 실행합니다. 협업과 성과를 동시에 추구합니다.' },
  '초록→초록': { style: '팀 중심 협업', desc: '사람과의 관계를 최우선으로 여기며 팀의 조화 속에서 최고의 성과를 냅니다.' },
  '빨강→빨강': { style: '독립적 빠른 실행', desc: '명확한 목표를 독립적으로 빠르게 달성합니다. 자율성과 권한 부여가 핵심입니다.' },
  '파랑→빨강': { style: '창의 기획 후 빠른 실행', desc: '아이디어를 구상하고 빠르게 실행에 옮깁니다. 창의성과 실행력을 함께 발휘합니다.' },
  '노랑→빨강': { style: '분석 후 결단력 있는 실행', desc: '충분한 분석을 바탕으로 명확한 결정을 내립니다. 체계적이면서도 실행력이 있습니다.' },
  '파랑→초록': { style: '창의적 협업', desc: '창의적 아이디어를 팀과 함께 발전시킵니다. 협업 과정에서 혁신이 나옵니다.' },
  '노랑→노랑': { style: '깊이 있는 분석과 체계적 실행', desc: '데이터와 논리로 깊이 파고들며 정확하고 신뢰할 수 있는 결과를 만들어냅니다.' },
  '빨강→초록': { style: '실행하되 팀을 조율', desc: '직접 실행하면서도 팀을 이끌고 조율하는 역할을 합니다.' },
};

const CONFLICT_STYLE_MAP = {
  '초록→빨강': { style: '평소엔 참다가 한계에서 명확히 표현', avoid: '갈등을 방치하는 조직, 정치적 환경', checklist: ['갈등 해결 프로세스 확인', '소통 문화의 솔직함 수준 확인'] },
  '초록→초록': { style: '조화를 중시하며 회피 경향', avoid: '경쟁 심한 조직, 강한 주장 필요한 포지션', checklist: ['팀 협업 문화 확인', '수평적 소통 가능 여부 확인'] },
  '빨강→빨강': { style: '즉시 직설적으로 대응, 빠른 해결 선호', avoid: '감정 배려 중심 조직, 돌려 말하기 문화', checklist: ['의사결정 속도 확인', '직접 소통 문화 여부 확인'] },
  '노랑→노랑': { style: '원인 분석 후 논리적 접근', avoid: '감정 중시 조직, 즉흥적 해결 문화', checklist: ['데이터 중심 의사결정 문화 확인', '공정한 평가 기준 확인'] },
  '파랑→파랑': { style: '직접 대응 회피, 창의적 우회 모색', avoid: '갈등 직면 강요, 명확한 해결 요구 조직', checklist: ['유연한 조직 문화 확인', '다양성 존중 여부 확인'] },
};

// ─────────────────────────────────────────────
// NCS 공공기관 마케팅 직무 (9개)
// ─────────────────────────────────────────────
const NCS_JOBS = [
  { id: 'ncs_01', name: '시장환경 분석', category: 'ncs', emoji: '🔍', ncsCode: '01', desc: '거시 환경, 경쟁사, 자사 역량 분석', target: '공공기관 기획/연구 부서, KOTRA(대한무역투자진흥공사)', holland: ['I'], hollandSecondary: ['C', 'E'], needsColors: ['노랑'], stressWarn: ['파랑'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: false },
  { id: 'ncs_02', name: '마케팅 전략 수립', category: 'ncs', emoji: '🎯', ncsCode: '02', desc: '목표 시장 선정 및 포지셔닝', target: '전 공기업 마케팅/사업기획 직렬, 전통적 대기업 공채', holland: ['E'], hollandSecondary: ['I', 'C'], needsColors: ['빨강', '노랑'], stressWarn: ['초록'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: null },
  { id: 'ncs_03', name: '고객 분석', category: 'ncs', emoji: '👥', ncsCode: '03', desc: '타겟 고객층 분류 및 소비자 행동 파악', target: '한국관광공사, 데이터·통계 기반 공공/연구 기관', holland: ['I'], hollandSecondary: ['S', 'C'], needsColors: ['노랑', '파랑'], stressWarn: ['빨강'], mbtiTF: ['T', 'F'], mbtiJP: ['J', 'P'], mbtiE: false },
  { id: 'ncs_04', name: '상품 전략 수립', category: 'ncs', emoji: '📦', ncsCode: '04', desc: '신규 브랜드 기획, 제품 수명 주기 관리', target: '한국조폐공사, 한국인삼공사 등 자체 상품이 있는 기관', holland: ['E', 'A'], hollandSecondary: ['I'], needsColors: ['빨강', '파랑'], stressWarn: ['초록'], mbtiTF: ['T', 'F'], mbtiJP: ['J'], mbtiE: null },
  { id: 'ncs_05', name: '가격 전략 수립', category: 'ncs', emoji: '💰', ncsCode: '05', desc: '원가 분석, 시장 가격 정책 수립', target: '한국농수산식품유통공사(aT) 등 물가/유통 관련 기관', holland: ['I', 'C'], hollandSecondary: ['E'], needsColors: ['노랑'], stressWarn: ['파랑', '초록'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: false },
  { id: 'ncs_06', name: '유통 전략 수립', category: 'ncs', emoji: '🚚', ncsCode: '06', desc: '온/오프라인 판매 채널 확보 및 관리', target: '우체국쇼핑, 공영홈쇼핑, 농협 유통 부서', holland: ['E', 'C'], hollandSecondary: ['R', 'S'], needsColors: ['빨강', '노랑'], stressWarn: ['파랑'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: null },
  { id: 'ncs_07', name: '촉진 전략 수립', category: 'ncs', emoji: '📢', ncsCode: '07', desc: '광고, 홍보(PR), 이벤트 프로모션', target: '전 공공기관 홍보실, 소통협력실, 대변인실', holland: ['E', 'A'], hollandSecondary: ['S'], needsColors: ['초록', '빨강'], stressWarn: ['노랑'], mbtiTF: ['T', 'F'], mbtiJP: ['J', 'P'], mbtiE: true },
  { id: 'ncs_08', name: '고객 관리 (CS)', category: 'ncs', emoji: '💬', ncsCode: '08', desc: '고객 만족도(CS) 조사, 불만 고객 응대', target: '국민건강보험공단, 한국전력공사 등 대국민 서비스 부서', holland: ['S'], hollandSecondary: ['E', 'C'], needsColors: ['초록'], stressWarn: ['빨강'], mbtiTF: ['F', 'T'], mbtiJP: ['J', 'P'], mbtiE: true },
  { id: 'ncs_09', name: '마케팅 성과 관리', category: 'ncs', emoji: '📈', ncsCode: '09', desc: '마케팅 활동의 ROI 분석 및 피드백', target: '공공기관 경영평가 부서, 성과관리팀', holland: ['I', 'C'], hollandSecondary: ['E'], needsColors: ['노랑', '빨강'], stressWarn: ['파랑'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: false },
];

// ─────────────────────────────────────────────
// 민간기업 실무 채용 직무 (10개)
// ─────────────────────────────────────────────
const PRIVATE_JOBS = [
  { id: 'brand', name: '브랜드 마케터', category: 'private', emoji: '💎', desc: '브랜드 아이덴티티 구축, 대규모 캠페인 (IMC 기획, 스토리텔링)', target: 'F&B/패션/뷰티 대기업, 스케일업 단계의 대형 스타트업', holland: ['A', 'E'], hollandSecondary: ['S', 'I'], needsColors: ['파랑', '초록'], stressWarn: ['빨강'], mbtiTF: ['F', 'T'], mbtiJP: ['J'], mbtiE: true },
  { id: 'performance', name: '퍼포먼스 마케터', category: 'private', emoji: '⚡', desc: '유료 광고 집행 및 ROI 최적화 (GA4, Meta Ads, AppsFlyer)', target: '쿠팡/무신사 등 이커머스, 게임사, 퍼포먼스 마케팅 대행사', holland: ['E', 'C'], hollandSecondary: ['I'], needsColors: ['빨강'], stressWarn: ['초록', '노랑'], mbtiTF: ['T'], mbtiJP: ['J', 'P'], mbtiE: false },
  { id: 'content', name: '콘텐츠 마케터', category: 'private', emoji: '✍️', desc: 'SNS 채널 운영, 오가닉 콘텐츠 기획 (Figma, Notion, 영상 편집 툴)', target: '밀리의서재/왓챠 등 콘텐츠 플랫폼, B2C 서비스 기반 스타트업', holland: ['A'], hollandSecondary: ['E', 'S'], needsColors: ['파랑', '초록'], stressWarn: ['빨강'], mbtiTF: ['F', 'T'], mbtiJP: ['P'], mbtiE: false },
  { id: 'crm', name: 'CRM 마케터', category: 'private', emoji: '💌', desc: '기존 고객 리텐션 관리, 알림톡/메일 캠페인 (Braze, 고객 세분화)', target: '토스/배달의민족 등 앱 기반 서비스, 구독형 모델, 멤버십 기업', holland: ['C', 'I'], hollandSecondary: ['E'], needsColors: ['노랑', '빨강'], stressWarn: ['파랑'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: false },
  { id: 'growth', name: '그로스 마케터', category: 'private', emoji: '📈', desc: '제품 유입~결제 퍼널 개선, A/B 테스트 (SQL, Amplitude, 데이터 대시보드)', target: '토스/당근마켓 등 유니콘 IT 플랫폼, 핀테크, 테크 기반 스타트업', holland: ['E', 'I'], hollandSecondary: ['C'], needsColors: ['빨강'], stressWarn: ['초록'], mbtiTF: ['T'], mbtiJP: ['J', 'P'], mbtiE: null },
  { id: 'data', name: '마케팅 데이터 분석가', category: 'private', emoji: '📊', desc: '데이터 추출 및 시각화, 인사이트 도출 (SQL, Python, Tableau)', target: '대규모 트래픽을 다루는 IT 대기업, 종합 광고대행사 데이터랩', holland: ['I', 'C'], hollandSecondary: ['E'], needsColors: ['노랑', '빨강'], stressWarn: ['파랑', '초록'], mbtiTF: ['T'], mbtiJP: ['J', 'P'], mbtiE: false },
  { id: 'b2b', name: 'B2B 마케터', category: 'private', emoji: '🤝', desc: '기업 고객 세미나 기획, 세일즈 리드 발굴 (LinkedIn, 웨비나 툴, 제안서)', target: 'B2B SaaS 기업(채널톡, 잔디 등), 클라우드 및 솔루션 영업 기업', holland: ['E', 'S'], hollandSecondary: ['C'], needsColors: ['초록', '빨강'], stressWarn: ['노랑'], mbtiTF: ['T', 'F'], mbtiJP: ['J'], mbtiE: true },
  { id: 'community', name: '커뮤니티 마케터', category: 'private', emoji: '🏘️', desc: '브랜드 팬덤 형성, 커뮤니티(디스코드, 카페 등) 여론 관리', target: '게임, Web3, 덕질 플랫폼, 팬덤 비즈니스', holland: ['S', 'A'], hollandSecondary: ['E'], needsColors: ['초록', '파랑'], stressWarn: ['노랑'], mbtiTF: ['F'], mbtiJP: ['J', 'P'], mbtiE: true },
  { id: 'influencer', name: '인플루언서 마케터', category: 'private', emoji: '⭐', desc: '유튜버/셀럽 섭외, 브랜디드 콘텐츠 협업 단가 및 일정 조율', target: '뷰티, 패션, MCN, 엔터테인먼트, 소비재 브랜드', holland: ['S', 'A'], hollandSecondary: ['E'], needsColors: ['초록', '파랑'], stressWarn: ['노랑', '빨강'], mbtiTF: ['F'], mbtiJP: ['P', 'J'], mbtiE: true },
  { id: 'viral', name: '바이럴 마케터', category: 'private', emoji: '🔥', desc: '맘카페, 갤러리 등 온라인 커뮤니티 내 여론 조성 및 바이럴 확산', target: '바이럴 전문 대행사, 소비재(생필품/식품) 기업', holland: ['A', 'S'], hollandSecondary: ['E'], needsColors: ['초록', '파랑'], stressWarn: ['노랑'], mbtiTF: ['F', 'T'], mbtiJP: ['P'], mbtiE: true },
];

// ─────────────────────────────────────────────
// STRENGTH CATEGORIES
// ─────────────────────────────────────────────
const STRENGTH_CATEGORIES = [
  {
    id: 'personal',
    label: '개인 역량',
    emoji: '🌱',
    desc: '나 자신의 태도와 성격에서 나오는 강점',
    color: 'emerald',
    chipClass: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50',
    chipSelClass: 'bg-emerald-600 border-emerald-600 text-white shadow-md',
    headerClass: 'from-emerald-700 to-emerald-500',
    keywords: ['끈기', '꼼꼼함', '책임감', '성실함', '유연함', '긍정적 사고', '정직함', '인내심', '겸손함', '자기관리', '도전정신', '주도성'],
  },
  {
    id: 'relationship',
    label: '관계 역량',
    emoji: '🤝',
    desc: '사람과의 관계에서 발휘되는 강점',
    color: 'blue',
    chipClass: 'border-blue-200 text-blue-700 hover:bg-blue-50',
    chipSelClass: 'bg-blue-600 border-blue-600 text-white shadow-md',
    headerClass: 'from-blue-700 to-blue-500',
    keywords: ['공감', '협업능력', '경청', '소통', '중재력', '리더십', '팔로워십', '친화력', '설득력', '배려심', '네트워킹', '갈등 조율'],
  },
  {
    id: 'thinking',
    label: '사고 역량',
    emoji: '💡',
    desc: '문제를 바라보고 해결하는 사고 방식',
    color: 'violet',
    chipClass: 'border-violet-200 text-violet-700 hover:bg-violet-50',
    chipSelClass: 'bg-violet-600 border-violet-600 text-white shadow-md',
    headerClass: 'from-violet-700 to-violet-500',
    keywords: ['문제해결력', '분석력', '전략적 사고', '창의성', '계획성', '실행력', '학습 의지', '비판적 사고', '논리적 사고', '기획력', '통찰력'],
  },
  {
    id: 'skill',
    label: '기술 강점',
    emoji: '⚙️',
    desc: '실무에서 활용 가능한 도구·기술 역량',
    color: 'orange',
    chipClass: 'border-orange-200 text-orange-700 hover:bg-orange-50',
    chipSelClass: 'bg-orange-500 border-orange-500 text-white shadow-md',
    headerClass: 'from-orange-600 to-orange-400',
    keywords: ['AI 활용력', '영상편집', '정보 검색', '데이터 분석', '디자인', '외국어', '문서작성', '글쓰기', '발표', 'SNS 운영', '사진/영상 촬영', '엑셀/스프레드시트'],
  },
];

// ─────────────────────────────────────────────
// MBTI DATA
// ─────────────────────────────────────────────
const MBTI_TYPES = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];

const MINI_MBTI_QUESTIONS = [
  { id: 0, axis: 'EI', question: '새로운 사람을 만나면 어떤가요?', a: '에너지가 충전되고 흥미롭다', b: '피곤하고 에너지가 소진된다', aType: 'E', bType: 'I' },
  { id: 1, axis: 'EI', question: '큰 프로젝트 진행 시 선호하는 방식은?', a: '팀과 자주 소통하며 함께 진행', b: '혼자 집중해서 깊이 파고드는 것', aType: 'E', bType: 'I' },
  { id: 2, axis: 'SN', question: '새로운 아이디어를 접할 때?', a: '실현 가능성과 구체적 방법을 먼저 생각', b: '가능성과 미래 잠재력에 먼저 흥미', aType: 'S', bType: 'N' },
  { id: 3, axis: 'SN', question: '정보를 처리하는 방식은?', a: '사실과 세부사항을 중심으로 분석', b: '전체적인 패턴과 의미를 먼저 파악', aType: 'S', bType: 'N' },
  { id: 4, axis: 'TF', question: '의사결정 시 무엇을 더 중시하나요?', a: '논리와 데이터, 객관적 분석', b: '사람과의 관계, 감정적 영향', aType: 'T', bType: 'F' },
  { id: 5, axis: 'TF', question: '갈등 상황에서 어떻게 행동하나요?', a: '문제 원인을 논리적으로 분석해 해결', b: '상대방 감정을 먼저 고려해 화합 추구', aType: 'T', bType: 'F' },
  { id: 6, axis: 'JP', question: '업무 계획에 대해 어떻게 생각하나요?', a: '계획을 세우고 그대로 실행하는 게 편함', b: '유연하게 상황에 맞춰 변경하는 게 좋음', aType: 'J', bType: 'P' },
  { id: 7, axis: 'JP', question: '마감 기한에 대해 어떻게 반응하나요?', a: '미리미리 완료하는 게 마음이 편함', b: '마감 직전의 집중력이 오히려 성과를 높임', aType: 'J', bType: 'P' },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function getMbtiAxes(mbtiType) {
  if (!mbtiType) return { EI: null, TF: null, JP: null };
  return { EI: mbtiType[0], TF: mbtiType[2], JP: mbtiType[3] };
}

function calculateJobScores(jobs, hollandSorted, needsColor, stressColor, mbtiType) {
  const { EI, TF, JP } = getMbtiAxes(mbtiType);
  return jobs.map(job => {
    let score = 0;
    const h1 = hollandSorted[0]?.[0];
    const h2 = hollandSorted[1]?.[0];

    if (h1 && job.holland.includes(h1)) score += 4;
    else if (h1 && job.hollandSecondary.includes(h1)) score += 2;
    if (h2 && job.hollandSecondary.includes(h2)) score += 2;
    else if (h2 && job.holland.includes(h2)) score += 1;

    if (needsColor && job.needsColors.includes(needsColor)) score += 3;

    if (TF && job.mbtiTF.includes(TF)) score += 1;
    if (JP && job.mbtiJP.includes(JP)) score += 1;

    if (stressColor && job.stressWarn.includes(stressColor)) score -= 2;

    if (EI === 'E' && job.mbtiE === true) score += 0.5;
    if (EI === 'I' && job.mbtiE === false) score += 0.5;

    const stars = Math.max(1, Math.min(5, Math.round((Math.max(0, score) / 11) * 5)));
    return { ...job, score: Math.max(0, score), stars };
  }).sort((a, b) => b.score - a.score);
}

function calculateMiniMbti(answers) {
  const c = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(a => { if (a && c[a] !== undefined) c[a]++; });
  return `${c.E >= c.I ? 'E' : 'I'}${c.S >= c.N ? 'S' : 'N'}${c.T >= c.F ? 'T' : 'F'}${c.J >= c.P ? 'J' : 'P'}`;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function GangdongBirkman() {
  const [step, setStep] = useState('intro');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState(new Set());
  const [topKeywords, setTopKeywords] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [birkmanSubStep, setBirkmanSubStep] = useState('interest');
  const [birkmanData, setBirkmanData] = useState({ interest: null, behavior: null, needs: null, stress: null });
  const [mbtiChoice, setMbtiChoice] = useState(null);
  const [mbtiType, setMbtiType] = useState(null);
  const [miniAnswers, setMiniAnswers] = useState([]);
  const [miniCurrentQ, setMiniCurrentQ] = useState(0);
  const [isCopied, setIsCopied] = useState(null);
  const [selectedStrengths, setSelectedStrengths] = useState({ personal: [], relationship: [], thinking: [], skill: [] });
  const [customStrengths, setCustomStrengths] = useState({ personal: [], relationship: [], thinking: [], skill: [] });
  const [customInputs, setCustomInputs] = useState({ personal: '', relationship: '', thinking: '', skill: '' });

  const toggleStrength = (catId, keyword) => {
    setSelectedStrengths(prev => {
      const cur = prev[catId];
      return { ...prev, [catId]: cur.includes(keyword) ? cur.filter(k => k !== keyword) : [...cur, keyword] };
    });
  };

  const addCustomStrength = (catId) => {
    const val = customInputs[catId].trim();
    if (!val) return;
    setCustomStrengths(prev => ({ ...prev, [catId]: [...prev[catId], val] }));
    setCustomInputs(prev => ({ ...prev, [catId]: '' }));
  };

  const removeCustomStrength = (catId, idx) => {
    setCustomStrengths(prev => ({ ...prev, [catId]: prev[catId].filter((_, i) => i !== idx) }));
  };

  const toggleKeyword = (type, word) => {
    const key = `${type}-${word}`;
    const next = new Set(selectedKeywords);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelectedKeywords(next);
  };

  const toggleTopKeyword = (key) => {
    if (topKeywords.includes(key)) setTopKeywords(topKeywords.filter(k => k !== key));
    else if (topKeywords.length < 3) setTopKeywords([...topKeywords, key]);
  };

  const toggleValue = (id) => {
    if (selectedValues.includes(id)) setSelectedValues(selectedValues.filter(v => v !== id));
    else if (selectedValues.length < 3) setSelectedValues([...selectedValues, id]);
  };

  const handleBirkmanSelect = (colorId) => {
    const updated = { ...birkmanData, [birkmanSubStep]: colorId };
    setBirkmanData(updated);
    const order = ['interest', 'behavior', 'needs', 'stress'];
    const idx = order.indexOf(birkmanSubStep);
    if (idx < 3) setTimeout(() => setBirkmanSubStep(order[idx + 1]), 400);
    else setTimeout(() => setStep('mbti'), 400);
  };

  const handleMiniAnswer = (answerType) => {
    const newAnswers = [...miniAnswers, answerType];
    setMiniAnswers(newAnswers);
    if (miniCurrentQ < MINI_MBTI_QUESTIONS.length - 1) {
      setMiniCurrentQ(prev => prev + 1);
    } else {
      setMbtiType(calculateMiniMbti(newAnswers));
      setStep('result');
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const restart = () => {
    setStep('intro');
    setCurrentPageIndex(0);
    setSelectedKeywords(new Set());
    setTopKeywords([]);
    setSelectedValues([]);
    setBirkmanSubStep('interest');
    setBirkmanData({ interest: null, behavior: null, needs: null, stress: null });
    setMbtiChoice(null);
    setMbtiType(null);
    setMiniAnswers([]);
    setMiniCurrentQ(0);
    setSelectedStrengths({ personal: [], relationship: [], thinking: [], skill: [] });
    setCustomStrengths({ personal: [], relationship: [], thinking: [], skill: [] });
    setCustomInputs({ personal: '', relationship: '', thinking: '', skill: '' });
  };

  // ── INTRO ──────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 font-sans">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-10 text-center text-white">
            <div className="text-5xl mb-4">🧭</div>
            <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">마케팅 직무 적합도 진단</h1>
            <p className="text-slate-300 text-base md:text-lg break-keep">홀랜드 × 버크만 × MBTI 통합 분석으로<br />나에게 딱 맞는 마케팅 직무를 찾아보세요.</p>
          </div>
          <div className="p-8 space-y-5">
            {[
              { icon: '🔍', step: 'STEP 1', title: '홀랜드 직업 흥미 검사', sub: 'RIASEC 6유형 키워드 선택' },
              { icon: '🟡', step: 'STEP 2', title: '버크만 컬러 입력', sub: '흥미 / 행동 / 욕구 / 스트레스' },
              { icon: '🧠', step: 'STEP 3', title: 'MBTI 에너지 & 의사결정', sub: '직접 입력 / 간이 검사 / 패스' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.step}</p>
                  <p className="font-black text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setStep('strengthSelect')}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg hover:-translate-y-1"
            >
              진단 시작하기 <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STRENGTH SELECT ────────────────────────
  if (step === 'strengthSelect') {
    const totalSelected = Object.values(selectedStrengths).reduce((sum, arr) => sum + arr.length, 0);
    const totalCustom = Object.values(customStrengths).reduce((sum, arr) => sum + arr.length, 0);
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-6 text-white text-center mb-6">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">STEP 1</p>
            <h2 className="text-2xl font-black">나의 강점 선택</h2>
            <p className="text-slate-300 text-sm mt-1">해당하는 키워드를 선택하고, 없으면 직접 입력하세요.</p>
            {totalSelected + totalCustom > 0 && (
              <p className="text-emerald-400 font-black text-sm mt-2">총 {totalSelected}개 선택 {totalCustom > 0 ? `+ ${totalCustom}개 직접 입력` : ''}</p>
            )}
          </div>

          <div className="space-y-5">
            {STRENGTH_CATEGORIES.map(cat => (
              <div key={cat.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${cat.headerClass} px-6 py-4 text-white`}>
                  <h3 className="font-black text-lg flex items-center gap-2">{cat.emoji} {cat.label}</h3>
                  <p className="text-white/70 text-xs">{cat.desc}</p>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.keywords.map(kw => {
                      const isSel = selectedStrengths[cat.id].includes(kw);
                      return (
                        <button key={kw} onClick={() => toggleStrength(cat.id, kw)}
                          className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${isSel ? cat.chipSelClass : `bg-white ${cat.chipClass}`}`}>
                          {kw}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 space-y-2">
                    {customStrengths[cat.id].length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {customStrengths[cat.id].map((kw, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {kw}
                            <button onClick={() => removeCustomStrength(cat.id, i)} className="ml-0.5 text-slate-400 hover:text-red-500 font-black leading-none">×</button>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 shrink-0">직접 입력</span>
                      <input
                        type="text"
                        value={customInputs[cat.id]}
                        onChange={e => setCustomInputs(prev => ({ ...prev, [cat.id]: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') addCustomStrength(cat.id); }}
                        placeholder="강점 키워드 입력 후 추가"
                        className="flex-1 text-sm py-2 px-3 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 text-gray-700"
                      />
                      <button
                        onClick={() => addCustomStrength(cat.id)}
                        className="shrink-0 px-4 py-2 rounded-xl bg-slate-800 hover:bg-black text-white text-xs font-black transition-all"
                      >추가</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep('intro')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-6 py-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-400">
              <ArrowLeft className="w-4 h-4" /> 이전
            </button>
            <button onClick={() => setStep('keywordTest')}
              className="flex-1 bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
              홀랜드 키워드 검사로 이동 <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── KEYWORD TEST ───────────────────────────
  if (step === 'keywordTest') {
    const currentType = PAGINATION_ORDER[currentPageIndex];
    const typeInfo = RIASEC_DESCRIPTIONS[currentType];
    const currentKeywords = KEYWORD_DATA[currentType];
    const progress = ((currentPageIndex + 1) / PAGINATION_ORDER.length) * 100;
    const themeBtn = { blue: 'border-blue-200 text-blue-600 hover:bg-blue-50', sky: 'border-sky-200 text-sky-600 hover:bg-sky-50', orange: 'border-orange-200 text-orange-600 hover:bg-orange-50', green: 'border-green-200 text-green-600 hover:bg-green-50', red: 'border-red-200 text-red-600 hover:bg-red-50', purple: 'border-purple-200 text-purple-600 hover:bg-purple-50' }[typeInfo.themeColor];
    const themeBtnSel = { blue: 'bg-blue-600 border-blue-600 text-white shadow-md scale-105', sky: 'bg-sky-500 border-sky-500 text-white shadow-md scale-105', orange: 'bg-orange-500 border-orange-500 text-white shadow-md scale-105', green: 'bg-green-600 border-green-600 text-white shadow-md scale-105', red: 'bg-red-600 border-red-600 text-white shadow-md scale-105', purple: 'bg-purple-600 border-purple-600 text-white shadow-md scale-105' }[typeInfo.themeColor];
    return (
      <div className={`min-h-screen py-6 px-4 font-sans ${typeInfo.color}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{typeInfo.icon}</span>
              <div className="flex-1">
                <h2 className="text-lg font-black text-gray-800">{currentPageIndex + 1}. {typeInfo.shortName} 키워드</h2>
                <p className="text-gray-500 text-sm">{typeInfo.desc}</p>
              </div>
              <span className="text-sm font-black text-gray-400">{currentPageIndex + 1} / 6</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${typeInfo.barColor} transition-all duration-500`} style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <p className="text-center text-gray-400 font-bold mb-6 uppercase tracking-widest text-sm">나에게 해당하는 단어를 모두 골라주세요</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-10">
              {currentKeywords.map((word, idx) => {
                const isSelected = selectedKeywords.has(`${currentType}-${word}`);
                return (
                  <button key={idx} onClick={() => toggleKeyword(currentType, word)}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border-2 ${isSelected ? themeBtnSel : `bg-white ${themeBtn}`}`}>
                    {word}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => { if (currentPageIndex > 0) { setCurrentPageIndex(p => p - 1); } else { setStep('intro'); } window.scrollTo(0, 0); }}
                className="py-3 px-8 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50">이전으로</button>
              <button onClick={() => {
                if (currentPageIndex < 5) { setCurrentPageIndex(p => p + 1); }
                else {
                  if (selectedKeywords.size <= 3) { setTopKeywords(Array.from(selectedKeywords)); setStep('valueTest'); }
                  else { setStep('topKeywordSelect'); }
                }
                window.scrollTo(0, 0);
              }} className="py-3 px-10 rounded-full bg-slate-900 text-white font-black hover:bg-black shadow-lg flex items-center gap-2">
                {currentPageIndex < 5 ? '다음 유형으로' : '키워드 선택 완료'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TOP KEYWORD SELECT ─────────────────────
  if (step === 'topKeywordSelect') {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <button onClick={() => { setCurrentPageIndex(5); setStep('keywordTest'); }} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 font-bold mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> 이전 목록으로
          </button>
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-amber-100 rounded-3xl mb-4"><Trophy className="w-10 h-10 text-amber-600" /></div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">최종 핵심 키워드 선택</h2>
            <p className="text-gray-500">총 <strong>{selectedKeywords.size}개</strong> 중 나를 가장 잘 나타내는 <strong>3개</strong>를 골라주세요.</p>
            <p className="text-amber-600 font-black mt-3 text-xl">({topKeywords.length} / 3 선택됨)</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-10 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            {Array.from(selectedKeywords).map(key => {
              const [type, word] = key.split('-');
              const isSelected = topKeywords.includes(key);
              const isDisabled = !isSelected && topKeywords.length >= 3;
              return (
                <button key={key} onClick={() => toggleTopKeyword(key)} disabled={isDisabled}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 flex items-center gap-2 transition-all
                    ${isSelected ? 'bg-amber-500 border-amber-500 text-white shadow-lg scale-105' : isDisabled ? 'opacity-40 bg-gray-50 border-gray-100 cursor-not-allowed' : 'bg-white border-gray-200 text-gray-600 hover:border-amber-300'}`}>
                  <span className={`w-2 h-2 rounded-full ${RIASEC_DESCRIPTIONS[type]?.barColor} shrink-0`} />
                  {word}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button onClick={() => setStep('valueTest')} disabled={topKeywords.length !== 3}
              className={`font-black py-4 px-12 rounded-2xl shadow-lg text-lg ${topKeywords.length === 3 ? 'bg-slate-900 text-white hover:bg-black hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              가치관 선택으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── VALUE TEST ─────────────────────────────
  if (step === 'valueTest') {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <button onClick={() => setStep(selectedKeywords.size <= 3 ? 'keywordTest' : 'topKeywordSelect')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 font-bold mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> 이전 단계로
          </button>
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-pink-100 rounded-3xl mb-4"><CheckCircle className="w-10 h-10 text-pink-600" /></div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">직업 가치관 선택</h2>
            <p className="text-gray-500">직업을 가질 때 가장 중요한 가치 <strong>3가지</strong>를 선택해주세요.</p>
            <p className="text-pink-600 font-black mt-3 text-xl">({selectedValues.length} / 3 선택됨)</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {VALUES.map(val => {
              const isSel = selectedValues.includes(val.id);
              const isDis = !isSel && selectedValues.length >= 3;
              return (
                <button key={val.id} onClick={() => toggleValue(val.id)} disabled={isDis}
                  className={`p-5 rounded-2xl text-left border-2 flex items-center gap-3 transition-all ${isSel ? 'bg-pink-50 border-pink-500 shadow-md scale-[1.02]' : isDis ? 'opacity-40 bg-gray-50 border-gray-100 cursor-not-allowed' : 'bg-white border-gray-100 hover:border-pink-200'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSel ? 'border-pink-500 bg-pink-500' : 'border-gray-200'}`}>
                    {isSel && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <p className="font-black text-gray-800">{val.id}</p>
                    <p className="text-xs text-gray-500 break-keep">{val.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button onClick={() => setStep('birkman')} disabled={selectedValues.length !== 3}
              className={`font-black py-4 px-16 rounded-2xl shadow-lg text-lg flex items-center gap-3 ${selectedValues.length === 3 ? 'bg-slate-900 text-white hover:bg-black hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              버크만 입력하기 <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── BIRKMAN ────────────────────────────────
  if (step === 'birkman') {
    const subStepOrder = ['interest', 'behavior', 'needs', 'stress'];
    const subStepIdx = subStepOrder.indexOf(birkmanSubStep);
    const subStepLabels = { interest: '흥미 (Interest)', behavior: '평소 행동 (Usual Behavior)', needs: '욕구 (Needs)', stress: '스트레스 반응 (Stress)' };
    const subStepDescs = { interest: '어떤 분야에 자연스럽게 끌리나요?', behavior: '평소 업무 중 자연스럽게 나타나는 행동 방식은?', needs: '내면적으로 원하는 환경이나 대우는?', stress: '욕구가 충족되지 않을 때 나타나는 반응은?' };
    const progress = ((subStepIdx + 1) / 4) * 100;
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => { if (subStepIdx > 0) setBirkmanSubStep(subStepOrder[subStepIdx - 1]); else setStep('valueTest'); }}
                  className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-bold">
                  <ArrowLeft className="w-4 h-4" /> 이전
                </button>
                <span className="text-slate-300 text-sm font-bold">{subStepIdx + 1} / 4</span>
              </div>
              <div className="w-full bg-slate-600 h-1.5 rounded-full mb-4">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <h2 className="text-xl font-black mb-1">{subStepLabels[birkmanSubStep]}</h2>
              <p className="text-slate-300 text-sm">{subStepDescs[birkmanSubStep]}</p>
            </div>
            <div className="p-8 grid grid-cols-2 gap-4">
              {BIRKMAN_COLORS.map(color => {
                const isSelected = birkmanData[birkmanSubStep] === color.id;
                return (
                  <button key={color.id} onClick={() => handleBirkmanSelect(color.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${isSelected ? `${color.bgClass} ${color.borderClass} shadow-lg scale-[1.03]` : 'bg-white border-gray-100 hover:border-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full ${color.colorClass} mb-3`} />
                    <p className={`font-black text-lg ${isSelected ? color.textClass : 'text-gray-800'}`}>{color.label}</p>
                    <p className="text-xs text-gray-500 mt-1 break-keep">{color.desc}</p>
                  </button>
                );
              })}
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => { if (subStepIdx > 0) setBirkmanSubStep(subStepOrder[subStepIdx - 1]); else setStep('valueTest'); }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-black transition-all"
              >
                <ArrowLeft className="w-5 h-5" /> 이전 단계로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MBTI ───────────────────────────────────
  if (step === 'mbti') {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-xl mx-auto w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 p-8 text-center text-white">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-90" />
            <h2 className="text-2xl font-black mb-2">MBTI 에너지 & 의사결정</h2>
            <p className="text-indigo-200 text-sm break-keep">MBTI 결과에 따라 업무 스타일과 직무 적합도가 달라집니다.</p>
          </div>
          <div className="p-8 space-y-4">
            <button onClick={() => setMbtiChoice('direct')}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${mbtiChoice === 'direct' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}>
              <span className="text-2xl">📝</span>
              <div>
                <p className="font-black text-gray-800">내 MBTI 직접 입력</p>
                <p className="text-xs text-gray-500">기존 검사 결과가 있다면 선택해주세요</p>
              </div>
            </button>
            {mbtiChoice === 'direct' && (
              <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 rounded-2xl">
                {MBTI_TYPES.map(t => (
                  <button key={t} onClick={() => setMbtiType(t)}
                    className={`py-2 px-3 rounded-xl text-sm font-bold border-2 transition-all ${mbtiType === t ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'}`}>{t}</button>
                ))}
              </div>
            )}
            <button onClick={() => { setMbtiChoice('mini'); setStep('mbtiMini'); }}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${mbtiChoice === 'mini' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}>
              <span className="text-2xl">🧪</span>
              <div>
                <p className="font-black text-gray-800">간이 검사 (8문항)</p>
                <p className="text-xs text-gray-500">빠른 질문으로 나의 유형을 파악합니다</p>
              </div>
            </button>
            <button onClick={() => { setMbtiChoice('pass'); setMbtiType(null); }}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${mbtiChoice === 'pass' ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}>
              <span className="text-2xl">⏭️</span>
              <div>
                <p className="font-black text-gray-800">건너뛰기</p>
                <p className="text-xs text-gray-500">MBTI 없이 진행 (에너지/의사결정 항목 제외)</p>
              </div>
            </button>
            <button
              onClick={() => setStep('result')}
              disabled={mbtiChoice === 'direct' && !mbtiType}
              className={`w-full font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg mt-4 ${(mbtiChoice === 'pass' || (mbtiChoice === 'direct' && mbtiType)) ? 'bg-slate-900 text-white hover:bg-black hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              결과 보기 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── MBTI MINI ──────────────────────────────
  if (step === 'mbtiMini') {
    const q = MINI_MBTI_QUESTIONS[miniCurrentQ];
    const progress = (miniCurrentQ / MINI_MBTI_QUESTIONS.length) * 100;
    return (
      <div className="min-h-screen bg-indigo-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-xl mx-auto w-full">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-100">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => { if (miniCurrentQ > 0) { setMiniCurrentQ(prev => prev - 1); setMiniAnswers(prev => prev.slice(0, -1)); } else setStep('mbti'); }}
                  className="flex items-center gap-1 text-indigo-200 hover:text-white text-sm font-bold"><ArrowLeft className="w-4 h-4" /> 이전</button>
                <span className="text-indigo-200 text-sm font-bold">{miniCurrentQ + 1} / 8</span>
              </div>
              <div className="w-full bg-indigo-800 h-1.5 rounded-full mb-1">
                <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-indigo-200 mt-2 font-bold uppercase tracking-wider">간이 MBTI 검사 — {q.axis} 축</p>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-gray-900 mb-8 text-center leading-relaxed">{q.question}</h3>
              <div className="space-y-4">
                {[{ label: 'A', text: q.a, type: q.aType }, { label: 'B', text: q.b, type: q.bType }].map(opt => (
                  <button key={opt.label} onClick={() => handleMiniAnswer(opt.type)}
                    className="w-full p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-left transition-all group">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center text-sm font-black text-gray-600 group-hover:text-indigo-700 shrink-0">{opt.label}</span>
                      <p className="font-bold text-gray-700 group-hover:text-indigo-800 break-keep">{opt.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────
  if (step === 'result') {
    const hollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    selectedKeywords.forEach(key => { const t = key.split('-')[0]; if (hollandScores[t] !== undefined) hollandScores[t]++; });
    const hollandSorted = Object.entries(hollandScores).sort(([, a], [, b]) => b - a);
    const hollandFixed = PAGINATION_ORDER.map(t => [t, hollandScores[t]]);

    const h1 = hollandSorted[0][0];
    const h2 = hollandSorted[1][0];
    const topTypeInfo = RIASEC_DESCRIPTIONS[h1];
    const { EI, TF, JP } = getMbtiAxes(mbtiType);

    const ncsRanked = calculateJobScores(NCS_JOBS, hollandSorted, birkmanData.needs, birkmanData.stress, mbtiType);
    const privateRanked = calculateJobScores(PRIVATE_JOBS, hollandSorted, birkmanData.needs, birkmanData.stress, mbtiType);
    const ncsTop3 = ncsRanked.slice(0, 3);
    const privateTop3 = privateRanked.slice(0, 3);

    const topKeywordLabels = topKeywords.map(k => k.split('-')[1]).join(', ');
    const valLabels = selectedValues.join(', ');

    // 강점 데이터 정리
    const strengthSummary = STRENGTH_CATEGORIES.map(cat => {
      const all = [...selectedStrengths[cat.id], ...customStrengths[cat.id]];
      return all.length > 0 ? `${cat.label}: ${all.join(', ')}` : null;
    }).filter(Boolean).join('\n');
    const hasStrengths = strengthSummary.length > 0;

    const birkmanBehaviorInfo = BIRKMAN_COLOR_MAP[birkmanData.behavior];
    const birkmanNeedsInfo = BIRKMAN_COLOR_MAP[birkmanData.needs];
    const birkmanStressInfo = BIRKMAN_COLOR_MAP[birkmanData.stress];
    const birkmanInterestInfo = BIRKMAN_COLOR_MAP[birkmanData.interest];

    const workStyleKey = `${birkmanData.behavior}→${birkmanData.needs}`;
    const workStyle = WORK_STYLE_MAP[workStyleKey];
    const conflictKey = `${birkmanData.behavior}→${birkmanData.stress}`;
    const conflictStyle = CONFLICT_STYLE_MAP[conflictKey];

    const hasMbti = !!mbtiType;
    const mbtiDesc = hasMbti ? {
      energy: EI === 'E' ? '외향형 (E): 팀 협업과 소통에서 에너지가 충전됩니다.' : '내향형 (I): 독립 작업과 집중 시간에서 에너지가 충전됩니다.',
      decision: (() => {
        if (TF === 'T' && JP === 'J') return 'TJ: 논리적이고 빠른 결정, 체계적 실행 — 그로스·퍼포먼스·PMM에 최적';
        if (TF === 'T' && JP === 'P') return 'TP: 논리적이며 유연함, 데이터 기반 빠른 피봇 — 퍼포먼스·그로스 해커에 적합';
        if (TF === 'F' && JP === 'J') return 'FJ: 공감적이고 계획적, 팀 조율과 일관성 — 브랜드·커뮤니티 매니저에 적합';
        return 'FP: 공감적이며 유연함, 창의적 적응력 — 콘텐츠·SNS·인플루언서 마케터에 적합';
      })(),
    } : null;

    // AI 프롬프트 생성
    const aiBase = `당신은 최고의 마케팅 커리어 전문가입니다.\n\n[나의 진단 데이터]\n- 홀랜드 유형: 1순위 ${topTypeInfo.name}, 2순위 ${RIASEC_DESCRIPTIONS[h2].name}\n- 핵심 키워드: ${topKeywordLabels}\n- 직업 가치관: ${valLabels}\n${hasStrengths ? `- 나의 강점:\n${strengthSummary.split('\n').map(l => `  · ${l}`).join('\n')}\n` : ''}- 버크만: 흥미 ${birkmanData.interest}, 평소 행동 ${birkmanData.behavior}, 욕구 ${birkmanData.needs}, 스트레스 반응 ${birkmanData.stress}\n- MBTI: ${mbtiType || '미입력'}\n- NCS 공공기관 추천 직무 Top3: ${ncsTop3.map(j => j.name).join(', ')}\n- 민간기업 실무 추천 직무 Top3: ${privateTop3.map(j => j.name).join(', ')}\n\n`;

    const prompts = [
      {
        id: 'strengths', title: '✨ 나의 강점 키워드 (버크만 + MBTI + 홀랜드 유형)',
        text: `당신은 최고의 마케팅 커리어 전문가입니다.\n\n[나의 진단 데이터]\n\n홀랜드 유형: 1순위 ${topTypeInfo.name}, 2순위 ${RIASEC_DESCRIPTIONS[h2].name}\n핵심 키워드: ${topKeywordLabels}\n직업 가치관: ${valLabels}\n${hasStrengths ? `나의 강점:\n${strengthSummary.split('\n').map(l => `· ${l}`).join('\n')}\n` : ''}버크만: 흥미 ${birkmanData.interest}, 평소 행동 ${birkmanData.behavior}, 욕구 ${birkmanData.needs}, 스트레스 반응 ${birkmanData.stress}\nMBTI: ${mbtiType || '미입력'}\n\n[요청]\n위 진단 데이터를 바탕으로, 나의 강점을 아래 3가지 관점에서 각각 키워드 10개씩 도출해주세요.\n\n[출력 형식]\n\n✨ 나의 강점 키워드\n\n🟡 버크만으로 보는 나의 강점\n(버크만 평소 행동 ${birkmanData.behavior} + 욕구 ${birkmanData.needs} 기반)\n키워드1 키워드2 키워드3 키워드4 키워드5 키워드6 키워드7 키워드8 키워드9 키워드10\n\n🧠 MBTI로 보는 나의 강점\n(MBTI ${mbtiType || '미입력'} 기반)\n키워드1 키워드2 키워드3 키워드4 키워드5 키워드6 키워드7 키워드8 키워드9 키워드10\n\n🎯 홀랜드 유형으로 보는 나의 강점\n(${topTypeInfo.name} 기반)\n키워드1 키워드2 키워드3 키워드4 키워드5 키워드6 키워드7 키워드8 키워드9 키워드10\n\n[작성 규칙]\n\n각 관점당 정확히 10개 키워드만 출력 (백틱으로 감싸기)`
      },
      {
        id: 'job', title: '🎯 나에게 맞는 직무 심층 분석 (버크만 + 홀랜드 유형)',
        text: `당신은 최고의 마케팅 커리어 전문가입니다.\n\n[나의 진단 데이터]\n- 홀랜드 유형: 1순위 ${topTypeInfo.name}, 2순위 ${RIASEC_DESCRIPTIONS[h2].name}\n- 핵심 키워드: ${topKeywordLabels}\n- 직업 가치관: ${valLabels}\n${hasStrengths ? `- 나의 강점:\n${strengthSummary.split('\n').map(l => `  · ${l}`).join('\n')}\n` : ''}- 버크만: 흥미 ${birkmanData.interest}, 평소 행동 ${birkmanData.behavior}, 욕구 ${birkmanData.needs}, 스트레스 반응 ${birkmanData.stress}\n- NCS 공공기관 추천 직무 Top3: ${ncsTop3.map(j => j.name).join(', ')}\n- 민간기업 실무 추천 직무 Top3: ${privateTop3.map(j => j.name).join(', ')}\n\n[요청]\n추천된 직무 중 (NCS + 민간기업 합산) 가장 적합한 Top3를 선정하여 다음 형식으로 정확하게 작성해주세요.\n\n---\n\n[출력 형식]\n\n## 🎯 추천 직무 TOP 3\n\n### 1️⃣ [직무명]\n\n**이 직무를 추천하는 이유**\n[홀랜드 유형 + 버크만 특성을 바탕으로 이 직무가 나에게 적합한 이유를 2-3문장으로 설명]\n\n**핵심 강점**\n- **[강점명1]:** [이 강점이 이 직무에서 어떻게 발현되는지 구체적 설명 1문장]\n- **[강점명2]:** [설명 1문장]\n- **[강점명3]:** [설명 1문장]\n\n**나를 표현하는 키워드**\n\`키워드1\` \`키워드2\` \`키워드3\` \`키워드4\`\n\n---\n\n### 2️⃣ [직무명]\n\n**이 직무를 추천하는 이유**\n[설명 2-3문장]\n\n**핵심 강점**\n- **[강점명1]:** [설명]\n- **[강점명2]:** [설명]\n- **[강점명3]:** [설명]\n\n**나를 표현하는 키워드**\n\`키워드1\` \`키워드2\` \`키워드3\` \`키워드4\`\n\n---\n\n### 3️⃣ [직무명]\n\n**이 직무를 추천하는 이유**\n[설명 2-3문장]\n\n**핵심 강점**\n- **[강점명1]:** [설명]\n- **[강점명2]:** [설명]\n- **[강점명3]:** [설명]\n\n**나를 표현하는 키워드**\n\`키워드1\` \`키워드2\` \`키워드3\` \`키워드4\`\n\n---\n\n[작성 규칙]\n\n추천 이유 규칙:\n- 홀랜드 유형(${topTypeInfo.name}, ${RIASEC_DESCRIPTIONS[h2].name})과 버크만(흥미 ${birkmanData.interest}, 평소 행동 ${birkmanData.behavior}, 욕구 ${birkmanData.needs}) 특성을 명확히 연결\n- 이 직무가 나의 성향에 왜 적합한지 구체적으로 2-3문장 설명\n- 직업 가치관(${valLabels})도 자연스럽게 반영\n\n강점명 규칙:\n- "나의 강점" 섹션(${hasStrengths ? strengthSummary : '선택 없음'})에 제시된 항목들을 반드시 참고하여 작성\n- 본질적 역량으로 표현 (예: 분석력, 실행력, 이해력, 설계력, 협업 역량, 창의력, 최적화력)\n- 각 직무당 정확히 3개\n- "~력", "~능력", "~역량" 형태 사용\n\n설명 규칙:\n- 각 강점 설명에 "나의 강점" 항목들을 자연스럽게 연결하여 작성\n- 각 강점이 해당 직무에서 어떻게 구체적으로 발현되는지 1-2문장으로 작성\n- 실제 업무 행동/결과 중심으로 설명\n- 예시: "분석력: 데이터 분석 기술을 활용해 고객 행동 패턴을 구조화합니다. 논리적 사고로 문제를 분해하고 해법을 명확하게 도출합니다."\n\n키워드 규칙:\n- "나의 강점" 섹션(${hasStrengths ? strengthSummary : '선택 없음'})에서 제시된 항목들을 그대로 활용\n- 정확히 4개 (백틱으로 감싸서 표현: \`키워드\`)\n- 각 직무별로 가장 적합한 강점 조합으로 선택하여 차별화\n- 제시된 강점 외 새로운 키워드는 사용하지 않음\n\n형식 준수:\n- 위 템플릿 구조 정확히 유지\n- 이모지 숫자(1️⃣, 2️⃣, 3️⃣) 반드시 사용\n- 각 섹션 사이 구분선(---) 유지\n- 불필요한 서론, 추가 설명, 마무리 멘트 없이 바로 내용만\n- MBTI는 참고만 하고 직접 언급하지 않음`
      },
      {
        id: 'style', title: '💪 나의 일하는 방식 (버크만 평소 행동 + MBTI 에너지/의사결정)',
        text: `당신은 최고의 마케팅 커리어 전문가입니다.\n\n아래 진단 데이터를 기반으로, 마케팅 커리어 프로필을 작성해주세요.\n반드시 [출력 형식]을 정확히 따르고, [작성 규칙]을 준수해야 합니다.\n\n---\n\n[나의 진단 데이터]\n- 홀랜드 유형: 1순위 ${topTypeInfo.name}, 2순위 ${RIASEC_DESCRIPTIONS[h2].name}\n- 핵심 키워드: ${topKeywordLabels}\n- 직업 가치관: ${valLabels}\n- 버크만: 흥미 ${birkmanData.interest}, 평소 행동 ${birkmanData.behavior}, 욕구 ${birkmanData.needs}, 스트레스 반응 ${birkmanData.stress}\n- MBTI: ${mbtiType || '미입력'}\n- NCS 공공기관 추천 직무 Top3: ${ncsTop3.map(j => j.name).join(', ')}\n- 민간기업 실무 추천 직무 Top3: ${privateTop3.map(j => j.name).join(', ')}\n\n---\n\n[버크만 4가지 색상 키워드]\n\n🔴 빨강 (DOER: 실행과 결과)\n실행력, 결과 중심, 신속함, 활동성, 논리적, 실질적, 직접적, 경쟁심, 단호함, 해결사, 추진력, 실용주의, 에너지, 가시적 성과, 목표 지향, 권한 위임, 솔직함, 과업 중심, 신체 활동, 통제력\n\n🟡 노랑 (COMMUNICATOR: 관리와 체계)\n체계성, 규정 준수, 세밀함, 신중함, 공정성, 객관성, 기록/문서화, 일관성, 예측 가능성, 조직화, 관리 능력, 철저함, 검증, 절차 중시, 신뢰성, 집중력, 보수적 접근, 명확성, 정확도, 자제력\n\n🟢 초록 (TALKER: 소통과 설득)\n사교성, 설득력, 유연함, 네트워킹, 열정, 표현력, 낙천성, 사람 중심, 변화 수용, 다재다능, 동기 부여, 협상, 홍보/마케팅, 친화력, 즉흥성, 팀워크, 활발함, 정치적 감각, 분위기 메이커, 언어적 소통\n\n🔵 파랑 (THINKER: 기획과 분석)\n통찰력, 창의성, 전략적 사고, 비전 제시, 공감 능력, 사색적, 장기적 안목, 복합적 분석, 감수성, 추상적 아이디어, 기획력, 배려심, 지적 호기심, 본질 추구, 독창성, 심사숙고, 개념화, 질적 가치, 상상력, 신중한 소통\n\n---\n\n[MBTI 유형별 특성]\n- INTJ: 전략적, 독립적, 분석적, 비전 지향, 완벽주의, 장기 계획, 혁신적, 내향적 리더십\n- ENTJ: 논리적, 효율적, 목표 지향적, 주도적, 직설적, 전략적 사고, 리더십, 자율성 추구\n- INFJ: 통찰력, 이상주의, 공감력, 비전 제시, 조용한 영향력, 의미 추구, 헌신적, 직관적\n- ENFJ: 카리스마, 공감력, 동기 부여, 관계 중심 리더십, 조화 추구, 헌신적, 설득력\n- INTP: 논리적 분석, 호기심, 독창적 사고, 이론 중심, 유연한 탐구, 비판적 사고, 독립적\n- ENTP: 혁신적, 논쟁적, 가능성 탐색, 즉흥적, 도전적, 아이디어 생성, 유연한 전략\n- INFP: 가치 중심, 창의적, 공감력, 이상주의, 진정성 추구, 내면 성찰, 유연한 적응\n- ENFP: 열정적, 창의적, 사람 중심, 가능성 탐색, 즉흥적, 동기 부여, 변화 추구\n- ISTJ: 책임감, 체계적, 신뢰성, 전통 중시, 세밀함, 규칙 준수, 실용적, 꾸준함\n- ESTJ: 조직적, 결단력, 효율적 관리, 규칙 중시, 책임감, 실용적 리더십, 직설적\n- ISFJ: 헌신적, 세심함, 안정 추구, 책임감, 배려심, 전통 중시, 실용적 지원, 충성심\n- ESFJ: 사교적, 배려심, 조화 추구, 책임감, 팀 중심, 실용적 지원, 전통 중시, 공감력\n- ISTP: 분석적, 실용적, 독립적, 문제 해결, 유연한 적응, 도구 활용, 위기 대응, 관찰력\n- ESTP: 행동 지향, 현실적, 적응력, 위기 대응, 즉흥적, 설득력, 에너지, 모험적\n- ISFP: 감성적, 유연한 적응, 현재 중심, 가치 추구, 예술적 감각, 조용한 배려, 진정성\n- ESFP: 사교적, 즉흥적, 에너지, 현재 중심, 유연한 적응, 엔터테이너, 실용적, 낙천적\n\n---\n\n[출력 형식]\n\n## 🎯 당신의 마케팅 커리어 프로필\n\n### 핵심 특성: "[특성명]"\n\n[버크만 + MBTI를 통합한 1줄 설명 (30-50자)]\n\n---\n\n## 1. 남들이 보는 나의 업무 스타일\n평소 행동(버크만 평소 행동: ${birkmanData.behavior} + MBTI: ${mbtiType || '미입력'})\n\n**${birkmanData.behavior}의 특성:**\n- [특성1]: [1-2줄 설명으로 해당 색상의 특성이 마케팅 업무에서 어떻게 나타나는지 구체적으로 기술]\n- [특성2]: [1-2줄 설명]\n- [특성3]: [1-2줄 설명]\n- [특성4]: [1-2줄 설명]\n- [특성5]: [1-2줄 설명]\n\n**${mbtiType || '미입력'}의 특성:**\n- [특성1]: [1-2줄 설명으로 MBTI의 특성이 마케팅 업무에서 어떻게 나타나는지 구체적으로 기술]\n- [특성2]: [1-2줄 설명]\n- [특성3]: [1-2줄 설명]\n- [특성4]: [1-2줄 설명]\n- [특성5]: [1-2줄 설명]\n\n**마케팅에서의 실제 모습:**\n[버크만 평소 행동 색상과 MBTI가 결합되어 마케팅 현장에서 어떻게 나타나는지 3-4문장으로 구체적으로 서술. 브랜드 전략 수립, 캠페인 실행, 팀 리드, 경영진 설득 등의 실제 상황을 포함]\n\n---\n\n## 2. 내가 일에 몰입하기 위한 환경\n욕구(버크만 욕구: ${birkmanData.needs} + MBTI: ${mbtiType || '미입력'})\n\n[당신이 최고의 성과를 내기 위해 필요한 환경의 전체 설명 문단. 버크만 욕구 색상과 MBTI의 욕구를 통합하여 4-5문장으로 자연스럽게 작성]\n\n**${birkmanData.needs}의 욕구:**\n- [욕구1]: [1-2줄 설명으로 해당 색상이 원하는 환경의 구체적 특징과 마케팅 업무에서의 의미]\n- [욕구2]: [1-2줄 설명]\n- [욕구3]: [1-2줄 설명]\n- [욕구4]: [1-2줄 설명]\n- [욕구5]: [1-2줄 설명]\n\n**${mbtiType || '미입력'}의 욕구:**\n- [욕구1]: [1-2줄 설명으로 MBTI가 원하는 환경의 구체적 특징과 마케팅 업무에서의 의미]\n- [욕구2]: [1-2줄 설명]\n- [욕구3]: [1-2줄 설명]\n- [욕구4]: [1-2줄 설명]\n- [욕구5]: [1-2줄 설명]\n\n**이 환경이 없으면:**\n[욕구가 충족되지 않았을 때 구체적으로 어떤 결과가 나타나는지 2-3문장으로 서술]\n\n---\n\n## 3. 업무 효율이 떨어질 때의 징후\n스트레스 행동(버크만 스트레스: ${birkmanData.stress} + MBTI: ${mbtiType || '미입력'})\n\n[스트레스 상태에 대한 전체 설명 문단. 욕구가 충족되지 않으면 어떤 방향으로 무너지는지 3-4문장으로 자연스럽게 작성]\n\n**${birkmanData.stress}의 스트레스 반응:**\n- [반응1]: [1-2줄 설명으로 해당 색상의 스트레스가 마케팅 현장에서 어떤 구체적인 행동으로 나타나는지 기술]\n- [반응2]: [1-2줄 설명]\n- [반응3]: [1-2줄 설명]\n- [반응4]: [1-2줄 설명]\n\n**${mbtiType || '미입력'}의 스트레스 반응:**\n- [반응1]: [1-2줄 설명으로 MBTI의 스트레스가 마케팅 현장에서 어떤 구체적인 행동으로 나타나는지 기술]\n- [반응2]: [1-2줄 설명]\n- [반응3]: [1-2줄 설명]\n- [반응4]: [1-2줄 설명]\n\n**위험한 조합 (${birkmanData.stress} + ${mbtiType || '미입력'} 스트레스):**\n[버크만 스트레스 색상과 MBTI의 스트레스가 동시에 작동할 때 나타나는 구체적 결과를 2-3문장으로 서술]\n\n**현장에서 보이는 신호:**\n- [신호1]: [1-2줄 설명으로 스트레스 상태임을 보여주는 구체적인 행동 변화]\n- [신호2]: [1-2줄 설명]\n- [신호3]: [1-2줄 설명]\n- [신호4]: [1-2줄 설명]\n\n---\n\n## 4. 내가 에너지를 얻는 업무 분야\n흥미(버크만 흥미: ${birkmanData.interest} + MBTI: ${mbtiType || '미입력'})\n\n[당신이 에너지를 얻는 업무 분야에 대한 전체 설명 문단. 3-4문장으로 자연스럽게 작성]\n\n**${birkmanData.interest}의 흥미:**\n- [업무 분야명]: [1-2줄 설명으로 해당 색상이 이 분야에서 에너지를 얻는 이유와 구체적인 활동]\n- [업무 분야명]: [1-2줄 설명]\n- [업무 분야명]: [1-2줄 설명]\n- [업무 분야명]: [1-2줄 설명]\n\n**${mbtiType || '미입력'}의 흥미:**\n- [업무 분야명]: [1-2줄 설명으로 MBTI가 이 분야에서 에너지를 얻는 이유와 구체적인 활동]\n- [업무 분야명]: [1-2줄 설명]\n- [업무 분야명]: [1-2줄 설명]\n- [업무 분야명]: [1-2줄 설명]\n\n**완벽한 조합:**\n[버크만 흥미 색상(${birkmanData.interest}) + 욕구 색상(${birkmanData.needs}) + MBTI(${mbtiType || '미입력'})가 모두 함께 작동할 때 당신의 최고 상태를 2-3문장으로 서술]\n\n**직무 선택 가이드:**\n- ✅ [선택할 조건1]: [1줄 설명으로 이 조건이 당신에게 왜 필요한지]\n- ✅ [선택할 조건2]: [1줄 설명]\n- ✅ [선택할 조건3]: [1줄 설명]\n- ❌ [피할 조건1]: [1줄 설명으로 이 상황이 왜 당신을 답답하게 만드는지]\n\n---\n\n[작성 규칙]\n\n1. **반드시 지켜야 할 글의 길이와 깊이:**\n   - 각 섹션의 전체 설명 문단: 반드시 3-5문장 (100-150자 이상)\n   - 각 항목(특성/욕구/스트레스/흥미): 반드시 1-2줄의 구체적 설명 포함 (단어만 나열 금지)\n   - 하단 통합 설명(마케팅 모습/이 환경이 없으면/위험한 조합/완벽한 조합): 반드시 2-4문장\n   - 전체 결과물: 최소 2000자 이상\n   - 짧은 키워드 나열이 아닌, 분석적이고 상세한 서술형으로 작성\n\n2. **글의 톤과 어조:**\n   - 자신을 깊이 이해하는 전문가가 1:1로 분석해주는 느낌\n   - 따뜻하지만 명확하고 전문적인 어조\n   - "~합니다", "~입니다" 체 사용\n   - 교과서적 설명이 아닌, 실제 경험과 연결되는 생생한 표현\n\n3. **구체성과 현장성:**\n   - 모든 설명에서 추상적 표현 최소화\n   - 마케팅 직무에서 실제로 일어나는 구체적인 상황과 사례 포함\n   - "브랜드 전략", "캠페인 실행", "팀 리드", "고객 공감", "경영진 설득" 등 실제 업무 용어 활용\n   - "개발팀", "영업팀", "고객 성공팀" 등 실제 조직 구조 언급\n   - 팀원들이 직접 경험할 수 있는 모습과 행동으로 표현\n\n4. **변수 처리:**\n   - 버크만 색상(${birkmanData.behavior}/${birkmanData.needs}/${birkmanData.stress}/${birkmanData.interest})에 해당하는 색상의 키워드를 참조하여 작성\n   - MBTI(${mbtiType || '미입력'})에 해당하는 특성을 참조하여 작성\n   - 색상과 MBTI의 조합에 따라 내용이 달라져야 함\n\n5. **색상별 키워드 활용:**\n   - 빨강: 실행력, 결과 중심, 신속함, 경쟁심, 직설함, 가시적 성과, 즉시 행동\n   - 노랑: 체계성, 규정 준수, 세밀함, 신중함, 예측 가능성, 신뢰성, 절차\n   - 초록: 사교성, 설득력, 유연함, 팀워크, 변화 수용, 친화력, 즉흥성, 공감\n   - 파랑: 통찰력, 창의성, 전략적 사고, 비전, 공감, 장기적 안목, 심사숙고, 본질\n\n6. **통합 관점:**\n   - 각 섹션에서 버크만(색상) + MBTI를 명확히 분리 제시\n   - 하단의 통합 설명문에서는 자연스럽게 하나의 특성처럼 표현\n   - 자연스러운 서술로 두 특성이 결합된 모습을 보여줄 것\n\n7. **형식과 구조:**\n   - 모든 섹션 제목: "## 숫자. 한글제목\\n색상/MBTI 명시" 형식\n   - 각 섹션은 전체 설명 문단 → 색상별 항목 나열 → 하단 통합 설명 순서\n   - "---" 구분선으로 섹션 분명히 구분\n   - 각 항목은 bullet point(-)로 통일\n   - [출력 형식]의 구조를 정확히 따를 것`
      },
    ];

    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* 헤더 */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-6 md:p-8 text-white text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">마케팅 직무 적합도 진단 결과</p>
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              <span className="text-3xl">{topTypeInfo.icon}</span>
              <h1 className="text-2xl md:text-4xl font-black break-keep">{topTypeInfo.name}</h1>
            </div>
            <p className="text-slate-300 text-sm break-keep">{topTypeInfo.desc}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[birkmanData.interest, birkmanData.behavior, birkmanData.needs, birkmanData.stress].map((color, i) => {
                const info = BIRKMAN_COLOR_MAP[color];
                const labels = ['흥미', '행동', '욕구', '스트레스'];
                return info ? (
                  <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold ${info.bgClass} ${info.textClass}`}>{labels[i]}: {color}</span>
                ) : null;
              })}
              {mbtiType && <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">MBTI: {mbtiType}</span>}
            </div>
            {hasStrengths && (
              <div className="mt-4 pt-4 border-t border-slate-600 text-left">
                <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">나의 강점</p>
                <div className="flex flex-wrap gap-1.5">
                  {STRENGTH_CATEGORIES.map(cat =>
                    [...selectedStrengths[cat.id], ...customStrengths[cat.id]].map(kw => (
                      <span key={`${cat.id}-${kw}`} className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-700 text-slate-200">{kw}</span>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 1: 추천 직무 — NCS */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2 mb-1 break-keep"><Target className="w-5 h-5 md:w-6 md:h-6 text-blue-600 shrink-0" /> NCS 공공기관 마케팅 직무 Top 3</h2>
            <p className="text-xs text-blue-500 font-bold mb-6">공기업·공공기관 마케팅/홍보 직렬 기준</p>
            <div className="space-y-3">
              {ncsTop3.map((job, idx) => (
                <div key={job.id} className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all ${idx === 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5 ${idx === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{idx + 1}</div>
                  <span className="text-2xl mt-0.5 shrink-0">{job.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 break-keep">{job.name}</p>
                    <p className="text-xs text-gray-500 break-keep mt-0.5">{job.desc}</p>
                    <p className="text-xs text-blue-600 font-bold mt-1 break-keep">🏛 {job.target}</p>
                  </div>
                  <div className="hidden md:flex gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, s) => {
                      const fixed = [5, 4, 3.5][idx] ?? 3;
                      const isFull = s < Math.floor(fixed);
                      const isHalf = !isFull && s === Math.floor(fixed) && fixed % 1 >= 0.5;
                      return (
                        <span key={s} className="relative inline-flex w-4 h-4">
                          <Star className="w-4 h-4 text-gray-200" />
                          {(isFull || isHalf) && (
                            <span className={`absolute inset-0 overflow-hidden ${isHalf ? 'w-1/2' : 'w-full'}`}>
                              <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1-2: 추천 직무 — 민간기업 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2 mb-1 break-keep"><Target className="w-5 h-5 md:w-6 md:h-6 text-red-500 shrink-0" /> 민간기업 실무 채용 직무 Top 3</h2>
            <p className="text-xs text-red-500 font-bold mb-6">스타트업·대기업·플랫폼 마케터 채용 기준</p>
            <div className="space-y-3">
              {privateTop3.map((job, idx) => (
                <div key={job.id} className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all ${idx === 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5 ${idx === 0 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{idx + 1}</div>
                  <span className="text-2xl mt-0.5 shrink-0">{job.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 break-keep">{job.name}</p>
                    <p className="text-xs text-gray-500 break-keep mt-0.5">{job.desc}</p>
                    <p className="text-xs text-amber-600 font-bold mt-1 break-keep">🏢 {job.target}</p>
                  </div>
                  <div className="hidden md:flex gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, s) => {
                      const fixed = [5, 4, 3.5][idx] ?? 3;
                      const isFull = s < Math.floor(fixed);
                      const isHalf = !isFull && s === Math.floor(fixed) && fixed % 1 >= 0.5;
                      return (
                        <span key={s} className="relative inline-flex w-4 h-4">
                          <Star className="w-4 h-4 text-gray-200" />
                          {(isFull || isHalf) && (
                            <span className={`absolute inset-0 overflow-hidden ${isHalf ? 'w-1/2' : 'w-full'}`}>
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {/* Holland chart */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-black text-sm text-gray-600 flex items-center gap-2 mb-4"><BarChart2 className="w-4 h-4" /> 유형별 분포도 (RIASEC)</h3>
              <div className="space-y-2">
                {(() => {
                  const maxScore = Math.max(...hollandFixed.map(([, s]) => s), 1);
                  return hollandFixed.map(([type, score]) => {
                    const desc = RIASEC_DESCRIPTIONS[type];
                    const barW = Math.max((score / maxScore) * 100, score > 0 ? 5 : 0);
                    return (
                      <div key={type} className="flex items-center gap-3 text-xs">
                        <div className="w-24 font-bold text-gray-600 flex items-center gap-1 shrink-0">
                          <span className={`w-2 h-2 rounded-full ${desc.barColor}`} />{desc.shortName} ({type})
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${desc.barColor} ${type === h1 ? 'opacity-100' : 'opacity-50'}`} style={{ width: `${barW}%` }} />
                        </div>
                        <div className="w-6 text-right font-bold text-gray-700 shrink-0">{score}</div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Section 2: 일하는 방식 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2 mb-6"><Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 shrink-0" /> 나의 일하는 방식</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {birkmanBehaviorInfo && (
                <div className={`p-5 rounded-2xl border ${birkmanBehaviorInfo.bgClass} ${birkmanBehaviorInfo.borderClass}`}>
                  <p className={`text-xs font-black uppercase tracking-wider mb-1 ${birkmanBehaviorInfo.textClass}`}>평소 행동 스타일</p>
                  <p className="font-black text-gray-900 text-lg">{birkmanBehaviorInfo.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{birkmanBehaviorInfo.desc}</p>
                </div>
              )}
              {birkmanNeedsInfo && (
                <div className={`p-5 rounded-2xl border ${birkmanNeedsInfo.bgClass} ${birkmanNeedsInfo.borderClass}`}>
                  <p className={`text-xs font-black uppercase tracking-wider mb-1 ${birkmanNeedsInfo.textClass}`}>동기부여 요인 (욕구)</p>
                  <p className="font-black text-gray-900 text-lg">{birkmanNeedsInfo.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{birkmanNeedsInfo.motivation}</p>
                </div>
              )}
              {workStyle && (
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 md:col-span-2">
                  <p className="text-xs font-black uppercase tracking-wider mb-1 text-slate-500">업무 스타일 조합 ({workStyleKey})</p>
                  <p className="font-black text-slate-900 text-lg">{workStyle.style}</p>
                  <p className="text-sm text-gray-600 mt-1">{workStyle.desc}</p>
                </div>
              )}
              {hasMbti && mbtiDesc && (
                <>
                  <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50">
                    <p className="text-xs font-black uppercase tracking-wider mb-1 text-indigo-600">에너지 패턴</p>
                    <p className="text-sm text-indigo-900 font-bold">{mbtiDesc.energy}</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50">
                    <p className="text-xs font-black uppercase tracking-wider mb-1 text-indigo-600">의사결정 스타일</p>
                    <p className="text-sm text-indigo-900 font-bold">{mbtiDesc.decision}</p>
                  </div>
                </>
              )}
              {!hasMbti && (
                <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50 md:col-span-2 text-center">
                  <p className="text-sm text-gray-400">MBTI를 입력하면 에너지·의사결정 스타일 분석이 추가됩니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: 주의할 점 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2 mb-6"><AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-orange-500 shrink-0" /> 주의할 점</h2>
            {birkmanStressInfo && (
              <div className="space-y-4">
                <div className={`p-5 rounded-2xl border ${birkmanStressInfo.bgClass} ${birkmanStressInfo.borderClass}`}>
                  <p className={`text-xs font-black uppercase tracking-wider mb-2 ${birkmanStressInfo.textClass}`}>스트레스 트리거 (욕구 불충족 시)</p>
                  <p className="font-black text-gray-900 mb-2">{birkmanStressInfo.label} 스트레스 반응</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>트리거:</strong> {birkmanStressInfo.stressTrigger}</p>
                  <p className="text-sm text-gray-600"><strong>나타나는 행동:</strong> {birkmanStressInfo.stressBehavior}</p>
                </div>
                <div className="p-5 rounded-2xl border border-red-100 bg-red-50">
                  <p className="text-xs font-black uppercase tracking-wider mb-2 text-red-600">피해야 할 환경</p>
                  <p className="text-sm text-gray-700">{birkmanStressInfo.avoidEnv}</p>
                </div>
                {conflictStyle && (
                  <div className="p-5 rounded-2xl border border-orange-100 bg-orange-50">
                    <p className="text-xs font-black uppercase tracking-wider mb-2 text-orange-600">갈등 해결 패턴 ({conflictKey})</p>
                    <p className="font-bold text-gray-900 mb-2">{conflictStyle.style}</p>
                    <p className="text-sm text-gray-600 mb-2"><strong>피해야 할 조직:</strong> {conflictStyle.avoid}</p>
                    <div className="mt-2 space-y-1">
                      {conflictStyle.checklist.map((item, i) => (
                        <p key={i} className="text-sm text-gray-600 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />{item}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 4: AI 프롬프트 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-400 p-2.5 md:p-3 rounded-2xl shadow-sm shrink-0"><TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-yellow-900" /></div>
              <div className="min-w-0">
                <h2 className="font-black text-lg md:text-xl text-yellow-950 break-keep">AI 컨설팅 100% 활용하기</h2>
                <p className="text-xs md:text-sm text-gray-500 break-keep">프롬프트를 복사해 ChatGPT나 Claude에게 더 자세히 물어보세요!</p>
              </div>
            </div>
            <div className="space-y-4">
              {prompts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl shadow-sm border-2 border-yellow-100 overflow-hidden">
                  <div className="flex flex-col items-stretch">
                    <div className="flex-1 p-4 md:p-6 bg-yellow-50/30 flex flex-col gap-2">
                      <h4 className="font-black text-yellow-900 text-sm md:text-base break-keep">{p.title}</h4>
                      <div className="relative">
                        <textarea readOnly value={p.text} className="w-full text-xs text-gray-600 bg-white p-3 rounded-xl border border-yellow-100 resize-none focus:outline-none h-20 font-mono leading-tight" />
                        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard(p.text, p.id)}
                      className={`flex items-center justify-center gap-2 py-3 px-6 w-full transition-all font-black ${isCopied === p.id ? 'bg-green-500 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950'}`}>
                      {isCopied === p.id ? <><Check className="w-5 h-5" /><span className="text-sm">복사됨</span></> : <><Copy className="w-5 h-5" /><span className="text-sm">복사하기</span></>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 다시하기 */}
          <div className="flex justify-center pb-8">
            <button onClick={restart} className="flex items-center gap-2 bg-slate-900 text-white font-black py-4 px-10 rounded-2xl shadow-lg hover:bg-black hover:-translate-y-1 transition-all">
              <RefreshCw className="w-5 h-5" /> 다시 진단하기
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
}
