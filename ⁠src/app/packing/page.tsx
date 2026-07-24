'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  Palmtree, 
  Tent, 
  Waves, 
  Car,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface PackingItem {
  id: string;
  name: string;
  category: 'camping' | 'beach' | 'hotspring' | 'essential';
  completed: boolean;
}

export default function PackingPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'camping' | 'beach' | 'hotspring' | 'essential'>('all');
  const [newItemName, setNewItemName] = useState('');

  const [items, setItems] = useState<PackingItem[]>([
    { id: '1', name: '駕照與身分證件', category: 'essential', completed: true },
    { id: '2', name: '手機充電線與行動電源', category: 'essential', completed: true },
    { id: '3', name: '車用手機架', category: 'essential', completed: false },
    { id: '4', name: '泳衣與泳帽', category: 'hotspring', completed: false },
    { id: '5', name: '大毛巾與防水袋', category: 'beach', completed: false },
    { id: '6', name: '防蚊液與防曬乳', category: 'camping', completed: true },
    { id: '7', name: '露營桌椅與卡式爐', category: 'camping', completed: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: activeCategory === 'all' ? 'essential' : activeCategory,
      completed: false
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto pb-24 text-slate-700">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2.5 bg-white border-2 border-pink-100 rounded-2xl text-pink-500 hover:bg-pink-50 transition shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-teal-500" />
            行李與裝備打包清單
          </h1>
          <p className="text-xs text-slate-400 font-medium">情境式裝備提醒與整備進度</p>
        </div>
      </div>

      {/* 完成度進度卡片 */}
      <section className="bg-gradient-to-r from-teal-400 to-emerald-400 p-6 rounded-3xl text-white shadow-xl shadow-teal-100 mb-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-xs font-bold opacity-90 mb-1">打包準備進度</div>
            <div className="text-3xl font-black">{progressPercent}%</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold">
            {completedCount} / {items.length} 項目完成
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/10 h-3 rounded-full overflow-hidden p-0.5">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* 情境範本頁籤 */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 text-xs font-bold no-scrollbar">
        <button 
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-2xl border transition whitespace-nowrap ${activeCategory === 'all' ? 'bg-pink-400 text-white border-pink-400 shadow-md shadow-pink-100' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          ✨ 全部項目
        </button>
        <button 
          onClick={() => setActiveCategory('essential')}
          className={`px-4 py-2 rounded-2xl border transition whitespace-nowrap ${activeCategory === 'essential' ? 'bg-pink-400 text-white border-pink-400 shadow-md shadow-pink-100' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          🚗 自駕必備
        </button>
        <button 
          onClick={() => setActiveCategory('beach')}
          className={`px-4 py-2 rounded-2xl border transition whitespace-nowrap ${activeCategory === 'beach' ? 'bg-pink-400 text-white border-pink-400 shadow-md shadow-pink-100' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          🌊 海邊戲水
        </button>
        <button 
          onClick={() => setActiveCategory('camping')}
          className={`px-4 py-2 rounded-2xl border transition whitespace-nowrap ${activeCategory === 'camping' ? 'bg-pink-400 text-white border-pink-400 shadow-md shadow-pink-100' : 'bg-white text-slate-600 border-slate-200'}`}
        >
          ⛺ 露營野炊
        </button>
      </div>

      {/* 新增物品表單 */}
      <section className="bg-white p-4 rounded-3xl border-2 border-pink-100 shadow-md mb-6">
        <form onSubmit={handleAddItem} className="flex gap-2">
          <input
            type="text"
            placeholder="新增想帶的物品..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 bg-amber-50/50 border-2 border-pink-100 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-pink-300"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-pink-400 hover:bg-pink-500 text-white font-bold text-xs rounded-2xl shadow-md shadow-pink-100 transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            新增
          </button>
        </form>
      </section>

      {/* 清單項目 */}
      <section className="space-y-2">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
              item.completed 
                ? 'bg-slate-50/60 border-slate-100 text-slate-400' 
                : 'bg-white border-pink-100 shadow-sm text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-pink-300" />
              )}
              <span className={`text-sm font-bold ${item.completed ? 'line-through' : ''}`}>
                {item.name}
              </span>
            </div>
            
            <span className="text-[10px] font-bold bg-pink-50 text-pink-500 px-2.5 py-1 rounded-full border border-pink-100">
              {item.category === 'essential' && '必備'}
              {item.category === 'beach' && '海邊'}
              {item.category === 'camping' && '露營'}
              {item.category === 'hotspring' && '泡湯'}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
