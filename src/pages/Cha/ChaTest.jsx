import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Coffee, 
  Leaf, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Check, 
  RefreshCw, 
  Briefcase, 
  Sparkles,
  ClipboardCheck,
  Zap,
  TrendingUp,
  Trophy,
  Heart,
  BarChart2
} from 'lucide-react';

// --- Holland Original Data (Ported from HollandTest.jsx) ---
const KEYWORD_DATA = {
  R: [ '솔직', '검소', '지구력 강함', '신체적 건강', '소박', '말수 적음', '고집', '단순함', '활동적', '실용적', '현재 중심적', '사물 지향적', '직선적', '구체적', '기계적 적성', '운동 능력', '손재주', '도구 조작', '기술적', '조립', '수리', '생산적', '견고함', '강인함', '야외 활동', '기계 다루기', '몸으로 하는 일' ],
  I: [ '호기심 많음', '지식 체계화', '비판적 사고', '지적 추구', '합리적', '학업 열망', '내성적', '가설 검증', '논리적', '관찰적', '상징적', '체계적 사고', '지적 창의성', '자기 주도 학습', '과학적', '추상적 사고', '탐구 정신', '이론적', '연구 지향적', '객관적', '수학적', '실험적', '복잡한 사고', '지적 호기심', '연구 열정', '정보 수집', '탐구심', '심층 분석', '문제 해결' ],
  A: [ '표현력 풍부', '독창적', '비순응적', '감성적', '직관적', '미적 감각', '상상력', '창작 욕구', '심미안', '예술적', '감정적', '개성적', '자유로움', '혁신적', '표현 욕구', '영감적', '심미적', '감수성', '몽상적', '표현적', '즉흥적', '자발적', '비전통적', '변화 추구', '개방적', '색채 감각', '감성적 표현', '미적 완성도' ],
  S: [ '협력적', '헌신적', '친근함', '이타적', '공감 능력', '관계 지향적', '타인 중심적', '이상주의적', '도움 지향적', '친절함', '이해심', '배려심', '봉사 정신', '인간관계 중시', '교육적', '상담적', '치료적', '돌봄', '화합 추구', '봉사적', '동정심', '양육적', '격려적', '지지적', '공동체 의식', '인도적', '관용적', '수용적', '공감적' ],
  E: [ '추진력', '경영 감각', '야심적', '설득력', '지배적', '경쟁 지향적', '위험 감수', '에너지 넘침', '자신감', '네트워킹', '낙관주의', '인기', '리더십', '영향력', '목표 지향적', '성취 욕구', '권력 추구', '외향적', '적극적', '결단력', '통제력', '야망적', '협상력', '열망', '성과 지향', '성공 지향', '목표 달성', '경영적', '기업가적' ],
  C: [ '꼼꼼함', '문서화', '질서 선호', '보수적', '규칙 준수', '순응적', '양심적', '절제력', '효율성', '신뢰성', '절차 중심', '차분함', '사무 처리', '계획적', '체계적 실행', '정확성', '세심함', '오류 최소화', '전통적', '안정성', '일관성', '성실함', '인내심', '데이터 정리', '절차 지향적', '규범적', '규칙 기반', '반복 작업', '기록 정리' ]
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

// --- 신규 /cha 키워드 데이터 ---
const INITIAL_KEYWORDS = [
  { id: 1, label: '안정감', desc: '흔들리지 않는 단단한 마음' },
  { id: 2, label: '꾸준함', desc: '매일 한 걸음씩 나아가는 힘' },
  { id: 3, label: '효율성', desc: '효율적으로 시간과 에너지 쓰기' },
  { id: 4, label: '균형감', desc: '일과 쉼, 긴장과 이완의 밸런스' },
  { id: 5, label: '집중력', desc: '딱 하나에 몰입하는 순간' },
  { id: 6, label: '밸런스', desc: '모든 면에서 고른 나를 보여주기' },
  { id: 7, label: '창의력', desc: '남들과 다른 나만의 답' },
  { id: 8, label: '영감', desc: '번뜩이는 아이디어가 필요한 순간' },
  { id: 9, label: '리프레시', desc: '지친 나를 다시 깨우기' },
  { id: 10, label: '수면관리', desc: '잠은 제대로 자야 싸울 수 있다' },
  { id: 11, label: '건강', desc: '몸이 자본, 컨디션 관리' },
  { id: 12, label: '긴장 완화', desc: '떨리는 마음을 내려놓기' },
  { id: 13, label: '불안 해소', desc: '걱정과 불안에서 벗어나기' },
  { id: 14, label: '멘탈 케어', desc: '무너진 마음을 다시 세우기' },
  { id: 15, label: '위로', desc: '지친 나에게 주는 작은 선물' },
  { id: 16, label: '자기 보상', desc: '오늘 하루도 수고한 나에게' }
];

// --- 초기 키워드 → 음료 매핑 ---
const KEYWORD_DRINK_MAP = {
  '집중력': 'focus', '효율성': 'focus', '창의력': 'focus', '영감': 'focus',
  '안정감': 'balance', '꾸준함': 'balance', '균형감': 'balance', '밸런스': 'balance',
  '리프레시': 'refresh', '수면관리': 'refresh', '건강': 'refresh',
  '긴장 완화': 'care', '불안 해소': 'care', '멘탈 케어': 'care', '위로': 'care', '자기 보상': 'care',
};

const KEYWORD_DRINK_RESULT = {
  focus:   { label: '집중·에너지', bean: '에티오피아', beanDesc: '선명한 과일향과 밝은 산미가 잠든 뇌를 깨워주는 집중력의 한 잔', tea: '홍차', teaDesc: '카페인이 집중력을 높여주고 풍부한 향이 사고를 선명하게 만들어줍니다' },
  balance: { label: '안정·균형', bean: '콜롬비아', beanDesc: '균형 잡힌 산미와 부드러운 바디감이 흔들리지 않는 안정감을 줍니다', tea: '루이보스', teaDesc: '카페인 없이 하루를 차분하게 채워주는 균형의 한 잔' },
  refresh: { label: '회복·활력', bean: '탄자니아', beanDesc: '강렬하고 활기찬 풍미가 지친 몸과 마음에 새로운 에너지를 불어넣습니다', tea: '오렌지필', teaDesc: '상큼한 감귤향이 머리를 맑게 리셋하고 기분을 상쾌하게 해줍니다' },
  care:    { label: '정서·케어', bean: '브라질', beanDesc: '묵직하고 달콤한 바디감이 지친 마음을 따뜻하게 감싸줍니다', tea: '허니부쉬', teaDesc: '꿀처럼 달콤한 향이 긴장된 마음을 부드럽게 녹여주는 편안한 한 잔' },
};

// --- 가치관 데이터 (Ported from HollandTest.jsx) ---
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

// --- 매칭 데이터 ---
const RESULT_DATA = {
  R: { name: '현실형 (Realistic)', shortName: '현실형', job: '엔지니어 / 운동선수 / 기술자', bean: '브라질', beanDesc: '안정적이고 꾸준한 당신에게, 묵직하고 고소한 한 잔', tea: '허니부쉬 + 파인애플', teaDesc: '몸과 마음의 회복이 필요한 당신에게 주는 달콤한 선물', color: 'from-blue-500 to-blue-700', icon: '🔧' },
  I: { name: '탐구형 (Investigative)', shortName: '탐구형', job: '데이터 분석가 / 연구원 / 프로그래머', bean: '콜롬비아', beanDesc: '집중이 필요한 당신에게, 균형 잡힌 한 잔', tea: '레몬밤', teaDesc: '분석하느라 지친 머리를 맑게 리셋하는 한 잔', color: 'from-sky-500 to-sky-700', icon: '🔬' },
  A: { name: '예술형 (Artistic)', shortName: '예술형', job: '디자이너 / 작가 / 예술가', bean: '에티오피아', beanDesc: '새로운 영감이 필요한 당신에게, 화려한 산미의 한 잔', tea: '로즈플라워', teaDesc: '창의적인 감성을 깨워줄 향긋한 한 잔', color: 'from-orange-400 to-orange-600', icon: '🎨' },
  S: { name: '사회형 (Social)', shortName: '사회형', job: '상담사 / 교사 / 사회복지사', bean: '콜롬비아', beanDesc: '함께하는 즐거움을 아는 당신에게, 부드러운 조화의 한 잔', tea: '살구', teaDesc: '타인을 돌보는 당신의 마음을 따뜻하게 감싸줄 한 잔', color: 'from-green-500 to-green-700', icon: '🤝' },
  E: { name: '진취형 (Enterprising)', shortName: '진취형', job: '경영인 / 관리자 / 영업직', bean: '탄자니아', beanDesc: '목표를 향해 달리는 당신에게, 강렬하고 활기찬 한 잔', tea: '패션프루트', teaDesc: '지칠 줄 모르는 당신의 열정에 에너지를 더할 한 잔', color: 'from-red-500 to-red-700', icon: '🏢' },
  C: { name: '관습형 (Conventional)', shortName: '관습형', job: '회계사 / 행정원 / 관리자', bean: '온두라스', beanDesc: '꼼꼼하고 체계적인 당신에게, 깔끔하고 정돈된 한 잔', tea: '루이보스', teaDesc: '안정과 평온이 중요한 당신을 위한 편안한 한 잔', color: 'from-purple-500 to-purple-700', icon: '📋' }
};

export default function ChaTest() {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro'); // intro, keywords, hollandTest, topKeywordSelect, valueTest, result
  const [initialSelected, setInitialSelected] = useState([]); // 1.5단계 키워드
  const [hollandSelected, setHollandSelected] = useState(new Set()); // 홀랜드 테스트용 선택 키워드
  const [topKeywords, setTopKeywords] = useState([]); // 홀랜드 TOP 3 키워드
  const [selectedValues, setSelectedValues] = useState([]); // 직업 가치관 TOP 3
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0~5
  const [isCopied, setIsCopied] = useState(null);
  const [userMajor, setUserMajor] = useState('');
  const [userPastJob, setUserPastJob] = useState('');

  // --- Handlers ---
  const handleInitialToggle = (keyword) => {
    if (initialSelected.includes(keyword)) {
      setInitialSelected(initialSelected.filter(k => k !== keyword));
    } else {
      if (initialSelected.length < 3) {
        setInitialSelected([...initialSelected, keyword]);
      }
    }
  };

  const toggleHollandKeyword = (type, word) => {
    const key = `${type}-${word}`;
    const newSet = new Set(hollandSelected);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setHollandSelected(newSet);
  };

  const toggleTopKeyword = (key) => {
    if (topKeywords.includes(key)) {
      setTopKeywords(topKeywords.filter(k => k !== key));
    } else {
      if (topKeywords.length < 3) {
        setTopKeywords([...topKeywords, key]);
      }
    }
  };

  const toggleValue = (valueId) => {
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter(id => id !== valueId));
    } else {
      if (selectedValues.length < 3) {
        setSelectedValues([...selectedValues, valueId]);
      }
    }
  };

  const calculateResult = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    hollandSelected.forEach(key => {
      const type = key.split('-')[0];
      if (scores[type] !== undefined) scores[type]++;
    });

    // 1. 점수 내림차순 (최고 유형 찾기용)
    const sortedTypes = Object.entries(scores).sort(([, a], [, b]) => b - a);

    // 2. R-I-A-S-E-C 고정 순서 (그래프용)
    const fixedOrderTypes = PAGINATION_ORDER.map(type => [type, scores[type]]);

    return { scores, sortedTypes, fixedOrderTypes };
  };

  const restart = () => {
    setStep('intro');
    setInitialSelected([]);
    setHollandSelected(new Set());
    setTopKeywords([]);
    setSelectedValues([]);
    setCurrentPageIndex(0);
    setUserMajor('');
    setUserPastJob('');
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  // --- UI Components ---

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 text-center text-white relative">
            <div className="absolute top-6 left-6">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>메인으로</span>
              </button>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm"><Coffee className="w-8 h-8 md:w-10 md:h-10 text-orange-200" /></div>
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm"><Leaf className="w-8 h-8 md:w-10 md:h-10 text-green-200" /></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tight uppercase">오늘의 한 잔 추천</h1>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl font-medium break-keep">
              지금 나에게 필요한 키워드와 성향을 진단하고,<br />
              나에게 딱 맞는 직업과 음료를 추천받으세요.
            </p>
          </div>
          <div className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: <Sparkles className="w-6 h-6 text-amber-500" />, title: "키워드 선택", sub: "내게 필요한 에너지" },
                { icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />, title: "홀랜드 검사", sub: "오리지널 로직 진단" },
                { icon: <Zap className="w-6 h-6 text-purple-500" />, title: "맞춤형 추천", sub: "음료 & 직업 제안" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep('backgroundInfo')}
              className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 text-lg md:text-xl shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-[0.98]"
            >
              시작하기 <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'backgroundInfo') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center text-white">
            <h1 className="text-xl md:text-2xl font-black mb-2">배경 정보 입력</h1>
            <p className="text-gray-300 text-sm md:text-base">입력하면 AI 직업 추천 정확도가 높아져요.<br />없으면 건너뛰어도 됩니다.</p>
          </div>
          <div className="p-8 space-y-5">
            <div>
              <label className="font-black text-sm text-gray-700 mb-1 block">전공 <span className="text-gray-400 font-normal text-xs">(선택 사항)</span></label>
              <p className="text-xs text-gray-400 mb-2">대학교 전공 계열 또는 학과</p>
              <input
                type="text"
                value={userMajor}
                onChange={(e) => setUserMajor(e.target.value)}
                placeholder="예) 경영학, 컴퓨터공학, 심리학"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-100"
              />
            </div>
            <div>
              <label className="font-black text-sm text-gray-700 mb-1 block">이전 직장 직무 <span className="text-gray-400 font-normal text-xs">(선택 사항)</span></label>
              <p className="text-xs text-gray-400 mb-2">현재 또는 이전 직장에서 맡았던 직무</p>
              <input
                type="text"
                value={userPastJob}
                onChange={(e) => setUserPastJob(e.target.value)}
                placeholder="예) 마케팅, 영업, 개발, 디자인"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-100"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep('intro')}
                className="flex-1 border-2 border-gray-200 text-gray-600 font-black py-3 rounded-2xl hover:bg-gray-50 transition-all text-sm"
              >
                이전으로
              </button>
              <button
                onClick={() => setStep('keywords')}
                className="flex-[2] bg-gray-900 hover:bg-black text-white font-black py-3 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                다음 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'keywords') {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">지금 나에게 필요한 키워드는?</h2>
            <p className="text-gray-500 font-medium">취준하면서 느끼는 가장 필요한 에너지 3개를 골라주세요.</p>
            <div className="mt-4 flex justify-center items-center gap-2">
              <span className="text-sm font-bold text-blue-600">{initialSelected.length} / 3 선택됨</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {INITIAL_KEYWORDS.map(item => (
              <button
                key={item.id}
                onClick={() => handleInitialToggle(item.label)}
                className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 ${
                  initialSelected.includes(item.label)
                    ? 'bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]'
                    : 'bg-white border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="font-bold text-gray-800 mb-1">{item.label}</div>
                <div className="text-xs text-gray-500 break-keep">{item.desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => setStep('hollandTest')}
              disabled={initialSelected.length === 0}
              className={`py-4 px-12 rounded-2xl font-black text-lg transition-all shadow-lg flex items-center gap-2 mx-auto ${
                initialSelected.length > 0 ? 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              다음 단계로 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'hollandTest') {
    const currentType = PAGINATION_ORDER[currentPageIndex];
    const typeInfo = RIASEC_DESCRIPTIONS[currentType];
    const currentKeywords = KEYWORD_DATA[currentType];
    const progress = ((currentPageIndex + 1) / PAGINATION_ORDER.length) * 100;

    return (
      <div className={`min-h-screen py-10 px-4 font-sans transition-colors duration-500 ${typeInfo.color}`}>
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{typeInfo.icon}</span>
              <div className="flex-1">
                <h2 className="text-xl font-black text-gray-800">{currentPageIndex + 1}. {typeInfo.shortName} 키워드</h2>
                <p className="text-gray-500 text-sm font-medium">{typeInfo.desc}</p>
              </div>
              <span className="text-sm font-black text-gray-400">{currentPageIndex + 1} / 6</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${typeInfo.barColor} transition-all duration-500`} style={{ width: `${progress}%` }}></div>
            </div>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12">
            <p className="text-center text-gray-400 font-bold mb-8 uppercase tracking-widest">나에게 해당되는 단어를 모두 골라주세요</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
              {currentKeywords.map((word, idx) => {
                const isSelected = hollandSelected.has(`${currentType}-${word}`);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleHollandKeyword(currentType, word)}
                    className={`py-3 px-2 rounded-xl text-sm md:text-base font-bold transition-all border-2 ${
                      isSelected ? `${typeInfo.barColor} text-white border-transparent shadow-lg scale-105` : `bg-white border-gray-100 text-gray-500 hover:border-${typeInfo.themeColor}-200`
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (currentPageIndex > 0) setCurrentPageIndex(prev => prev - 1);
                  else setStep('keywords');
                  window.scrollTo(0, 0);
                }}
                className="py-4 px-8 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 shadow-sm"
              >
                이전으로
              </button>
              <button
                onClick={() => {
                  if (currentPageIndex < 5) setCurrentPageIndex(prev => prev + 1);
                  else {
                    if (hollandSelected.size <= 3) {
                      setTopKeywords(Array.from(hollandSelected));
                      setStep('valueTest');
                    } else {
                      setStep('topKeywordSelect');
                    }
                  }
                  window.scrollTo(0, 0);
                }}
                className="py-4 px-12 rounded-full bg-gray-900 text-white font-black hover:bg-black shadow-lg flex items-center gap-2"
              >
                {currentPageIndex < 5 ? '다음 유형으로' : '키워드 선택 완료'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'topKeywordSelect') {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="mb-6">
              <button
                onClick={() => setStep('hollandTest')}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 목록으로</span>
              </button>
            </div>

            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-amber-100 rounded-3xl mb-4">
                <Trophy className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">최종 선택: 나의 핵심 키워드</h2>
              <p className="text-gray-500 font-medium">
                총 <strong>{hollandSelected.size}개의 단어</strong>를 선택하셨습니다.<br />
                이 중에서 진짜 나를 가장 잘 나타내는 <strong>3개</strong>만 골라주세요.
              </p>
              <p className="text-amber-600 font-black mt-4 text-xl">({topKeywords.length} / 3 선택됨)</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-12 max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              {Array.from(hollandSelected).map((key) => {
                const [type, word] = key.split('-');
                const isSelected = topKeywords.includes(key);
                const isDisabled = !isSelected && topKeywords.length >= 3;
                const barColor = RIASEC_DESCRIPTIONS[type].barColor;

                return (
                  <button
                    key={key}
                    onClick={() => toggleTopKeyword(key)}
                    disabled={isDisabled}
                    className={`
                      px-5 py-3 rounded-full text-base font-bold transition-all border-2 flex items-center gap-2
                      ${isSelected
                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg scale-105 z-10'
                        : isDisabled
                          ? 'opacity-40 bg-gray-50 border-gray-100 cursor-not-allowed'
                          : `bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50`}
                    `}
                  >
                    <span className={`w-2 h-2 rounded-full ${barColor} shrink-0`}></span>
                    <span className="break-keep">{word}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep('valueTest')}
                disabled={topKeywords.length !== 3}
                className={`
                  font-black py-5 px-12 rounded-2xl shadow-lg transition-all text-lg
                  ${topKeywords.length === 3
                    ? 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                가치관 선택으로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'valueTest') {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100 text-center">
            <div className="mb-6 text-left">
              <button
                onClick={() => setStep(hollandSelected.size <= 3 ? 'hollandTest' : 'topKeywordSelect')}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 단계로</span>
              </button>
            </div>

            <div className="mb-10">
              <div className="inline-block p-4 bg-pink-100 rounded-3xl mb-4">
                <Heart className="w-10 h-10 text-pink-600 font-bold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">직업 가치관 선택</h2>
              <p className="text-gray-500 font-medium px-4">직업을 가질 때 가장 중요하게 생각하는 가치 <strong>3가지</strong>를 선택해주세요.</p>
              <p className="text-pink-600 font-black mt-4 text-xl">({selectedValues.length} / 3 선택됨)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {VALUES.map((val) => {
                const isSelected = selectedValues.includes(val.id);
                const isDisabled = !isSelected && selectedValues.length >= 3;
                return (
                  <button
                    key={val.id}
                    onClick={() => toggleValue(val.id)}
                    disabled={isDisabled}
                    className={`
                      p-6 rounded-3xl text-left border-2 transition-all flex flex-col gap-2
                      ${isSelected
                        ? 'bg-pink-50 border-pink-500 shadow-md scale-[1.02]'
                        : isDisabled
                          ? 'opacity-40 bg-gray-50 border-gray-100 cursor-not-allowed'
                          : 'bg-white border-gray-100 hover:border-pink-200'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-pink-500 bg-pink-500' : 'border-gray-200'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="font-black text-gray-800 text-lg">{val.id}</span>
                    </div>
                    <p className="text-sm text-gray-500 break-keep font-medium leading-relaxed">{val.text}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep('result')}
                disabled={selectedValues.length !== 3}
                className={`
                  font-black py-5 px-16 rounded-2xl shadow-lg transition-all text-lg flex items-center gap-3
                  ${selectedValues.length === 3
                    ? 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                진단 결과 리포트 보기 <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    const { scores, sortedTypes, fixedOrderTypes } = calculateResult();
    const topTypeKey = sortedTypes[0][0];
    const topTypeInfo = RIASEC_DESCRIPTIONS[topTypeKey];
    const secondType = sortedTypes[1];
    const thirdType = sortedTypes[2];
    
    const result = RESULT_DATA[topTypeKey];
    const initialKeywordLabels = initialSelected.join(', ');

    const getKeywordDrink = (keywords) => {
      const groupCounts = { focus: 0, balance: 0, refresh: 0, care: 0 };
      keywords.forEach(k => { const g = KEYWORD_DRINK_MAP[k]; if (g) groupCounts[g]++; });
      const topGroup = Object.entries(groupCounts).sort(([, a], [, b]) => b - a)[0][0];
      return KEYWORD_DRINK_RESULT[topGroup];
    };
    const keywordDrink = getKeywordDrink(initialSelected);
    const topKeywordLabels = topKeywords.map(k => k.split('-')[1]).join(', ');
    const valLabels = selectedValues.join(', ');

    // --- 프롬프트 생성 ---
    const major = userMajor.trim();
    const pastJob = userPastJob.trim();
    const backgroundLines = [
      major ? `전공: ${major}` : null,
      pastJob ? `이전 직장 직무: ${pastJob}` : null,
    ].filter(Boolean);
    const backgroundBlock = backgroundLines.length > 0
      ? `[배경 정보]\n${backgroundLines.join('\n')}\n\n`
      : '';

    const testNames = ["'홀랜드(Holland) 직업 흥미 검사'"];
    const aiIntro = `당신은 최고의 커리어 및 심리 분석 전문가입니다. 저는 최근 ${testNames.join(', ')}을 진행했습니다. 이 데이터를 기반으로 저명한 심리학적 근거를 바탕으로 분석해주세요.\n\n${backgroundBlock}`;

    // Job Prompt
    const basePromptJobIntro = aiIntro + `당신은 핵심 역량을 짚어내는 아주 유능한 직업 컨설턴트입니다.
저는 홀랜드 검사 결과, 최고 강점 유형 1순위와 2순위가 각각 **[${topTypeInfo.name}]**와(과) **[${RIASEC_DESCRIPTIONS[secondType[0]].name}]**이고 직무 핵심 키워드는 **[${topKeywordLabels}]**입니다.
현재 나에게 필요한 에너지 및 가치 키워드는 **[${initialKeywordLabels}]**이며, 
직업을 선택할 때 가장 중요하게 생각하는 가치관은 **[${valLabels}]**입니다.

[분석 지시]`;

    const promptJob = backgroundLines.length > 0
      ? basePromptJobIntro + `
사용자의 성향 정보(홀랜드 유형, 직업 가치관 등)와 [배경 정보]를 바탕으로, 다음 두 가지 파트로 나누어 직업을 추천해 주세요.

Part 1. 현실 맞춤형 직업 추천 (10개)
사용자의 [배경 정보](전공, 이전 직장 직무)와 성향/가치관을 모두 종합하여, 현재의 커리어 패스를 살리거나 현실적으로 전환하기 좋은 시너지 위주의 직업 10가지를 엄선하세요.

Part 2. 순수 성향 기반 직업 추천 (10개)
[배경 정보]는 완전히 배제하고, 오직 사용자의 본연의 성향과 직업 가치관에만 초점을 맞춰 자아실현에 완벽히 부합하는 이상적인 직업 10가지를 엄선하세요.

[출력 규칙]
최종 답변에는 당신이 분석한 이유나 부연 설명을 일절 적지 마세요. 오직 아래의 형식처럼 파트를 나누어 직업명만 깔끔한 리스트 형태로 출력하세요.

(예시)
[Part 1. 현실 맞춤형 추천]
1. 데이터 분석가
2. 금융 상품 기획자
...

[Part 2. 순수 성향 기반 추천]
1. 비영리 단체 코디네이터
2. 예술 치료사
...`
      : basePromptJobIntro + `
'어떤 데이터나 대상에 끌리는가(흥미)'와 '어떤 방식으로 성과를 내는가(평소 행동)'의 교집합, 홀랜드 주 강점, 직업 가치관을 모두 종합적으로 교차 분석하세요. 내부적으로 각 직업이 왜 이 사람에게 완벽하게 부합하는지 그 타당한 이유를 깊이 있게 추론하여 가장 적합한 직업 10가지를 엄선하세요.

[출력 규칙]
분석 퀄리티는 최고 수준을 유지하되, 최종 답변에는 당신이 분석한 이유나 부연 설명을 일절 적지 마세요. 오직 아래의 예시처럼 1번부터 10번까지의 직업명만 깔끔한 리스트 형태로 출력하세요.

(예시)
1. 데이터 분석가
2. UX 리서처
...`;

    // Environment Prompt
    const promptEnv = aiIntro + `저는 직업 선택 시 가장 중요하게 여기는 가치관이 [${valLabels}]이고, 추가적인 핵심 키워드는 [${initialKeywordLabels}]입니다.
이 데이터를 바탕으로 나의 에너지가 충전되고 가장 편안함을 느끼는 환경이 어떤 곳인지 분석하고, 구체적으로 어떤 조직 문화와 제도를 가진 회사에 가야 하는지 3가지 측면에서 제안해주세요.`;

    // Best Boss Prompt
    const promptBestBoss = aiIntro + `저는 직장 생활에서 [${valLabels}]의 가치와 [${initialKeywordLabels}]의 조화를 중요하게 생각합니다.
이러한 저의 기질과 내면적 성향을 가장 잘 이해해주고, 저의 역량을 최대한 이끌어낼 수 있는 '나와 완벽하게 잘 맞는 베스트 리더십 스타일'을 분석해주세요. 
저에게 어떤 식으로 업무 지시를 내리고 어떻게 피드백을 주는 상사가 좋은지 구체적인 롤모델을 그려주세요.`;

    // Worst Boss Prompt
    const promptWorstBoss = aiIntro + `저는 직장 생활에서 [${valLabels}]의 가치와 [${initialKeywordLabels}]의 필요성을 중요하게 생각합니다.
저의 스트레스 버튼을 가장 심하게 자극하는, 즉 제가 무조건 피해야 할 '최악의 직장 상사 스타일'을 분석해주세요.
저의 성과를 크게 떨어뜨리고 저를 지치게 만드는 상사의 구체적인 말과 행동 패턴을 예시로 들어 경고해주세요.`;

    // Teammate Prompt
    const teammateConditionText = `행동과 기질 스타일은 서로 보완되어 시너지가 나고`;
    const promptBestTeammate = aiIntro + `저는 홀랜드 주 강점이 [${topTypeInfo.name}]이며 핵심 키워드는 [${topKeywordLabels}, ${initialKeywordLabels}]입니다.
${teammateConditionText}, 기대하는 환경 즉 가치관([${valLabels}])은 비슷해서 협업이 편안한 '최고의 찰떡 동료 스타일'을 분석해주세요.
만약 그 동료와 제가 한 팀이 된다면, 각각 어떤 역할을 나눠 맡았을 때 최고의 퍼포먼스가 날지도 함께 시뮬레이션 해주세요.`;

    const prompts = [
      { id: 'job', title: '나에게 딱 맞는 직업 추천', text: promptJob },
      { id: 'culture', title: '나의 성과를 높여주는 조직 문화', text: promptEnv },
      { id: 'bestBoss', title: '나의 역량을 200% 이끌어내는 상사', text: promptBestBoss },
      { id: 'worstBoss', title: '나의 에너지를 갉아먹는 피해야 할 상사', text: promptWorstBoss },
      { id: 'teammate', title: '완벽한 시너지를 내는 찰떡 동료', text: promptBestTeammate }
    ];

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className={`bg-gradient-to-r ${result.color} p-10 md:p-14 text-center text-white`}>
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6">진단 결과 리포트</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 opacity-90">당신의 홀랜드 유형은</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-5xl md:text-7xl">{result.icon}</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter shrink-0">{result.shortName}</h1>
              </div>
              <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl mx-auto break-keep">{result.name} 성향이 가장 강하게 나타납니다.</p>
            </div>
            <div className="p-8 md:p-12 space-y-10">
              <div className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest">필요 에너지</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1">
                    {initialSelected.map(k => (<span key={k} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-700"># {k}</span>))}
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-2">
                  <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest">핵심 키워드</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1">
                    {topKeywords.map(k => {
                      const word = k.split('-')[1];
                      return (<span key={k} className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700"># {word}</span>);
                    })}
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-2">
                  <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest">직업 가치관</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1">
                    {selectedValues.map(v => (<span key={v} className="px-3 py-1 bg-pink-50 border border-pink-100 rounded-lg text-xs font-bold text-pink-700"># {v}</span>))}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border-2 border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-3 rounded-2xl"><Briefcase className="w-6 h-6 text-blue-600" /></div>
                    <h3 className="text-xl font-black text-gray-800">추천 직업</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{result.job}</p>
                  <p className="text-gray-500 text-sm break-keep">귀하의 성향과 가장 닮은꼴인 커리어 패스입니다.</p>
                </div>

                {/* 전문가 조언 */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5 text-amber-400" /><span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expert Advice</span></div>
                  <p className="text-lg font-bold leading-relaxed break-keep">"당신만의 고유한 강점을 믿고<br />오늘 하루도 자신 있게 나아가세요!"</p>
                </div>
              </div>

              {/* [신규] 유형별 분포도 & Next Steps */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 pt-6 md:pt-10 border-t border-gray-100">
                <div className="md:col-span-2">
                  <h3 className="font-bold text-base md:text-lg lg:text-xl text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 md:w-6 md:h-6" /> 유형별 분포도 (RIASEC)
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {(() => {
                      const maxScore = Math.max(...fixedOrderTypes.map(([, s]) => s), 1);
                      return fixedOrderTypes.map(([type, score]) => {
                        const desc = RIASEC_DESCRIPTIONS[type];
                        const isTop = type === topTypeKey;
                        const barWidth = Math.max((score / maxScore) * 100, score > 0 ? 5 : 0);
                        return (
                          <div key={type} className="flex items-center gap-2 md:gap-4 text-xs md:text-sm group">
                            <div className="w-20 md:w-28 lg:w-36 font-bold text-gray-600 flex items-center gap-1 md:gap-2 shrink-0">
                              <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${desc.barColor}`}></span>
                              <span className="break-keep">{desc.shortName} ({type})</span>
                            </div>
                            <div className="flex-1 h-4 md:h-5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${desc.barColor} ${isTop ? 'opacity-100' : 'opacity-60'} group-hover:opacity-100`}
                                style={{ width: `${barWidth}%` }}
                              ></div>
                            </div>
                            <div className="w-6 md:w-8 text-right font-bold text-gray-700 text-sm md:text-base lg:text-lg shrink-0">{score}</div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* 2,3순위 요약 */}
                <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-500 font-bold text-xs md:text-sm uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> Next Steps
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">보완 및 확장 전략</h4>
                  <p className="text-gray-600 leading-relaxed text-xs md:text-sm break-keep">
                    당신의 주무기는 <strong>{topTypeInfo.shortName}</strong>입니다.<br /><br />
                    여기에 2순위인 <strong className={RIASEC_DESCRIPTIONS[secondType[0]].color.split(' ')[1]}>{RIASEC_DESCRIPTIONS[secondType[0]].shortName}</strong>의 특성을 결합하면 더 큰 시너지를 낼 수 있습니다.<br /><br />
                    부족한 부분은 {RIASEC_DESCRIPTIONS[thirdType[0]].shortName} 성향이 강한 동료와 협업하여 보완하세요.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-gray-800 px-2 flex items-center gap-2"><Zap className="w-6 h-6 text-orange-500" /> 오늘의 힐링 음료</h3>

                {/* 지금 나에게 필요한 음료 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                    <h4 className="font-black text-gray-700 text-sm uppercase tracking-wider">지금 나에게 필요한 원두 및 홍차</h4>
                    <span className="text-xs text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-full">{keywordDrink.label}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-3xl p-7 border border-blue-100 flex items-start gap-5">
                      <div className="bg-white p-3.5 rounded-2xl shadow-sm shrink-0"><Coffee className="w-7 h-7 text-blue-600" /></div>
                      <div>
                        <h4 className="font-black text-blue-900 text-xs uppercase tracking-widest mb-2">추천 원두</h4>
                        <p className="text-xl font-black text-blue-950 mb-2">{keywordDrink.bean}</p>
                        <p className="text-blue-800 text-sm font-medium leading-relaxed break-keep">"{keywordDrink.beanDesc}"</p>
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-3xl p-7 border border-teal-100 flex items-start gap-5">
                      <div className="bg-white p-3.5 rounded-2xl shadow-sm shrink-0"><Leaf className="w-7 h-7 text-teal-600" /></div>
                      <div>
                        <h4 className="font-black text-teal-900 text-xs uppercase tracking-widest mb-2">추천 홍차</h4>
                        <p className="text-xl font-black text-teal-950 mb-2">{keywordDrink.tea}</p>
                        <p className="text-teal-800 text-sm font-medium leading-relaxed break-keep">"{keywordDrink.teaDesc}"</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 성격 유형에 맞는 음료 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                    <h4 className="font-black text-gray-700 text-sm uppercase tracking-wider">나의 성격 유형에 맞는 원두 및 홍차</h4>
                    <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">{result.shortName}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 rounded-3xl p-7 border border-amber-100 flex items-start gap-5">
                      <div className="bg-white p-3.5 rounded-2xl shadow-sm shrink-0"><Coffee className="w-7 h-7 text-amber-700" /></div>
                      <div>
                        <h4 className="font-black text-amber-900 text-xs uppercase tracking-widest mb-2">추천 원두</h4>
                        <p className="text-xl font-black text-amber-950 mb-2">{result.bean}</p>
                        <p className="text-amber-800 text-sm font-medium leading-relaxed break-keep">"{result.beanDesc}"</p>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-3xl p-7 border border-green-100 flex items-start gap-5">
                      <div className="bg-white p-3.5 rounded-2xl shadow-sm shrink-0"><Leaf className="w-7 h-7 text-green-700" /></div>
                      <div>
                        <h4 className="font-black text-green-900 text-xs uppercase tracking-widest mb-2">추천 홍차</h4>
                        <p className="text-xl font-black text-green-950 mb-2">{result.tea}</p>
                        <p className="text-green-800 text-sm font-medium leading-relaxed break-keep">"{result.teaDesc}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-yellow-400 p-3 rounded-2xl shadow-sm"><TrendingUp className="w-6 h-6 text-yellow-900" /></div>
                  <div>
                    <h3 className="font-black text-xl md:text-2xl text-yellow-950">AI 컨설팅 100% 활용하기</h3>
                    <p className="text-sm text-gray-600 mt-1">프롬프트를 복사해 ChatGPT나 Claude에게 더 자세히 물어보세요!</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {prompts.map(p => (
                    <div key={p.id} className="bg-white rounded-3xl shadow-sm border-2 border-yellow-100 overflow-hidden group transition-all hover:border-yellow-200">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="flex-1 p-6 md:p-8 bg-yellow-50/30 flex flex-col gap-3">
                          <h4 className="font-black text-yellow-900 text-lg">{p.title}</h4>
                          <div className="relative">
                            <textarea readOnly value={p.text} className="w-full text-sm text-gray-600 bg-white p-4 rounded-xl border border-yellow-100 resize-none focus:outline-none h-24 font-mono leading-tight" />
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                          </div>
                        </div>
                        <button onClick={() => copyToClipboard(p.text, p.id)} className={`flex md:flex-col items-center justify-center gap-2 py-6 px-8 md:w-32 transition-all font-black ${isCopied === p.id ? 'bg-green-500 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950'}`}>
                          {isCopied === p.id ? <><Check className="w-6 h-6" /><span className="text-sm">복사됨</span></> : <><Copy className="w-6 h-6" /><span className="text-sm">복사하기</span></>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={restart} className="flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-black font-black py-5 px-10 rounded-2xl transition-all shadow-lg hover:-translate-y-1 active:scale-[0.98] text-lg"><RefreshCw className="w-6 h-6" />다시 진단하기</button>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm font-medium pb-10">© 2024 Career Drink Recommendation. All rights reserved.</div>
        </div>
      </div>
    );
  }

  return null;
}
