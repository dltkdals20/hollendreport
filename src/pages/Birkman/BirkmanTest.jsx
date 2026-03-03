import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Activity, UserCog } from 'lucide-react';
import HollandTest from '../Holland/HollandTest'; // Reusing the Holland test component

// Birkman Colors Data
const BIRKMAN_COLORS = [
    { id: 'red', name: '빨강 (Red)', desc: '행동 지향적, 결단력, 문제 해결자', colorClass: 'bg-red-500 hover:bg-red-600', textClass: 'text-red-600', borderClass: 'border-red-500' },
    { id: 'green', name: '초록 (Green)', desc: '사람 중심적, 소통, 설득력', colorClass: 'bg-green-500 hover:bg-green-600', textClass: 'text-green-600', borderClass: 'border-green-500' },
    { id: 'yellow', name: '노랑 (Yellow)', desc: '규칙 기반, 시스템, 디테일', colorClass: 'bg-yellow-400 hover:bg-yellow-500', textClass: 'text-yellow-600', borderClass: 'border-yellow-400' },
    { id: 'blue', name: '파랑 (Blue)', desc: '아이디어 지향적, 계획, 혁신', colorClass: 'bg-blue-500 hover:bg-blue-600', textClass: 'text-blue-600', borderClass: 'border-blue-500' },
];

