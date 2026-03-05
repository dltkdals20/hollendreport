import React, { useState, useEffect } from 'react';
import { CheckCircle, BarChart2, RefreshCw, ChevronRight, Heart, Check, TrendingUp, MousePointerClick, Trophy, Star, ArrowRight, Share2, Copy, CheckCircle2, UserCog, Brain } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// --- 데이터: 6가지 유형별 키워드 (사용자 요청 반영) ---
// 순서: 현실 -> 탐구 -> 예술 -> 사회 -> 진취 -> 관습
const KEYWORD_DATA = {
  R: [ // 현실형 (Realistic) - 파랑
    '솔직', '성실', '검소', '지구력 강함', '신체적 건강', '소박', '말수 적음', '고집', '단순함', '활동적',
    '실용적', '현재 중심적', '사물 지향적', '남성적', '직선적', '구체적', '기계적 적성', '운동 능력', '손재주', '도구 조작',
    '기술적', '조립', '수리', '생산적', '견고함', '안정감', '강인함', '인내력', '끈기'
  ],
  I: [ // 탐구형 (Investigative) - 연한 파랑
    '호기심 많음', '조직적', '정확함', '지적 추구', '합리적', '학업 열망', '내성적', '신중함', '논리적', '관찰적',
    '상징적', '체계적', '창조적', '독립적', '과학적', '추상적 사고', '탐구 정신', '이론적', '연구 지향적', '객관적',
    '수학적', '실험적', '복잡한 사고', '지적 호기심', '연구 열정', '정보 수집', '탐구심', '심층 분석', '문제 해결'
  ],
  A: [ // 예술형 (Artistic) - 주황
    '표현력 풍부', '독창적', '비순응적', '감성적', '직관적', '미적 감각', '상상력', '충동적', '독립적', '무질서',
    '예술적', '감정적', '개성적', '자유로움', '혁신적', '표현 욕구', '영감적', '심미적', '감수성', '몽상적',
    '표현적', '열정적', '즉흥적', '자발적', '비전통적', '변화 추구', '반항적', '개방적', '모험적'
  ],
  S: [ // 사회형 (Social) - 초록
    '협력적', '헌신적', '친근함', '이타적', '공감 능력', '사교적', '책임감', '이상주의적', '도움 지향적', '친절함',
    '이해심', '배려심', '봉사 정신', '인간관계 중시', '교육적', '상담적', '치료적', '돌봄', '화합 추구', '봉사적',
    '동정심', '양육적', '격려적', '지지적', '공동체 의식', '인도적', '관용적', '수용적', '공감적'
  ],
  E: [ // 진취형 (Enterprising) - 빨강
    '추진력', '신뢰감', '야심적', '설득력', '지배적', '경쟁 지향적', '모험적', '에너지 넘침', '자신감', '사교성',
    '낙관주의', '인기', '리더십', '영향력', '목표 지향적', '성취 욕구', '권력 추구', '외향적', '적극적', '결단력',
    '통제력', '야망적', '협상력', '열망', '추진적', '성공 지향', '야심', '경영적', '기업가적'
  ],
  C: [ // 관습형 (Conventional) - 보라
    '꼼꼼함', '책임감 강함', '질서 선호', '보수적', '규칙 준수', '순응적', '양심적', '절제력', '효율성', '신뢰감',
    '실용적', '차분함', '안정 추구', '계획적', '조직적', '정확성', '세심함', '신중함', '전통적', '안정성',
    '일관성', '성실함', '인내심', '정밀함', '절차 지향적', '규범적', '체계성', '신뢰성', '일관됨'
  ]
};

// --- 가치관 데이터 ---
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

// --- RIASEC 유형 설명 (업데이트된 색상 및 명칭) ---
const RIASEC_DESCRIPTIONS = {
  R: {
    name: '현실형 (Realistic)',
    shortName: '현실적',
    desc: '솔직하고 성실하며, 기계나 도구를 다루는 실용적인 활동을 선호합니다.',
    icon: '🔧',
    color: 'bg-blue-50 text-blue-700',
    barColor: 'bg-blue-600',
    borderColor: 'border-blue-200',
    themeColor: 'blue'
  },
  I: {
    name: '탐구형 (Investigative)',
    shortName: '분석적',
    desc: '호기심이 많고 논리적이며, 지적 탐구와 문제 해결을 즐깁니다.',
    icon: '🔍',
    color: 'bg-sky-50 text-sky-700',
    barColor: 'bg-sky-500',
    borderColor: 'border-sky-200',
    themeColor: 'sky'
  },
  A: {
    name: '예술형 (Artistic)',
    shortName: '창의적',
    desc: '표현력이 풍부하고 독창적이며, 자유로운 예술 활동을 좋아합니다.',
    icon: '🎨',
    color: 'bg-orange-50 text-orange-700',
    barColor: 'bg-orange-500',
    borderColor: 'border-orange-200',
    themeColor: 'orange'
  },
  S: {
    name: '사회형 (Social)',
    shortName: '사회형',
    desc: '이타적이고 친절하며, 타인을 돕고 이해하는 활동에 가치를 둡니다.',
    icon: '🤝',
    color: 'bg-green-50 text-green-700',
    barColor: 'bg-green-600',
    borderColor: 'border-green-200',
    themeColor: 'green'
  },
  E: {
    name: '진취형 (Enterprising)',
    shortName: '진취적',
    desc: '열정적이고 도전적이며, 목표 달성과 리더십 발휘를 선호합니다.',
    icon: '🏆',
    color: 'bg-red-50 text-red-700',
    barColor: 'bg-red-600',
    borderColor: 'border-red-200',
    themeColor: 'red'
  },
  C: {
    name: '관습형 (Conventional)',
    shortName: '관습형',
    desc: '꼼꼼하고 책임감이 강하며, 정해진 규칙과 질서를 따르는 것을 잘합니다.',
    icon: '📊',
    color: 'bg-purple-50 text-purple-700',
    barColor: 'bg-purple-600',
    borderColor: 'border-purple-200',
    themeColor: 'purple'
  },
};

const PAGINATION_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];

// Helper to map color IDs to color names for the AI prompt
const COLOR_NAMES = {
  red: '빨강',
  green: '초록',
  yellow: '노랑',
  blue: '파랑'
};

