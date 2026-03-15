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
// MARKETING JOBS
// ─────────────────────────────────────────────
const MARKETING_JOBS = [
  { id: 'campaign', name: '캠페인 마케터', emoji: '🎯', desc: '캠페인 기획·실행, 크리에이티브 방향 주도', environment: '빠른 실행 가능한 조직, 주단위 스프린트, 명확한 KPI', holland: ['E'], hollandSecondary: ['A', 'S', 'C'], needsColors: ['빨강', '초록'], stressWarn: ['노랑'], mbtiTF: ['T', 'F'], mbtiJP: ['J'], mbtiE: true },
  { id: 'growth', name: '그로스 마케터', emoji: '📈', desc: '데이터 기반 성장 실험 및 최적화', environment: 'A/B 테스트 문화, 빠른 실행, 실험 허용', holland: ['E', 'I'], hollandSecondary: ['C'], needsColors: ['빨강'], stressWarn: ['초록'], mbtiTF: ['T'], mbtiJP: ['J', 'P'], mbtiE: null },
  { id: 'performance', name: '퍼포먼스 마케터', emoji: '⚡', desc: '광고 운영·최적화, 데이터 분석 기반 성과 극대화', environment: '성과 중심, 자율성 높은 조직, 명확한 목표', holland: ['E', 'C'], hollandSecondary: ['I'], needsColors: ['빨강'], stressWarn: ['초록', '노랑'], mbtiTF: ['T'], mbtiJP: ['J', 'P'], mbtiE: false },
  { id: 'content', name: '콘텐츠 마케터', emoji: '✍️', desc: '콘텐츠 기획·제작, 브랜드 스토리텔링', environment: '자유로운 분위기, 창의성 인정, 유연한 일정', holland: ['A'], hollandSecondary: ['E', 'S'], needsColors: ['파랑', '초록'], stressWarn: ['빨강'], mbtiTF: ['F', 'T'], mbtiJP: ['P'], mbtiE: false },
  { id: 'sns', name: 'SNS 마케터', emoji: '📱', desc: 'SNS 채널 운영·기획, 트렌드 반응형 콘텐츠', environment: '자율성, 빠른 실행, 트렌드 실험 허용', holland: ['A', 'S'], hollandSecondary: ['E'], needsColors: ['파랑'], stressWarn: ['빨강', '노랑'], mbtiTF: ['F', 'T'], mbtiJP: ['P'], mbtiE: true },
  { id: 'brand', name: '브랜드 마케터', emoji: '💎', desc: '브랜드 아이덴티티 구축, 장기 전략 수립', environment: '일관성 중시, 장기 프로젝트, 창의성+체계 공존', holland: ['A', 'E'], hollandSecondary: ['S', 'I'], needsColors: ['파랑', '초록'], stressWarn: ['빨강'], mbtiTF: ['F', 'T'], mbtiJP: ['J'], mbtiE: true },
  { id: 'data', name: '데이터 마케터', emoji: '📊', desc: '마케팅 데이터 분석, 인사이트 도출, 리포팅', environment: '데이터 중심 의사결정, 논리적 문화, 전문성 인정', holland: ['I', 'C'], hollandSecondary: ['E'], needsColors: ['노랑', '빨강'], stressWarn: ['파랑', '초록'], mbtiTF: ['T'], mbtiJP: ['J', 'P'], mbtiE: false },
  { id: 'community', name: '커뮤니티 매니저', emoji: '🤝', desc: '유저 커뮤니티 운영, 관계 구축, 이슈 대응', environment: '협력적 문화, 수평적 조직, 팀 분위기 중시', holland: ['S', 'E'], hollandSecondary: ['A'], needsColors: ['초록', '파랑'], stressWarn: ['노랑'], mbtiTF: ['F'], mbtiJP: ['J', 'P'], mbtiE: true },
  { id: 'pmm', name: '제품 마케터 (PMM)', emoji: '🚀', desc: 'GTM 전략 수립, 제품-마케팅 연결, 포지셔닝', environment: '제품 중심 조직, 전략적 사고 가능, 빠른 실행', holland: ['E', 'I'], hollandSecondary: ['C'], needsColors: ['빨강', '파랑'], stressWarn: ['초록'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: null },
  { id: 'crm', name: 'CRM 마케터', emoji: '💌', desc: '고객 생애가치 관리, 이메일·자동화 마케팅', environment: '체계적 프로세스, 공정한 평가, 전문성 인정', holland: ['C', 'I'], hollandSecondary: ['E'], needsColors: ['노랑', '빨강'], stressWarn: ['파랑'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: false },
  { id: 'partnership', name: '파트너십 매니저', emoji: '🌐', desc: '제휴·협력 관계 구축, B2B 파트너 관리', environment: '관계 중시, 협력적 문화, 소통 활발한 조직', holland: ['S', 'E'], hollandSecondary: ['C'], needsColors: ['초록', '빨강'], stressWarn: ['노랑'], mbtiTF: ['F', 'T'], mbtiJP: ['J'], mbtiE: true },
  { id: 'influencer', name: '인플루언서 마케터', emoji: '⭐', desc: '인플루언서 섭외·관리, 바이럴 캠페인 기획', environment: '유연한 문화, 트렌드 민감, 관계 중심', holland: ['S', 'A'], hollandSecondary: ['E'], needsColors: ['초록', '파랑'], stressWarn: ['노랑', '빨강'], mbtiTF: ['F'], mbtiJP: ['P', 'J'], mbtiE: true },
  { id: 'creative', name: '크리에이티브 디렉터', emoji: '🎨', desc: '크리에이티브 방향 리딩, 비주얼 아이덴티티 총괄', environment: '창의성 인정, 자유로운 환경, 실험 허용', holland: ['A'], hollandSecondary: ['E', 'S'], needsColors: ['파랑', '초록'], stressWarn: ['노랑', '빨강'], mbtiTF: ['F', 'T'], mbtiJP: ['P'], mbtiE: true },
  { id: 'ecommerce', name: '이커머스 MD', emoji: '🛍️', desc: '온라인 상품 기획·운영, 판매 전략 수립', environment: '빠른 실행, 성과 중심, 명확한 책임 구조', holland: ['E', 'C'], hollandSecondary: ['R'], needsColors: ['빨강'], stressWarn: ['초록', '파랑'], mbtiTF: ['T'], mbtiJP: ['J'], mbtiE: null },
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

function calculateJobScores(hollandSorted, needsColor, stressColor, mbtiType) {
  const { EI, TF, JP } = getMbtiAxes(mbtiType);
  return MARKETING_JOBS.map(job => {
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
              onClick={() => setStep('keywordTest')}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg hover:-translate-y-1"
            >
              진단 시작하기 <ChevronRight className="w-6 h-6" />
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

    const rankedJobs = calculateJobScores(hollandSorted, birkmanData.needs, birkmanData.stress, mbtiType);
    const topJobs = rankedJobs.slice(0, 5);

    const topKeywordLabels = topKeywords.map(k => k.split('-')[1]).join(', ');
    const valLabels = selectedValues.join(', ');

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
    const aiBase = `당신은 최고의 마케팅 커리어 전문가입니다.\n\n[나의 진단 데이터]\n- 홀랜드 유형: 1순위 ${topTypeInfo.name}, 2순위 ${RIASEC_DESCRIPTIONS[h2].name}\n- 핵심 키워드: ${topKeywordLabels}\n- 직업 가치관: ${valLabels}\n- 버크만: 흥미 ${birkmanData.interest}, 평소 행동 ${birkmanData.behavior}, 욕구 ${birkmanData.needs}, 스트레스 반응 ${birkmanData.stress}\n- MBTI: ${mbtiType || '미입력'}\n- 추천 직무 Top3: ${topJobs.slice(0, 3).map(j => j.name).join(', ')}\n\n`;

    const prompts = [
      {
        id: 'job', title: '🎯 나에게 맞는 직무 심층 분석',
        text: aiBase + `[요청]\n추천된 마케팅 직무 Top3 각각에 대해 다음을 분석해주세요:\n1. 이 직무가 나에게 적합한 핵심 이유 (홀랜드+버크만 근거)\n2. 이 직무에서 내가 발휘할 수 있는 강점\n3. 주의해야 할 점\n\n[출력 규칙]\n직무별로 구조화하여 간결하게 출력하세요.`
      },
      {
        id: 'style', title: '💪 나의 마케팅 업무 스타일 분석',
        text: aiBase + `[요청]\n버크만 평소 행동(${birkmanData.behavior}) + 욕구(${birkmanData.needs}) 조합과 MBTI(${mbtiType || '미입력'})를 바탕으로:\n1. 내가 가장 성과를 내는 업무 방식과 환경\n2. 마케팅 현장에서 나의 강점이 빛나는 구체적인 상황\n3. 팀에서 나는 어떤 역할로 가장 빛나는가\n\n실제 마케팅 사례와 함께 설명해주세요.`
      },
      {
        id: 'stress', title: '⚠️ 주의할 점 & 면접 체크리스트',
        text: aiBase + `[요청]\n버크만 스트레스 반응(${birkmanData.stress})과 갈등 패턴(${birkmanData.behavior}→${birkmanData.stress})을 바탕으로:\n1. 절대 피해야 할 회사 문화 & 조직 유형\n2. 면접 시 반드시 확인해야 할 질문 5가지\n3. 입사 후 3개월 내 주의해야 할 상황\n\n체크리스트 형태로 출력해주세요.`
      },
      {
        id: 'strategy', title: '🎁 마케팅 취업 종합 전략',
        text: aiBase + `[요청]\n전체 데이터를 통합하여:\n1. 나만의 차별화 포인트 (태도 강점 + 기술 강점)\n2. 보완해야 할 역량 우선순위 3가지\n3. 6개월 취업 준비 로드맵 (월별)\n4. 추천 회사 유형 ✅ vs 피해야 할 회사 유형 ❌\n\n실행 가능한 형태로 구체적으로 제시해주세요.`
      },
    ];

    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* 헤더 */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-8 text-white text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">마케팅 직무 적합도 진단 결과</p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">{topTypeInfo.icon}</span>
              <h1 className="text-3xl md:text-4xl font-black">{topTypeInfo.name}</h1>
            </div>
            <p className="text-slate-300 text-sm">{topTypeInfo.desc}</p>
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
          </div>

          {/* Section 1: 추천 직무 */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-6"><Target className="w-6 h-6 text-red-500" /> 추천 마케팅 직무 Top 5</h2>
            <div className="space-y-3">
              {topJobs.map((job, idx) => (
                <div key={job.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${idx === 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${idx === 0 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{idx + 1}</div>
                  <span className="text-2xl">{job.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900">{job.name}</p>
                    <p className="text-xs text-gray-500 break-keep">{job.desc}</p>
                    <p className="text-xs text-gray-400 mt-0.5 break-keep">✅ {job.environment}</p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`w-4 h-4 ${s < job.stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                    ))}
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
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-6"><Zap className="w-6 h-6 text-yellow-500" /> 나의 일하는 방식</h2>
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
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-6"><AlertTriangle className="w-6 h-6 text-orange-500" /> 주의할 점</h2>
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
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-400 p-3 rounded-2xl shadow-sm"><TrendingUp className="w-6 h-6 text-yellow-900" /></div>
              <div>
                <h2 className="font-black text-xl text-yellow-950">AI 컨설팅 100% 활용하기</h2>
                <p className="text-sm text-gray-500">프롬프트를 복사해 ChatGPT나 Claude에게 더 자세히 물어보세요!</p>
              </div>
            </div>
            <div className="space-y-4">
              {prompts.map(p => (
                <div key={p.id} className="bg-white rounded-2xl shadow-sm border-2 border-yellow-100 overflow-hidden">
                  <div className="flex flex-col md:flex-row items-stretch">
                    <div className="flex-1 p-6 bg-yellow-50/30 flex flex-col gap-2">
                      <h4 className="font-black text-yellow-900">{p.title}</h4>
                      <div className="relative">
                        <textarea readOnly value={p.text} className="w-full text-xs text-gray-600 bg-white p-3 rounded-xl border border-yellow-100 resize-none focus:outline-none h-20 font-mono leading-tight" />
                        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard(p.text, p.id)}
                      className={`flex md:flex-col items-center justify-center gap-2 py-4 px-6 md:w-28 transition-all font-black ${isCopied === p.id ? 'bg-green-500 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950'}`}>
                      {isCopied === p.id ? <><Check className="w-5 h-5" /><span className="text-xs">복사됨</span></> : <><Copy className="w-5 h-5" /><span className="text-xs">복사하기</span></>}
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