export default function BirkmanTest() {
    const [birkmanStep, setBirkmanStep] = useState('intro'); // intro -> interest -> behavior -> needs -> stress -> holland

    // State to hold Birkman data
    const [birkmanData, setBirkmanData] = useState({
        interestColor: null,
        behaviorColor: null,
        needsColor: null,
        stressColor: null,
    });

    const handleColorSelect = (type, colorId) => {
        setBirkmanData(prev => ({ ...prev, [type]: colorId }));

        // Auto-advance
        if (type === 'interestColor') {
            setTimeout(() => setBirkmanStep('behavior'), 400);
        } else if (type === 'behaviorColor') {
            setTimeout(() => setBirkmanStep('needs'), 400);
        } else if (type === 'needsColor') {
            setTimeout(() => setBirkmanStep('stress'), 400);
        } else if (type === 'stressColor') {
            setTimeout(() => setBirkmanStep('holland'), 400);
        }
    };

    const handleBack = () => {
        if (birkmanStep === 'interest') setBirkmanStep('intro');
        else if (birkmanStep === 'behavior') setBirkmanStep('interest');
        else if (birkmanStep === 'needs') setBirkmanStep('behavior');
        else if (birkmanStep === 'stress') setBirkmanStep('needs');
    };

    // --- Step 0: Birkman Intro ---
    if (birkmanStep === 'intro') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-purple-100/50 text-center p-10 md:p-16">
                    <div className="bg-purple-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-6">
                        <UserCog className="w-12 h-12 text-purple-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">버크만 기반<br />커리어 진단</h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium break-keep">
                        사전에 안내받으신 <strong className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded">버크만 컬러 지표</strong>를 선택한 후,<br />심층 커리어 진단을 이어갑니다.
                    </p>
                    <button
                        onClick={() => setBirkmanStep('interest')}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-full shadow-[0_8px_30px_rgba(147,51,234,0.3)] hover:shadow-[0_8px_30px_rgba(147,51,234,0.5)] transition-all hover:-translate-y-1 text-lg flex items-center gap-3 mx-auto"
                    >
                        진단 시작하기 <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    // --- Step 1: Birkman Interest ---
    if (birkmanStep === 'interest') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100/50">
                    <div className="bg-gray-900 p-10 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gray-800 rounded-full opacity-30 blur-3xl"></div>
                        <Activity className="w-16 h-16 mx-auto mb-6 opacity-90 relative z-10 text-purple-400" />
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10">흥미 (Interests)</h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium relative z-10 leading-relaxed">직업적으로 무엇을 할 때 가장 즐거우신가요?<br />당신의 '흥미 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8 md:p-12 lg:p-16 bg-gray-50/30">
                        <div className="grid grid-cols-2 gap-5 md:gap-6">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('interestColor', color.id)}
                                    className={`
                    p-6 md:p-8 rounded-3xl border border-gray-100 transition-all duration-300 group relative overflow-hidden flex flex-col items-center
                    ${birkmanData.interestColor === color.id ? `bg-white shadow-xl border-${color.id}-500 ring-4 ring-${color.id}-100 transform -translate-y-1` : 'bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-300'}
                  `}
                                >
                                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${color.colorClass}`}>
                                        {birkmanData.interestColor === color.id && <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>}
                                    </div>
                                    <div className="font-extrabold text-xl md:text-2xl text-center mb-2 text-gray-900 tracking-tight">{color.name}</div>
                                    <div className="text-sm md:text-base text-center text-gray-500 font-medium break-keep leading-relaxed">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-8 py-4 rounded-full transition-all bg-white border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" /> 이전 단계로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Step 2: Birkman Behavior ---
    if (birkmanStep === 'behavior') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100/50">
                    <div className="bg-gray-900 p-10 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gray-800 rounded-full opacity-30 blur-3xl"></div>
                        <UserCog className="w-16 h-16 mx-auto mb-6 opacity-90 relative z-10 text-blue-400" />
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10">평소행동 (Usual)</h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium relative z-10 leading-relaxed">평소 일할 때의 소통 방식이나 스타일은 어떠신가요?<br />당신의 '행동 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8 md:p-12 lg:p-16 bg-gray-50/30">
                        <div className="grid grid-cols-2 gap-5 md:gap-6">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('behaviorColor', color.id)}
                                    className={`
                    p-6 md:p-8 rounded-3xl border border-gray-100 transition-all duration-300 group relative overflow-hidden flex flex-col items-center
                    ${birkmanData.behaviorColor === color.id ? `bg-white shadow-xl border-${color.id}-500 ring-4 ring-${color.id}-100 transform -translate-y-1` : 'bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-300'}
                  `}
                                >
                                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${color.colorClass}`}>
                                        {birkmanData.behaviorColor === color.id && <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>}
                                    </div>
                                    <div className="font-extrabold text-xl md:text-2xl text-center mb-2 text-gray-900 tracking-tight">{color.name}</div>
                                    <div className="text-sm md:text-base text-center text-gray-500 font-medium break-keep leading-relaxed">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-8 py-4 rounded-full transition-all bg-white border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" /> 이전 단계로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Step 3: Birkman Needs ---
    if (birkmanStep === 'needs') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100/50">
                    <div className="bg-gray-900 p-10 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gray-800 rounded-full opacity-30 blur-3xl"></div>
                        <Activity className="w-16 h-16 mx-auto mb-6 opacity-90 relative z-10 text-green-400" />
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10">욕구 (Needs)</h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium relative z-10 leading-relaxed">가장 이상적으로 기대하는 환경이나 보상은 무엇인가요?<br />당신의 '욕구 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8 md:p-12 lg:p-16 bg-gray-50/30">
                        <div className="grid grid-cols-2 gap-5 md:gap-6">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('needsColor', color.id)}
                                    className={`
                    p-6 md:p-8 rounded-3xl border border-gray-100 transition-all duration-300 group relative overflow-hidden flex flex-col items-center
                    ${birkmanData.needsColor === color.id ? `bg-white shadow-xl border-${color.id}-500 ring-4 ring-${color.id}-100 transform -translate-y-1` : 'bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-300'}
                  `}
                                >
                                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${color.colorClass}`}>
                                        {birkmanData.needsColor === color.id && <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>}
                                    </div>
                                    <div className="font-extrabold text-xl md:text-2xl text-center mb-2 text-gray-900 tracking-tight">{color.name}</div>
                                    <div className="text-sm md:text-base text-center text-gray-500 font-medium break-keep leading-relaxed">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-8 py-4 rounded-full transition-all bg-white border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" /> 이전 단계로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Step 4: Birkman Stress Behavior ---
    if (birkmanStep === 'stress') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100/50">
                    <div className="bg-gray-900 p-10 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-900 rounded-full opacity-20 blur-3xl"></div>
                        <Activity className="w-16 h-16 mx-auto mb-6 opacity-90 relative z-10 text-red-500" />
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10 text-white">스트레스 (Stress)</h1>
                        <p className="text-red-200 text-lg md:text-xl font-medium relative z-10 leading-relaxed">기대하는 환경이 주어지지 않고 스트레스를 받을 때<br />어떻게 행동하시나요? 당신의 '스트레스 행동 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8 md:p-12 lg:p-16 bg-gray-50/30">
                        <div className="grid grid-cols-2 gap-5 md:gap-6">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('stressColor', color.id)}
                                    className={`
                    p-6 md:p-8 rounded-3xl border border-gray-100 transition-all duration-300 group relative overflow-hidden flex flex-col items-center
                    ${birkmanData.stressColor === color.id ? `bg-white shadow-xl border-${color.id}-500 ring-4 ring-${color.id}-100 transform -translate-y-1` : 'bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-300'}
                  `}
                                >
                                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${color.colorClass}`}>
                                        {birkmanData.stressColor === color.id && <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>}
                                    </div>
                                    <div className="font-extrabold text-xl md:text-2xl text-center mb-2 text-gray-900 tracking-tight">{color.name}</div>
                                    <div className="text-sm md:text-base text-center text-gray-500 font-medium break-keep leading-relaxed">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={handleBack}
                                className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 font-bold px-8 py-4 rounded-full transition-all bg-white border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" /> 이전 단계로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Step 5: Transition to Holland ---
    if (birkmanStep === 'holland') {
        // We pass the collected birkman data as props to the HollandTest component
        // The Holland component will need to be modified to accept "initialContext"
        return <HollandTest birkmanContext={birkmanData} />;
    }

    return null;
}