export default function HollandTest({ birkmanContext = null, tciContext = null }) {
  const [step, setStep] = useState('intro'); // intro, keywordTest, topKeywordSelect, valueTest, result, shared
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0 ~ 5 (R ~ C)

  // 1단계 선택된 모든 키워드 (Set)
  const [selectedKeywords, setSelectedKeywords] = useState(new Set());

  // 2단계 최종 선택된 TOP 3 키워드 (Array)
  const [topKeywords, setTopKeywords] = useState([]);

  // 3단계 선택된 가치관 (Array)
  const [selectedValues, setSelectedValues] = useState([]);

  // 공유 관련 상태
  const [shareLink, setShareLink] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [sharedResult, setSharedResult] = useState(null);

  // --- 핸들러 ---

  const toggleKeyword = (type, word) => {
    const key = `${type}-${word}`; // 고유 키 생성
    const newSet = new Set(selectedKeywords);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setSelectedKeywords(newSet);
  };

  const nextKeywordPage = () => {
    if (currentPageIndex < PAGINATION_ORDER.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // 키워드 선택이 끝나면 Top 3 선택 단계로 이동
      if (selectedKeywords.size <= 3) {
        setTopKeywords(Array.from(selectedKeywords));
        setStep('valueTest');
      } else {
        setStep('topKeywordSelect');
      }
      window.scrollTo(0, 0);
    }
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

  const restart = () => {
    setStep('intro');
    setSelectedKeywords(new Set());
    setTopKeywords([]);
    setSelectedValues([]);
    setCurrentPageIndex(0);
    setShareLink('');
    setSharedResult(null);
    // URL에서 공유 ID 제거
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // 공유 링크로 접속했을 때 결과 로드
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('share');

    if (shareId) {
      loadSharedResult(shareId);
    }
  }, []);

  const loadSharedResult = async (shareId) => {
    try {
      const { data, error } = await supabase
        .from('career_results')
        .select('*')
        .eq('share_id', shareId)
        .single();

      if (error) throw error;

      if (data) {
        setSharedResult(data);
        setSelectedKeywords(new Set(data.selected_keywords || []));
        setTopKeywords(data.top_keywords || []);
        setSelectedValues(data.selected_values || []);
        setStep('shared');
      }
    } catch (error) {
      console.error('공유 결과 로드 실패:', error);
      alert('공유 링크를 불러올 수 없습니다. 링크가 올바른지 확인해주세요.');
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const { scores } = calculateResult();

      // 공유 ID 생성 (랜덤 문자열)
      const shareId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // Supabase에 저장할 데이터
      const resultData = {
        share_id: shareId,
        scores: scores,
        top_type: Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0],
        selected_keywords: Array.from(selectedKeywords),
        top_keywords: topKeywords,
        selected_values: selectedValues
      };

      // Supabase에 저장
      const { data, error } = await supabase
        .from('career_results')
        .insert([resultData])
        .select()
        .single();

      if (error) throw error;

      // 공유 링크 생성
      const link = `${window.location.origin}${window.location.pathname}?share=${shareId}`;
      setShareLink(link);
    } catch (error) {
      console.error('공유 실패:', error);
      alert('공유 링크 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  // --- 결과 계산 ---
  const calculateResult = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    // RIASEC 점수는 '전체 선택된 키워드'를 기준으로 계산
    selectedKeywords.forEach(key => {
      const type = key.split('-')[0];
      if (scores[type] !== undefined) {
        scores[type]++;
      }
    });

    // 1. 점수 내림차순 (최고 유형 찾기용)
    const sortedTypes = Object.entries(scores).sort(([, a], [, b]) => b - a);

    // 2. R-I-A-S-E-C 고정 순서 (그래프용)
    const fixedOrderTypes = PAGINATION_ORDER.map(type => [type, scores[type]]);

    return { scores, sortedTypes, fixedOrderTypes };
  };

  // --- 렌더링 ---

  // 1. 인트로
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 font-sans">
        <div className="max-w-2xl w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gray-900 p-6 md:p-10 lg:p-12 text-center text-white">
            <MousePointerClick className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 opacity-90" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4">커리어 키워드 진단</h1>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg px-2">나를 설명하는 키워드를 선택하여<br className="hidden sm:block" />숨겨진 직업 흥미와 가치관을 찾아보세요.</p>
          </div>
          <div className="p-6 md:p-8 lg:p-10 space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="bg-white p-1.5 md:p-2 rounded-full shadow-sm shrink-0">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">STEP 1. 키워드 탐색 (6단계)</h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1 break-keep">
                    현실적 → 분석적 → 창의적 → 사회형 → 진취적 → 관습형 순서로<br className="hidden sm:block" />
                    나에게 맞는 키워드를 자유롭게 선택합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="bg-white p-1.5 md:p-2 rounded-full shadow-sm shrink-0">
                  <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">STEP 2. 핵심 DNA 결정</h3>
                  <p className="text-gray-500 text-xs md:text-sm mt-1 break-keep">선택한 단어들 중 나를 가장 잘 나타내는 최정예 단어 3개를 추려냅니다.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep('keywordTest')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 md:py-5 px-6 rounded-xl md:rounded-2xl transition-all duration-300 text-base md:text-lg lg:text-xl shadow-lg flex items-center justify-center gap-2 md:gap-3 mt-4"
            >
              진단 시작하기 <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 키워드 선택 (순차적 페이지)
  if (step === 'keywordTest') {
    const currentType = PAGINATION_ORDER[currentPageIndex]; // 'R', 'I', ...
    const typeInfo = RIASEC_DESCRIPTIONS[currentType];
    const currentKeywords = KEYWORD_DATA[currentType];
    const progress = ((currentPageIndex + 1) / PAGINATION_ORDER.length) * 100;

    // 테마 컬러 클래스 동적 생성 (Tailwind)
    const themeBtnClass = {
      blue: 'border-blue-200 text-blue-600 hover:bg-blue-50 bg-white',
      sky: 'border-sky-200 text-sky-600 hover:bg-sky-50 bg-white',
      orange: 'border-orange-200 text-orange-600 hover:bg-orange-50 bg-white',
      green: 'border-green-200 text-green-600 hover:bg-green-50 bg-white',
      red: 'border-red-200 text-red-600 hover:bg-red-50 bg-white',
      purple: 'border-purple-200 text-purple-600 hover:bg-purple-50 bg-white',
    }[typeInfo.themeColor];

    const themeBtnSelectedClass = {
      blue: 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-105',
      sky: 'bg-sky-500 border-sky-500 text-white shadow-md transform scale-105',
      orange: 'bg-orange-500 border-orange-500 text-white shadow-md transform scale-105',
      green: 'bg-green-600 border-green-600 text-white shadow-md transform scale-105',
      red: 'bg-red-600 border-red-600 text-white shadow-md transform scale-105',
      purple: 'bg-purple-600 border-purple-600 text-white shadow-md transform scale-105',
    }[typeInfo.themeColor];

    return (
      <div className={`min-h-screen py-4 md:py-8 px-3 md:px-4 font-sans transition-colors duration-500 ${typeInfo.color}`}>
        <div className="max-w-4xl mx-auto">
          {/* Header & Progress */}
          <div className="mb-4 md:mb-8 bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-white/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <span className="text-2xl md:text-3xl lg:text-4xl shrink-0">{typeInfo.icon}</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-gray-800 break-keep">
                    {currentPageIndex + 1}. {typeInfo.shortName} 키워드
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm font-medium break-keep">{typeInfo.desc}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs md:text-sm font-bold text-gray-400">{currentPageIndex + 1} / 6</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${typeInfo.barColor}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Keywords Grid */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 lg:p-10">
            <p className="text-center text-gray-500 mb-4 md:mb-8 text-sm md:text-base font-medium px-2">
              아래 단어들 중 <span className="text-gray-800 font-bold underline">나에게 해당되는 것</span>을 모두 선택해주세요.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mb-6 md:mb-10">
              {currentKeywords.map((word, idx) => {
                const key = `${currentType}-${word}`;
                const isSelected = selectedKeywords.has(key);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleKeyword(currentType, word)}
                    className={`
                      py-2.5 md:py-3 px-1 rounded-lg md:rounded-xl text-sm md:text-base lg:text-lg font-bold transition-all duration-200 border-2 relative overflow-hidden break-keep
                      ${isSelected ? themeBtnSelectedClass : themeBtnClass}
                    `}
                  >
                    {word}
                    {isSelected && <Check className="w-3 h-3 md:w-4 md:h-4 absolute top-1 right-1 opacity-50" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={nextKeywordPage}
                className="bg-gray-900 hover:bg-black text-white text-sm md:text-base lg:text-lg font-bold py-3 md:py-4 px-8 md:px-12 lg:px-16 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 flex items-center gap-2"
              >
                <span className="whitespace-nowrap">{currentPageIndex < 5 ? '다음 유형으로' : '키워드 선택 완료'}</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Top 3 키워드 선택
  if (step === 'topKeywordSelect') {
    return (
      <div className="min-h-screen bg-amber-50 py-4 md:py-8 px-3 md:px-4 font-sans flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 xl:p-10 border-2 border-amber-100">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block p-2 md:p-3 bg-amber-100 rounded-full mb-3 md:mb-4">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 px-2">최종 선택: 나의 핵심 키워드</h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg break-keep px-2">
                총 <strong>{selectedKeywords.size}개의 단어</strong>를 선택하셨습니다.<br />
                이 중에서 진짜 나를 가장 잘 나타내는 <strong>3개</strong>만 골라주세요.
              </p>
              <p className="text-amber-600 font-bold mt-2 text-lg md:text-xl">({topKeywords.length} / 3 선택됨)</p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6 md:mb-10 max-h-[300px] md:max-h-[400px] overflow-y-auto p-2">
              {Array.from(selectedKeywords).map((key) => {
                const [type, word] = key.split('-');
                const isSelected = topKeywords.includes(key);
                const isDisabled = !isSelected && topKeywords.length >= 3;
                const barColor = RIASEC_DESCRIPTIONS[type].barColor; // bg-color

                return (
                  <button
                    key={key}
                    onClick={() => toggleTopKeyword(key)}
                    disabled={isDisabled}
                    className={`
                      px-3 md:px-4 lg:px-5 py-2 md:py-2.5 lg:py-3 rounded-full text-sm md:text-base lg:text-lg font-bold transition-all duration-200 border-2 flex items-center gap-1.5 md:gap-2
                      ${isSelected
                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg transform scale-110 z-10'
                        : isDisabled
                          ? 'opacity-40 bg-gray-50 border-gray-100 cursor-not-allowed'
                          : `bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50`}
                    `}
                  >
                    <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${barColor} shrink-0`}></span>
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
                  text-sm md:text-base lg:text-lg font-bold py-3 md:py-4 px-8 md:px-10 lg:px-12 rounded-full shadow-lg transition-all
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

  // 4. 가치관 선택
  if (step === 'valueTest') {
    return (
      <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-3 md:px-4 font-sans flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 xl:p-10 border border-gray-100">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block p-2 md:p-3 bg-pink-100 rounded-full mb-3 md:mb-4">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-600" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">가치관 선택</h2>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg px-2">직업을 가질 때 가장 중요한 <strong>3가지</strong>를 선택해주세요.</p>
              <p className="text-pink-600 font-medium mt-2 text-base md:text-lg">({selectedValues.length} / 3 선택됨)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10">
              {VALUES.map((val) => {
                const isSelected = selectedValues.includes(val.id);
                const isDisabled = !isSelected && selectedValues.length >= 3;
                return (
                  <button
                    key={val.id}
                    onClick={() => toggleValue(val.id)}
                    disabled={isDisabled}
                    className={`
                      p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl text-left border-2 transition-all duration-200 flex items-center gap-3 md:gap-4
                      ${isSelected
                        ? 'bg-pink-50 border-pink-500 ring-1 ring-pink-500'
                        : isDisabled
                          ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-100'
                          : 'bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50'}
                    `}
                  >
                    <div className={`
                      w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0
                      ${isSelected ? 'bg-pink-500 border-pink-500' : 'border-gray-300'}
                    `}>
                      {isSelected && <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-gray-800 text-base md:text-lg">{val.id}</div>
                      <div className="text-xs md:text-sm text-gray-500 break-keep">{val.text}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep('result')}
                disabled={selectedValues.length !== 3}
                className={`
                  text-sm md:text-base lg:text-lg font-bold py-3 md:py-4 px-8 md:px-10 lg:px-12 rounded-full shadow-lg transition-all
                  ${selectedValues.length === 3
                    ? 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                결과 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5-1. 공유 링크로 접속한 결과 화면
  if (step === 'shared' && sharedResult) {
    const scores = sharedResult.scores;
    const sortedTypes = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const fixedOrderTypes = PAGINATION_ORDER.map(type => [type, scores[type] || 0]);
    const topTypeKey = sortedTypes[0][0];
    const topTypeInfo = RIASEC_DESCRIPTIONS[topTypeKey];
    const secondType = sortedTypes[1];
    const thirdType = sortedTypes[2];

    return (
      <div className="min-h-screen bg-gray-50 p-3 md:p-4 lg:p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* 공유된 결과 표시 배지 */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Share2 className="w-5 h-5 md:w-6 md:h-6" />
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">공유된 진단 결과</h2>
            </div>
            <p className="text-sm md:text-base opacity-90">다른 사람이 공유한 커리어 진단 결과입니다</p>
          </div>

          <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100/50">
            <div className={`
              border-t-8 ${topTypeInfo.borderColor.replace('border-', 'border-t-')} 
              bg-gradient-to-b from-gray-50 to-white
              p-8 md:p-12 lg:p-16 text-center
            `}>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">진단 결과 대시보드</h1>
              <p className="text-gray-500 font-medium text-sm md:text-base tracking-wide">나의 흥미(RIASEC)와 직업 가치관 분석 결과</p>
            </div>

            <div className="p-4 md:p-6 lg:p-8 xl:p-12">
              {/* [메인 섹션] 나의 흥미 유형 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center mb-8 md:mb-12 border-b border-gray-100 pb-8 md:pb-12">
                <div className="text-center md:text-left flex-1">
                  <div className={`inline-block px-3 md:px-4 py-1 md:py-1.5 ${topTypeInfo.color} font-bold rounded-full mb-3 md:mb-5 text-xs md:text-sm uppercase tracking-wide`}>
                    나의 최고 강점 유형
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-3 md:mb-5">
                    당신은 <span className={topTypeInfo.color.split(' ')[1]}>{topTypeInfo.name}</span> 입니다
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 md:mb-6 break-keep">
                    {topTypeInfo.desc}
                  </p>
                </div>
                <div className={`
                  w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full flex items-center justify-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl shadow-xl border-4 md:border-8 transform hover:scale-105 transition-transform duration-300 shrink-0
                  ${topTypeInfo.color} ${topTypeInfo.borderColor}
                `}>
                  {topTypeInfo.icon}
                </div>
              </div>

              {/* [대시보드 그리드] 핵심 키워드 & 직업 가치관 */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
                {/* 1. 핵심 키워드 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 border border-amber-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                  <h3 className="font-extrabold text-lg md:text-xl lg:text-2xl text-amber-900 mb-6 md:mb-8 flex items-center gap-3 tracking-tight">
                    <div className="bg-amber-100 p-2 rounded-xl">
                      <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    </div>
                    MY CORE DNA
                  </h3>
                  <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                    {topKeywords.map((key, idx) => {
                      const type = key.split('-')[0];
                      const typeName = RIASEC_DESCRIPTIONS[type].shortName;
                      const barColor = RIASEC_DESCRIPTIONS[type].barColor;
                      return (
                        <div key={key} className="bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100 flex items-center gap-4 hover:bg-white hover:border-amber-200 hover:shadow-sm transition-all duration-300">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${barColor} text-white flex items-center justify-center font-bold text-base md:text-lg shrink-0 shadow-md`}>
                            {idx + 1}
                          </div>
                          <span className="font-extrabold text-lg md:text-xl lg:text-2xl text-gray-800 break-keep flex-1 tracking-tight">{key.split('-')[1]}</span>
                          <span className="ml-auto text-xs md:text-sm text-gray-500 font-bold px-3 py-1.5 bg-white border border-gray-200 rounded-full shrink-0 shadow-sm">
                            {typeName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 직업 가치관 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 border border-pink-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                  <h3 className="font-extrabold text-lg md:text-xl lg:text-2xl text-pink-900 mb-6 md:mb-8 flex items-center gap-3 tracking-tight">
                    <div className="bg-pink-100 p-2 rounded-xl">
                      <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
                    </div>
                    직업 가치관
                  </h3>
                  <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                    {selectedValues.map((valId, idx) => (
                      <div key={valId} className="bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100 flex items-center gap-4 hover:bg-white hover:border-pink-200 hover:shadow-sm transition-all duration-300">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold text-base md:text-lg shrink-0 shadow-md">
                          {idx + 1}
                        </div>
                        <span className="font-extrabold text-lg md:text-xl lg:text-2xl text-gray-800 break-keep tracking-tight">{valId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* [하단] 전체 통계 차트 (R-I-A-S-E-C 순서 고정) */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pt-10 md:pt-16 border-t border-gray-100/80">
                <div className="md:col-span-2">
                  <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-gray-900 mb-6 md:mb-10 flex items-center gap-3 tracking-tight">
                    <BarChart2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" /> RIASEC 지수
                  </h3>
                  <div className="space-y-4 md:space-y-6">
                    {(() => {
                      const maxScore = Math.max(...fixedOrderTypes.map(([, s]) => s), 1);
                      return fixedOrderTypes.map(([type, score]) => {
                        const desc = RIASEC_DESCRIPTIONS[type];
                        const isTop = type === topTypeKey;
                        const barWidth = Math.max((score / maxScore) * 100, score > 0 ? 5 : 0);
                        return (
                          <div key={type} className="flex items-center gap-4 md:gap-6 text-sm md:text-base group">
                            <div className="w-24 md:w-32 lg:w-40 font-extrabold text-gray-800 flex items-center gap-2 md:gap-3 shrink-0">
                              <span className={`w-3 h-3 md:w-4 md:h-4 rounded-md ${desc.barColor} shadow-sm`}></span>
                              <span className="break-keep tracking-wide">{desc.shortName}</span>
                            </div>
                            <div className="flex-1 h-5 md:h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                              <div
                                className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-1000 ease-out ${desc.barColor} ${isTop ? 'opacity-100' : 'opacity-70'} group-hover:opacity-100`}
                                style={{ width: `${barWidth}%` }}
                              >
                                <div className="absolute inset-0 bg-white/20 w-full h-full"></div>
                              </div>
                            </div>
                            <div className="w-8 md:w-10 text-right font-black text-gray-900 text-lg md:text-xl lg:text-2xl shrink-0 tabular-nums">{score}</div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* 2,3순위 요약 */}
                <div className="bg-gray-900 rounded-3xl p-6 md:p-8 lg:p-10 border border-gray-800 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-gray-800 rounded-full opacity-50 blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 md:mb-6 text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5" /> Next Steps
                    </div>
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">보완 및 확장 전략</h4>
                    <p className="text-gray-300 leading-loose text-sm md:text-base lg:text-lg break-keep font-medium">
                      당신의 주무기는 <strong className="text-white bg-gray-800 px-2 py-1 rounded-md">{topTypeInfo.shortName}</strong>입니다.<br /><br />
                      여기에 2순위인 <strong className={`text-white ${RIASEC_DESCRIPTIONS[secondType[0]].barColor} px-2 py-1 rounded-md`}>{RIASEC_DESCRIPTIONS[secondType[0]].shortName}</strong>의 특성을 결합하면 더 큰 시너지를 낼 수 있습니다.<br /><br />
                      부족한 부분은 <span className="text-white border-b border-gray-600 pb-0.5">{RIASEC_DESCRIPTIONS[thirdType[0]].shortName}</span> 성향이 강한 동료와 협업하여 보완하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-8 md:pb-12 lg:pb-16">
            <button
              onClick={restart}
              className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-50 font-bold py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-full transition-all shadow-lg border border-gray-200 hover:-translate-y-0.5 text-sm md:text-base"
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
              나도 진단하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. 결과 화면
  if (step === 'result') {
    const { scores, sortedTypes, fixedOrderTypes } = calculateResult();
    const topTypeKey = sortedTypes[0][0]; // "R"
    const topTypeInfo = RIASEC_DESCRIPTIONS[topTypeKey];

    // 2순위, 3순위
    const secondType = sortedTypes[1];
    const thirdType = sortedTypes[2];

    // Context Variables
    const hasExtraContext = birkmanContext || tciContext;
    let bInterestName = '', bBehaviorName = '', bNeedsName = '', bStressName = '';
    let bInterest = '', bBehavior = '', bNeeds = '', bStress = '';
    let topKeywordLabels = '';
    let valLabels = '';
    let promptJob = '', promptEnv = '', promptBestBoss = '', promptWorstBoss = '', promptBestTeammate = '';

    if (hasExtraContext) {
      if (birkmanContext) {
        bInterest = birkmanContext.interestColor || '';
        bBehavior = birkmanContext.behaviorColor || '';
        bNeeds = birkmanContext.needsColor || '';
        bStress = birkmanContext.stressColor || '';

        bInterestName = COLOR_NAMES[bInterest] || '알 수 없음';
        bBehaviorName = COLOR_NAMES[bBehavior] || '알 수 없음';
        bNeedsName = COLOR_NAMES[bNeeds] || '알 수 없음';
        bStressName = COLOR_NAMES[bStress] || '알 수 없음';
      }

      topKeywordLabels = topKeywords.map(k => k.split('-')[1]).join(', ');
      valLabels = selectedValues.join(', ');

      let testNames = ["'홀랜드(Holland) 직업 흥미 검사'"];
      if (birkmanContext) testNames.push("'버크만(Birkman) 진단(컬러 기반)'");
      if (tciContext) testNames.push("'TCI(기질 및 성격 검사)'");

      const aiIntro = `당신은 최고의 커리어 및 심리 분석 전문가입니다. 저는 최근 ${testNames.join(', ')}을 진행했습니다. 이 데이터를 기반으로 저명한 심리학적 근거를 바탕으로 분석해주세요.

`;

      const tciText = tciContext
        ? `TCI 진단 결과 기질 백분위는 [자극추구 ${tciContext.NS}%, 위험회피 ${tciContext.HA}%, 사회적 민감성 ${tciContext.RD}%, 인내력 ${tciContext.PS}%]이고, 성격 백분위는 [자율성 ${tciContext.SD}%, 연대감 ${tciContext.CO}%, 자기초월 ${tciContext.ST}%]입니다.`
        : '';

      const birkmanTextJob = birkmanContext
        ? `버크만 진단 결과 직업적으로 흥미를 느끼는 스타일은 [${bInterestName}]이며, 일할 때의 평소 행동(Usual Behavior) 방식은 [${bBehaviorName}]입니다.`
        : '';

      promptJob = aiIntro + `당신은 핵심 역량을 짚어내는 아주 유능한 직업 컨설턴트입니다.
저는 홀랜드 검사 결과, 최고 강점 유형 1순위와 2순위가 각각 **[${topTypeInfo.name}]**와(과) **[${RIASEC_DESCRIPTIONS[secondType[0]].name}]**이고 직무 핵심 키워드는 **[${topKeywordLabels}]**입니다.
직업을 선택할 때 가장 중요하게 생각하는 가치관은 **[${valLabels}]**입니다.
${birkmanTextJob}${tciText}
[분석 지시]
'어떤 데이터나 대상에 끌리는가(흥미)'와 '어떤 방식으로 성과를 내는가(평소 행동)'의 교집합, 홀랜드 주 강점, 직업 가치관을 모두 종합적으로 교차 분석하세요. 내부적으로 각 직업이 왜 이 사람에게 완벽하게 부합하는지 그 타당한 이유를 깊이 있게 추론하여 가장 적합한 직업 10가지를 엄선하세요.

[출력 규칙]
분석 퀄리티는 최고 수준을 유지하되, 최종 답변에는 당신이 분석한 이유나 부연 설명을 일절 적지 마세요. 오직 아래의 예시처럼 1번부터 10번까지의 직업명만 깔끔한 리스트 형태로 출력하세요.

(예시)
1. 데이터 분석가
2. UX 리서처
...`;

      const birkmanTextEnv = birkmanContext
        ? `버크만 진단 결과 이상적인 업무 환경이나 타인에게 기대하는 '욕구(Needs)' 스타일은[${bNeedsName}]입니다.`
        : '';

      promptEnv = aiIntro + `저는 직업 선택 시 가장 중요하게 생각하는 절대 포기할 수 없는 가치관이[${valLabels}]입니다.
        ${birkmanTextEnv}${tciText}이 데이터를 바탕으로 나의 에너지가 충전되고 가장 편안함을 느끼는 환경이 어떤 곳인지 분석하고, 구체적으로 어떤 조직 문화와 제도를 가진 회사에 가야 하는지 3가지 측면에서 제안해주세요.`;

      const birkmanTextBoss = birkmanContext
        ? `버크만 진단 결과, 업무 환경에서 기대하는 '욕구(Needs)' 스타일이[${bNeedsName}]이고, `
        : '';

      promptBestBoss = aiIntro + `저는 ${birkmanTextBoss}직장 생활에서[${valLabels}]의 가치를 중요하게 생각합니다.
        ${tciText}이러한 저의 기질과 내면적 성향을 가장 잘 이해해주고, 저의 역량을 최대한 이끌어낼 수 있는 '나와 완벽하게 잘 맞는 베스트 리더십 스타일'을 분석해주세요. 
저에게 어떤 식으로 업무 지시를 내리고 어떻게 피드백을 주는 상사가 좋은지 구체적인 롤모델을 그려주세요.`;

      const birkmanTextStress = birkmanContext
        ? `버크만 진단 결과, 업무 환경에서 저의 욕구가 충족되지 않을 때 나타나는 '스트레스 반응(Stress Behavior)'이[${bStressName}] 스타일에 가깝습니다. `
        : '';

      const worstBossIntro = birkmanContext
        ? `저는 ${birkmanTextStress}(직장 가치관: [${valLabels}])`
        : `저는 직장 생활에서 [${valLabels}]의 가치를 중요하게 생각합니다.`;

      promptWorstBoss = aiIntro + `${worstBossIntro}
${tciText}저의 스트레스 버튼을 가장 심하게 자극하는, 즉 제가 무조건 피해야 할 '최악의 직장 상사 스타일'을 분석해주세요.
저의 성과를 크게 떨어뜨리고 저를 지치게 만드는 상사의 구체적인 말과 행동 패턴을 예시로 들어 경고해주세요.`;

      if (birkmanContext) {
        promptBestTeammate = `당신은 최고의 커리어 및 심리 분석 전문가입니다. 저는 최근 '홀랜드(Holland) 직업 흥미 검사', '버크만(Birkman) 진단(컬러 기반)'을 진행했습니다.

[사전 지식 1: 버크만 컬러별 핵심 특성]

빨강(Red): 실용적, 논리적, 결과 중심적, 직접적, 문제 해결 및 실행력

초록(Green): 사람 중심, 설득적, 유연함, 활발한 소통 및 관계 지향

노랑(Yellow): 체계적, 세부적, 규칙과 절차 중시, 데이터 기반의 꼼꼼한 관리 및 통제

파랑(Blue): 직관적, 창의적, 통찰력, 거시적 기획, 아이디어 제안 및 내면적 사고

[사전 지식 2: 홀랜드(RIASEC) 유형별 핵심 특성]

R(현실형): 도구/기계 조작, 실용적, 구체적이고 체계적인 작업 선호

I(탐구형): 분석적, 지적 호기심, 데이터 기반 문제 해결 및 논리적 탐구

A(예술형): 창의적, 비구조화된 환경, 자기표현, 자유롭고 독창적인 아이디어

S(사회형): 사람 중심, 교육, 상담, 타인 돕기, 공감 및 소통 능력 탁월

E(진취형): 리더십, 설득, 목표 달성, 추진력, 조직 관리 및 비즈니스 성과 창출

C(관습형): 꼼꼼함, 데이터 정리, 원칙/매뉴얼 준수, 체계적인 사무 행정

[나의 진단 데이터]
저는 버크만 진단 결과, 직업적으로 흥미를 느끼는 스타일은 **[${bInterestName}]**이며, 일할 때의 '평소 행동(Usual)' 방식은 **[${bBehaviorName}]**이고, 업무 환경에서 기대하는 내면적 '욕구(Needs)'는 **[${bNeedsName}]**입니다. (홀랜드 주 강점: [${topTypeInfo.name}])

[분석 지시]
위 **[사전 지식 1, 2]**를 엄격한 기준으로 삼아, 나의 행동 스타일을 완벽하게 보완해 주면서 기대하는 환경(욕구)이 비슷해 최고의 시너지가 나는 '찰떡 동료 스타일'을 심층 분석하세요. 그리고 두 사람이 한 팀이 되었을 때 최고의 퍼포먼스를 낼 수 있는 역할 분담을 시뮬레이션하세요.

[출력 규칙]
진단 용어(평소 행동, 욕구, 홀랜드 유형 알파벳 등)는 최종 출력에 절대 포함하지 마세요. 대신 분석 결과를 종합하여, 동료의 특징을 하나의 직관적인 '캐릭터 이름(페르소나)'과 '대표 컬러 1가지'로 규정해 주세요. 당신의 분석 과정이나 부연 설명 없이 아래 양식에만 맞춰 깔끔하게 출력하세요.

(출력 포맷)
■ 찰떡 동료 캐릭터: [동료의 대표 컬러]색의 [동료의 특징을 담은 수식어 + 직업적 역할 명칭] (예: 노란색의 치밀한 기획자)
■ 동료의 핵심 무기: [동료가 가장 잘하는 행동 1줄 요약]
■ 환상의 시너지: 나는 [나의 역할]을 하고, 동료는 [동료의 역할]을 할 때 최고의 성과가 납니다.`;
      } else {
        const teammateConditionText = `행동과 기질 스타일은 서로 보완되어 시너지가 나고`;
        promptBestTeammate = aiIntro + `저는 홀랜드 주 강점이 [${topTypeInfo.name}]입니다.
${tciText}${teammateConditionText}, 기대하는 환경 즉 가치관은 비슷해서 협업이 편안한 '최고의 찰떡 동료 스타일'을 분석해주세요.
만약 그 동료와 제가 한 팀이 된다면, 각각 어떤 역할을 나눠 맡았을 때 최고의 퍼포먼스가 날지도 함께 시뮬레이션 해주세요.`;
      }
    }

    const handleCopyPrompt = (text) => {
      navigator.clipboard.writeText(text);
      alert("해당 프롬프트가 클립보드에 복사되었습니다! AI 채팅창에 붙여넣기 하세요.");
    };



    return (
      <div className="min-h-screen bg-gray-50 p-3 md:p-4 lg:p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* 상단 헤더: 1순위 유형 컬러에 맞춤 */}
            <div className={`${topTypeInfo.barColor} text-white p-6 md:p-8 lg:p-10 text-center`}>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">진단 결과 대시보드</h1>
              <p className="opacity-90 font-medium text-sm md:text-base">나의 흥미(RIASEC)와 직업 가치관 분석 결과</p>
            </div>

            <div className="p-4 md:p-6 lg:p-8 xl:p-12">

              {/* [메인 섹션] 나의 흥미 유형 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center mb-8 md:mb-12 border-b border-gray-100 pb-8 md:pb-12">
                <div className="text-center md:text-left flex-1">
                  <div className={`inline-block px-3 md:px-4 py-1 md:py-1.5 ${topTypeInfo.color} font-bold rounded-full mb-3 md:mb-5 text-xs md:text-sm uppercase tracking-wide`}>
                    나의 최고 강점 유형
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-3 md:mb-5">
                    당신은 <span className={topTypeInfo.color.split(' ')[1]}>{topTypeInfo.name}</span> 입니다
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 md:mb-6 break-keep">
                    {topTypeInfo.desc}
                  </p>
                </div>
                <div className={`
                  w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full flex items-center justify-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl shadow-xl border-4 md:border-8 transform hover:scale-105 transition-transform duration-300 shrink-0
                  ${topTypeInfo.color} ${topTypeInfo.borderColor}
                `}>
                  {topTypeInfo.icon}
                </div>
              </div>

              {/* [대시보드 그리드] 핵심 키워드 & 직업 가치관 */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">

                {/* 1. 핵심 키워드 */}
                <div className="bg-amber-50/50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-amber-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-base md:text-lg lg:text-xl text-amber-800 mb-4 md:mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    MY CORE DNA (핵심 키워드)
                  </h3>
                  <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                    {topKeywords.map((key, idx) => {
                      const type = key.split('-')[0];
                      const typeName = RIASEC_DESCRIPTIONS[type].shortName; // shortName 사용 (현실적, 분석적...)
                      const barColor = RIASEC_DESCRIPTIONS[type].barColor;
                      return (
                        <div key={key} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-amber-100 flex items-center gap-3 md:gap-4">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${barColor} text-white flex items-center justify-center font-bold text-base md:text-lg shrink-0 shadow-sm`}>
                            {idx + 1}
                          </div>
                          <span className="font-bold text-base md:text-lg lg:text-xl text-gray-800 break-keep flex-1">{key.split('-')[1]}</span>
                          <span className="ml-auto text-xs text-gray-500 font-medium px-2 md:px-2.5 py-1 bg-gray-100 rounded-full shrink-0">
                            {typeName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 직업 가치관 */}
                <div className="bg-pink-50/50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-pink-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-base md:text-lg lg:text-xl text-pink-800 mb-4 md:mb-6 flex items-center gap-2">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
                    직업 가치관 (우선순위)
                  </h3>
                  <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4">
                    {selectedValues.map((valId, idx) => (
                      <div key={valId} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-pink-100 flex items-center gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-400 text-white flex items-center justify-center font-bold text-base md:text-lg shrink-0 shadow-sm">
                          {idx + 1}
                        </div>
                        <span className="font-bold text-base md:text-lg lg:text-xl text-gray-800 break-keep">{valId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* [하단] 전체 통계 차트 (R-I-A-S-E-C 순서 고정) */}
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

              {/* [신규 섹션] 버크만 진단 결과 (있을 경우만) */}
              {birkmanContext && (
                <div className="mb-12 md:mb-16 border-t border-gray-100/80 pt-12 md:pt-16">
                  <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-purple-900 mb-8 flex items-center gap-3 tracking-tight">
                    <div className="bg-purple-100 p-2 rounded-xl">
                      <UserCog className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                    </div>
                    일하는 스타일 및 환경 (Birkman)
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {/* 흥미 */}
                    <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-${bInterest}-500 text-center flex flex-col justify-center`}>
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">흥미 (Interests)</div>
                      <div className={`text-2xl md:text-3xl font-black text-${bInterest}-600 tracking-tight`}>{bInterestName}</div>
                    </div>
                    {/* 평소행동 */}
                    <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-${bBehavior}-500 text-center flex flex-col justify-center`}>
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">평소행동 (Usual)</div>
                      <div className={`text-2xl md:text-3xl font-black text-${bBehavior}-600 tracking-tight`}>{bBehaviorName}</div>
                    </div>
                    {/* 욕구 */}
                    <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-${bNeeds}-500 text-center flex flex-col justify-center`}>
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">욕구 (Needs)</div>
                      <div className={`text-2xl md:text-3xl font-black text-${bNeeds}-600 tracking-tight`}>{bNeedsName}</div>
                    </div>
                    {/* 스트레스 */}
                    <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-${bStress}-500 text-center flex flex-col justify-center`}>
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">스트레스 (Stress)</div>
                      <div className={`text-2xl md:text-3xl font-black text-${bStress}-600 tracking-tight`}>{bStressName}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* [신규 섹션] TCI 진단 결과 (있을 경우만) */}
              {tciContext && (
                <div className="mb-12 md:mb-16 border-t border-gray-100/80 pt-12 md:pt-16">
                  <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-indigo-900 mb-8 flex items-center gap-3 tracking-tight">
                    <div className="bg-indigo-100 p-2 rounded-xl">
                      <Brain className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
                    </div>
                    기질 및 성격 (TCI)
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6 lg:mb-8">
                    {/* 자극추구 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-blue-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">자극추구 (NS)</div>
                      <div className="text-2xl md:text-3xl font-black text-blue-600 tracking-tight">{tciContext.NS}%</div>
                    </div>
                    {/* 위험회피 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-rose-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">위험회피 (HA)</div>
                      <div className="text-2xl md:text-3xl font-black text-rose-600 tracking-tight">{tciContext.HA}%</div>
                    </div>
                    {/* 사회적 민감성 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-amber-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">사회성 (RD)</div>
                      <div className="text-2xl md:text-3xl font-black text-amber-600 tracking-tight">{tciContext.RD}%</div>
                    </div>
                    {/* 인내력 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-emerald-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">인내력 (PS)</div>
                      <div className="text-2xl md:text-3xl font-black text-emerald-600 tracking-tight">{tciContext.PS}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {/* 자율성 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-purple-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">자율성 (SD)</div>
                      <div className="text-2xl md:text-3xl font-black text-purple-600 tracking-tight">{tciContext.SD}%</div>
                    </div>
                    {/* 연대감 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-pink-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">연대감 (CO)</div>
                      <div className="text-2xl md:text-3xl font-black text-pink-600 tracking-tight">{tciContext.CO}%</div>
                    </div>
                    {/* 자기초월 */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 border-t-8 border-t-indigo-500 text-center flex flex-col justify-center">
                      <div className="text-xs md:text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest">자기초월 (ST)</div>
                      <div className="text-2xl md:text-3xl font-black text-indigo-600 tracking-tight">{tciContext.ST}%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* [신규 섹션] AI 프롬프트 생성기 (추가 컨텍스트가 있을 때만 5개 블록 출력) */}
              {hasExtraContext && (
                <div className="mb-8 md:mb-12 border-t border-gray-100 pt-8 md:pt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-400 p-2 md:p-3 rounded-full shadow-sm">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-yellow-900" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg md:text-xl lg:text-2xl text-yellow-900">AI 컨설팅 100% 활용하기</h3>
                      <p className="text-sm md:text-base text-gray-600 mt-1">질문하고 싶은 영역의 프롬프트를 복사해 ChatGPT나 Claude에게 물어보세요!</p>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    {/* Prompt 1 */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border-2 border-yellow-200 overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="flex-1 p-4 md:p-6 bg-yellow-50/50 flex flex-col gap-2">
                          <h4 className="font-bold text-yellow-900 text-base md:text-lg">나에게 딱 맞는 직업 추천</h4>
                          <textarea readOnly value={promptJob} className="w-full text-sm md:text-base text-gray-700 bg-transparent resize-none focus:outline-none h-32 md:h-40" />
                        </div>
                        <button onClick={() => handleCopyPrompt(promptJob)} className="bg-yellow-100 hover:bg-yellow-400 text-yellow-900 font-bold py-4 md:py-0 px-6 md:w-32 flex md:flex-col items-center justify-center gap-2 transition-colors">
                          <Copy className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="text-sm md:text-sm">복사하기</span>
                        </button>
                      </div>
                    </div>

                    {/* Prompt 2 */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border-2 border-yellow-200 overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="flex-1 p-4 md:p-6 bg-yellow-50/50 flex flex-col gap-2">
                          <h4 className="font-bold text-yellow-900 text-base md:text-lg">나의 성과를 높여주는 조직 문화</h4>
                          <textarea readOnly value={promptEnv} className="w-full text-sm md:text-base text-gray-700 bg-transparent resize-none focus:outline-none h-24 md:h-28" />
                        </div>
                        <button onClick={() => handleCopyPrompt(promptEnv)} className="bg-yellow-100 hover:bg-yellow-400 text-yellow-900 font-bold py-4 md:py-0 px-6 md:w-32 flex md:flex-col items-center justify-center gap-2 transition-colors">
                          <Copy className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="text-sm md:text-sm">복사하기</span>
                        </button>
                      </div>
                    </div>

                    {/* Prompt 3 */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border-2 border-yellow-200 overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="flex-1 p-4 md:p-6 bg-yellow-50/50 flex flex-col gap-2">
                          <h4 className="font-bold text-yellow-900 text-base md:text-lg">나의 역량을 200% 이끌어내는 상사</h4>
                          <textarea readOnly value={promptBestBoss} className="w-full text-sm md:text-base text-gray-700 bg-transparent resize-none focus:outline-none h-24 md:h-28" />
                        </div>
                        <button onClick={() => handleCopyPrompt(promptBestBoss)} className="bg-yellow-100 hover:bg-yellow-400 text-yellow-900 font-bold py-4 md:py-0 px-6 md:w-32 flex md:flex-col items-center justify-center gap-2 transition-colors">
                          <Copy className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="text-sm md:text-sm">복사하기</span>
                        </button>
                      </div>
                    </div>

                    {/* Prompt 4 */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border-2 border-yellow-200 overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="flex-1 p-4 md:p-6 bg-yellow-50/50 flex flex-col gap-2">
                          <h4 className="font-bold text-yellow-900 text-base md:text-lg">나의 에너지를 갉아먹는 피해야 할 상사</h4>
                          <textarea readOnly value={promptWorstBoss} className="w-full text-sm md:text-base text-gray-700 bg-transparent resize-none focus:outline-none h-24 md:h-28" />
                        </div>
                        <button onClick={() => handleCopyPrompt(promptWorstBoss)} className="bg-yellow-100 hover:bg-yellow-400 text-yellow-900 font-bold py-4 md:py-0 px-6 md:w-32 flex md:flex-col items-center justify-center gap-2 transition-colors">
                          <Copy className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="text-sm md:text-sm">복사하기</span>
                        </button>
                      </div>
                    </div>

                    {/* Prompt 5 */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border-2 border-yellow-200 overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                        <div className="flex-1 p-4 md:p-6 bg-yellow-50/50 flex flex-col gap-2">
                          <h4 className="font-bold text-yellow-900 text-base md:text-lg">완벽한 시너지를 내는 찰떡 동료</h4>
                          <textarea readOnly value={promptBestTeammate} className="w-full text-sm md:text-base text-gray-700 bg-transparent resize-none focus:outline-none h-24 md:h-28" />
                        </div>
                        <button onClick={() => handleCopyPrompt(promptBestTeammate)} className="bg-yellow-100 hover:bg-yellow-400 text-yellow-900 font-bold py-4 md:py-0 px-6 md:w-32 flex md:flex-col items-center justify-center gap-2 transition-colors">
                          <Copy className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="text-sm md:text-sm">복사하기</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 공유 링크 표시 영역 */}
          {shareLink && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-2 border-blue-200 shadow-lg">
              <div className="text-center mb-4 md:mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-3">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <span className="text-sm md:text-base font-bold text-blue-700">공유 링크가 생성되었습니다</span>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  아래 링크를 복사하여 <strong className="text-gray-800">판매자에게 전달</strong>해주세요.
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-1 w-full md:w-auto">
                  <label className="block text-sm md:text-base font-bold text-gray-700 mb-2">공유 링크</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg md:rounded-xl text-xs md:text-sm font-mono break-all"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-xl transition-all flex items-center gap-2 font-bold text-sm md:text-base shadow-md"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                          복사됨!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 md:w-5 md:h-5" />
                          복사
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pb-8 md:pb-12 lg:pb-16">
            {shareLink ? (
              // 공유 링크가 생성된 경우 - 링크 표시는 위에서 이미 표시됨
              null
            ) : (
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-full transition-all shadow-lg hover:-translate-y-0.5 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSharing ? (
                  <>
                    <RefreshCw className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    공유 링크 생성 중...
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    결과 공유하기
                  </>
                )}
              </button>
            )}
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-50 font-bold py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-full transition-all shadow-lg border border-gray-200 hover:-translate-y-0.5 text-sm md:text-base"
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
              다시 검사하기
            </button>
          </div>
        </div>
      </div >
    );
  }

  return null;
}
