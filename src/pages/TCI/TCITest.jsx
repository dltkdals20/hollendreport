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
    };

    // 1. 인트로 페이지
    if (step === 'intro') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 p-8 md:p-12 text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-6 text-indigo-500 opacity-90" />
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">TCI 기질 및 성격 검사 결과 분석기</h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed break-keep">
                        내가 진행한 TCI 검사 결과지에 있는 <strong className="text-indigo-600">백분위 점수(0~100)</strong>를
                        입력하면 심층적인 분석과 맞춤형 AI 질문 프롬프트를 생성해 드립니다.
                    </p>

                    <div className="flex justify-center flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => setStep('input')}
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full transition-transform hover:-translate-y-1 shadow-lg text-lg"
                        >
                            내 결과 입력하기
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => window.location.href = '/holland'}
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 md:py-4 px-8 md:px-10 rounded-full transition-transform hover:-translate-y-1 shadow-sm"
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
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">TCI 지표 입력</h2>
                        <p className="text-gray-600 text-sm md:text-base">결과지에 나와있는 <strong className="text-indigo-600">백분위(Percentile) 점수</strong>를 정확히 입력해주세요.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        {/* 기질 영역 */}
                        <div className="p-6 md:p-8 border-b border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-indigo-100 p-2 rounded-xl">
                                    <Brain className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">기질 (Temperament)</h3>
                                    <p className="text-sm text-gray-500">선천적으로 타고난 정서적 반응 양식</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {temperaments.map(scale => (
                                    <div key={scale.id} className={`p-4 rounded-2xl border-2 ${scale.border} ${scale.bg} transition-colors`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <label htmlFor={scale.id} className={`font-bold ${scale.color}`}>
                                                {scale.name}
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-3">{scale.desc}</p>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id={scale.id}
                                                value={scores[scale.id]}
                                                onChange={(e) => handleScoreChange(scale.id, e.target.value)}
                                                placeholder="0~100"
                                                min="0"
                                                max="100"
                                                className={`w-full text-right font-bold text-lg md:text-xl py-2 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 ${scale.ring} shadow-sm`}
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                            {/* 입력 영역 확보를 위해 오른쪽 패딩 조정 */}
                                            <style>{`#${scale.id} { padding-right: 2rem; }`}</style>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 성격 영역 */}
                        <div className="p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-pink-100 p-2 rounded-xl">
                                    <Heart className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">성격 (Character)</h3>
                                    <p className="text-sm text-gray-500">가족, 사회 영향을 받아 후천적으로 발달한 가치관</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {characters.map(scale => (
                                    <div key={scale.id} className={`p-4 rounded-2xl border-2 ${scale.border} ${scale.bg} transition-colors`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <label htmlFor={scale.id} className={`font-bold ${scale.color}`}>
                                                {scale.name}
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-3">{scale.desc}</p>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id={scale.id}
                                                value={scores[scale.id]}
                                                onChange={(e) => handleScoreChange(scale.id, e.target.value)}
                                                placeholder="0~100"
                                                min="0"
                                                max="100"
                                                className={`w-full text-right font-bold text-lg md:text-xl py-2 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 ${scale.ring} shadow-sm`}
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                            <style>{`#${scale.id} { padding-right: 2rem; }`}</style>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                                className={`w-full py-4 rounded-2xl font-bold text-lg md:text-xl flex justify-center items-center gap-2 transition-all shadow-lg
                   ${isFormValid
                                        ? 'bg-gray-900 hover:bg-black text-white hover:-translate-y-1 cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                 `}
                            >
                                결과 프로파일링 보기 <ChevronRight className="w-6 h-6" />
                            </button>
                            {!isFormValid && (
                                <p className="text-center text-red-500 text-sm mt-3 font-medium">모든 항목에 0에서 100 사이의 숫자를 입력해주세요.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 3. 결과 페이지로 이동 (홀랜드 테스트에 tciContext 전달)
    if (step === 'holland') {
        return <HollandTest tciContext={scores} />;
    }

    return null;
}
