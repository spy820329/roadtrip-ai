'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  DollarSign, 
  Car, 
  Package, 
  CloudSun, 
  Share2, 
  Bot, 
  Camera, 
  Settings, 
  Users, 
  Send,
  Navigation,
  Heart
} from 'lucide-react';

export default function Home() {
  const [promptInput, setPromptInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTravelBrainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`✨ AI旅行大腦收到囉！：「${promptInput}」\n（正在為你規劃超棒的甜美自駕行程～）`);
    }, 1200);
  };

  const modules = [
    { id: 1, name: '旅伴與群組', icon: Users, color: 'bg-pink-100 text-pink-500 border-pink-200' },
    { id: 2, name: '行程規劃', icon: Compass, color: 'bg-emerald-100 text-emerald-500 border-emerald-200' },
    { id: 3, name: '地圖導航', icon: Navigation, color: 'bg-sky-100 text-sky-500 border-sky-200' },
    { id: 4, name: 'AI 智慧排程', icon: Sparkles, color: 'bg-purple-100 text-purple-500 border-purple-200' },
    { id: 5, name: '記帳與分帳', icon: DollarSign, color: 'bg-amber-100 text-amber-600 border-amber-200' },
    { id: 6, name: '愛車與油耗', icon: Car, color: 'bg-indigo-100 text-indigo-500 border-indigo-200' },
    { id: 7, name: '打包清單', icon: Package, color: 'bg-teal-100 text-teal-600 border-teal-200' },
    { id: 8, name: '天氣與海況', icon: CloudSun, color: 'bg-orange-100 text-orange-500 border-orange-200' },
    { id: 9, name: '社群分享', icon: Share2, color: 'bg-rose-100 text-rose-500 border-rose-200' },
    { id: 10, name: '旅行小幫手', icon: Bot, color: 'bg-cyan-100 text-cyan-600 border-cyan-200' },
    { id: 11, name: '回憶相簿', icon: Camera, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
    { id: 12, name: '系統設定', icon: Settings, color: 'bg-slate-100 text-slate-500 border-slate-200' },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto pb-24 text-slate-700">
      {/* 可愛風格 Header */}
      <header className="flex justify-between items-center py-4 mb-6 border-b-2 border-pink-100">
        <div className="flex items-center gap-2">
          <div className="bg-pink-400 text-white p-2 rounded-2xl shadow-md rotate-3">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-wide flex items-center gap-1.5">
              RoadTrip AI <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-500 font-bold border border-pink-200">v3.0</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">✨ 陪你一起去出遊的可愛旅伴</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white font-bold text-xs rounded-full shadow-md shadow-pink-200 transition transform hover:-translate-y-0.5">
          登入 / 註冊 🎈
        </button>
      </header>

      {/* 明亮可愛版 AI Travel Brain HERO */}
      <section className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-xl shadow-pink-100/50 mb-8 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-pink-500 font-bold text-base">
          <Sparkles className="w-5 h-5 animate-bounce" />
          <span>AI 旅行大腦 (Travel Brain)</span>
        </div>

        <p className="text-slate-500 text-xs sm:text-sm mb-4 font-medium">
          直接告訴我你的想法，美食、景點、加油與停車場全部幫你搞定！
        </p>

        <form onSubmit={handleTravelBrainSubmit} className="relative">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="例如：今天想去海邊放空，下午五點前入住，不想走回頭路，預算1000元..."
            className="w-full bg-amber-50/50 border-2 border-pink-200 focus:border-pink-400 rounded-2xl p-4 pr-14 text-sm text-slate-700 placeholder-slate-400 focus:outline-none resize-none h-28 shadow-inner transition"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="absolute right-3 bottom-4 p-3 bg-gradient-to-r from-pink-400 to-amber-400 hover:opacity-90 rounded-2xl text-white shadow-md shadow-pink-200 transition flex items-center justify-center transform active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* 快捷標籤 */}
        <div className="flex flex-wrap gap-2 mt-4 text-xs font-bold">
          <span 
            className="cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full border border-pink-200 transition"
            onClick={() => setPromptInput('尋找沿海平價景點，包含私房海景咖啡廳，下午四點前抵達飯店')}
          >
            🌊 沿海放鬆行程
          </span>
          <span 
            className="cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 transition"
            onClick={() => setPromptInput('規劃順路中油加油站與好停車的夜市小吃')}
          >
            ⛽ 順路加油 + 夜市吃美味
          </span>
        </div>
      </section>

      {/* 12 Core Modules 明亮風格 */}
      <section>
        <h2 className="text-base font-bold mb-4 text-slate-800 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-pink-400" />
          探索 12 大旅行模組
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {modules.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <div 
                key={mod.id}
                className="bg-white hover:bg-amber-50/40 border-2 border-slate-100 hover:border-pink-200 rounded-2xl p-4 flex flex-col items-start gap-3 cursor-pointer transition shadow-sm hover:shadow-md group"
              >
                <div className={`p-3 rounded-2xl border ${mod.color} group-hover:scale-110 transition duration-300 shadow-sm`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-300 tracking-wider">MODULE {mod.id.toString().padStart(2, '0')}</div>
                  <div className="text-sm font-bold text-slate-700 mt-0.5">{mod.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
