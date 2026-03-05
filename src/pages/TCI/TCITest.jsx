import React, { useState } from 'react';
import { Sparkles, ArrowRight, Brain, Heart, ChevronRight } from 'lucide-react';
import HollandTest from '../Holland/HollandTest';

const TCI_SCALES = [
    { id: 'NS', name: '자극추구', type: 'temperament', desc: '새로운 자극에 끌리고 흥분하는 성향', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', ring: 'focus:ring-blue-500' },
    { id: 'HA', name: '위험회피', type: 'temperament', desc: '위험이나 불확실성을 피하려는 성향', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', ring: 'focus:ring-rose-500' },
    { id: 'RD', name: '사회적 민감성', type: 'temperament', desc: '타인의 감정이나 사회적 신호에 반응하는 성향', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', ring: 'focus:ring-amber-500' },
    { id: 'PS', name: '인내력', type: 'temperament', desc: '보상이 없어도 꾸준히 지속하는 성향', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', ring: 'focus:ring-emerald-500' },
    { id: 'SD', name: '자율성', type: 'character', desc: '스스로 목표를 세우고 통제하는 능력', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', ring: 'focus:ring-purple-500' },
    { id: 'CO', name: '연대감', type: 'character', desc: '타인을 수용하고 공감하며 협력하는 능력', color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200', ring: 'focus:ring-pink-500' },
    { id: 'ST', name: '자기초월', type: 'character', desc: '우주만물과 자연의 일부로서 자신을 이해하는 성향', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', ring: 'focus:ring-indigo-500' },
];

export default function TCITest() {
    const [step, setStep] = useState('intro'); // intro -> input -> result
    const [scores, setScores] = useState({
        NS: '',
        HA: '',
        RD: '',
        PS: '',
        SD: '',
        CO: '',
        ST: ''
    });
    const [userInfo, setUserInfo] = useState({ major: '', pastJob: '' });

    const handleUserInfoChange = (field, value) => {
        setUserInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleScoreChange = (id, value) => {
        // Only allow numbers between 0 and 100
        if (value === '') {
            setScores(prev => ({ ...prev, [id]: value }));
            return;
        }

        const num = parseInt(value, 10);
        if (!isNaN(num) && num >= 0 && num <= 100) {
            setScores(prev => ({ ...prev, [id]: num }));
        }
    };

    const isFormValid = Object.values(scores).every(val => val !== '' && val >= 0 && val <= 100);

    const handleSubmit = () => {
        if (isFormValid) {
            setStep('holland');
        }
    };

    const restart = () => {
        setStep('intro');
        setScores({ NS: '', HA: '', RD: '', PS: '', SD: '', CO: '', ST: '' });
        setUserInfo({ major: '', pastJob: '' });
    };

    // 1. 인트로 페이지
    if (step === 'intro') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-indigo-100/50 p-10 md:p-16 text-center">
                    <div className="bg-indigo-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-6">
                        <Sparkles className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">TCI 기질 및<br />성격 검사 분석</h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed break-keep font-medium">
                        결과지에 안내된 <strong className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">백분위 점수(0~100)</strong>를 입력하면,<br />심층적인 분석과 맞춤형 AI 질문 프롬프트를 생성합니다.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => setStep('input')}
                            className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-[0_8px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.5)] hover:-translate-y-1 text-lg"
                        >
                            내 결과 입력하기
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => window.location.href = '/holland'}
                            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-4 px-10 rounded-full transition-all shadow-sm text-lg"
                        >
                            홀랜드 진단으로 이동
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. 점수 입력 폼 페이지
    if (step === 'input') {
        const temperaments = TCI_SCALES.filter(s => s.type === 'temperament');
        const characters = TCI_SCALES.filter(s => s.type === 'character');

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">TCI 지표 입력</h2>
                        <p className="text-gray-500 text-base md:text-lg font-medium">결과지에 표기된 <strong className="text-indigo-600">백분위(Percentile) 점수</strong>를 정확히 입력해주세요.</p>
                    </div>

                    {/* 배경 정보 섹션 */}
                    <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100/50">
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-50 p-3 rounded-2xl">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">기본 배경 정보</h3>
                                    <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">모두 선택 사항이니 해당 없으면 비워두고 다음으로 넘어가주세요.</p>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                                <div className="p-5 md:p-6 rounded-3xl border border-gray-100 bg-gray-50/50">
                                    <label className="font-extrabold text-base text-indigo-600 mb-2 block">전공 <span className="text-gray-400 font-medium text-sm">(선택 기입 사항)</span></label>
                                    <p className="text-sm text-gray-500 mb-4">대학교 전공 계열 또는 학과</p>
                                    <input
                                        type="text"
                                        value={userInfo.major}
                                        onChange={(e) => handleUserInfoChange('major', e.target.value)}
                                        placeholder="예) 경영학, 심리학 (선택)"
                                        className="w-full py-3 px-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all bg-white text-gray-800 font-medium"
                                    />
                                </div>
                                <div className="p-5 md:p-6 rounded-3xl border border-gray-100 bg-gray-50/50">
                                    <label className="font-extrabold text-base text-indigo-600 mb-2 block">이전 직장 직무 <span className="text-gray-400 font-medium text-sm">(선택 기입 사항)</span></label>
                                    <p className="text-sm text-gray-500 mb-4">이전에 경험한 직무나 업종</p>
                                    <input
                                        type="text"
                                        value={userInfo.pastJob}
                                        onChange={(e) => handleUserInfoChange('pastJob', e.target.value)}
                                        placeholder="예) 영업, 인사관리 (없으면 비워두세요)"
                                        className="w-full py-3 px-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all bg-white text-gray-800 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100/50">
                        {/* 기질 영역 */}
                        <div className="p-8 md:p-12 lg:p-16 border-b border-gray-100/80">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-50 p-3 rounded-2xl">
                                    <Brain className="w-7 h-7 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">기질 (Temperament)</h3>
                                    <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">선천적으로 타고난 정서적 반응 양식</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                                {temperaments.map(scale => (
                                    <div key={scale.id} className={`p-5 md:p-6 rounded-3xl border border-gray-100 bg-gray-50/50 transition-all hover:bg-white hover:shadow-md hover:border-${scale.color.split('-')[1]}-200`}>
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor={scale.id} className={`font-extrabold text-lg ${scale.color}`}>
                                                {scale.name}
                                            </label>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-5 break-keep leading-relaxed">{scale.desc}</p>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id={scale.id}
                                                value={scores[scale.id]}
                                                onChange={(e) => handleScoreChange(scale.id, e.target.value)}
                                                placeholder="0~100"
                                                min="0"
                                                max="100"
                                                className={`w-full text-right font-black text-xl md:text-2xl py-3 px-5 pt-4 rounded-2xl border-2 border-gray-200 focus:border-transparent focus:outline-none focus:ring-4 ${scale.ring.replace('focus:ring-', 'focus:ring-').replace('500', '100')} transition-all bg-white`}
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xl">%</span>
                                            {/* 입력 영역 확보를 위해 오른쪽 패딩 조정 */}
                                            <style>{`#${scale.id} { padding-right: 2.5rem; }`}</style>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 성격 영역 */}
                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-pink-50 p-3 rounded-2xl">
                                    <Heart className="w-7 h-7 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">성격 (Character)</h3>
                                    <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">가족, 사회 영향을 받아 후천적으로 발달한 가치관</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                                {characters.map(scale => (
                                    <div key={scale.id} className={`p-5 md:p-6 rounded-3xl border border-gray-100 bg-gray-50/50 transition-all hover:bg-white hover:shadow-md hover:border-${scale.color.split('-')[1]}-200`}>
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor={scale.id} className={`font-extrabold text-lg ${scale.color}`}>
                                                {scale.name}
                                            </label>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-5 break-keep leading-relaxed">{scale.desc}</p>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id={scale.id}
                                                value={scores[scale.id]}
                                                onChange={(e) => handleScoreChange(scale.id, e.target.value)}
                                                placeholder="0~100"
                                                min="0"
                                                max="100"
                                                className={`w-full text-right font-black text-xl md:text-2xl py-3 px-5 pt-4 rounded-2xl border-2 border-gray-200 focus:border-transparent focus:outline-none focus:ring-4 ${scale.ring.replace('focus:ring-', 'focus:ring-').replace('500', '100')} transition-all bg-white`}
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xl">%</span>
                                            <style>{`#${scale.id} { padding-right: 2.5rem; }`}</style>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 md:p-12 lg:p-16 bg-gray-50/50 border-t border-gray-100/80">
                            <button
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                                className={`w-full py-5 rounded-2xl font-black text-lg md:text-xl flex justify-center items-center gap-3 transition-all shadow-lg
                   ${isFormValid
                                        ? 'bg-gray-900 hover:bg-black text-white hover:-translate-y-1 hover:shadow-xl cursor-pointer'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
                 `}
                            >
                                결과 프로파일링 보기 <ChevronRight className="w-6 h-6" />
                            </button>
                            {!isFormValid && (
                                <p className="text-center text-red-500 text-sm mt-4 font-bold tracking-wide">모든 항목에 0에서 100 사이의 숫자를 입력해주세요.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 3. 결과 페이지로 이동 (홀랜드 테스트에 tciContext 전달)
    if (step === 'holland') {
        return <HollandTest tciContext={{ ...scores, major: userInfo.major, pastJob: userInfo.pastJob }} />;
    }

    return null;
}
