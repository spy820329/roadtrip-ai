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
  Heart,
  Clock,
  Fuel,
  Utensils,
  Hotel,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface ItineraryItem {
  timeSlot: string;
  category: 'spot' | 'restaurant' | 'gas_station' | 'hotel';
  title: string;
  note: string;
  estimatedCost: number;
}

interface TravelBrainResult {
  summary: string;
  totalEstimatedCost: number;
  routeHighlights: string[];
  itinerary: ItineraryItem[];
}

export default function Home() {
  const [promptInput, setPromptInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<TravelBrainResult | null>(null);

  const handleTravelBrainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    
    setIsProcessing(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/travel-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptInput }),
      });
      const resData = await response.json();
      if (resData.success) {
        setAiResult(resData.data);
      }
    } catch (err) {
      console.error('Failed to call travel-brain API', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'spot':
        return { icon: MapPin, label: '景點', color: 'bg-emerald-100 text-emerald-600 border-emerald-200' };
      case 'restaurant':
        return { icon: Utensils, label: '美食', color: 'bg-amber-100 text-amber-700 border-amber-200' };
      case 'gas_station':
        return { icon: Fuel, label: '加油站', color: 'bg-sky-100 text-sky-600 border-sky-200' };
      case 'hotel':
        return { icon: Hotel, label: '住宿 Check-in', color: 'bg-purple-100 text-purple-600 border-purple-200' };
      default:
        return { icon: MapPin, label: '行程', color: 'bg-pink-100 text-pink-600 border-pink-200' };
    }
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

      {/* AI Travel Brain Hero Section */}
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
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>

        {/* 快捷標籤 */}
        <div className="flex flex-wrap gap-2 mt-4 text-xs font-bold">
          <span 
            className="cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full border border-pink-200 transition"
            onClick={() => setPromptInput('今天想去海邊放空，下午五點前入住，不想走回頭路，預算1000元')}
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

      {/* AI 旅行大腦 運算結果時間軸 (Dynamic Timeline Result) */}
      {aiResult && (
        <section className="bg-white p-6 rounded-3xl border-2 border-pink-200 shadow-xl mb-8 animate-fade-in">
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-pink-100">
            <div>
              <span className="text-xs font-bold bg-pink-100 text-pink-600 px-3 py-1 rounded-full border border-pink-200">
                ✨ Travel Brain AI 自動算好囉！
              </span>
              <p className="text-sm font-bold text-slate-800 mt-2">{aiResult.summary}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold">預估總花費</span>
              <div className="text-lg font-black text-pink-500">${aiResult.totalEstimatedCost}</div>
            </div>
          </div>

          {/* Highlights 標籤 */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {aiResult.routeHighlights.map((hl, idx) => (
              <span key={idx} className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-amber-500" />
                {hl}
              </span>
            ))}
          </div>

          {/* 時間軸清單 */}
          <div className="relative pl-6 border-l-2 border-pink-200 space-y-6">
            {aiResult.itinerary.map((item, idx) => {
              const badge = getCategoryBadge(item.category);
              const BadgeIcon = badge.icon;
              return (
                <div key={idx} className="relative group">
                  {/* 時間軸節點小圓圈 */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-pink-400 border-4 border-white shadow-sm" />

                  <div className="bg-slate-50/80 hover:bg-pink-50/30 border border-slate-200/80 hover:border-pink-200 rounded-2xl p-4 transition shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-400" />
                          {item.timeSlot}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.color}`}>
                          <BadgeIcon className="w-3 h-3" />
                          {badge.label}
                        </span>
                      </div>
                      {item.estimatedCost > 0 && (
                        <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          ${item.estimatedCost}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

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
