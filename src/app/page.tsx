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
  Navigation
} from 'lucide-react';

export default function Home() {
  const [promptInput, setPromptInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTravelBrainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    
    setIsProcessing(true);
    // TODO: 串接 Firebase Cloud Functions & AI API Engine
    setTimeout(() => {
      setIsProcessing(false);
      alert(`AI旅行大腦已收到指令：「${promptInput}」\n（系統正進行景點、美食、停車與油耗的最佳化計算）`);
    }, 1200);
  };

  const modules = [
    { id: 1, name: '使用者與旅伴', icon: Users, color: 'bg-blue-500' },
    { id: 2, name: '行程規劃', icon: Compass, color: 'bg-emerald-500' },
    { id: 3, name: 'Google Maps', icon: Navigation, color: 'bg-red-500' },
    { id: 4, name: 'AI 動態排程', icon: Sparkles, color: 'bg-purple-500' },
    { id: 5, name: '記帳與分帳', icon: DollarSign, color: 'bg-amber-500' },
    { id: 6, name: '車輛與油耗', icon: Car, color: 'bg-indigo-500' },
    { id: 7, name: '行李與裝備', icon: Package, color: 'bg-teal-500' },
    { id: 8, name: '天氣與海況', icon: CloudSun, color: 'bg-sky-500' },
    { id: 9, name: '社群分享', icon: Share2, color: 'bg-pink-500' },
    { id: 10, name: 'AI 即時助手', icon: Bot, color: 'bg-cyan-500' },
    { id: 11, name: '旅行回憶錄', icon: Camera, color: 'bg-orange-500' },
    { id: 12, name: '系統設定', icon: Settings, color: 'bg-slate-500' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 max-w-4xl mx-auto pb-24">
      {/* App Header */}
      <header className="flex justify-between items-center py-4 mb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            RoadTrip AI <span className="text-xs px-2 py-0.5 rounded border border-teal-500/30 text-teal-300">v3.0</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">智慧自駕全方位助理</p>
        </div>
        <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-full transition">
          登入 / 註冊
        </button>
      </header>

      {/* AI Travel Brain Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-850 p-6 rounded-2xl border border-slate-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-3 text-teal-400 font-semibold text-sm">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>AI 旅行大腦 (Travel Brain)</span>
        </div>

        <p className="text-slate-300 text-sm mb-4">
          告訴我你的想法，AI 將自動完成「行程、美食、加油、停車」全程規劃：
        </p>

        <form onSubmit={handleTravelBrainSubmit} className="relative">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="例如：今天想去海邊，下午五點前入住，不想走回頭路，預算1000元..."
            className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-4 pr-12 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none h-28 shadow-inner"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="absolute right-3 bottom-4 p-2.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 rounded-lg text-white shadow-lg transition flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-400">
          <span className="cursor-pointer bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700/50" onClick={() => setPromptInput('尋找沿海平價景點，包含私房海景咖啡廳，下午四點前抵達飯店')}>
            🌊 海邊放鬆行程
          </span>
          <span className="cursor-pointer bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700/50" onClick={() => setPromptInput('規劃順路中油加油站與好停車的夜市小吃')}>
            ⛽ 順路加油與夜市
          </span>
        </div>
      </section>

      {/* 12 Core Modules Grid */}
      <section>
        <h2 className="text-base font-semibold mb-4 text-slate-200 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-400" />
          系統核心功能儀表板
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {modules.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <div 
                key={mod.id}
                className="bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 rounded-xl p-4 flex flex-col items-start gap-3 cursor-pointer transition hover:border-slate-700 group"
              >
                <div className={`p-2.5 rounded-lg ${mod.color} bg-opacity-20 text-white group-hover:scale-105 transition`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">模組 {mod.id.toString().padStart(2, '0')}</div>
                  <div className="text-sm font-medium text-slate-200">{mod.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
