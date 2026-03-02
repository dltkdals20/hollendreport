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
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 text-center p-8 md:p-12">
                    <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserCog className="w-10 h-10 text-purple-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">버크만 기반 커리어 진단</h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed break-keep">
                        사전에 안내받으신 <strong className="text-purple-600">버크만 흥미(Interests) 컬러</strong>와 <strong className="text-purple-600">평소행동(Behavior) 컬러</strong>를 선택한 후, 커리어 진단을 이어갑니다.
                    </p>
                    <button
                        onClick={() => setBirkmanStep('interest')}
                        className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 text-lg flex items-center gap-2 mx-auto"
                    >
                        검사 시작하기 <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        );
    }

    // --- Step 1: Birkman Interest ---
    if (birkmanStep === 'interest') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="bg-gray-900 p-8 text-center text-white relative">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h1 className="text-3xl font-extrabold mb-2">버크만 진단: 흥미(Interests)</h1>
                        <p className="text-gray-300">직업적으로 무엇을 할 때 가장 즐거우신가요?<br />당신의 '흥미 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 gap-4">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('interestColor', color.id)}
                                    className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden
                    ${birkmanData.interestColor === color.id ? `${color.borderClass} bg-gray-50 ring-2 ring-offset-2 ring-gray-900` : 'border-gray-200 hover:border-gray-300 bg-white'}
                  `}
                                >
                                    <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${color.colorClass}`}>
                                        {birkmanData.interestColor === color.id && <div className="w-4 h-4 bg-white rounded-full"></div>}
                                    </div>
                                    <div className="font-bold text-lg text-center mb-1 text-gray-800">{color.name}</div>
                                    <div className="text-xs text-center text-gray-500 break-keep">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
                            >
                                <ChevronLeft className="w-4 h-4" /> 이전 단계로
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
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="bg-gray-900 p-8 text-center text-white relative">
                        <UserCog className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h1 className="text-3xl font-extrabold mb-2">버크만 진단: 평소행동(Behavior)</h1>
                        <p className="text-gray-300">평소 일할 때의 소통 방식이나 스타일은 어떠신가요?<br />당신의 '행동 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 gap-4">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('behaviorColor', color.id)}
                                    className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden
                    ${birkmanData.behaviorColor === color.id ? `${color.borderClass} bg-gray-50 ring-2 ring-offset-2 ring-gray-900` : 'border-gray-200 hover:border-gray-300 bg-white'}
                  `}
                                >
                                    <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${color.colorClass}`}>
                                        {birkmanData.behaviorColor === color.id && <div className="w-4 h-4 bg-white rounded-full"></div>}
                                    </div>
                                    <div className="font-bold text-lg text-center mb-1 text-gray-800">{color.name}</div>
                                    <div className="text-xs text-center text-gray-500 break-keep">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
                            >
                                <ChevronLeft className="w-4 h-4" /> 이전 단계로
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
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="bg-gray-900 p-8 text-center text-white relative">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h1 className="text-3xl font-extrabold mb-2">버크만 진단: 욕구(Needs)</h1>
                        <p className="text-gray-300">가장 이상적으로 기대하는 환경이나 보상은 무엇인가요?<br />당신의 '욕구 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 gap-4">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('needsColor', color.id)}
                                    className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden
                    ${birkmanData.needsColor === color.id ? `${color.borderClass} bg-gray-50 ring-2 ring-offset-2 ring-gray-900` : 'border-gray-200 hover:border-gray-300 bg-white'}
                  `}
                                >
                                    <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${color.colorClass}`}>
                                        {birkmanData.needsColor === color.id && <div className="w-4 h-4 bg-white rounded-full"></div>}
                                    </div>
                                    <div className="font-bold text-lg text-center mb-1 text-gray-800">{color.name}</div>
                                    <div className="text-xs text-center text-gray-500 break-keep">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
                            >
                                <ChevronLeft className="w-4 h-4" /> 이전 단계로
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
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="bg-gray-900 p-8 text-center text-white relative">
                        <Activity className="w-12 h-12 mx-auto mb-4 text-red-400 opacity-90" />
                        <h1 className="text-3xl font-extrabold mb-2 text-red-400">버크만 진단: 스트레스(Stress)</h1>
                        <p className="text-gray-300">기대하는 환경이 주어지지 않고 스트레스를 받을 때 어떻게 행동하시나요?<br />당신의 '스트레스 행동 컬러'를 선택해주세요.</p>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 gap-4">
                            {BIRKMAN_COLORS.map(color => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect('stressColor', color.id)}
                                    className={`
                    p-6 rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden
                    ${birkmanData.stressColor === color.id ? `${color.borderClass} bg-gray-50 ring-2 ring-offset-2 ring-gray-900` : 'border-gray-200 hover:border-gray-300 bg-white'}
                  `}
                                >
                                    <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${color.colorClass}`}>
                                        {birkmanData.stressColor === color.id && <div className="w-4 h-4 bg-white rounded-full"></div>}
                                    </div>
                                    <div className="font-bold text-lg text-center mb-1 text-gray-800">{color.name}</div>
                                    <div className="text-xs text-center text-gray-500 break-keep">{color.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
                            >
                                <ChevronLeft className="w-4 h-4" /> 이전 단계로
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
