'use client';
import { useState, useEffect } from 'react';
import { MapPin, Navigation, Droplet, Wallet, Camera, ChevronLeft, Share, Route, Sparkles, Clock, PlusCircle, Coffee, Fuel } from 'lucide-react';

// --- 初始資料庫 ---
const initialTripData = {
  tripName: "花東六天五夜熱血環島",
  car: { model: "Toyota Vios", tankCapacity: 35, currentGas: 100, efficiency: 14 },
  budget: { totalPaid: 9710, totalUnpaid: 4600 },
  days: [
    {
      day: 1, date: "7/26 (日)", summary: "台南出發 ➔ 台東",
      gasWarning: "⚠️ 台南至台東約 160km，出發前請確認油表，預計消耗 1/3 桶油。",
      events: [
        { id: "d1-1", time: "12:00", title: "出發", location: "台南火車站", type: "drive" },
        { id: "d1-2", time: "15:00", title: "抵達台東住宿", location: "蘋果商務旅店", type: "hotel", cost: 1770, status: "paid" },
        { id: "d1-3", time: "18:30", title: "逛鐵花村、台東夜市", location: "鐵花村音樂聚落", type: "spot", note: "美食推薦：林家臭豆腐" }
      ]
    },
    {
      day: 2, date: "7/27 (一)", summary: "台東 ➔ 綠島探險",
      gasWarning: "🅿️ 車輛停放富岡漁港，無需加油。",
      events: [
        { id: "d2-1", time: "11:30", title: "搭船 (綠島之星)", location: "富岡漁港", type: "boat" },
        { id: "d2-2", time: "14:00", title: "藍洞探險", location: "綠島 藍洞", type: "spot" },
        { id: "d2-3", time: "20:00", title: "夜探梅花鹿、海邊看流星", location: "綠島", type: "spot" },
        { id: "d2-4", time: "22:00", title: "夜宿柴口岸", location: "綠島 柴口岸民宿", type: "hotel", cost: 4600, status: "unpaid", note: "含船票與體驗" }
      ]
    },
    {
      day: 3, date: "7/28 (二)", summary: "綠島 ➔ 花蓮市區",
      gasWarning: "⛽ 沿途經台11線，建議在成功鎮加油站補充電量與油料。",
      events: [
        { id: "d3-1", time: "09:00", title: "半潛船", location: "綠島南寮漁港", type: "spot" },
        { id: "d3-2", time: "12:30", title: "搭船回台東", location: "富岡漁港", type: "boat" },
        { id: "d3-3", time: "14:00", title: "小野柳", location: "小野柳", type: "spot" },
        { id: "d3-4", time: "14:50", title: "水往上流", location: "水往上流遊憩區", type: "spot" },
        { id: "d3-5", time: "15:20", title: "金樽遊憩區", location: "金樽遊憩區", type: "spot", note: "可上廁所休息" },
        { id: "d3-6", time: "15:40", title: "東河買包子", location: "東河包子", type: "spot" },
        { id: "d3-7", time: "16:40", title: "三仙台", location: "三仙台", type: "spot" },
        { id: "d3-8", time: "17:30", title: "沿途順遊", location: "北迴歸線地標 台11線", type: "spot", note: "北迴歸線地標、月洞" },
        { id: "d3-9", time: "20:00", title: "花蓮美麗家民宿", location: "花蓮市國民八街96號", type: "hotel", cost: 900, status: "paid" },
        { id: "d3-10", time: "21:00", title: "逛夜市", location: "東大門夜市", type: "spot" }
      ]
    },
    {
      day: 4, date: "7/29 (三)", summary: "遠雄海洋公園 ➔ 宜蘭礁溪",
      gasWarning: "⛽ 花蓮至宜蘭路途遙遠，上蘇花改前請確保油量充足。",
      events: [
        { id: "d4-1", time: "08:30", title: "出發", location: "花蓮市國民八街96號", type: "drive" },
        { id: "d4-2", time: "09:40", title: "抵達海洋公園", location: "遠雄海洋公園", type: "spot", cost: 1423, status: "paid" },
        { id: "d4-3", time: "11:00", title: "美人魚秀", location: "遠雄海洋公園", type: "spot", cost: 320, status: "paid" },
        { id: "d4-4", time: "15:00", title: "出發往宜蘭", location: "七星潭", type: "drive", note: "經過七星潭，車程約2.5小時" },
        { id: "d4-5", time: "18:00", title: "香檳溫泉飯店", location: "宜蘭縣忠孝路8號", type: "hotel", cost: 985, status: "paid" },
        { id: "d4-6", time: "19:00", title: "晚餐", location: "正好鮮肉小籠包 礁溪", type: "spot" }
      ]
    },
    {
      day: 5, date: "7/30 (四)", summary: "烏石港賞鯨 ➔ 羅東",
      gasWarning: "🚗 短程移動，隨時留意油表即可。",
      events: [
        { id: "d5-1", time: "09:00", title: "前往烏石港", location: "烏石港漁會大樓", type: "drive", note: "集合地點：1樓2號櫃檯" },
        { id: "d5-2", time: "09:30", title: "賞鯨+繞島(牛奶海)", location: "烏石港", type: "spot", cost: 1199, status: "paid", note: "行程約3小時" },
        { id: "d5-3", time: "12:30", title: "烏石港吃午餐", location: "烏石港", type: "spot" },
        { id: "d5-4", time: "15:00", title: "宜蘭景點", location: "羅東林業文化園區", type: "spot", note: "下午彈性安排景點" },
        { id: "d5-5", time: "18:00", title: "金城客棧", location: "宜蘭縣公正路60號", type: "hotel", cost: 1138, status: "paid" }
      ]
    },
    {
      day: 6, date: "7/31 (五)", summary: "台北市區 ➔ 新莊看球",
      gasWarning: "⛽ 台北市區走走停停較耗油，結束旅程前可順路加滿。",
      events: [
        { id: "d6-1", time: "09:30", title: "台北101", location: "台北101", type: "spot" },
        { id: "d6-2", time: "13:00", title: "科教館 & 天文館", location: "國立臺灣科學教育館", type: "spot" },
        { id: "d6-3", time: "18:00", title: "新莊看棒球", location: "新莊棒球場", type: "spot" },
        { id: "d6-4", time: "22:00", title: "幸福讚精品飯店", location: "台北市思源路332巷9號", type: "hotel", cost: 1975, status: "paid" }
      ]
    }
  ]
};

// --- 時間運算工具 ---
const addMinutes = (timeStr: string, minsToAdd: number) => {
  const [h, m] = timeStr.split(':').map(Number);
  const date = new Date(2026, 0, 1, h, m + minsToAdd);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const getMinutesDiff = (start: string, end: string) => {
  const [h1, m1] = start.split(':').map(Number);
  const [h2, m2] = end.split(':').map(Number);
  return (h2 * 60 + m2) - (h1 * 60 + m1);
};

export default function MyTrip() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [trip, setTrip] = useState(initialTripData);
  const [showAI, setShowAI] = useState(false);

  const currentDayData = trip.days.find(d => d.day === activeDay);

  // 🌍 導航功能
  const openSingleGoogleMap = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const openFullDayRoute = () => {
    if (!currentDayData || !currentDayData.events) return;
    const locations = currentDayData.events.map(e => e.location).filter((loc): loc is string => Boolean(loc && loc.trim()));
    if (locations.length === 0) return;
    if (locations.length === 1) { openSingleGoogleMap(locations[0]); return; }
    const origin = encodeURIComponent(locations[0]);
    const destination = encodeURIComponent(locations[locations.length - 1]);
    const waypoints = locations.slice(1, -1).slice(0, 9).map(loc => encodeURIComponent(loc)).join('|');
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}`, '_blank');
  };

  // 📤 分享功能
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: trip.tripName, text: '來看看我排的花東六天五夜環島行程！', url: window.location.href });
      } catch (err) { console.log('分享取消'); }
    } else {
      alert("行程連結已複製！(桌面版模擬)");
    }
  };

  // ⏰ 出發時間連動更新
  const handleDepartureTimeChange = (newTime: string) => {
    if (!currentDayData) return;
    const oldStartTime = currentDayData.events[0].time;
    const diffMins = getMinutesDiff(oldStartTime, newTime);

    const updatedEvents = currentDayData.events.map((ev) => ({
      ...ev,
      time: addMinutes(ev.time, diffMins)
    }));

    const updatedDays = trip.days.map(d => d.day === activeDay ? { ...d, events: updatedEvents } : d);
    setTrip({ ...trip, days: updatedDays });
  };

  // ✨ AI 智慧加入景點/加油站
  const handleAIAddSpot = (type: 'gas' | 'food') => {
    if (!currentDayData) return;
    const newEvents = [...currentDayData.events];
    
    if (type === 'gas' && activeDay === 1) {
      // 在出發與抵達台東之間安插加油
      newEvents.splice(1, 0, { id: `ai-gas-${Date.now()}`, time: addMinutes(newEvents[0].time, 90), title: "中油 大武站 (AI建議加油)", location: "台灣中油大武站", type: "spot", note: "南迴公路前最後補給" });
      // 將後續行程延後 15 分鐘
      for (let i = 2; i < newEvents.length; i++) {
        newEvents[i].time = addMinutes(newEvents[i].time, 15);
      }
    } else if (type === 'food') {
       newEvents.push({ id: `ai-food-${Date.now()}`, time: addMinutes(newEvents[newEvents.length-1].time, 120), title: "在地美食宵夜 (AI推薦)", location: "在地夜市", type: "spot", note: "評分 4.5 顆星以上的神級美食" });
    }

    const updatedDays = trip.days.map(d => d.day === activeDay ? { ...d, events: newEvents } : d);
    setTrip({ ...trip, days: updatedDays });
    setShowAI(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] text-[#4A3728] font-sans pb-24">
      {/* 頂部 Header */}
      <header className="flex justify-between items-center p-4 border-b-2 border-[#8D6E63] bg-[#F5E6D3] rounded-b-2xl sticky top-0 z-50">
        <button className="p-2"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold tracking-wider">我的旅行 🚗</h1>
        <button className="p-2 active:scale-95 transition-transform" onClick={handleShare}><Share size={24} /></button>
      </header>

      <main className="p-4 space-y-6">
        
        {/* === 行程分頁 === */}
        {activeTab === 'itinerary' && (
          <div className="animate-fade-in space-y-6">
            {/* Vios 狀態卡片 */}
            <section className="bg-white p-4 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold flex items-center gap-2"><Droplet size={18} className="text-blue-500" /> {trip.car.model} 狀態</h2>
                <span className="text-sm bg-[#D7CCC8] px-2 py-1 rounded-full font-bold">預估油量: 充足</span>
              </div>
              <p className="text-sm text-red-600 font-bold">{currentDayData?.gasWarning}</p>
            </section>

            {/* Day 切換選單 */}
            <div className="flex overflow-x-auto gap-2 pb-2">
              {trip.days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(d.day)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg border-2 border-[#8D6E63] font-bold transition-all ${
                    activeDay === d.day ? 'bg-[#D9B48F] shadow-[2px_2px_0px_#8D6E63] translate-y-[-2px]' : 'bg-white'
                  }`}
                >
                  Day {d.day}
                </button>
              ))}
            </div>

            {/* 行程時間軸 */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-dashed border-[#8D6E63] pb-2">
                <h2 className="font-bold text-lg">{currentDayData?.date} - {currentDayData?.summary}</h2>
                <button onClick={openFullDayRoute} className="flex items-center gap-1.5 bg-[#D9B48F] hover:bg-[#C8A37E] active:scale-95 text-[#4A3728] px-3 py-1.5 rounded-xl border-2 border-[#8D6E63] font-bold text-xs shadow-[2px_2px_0px_#8D6E63] transition-all">
                  <Route size={16} /><span>一鍵串連當天全導航</span>
                </button>
              </div>

              {/* 調整出發時間 */}
              <div className="flex items-center gap-2 bg-[#F5E6D3] p-3 rounded-xl border-2 border-[#8D6E63]">
                <Clock size={20} className="text-[#8D6E63]" />
                <label className="font-bold text-sm">變更本日首站出發時間：</label>
                <input 
                  type="time" 
                  value={currentDayData?.events[0].time} 
                  onChange={(e) => handleDepartureTimeChange(e.target.value)}
                  className="bg-white border-2 border-[#8D6E63] rounded px-2 py-1 font-bold outline-none"
                />
              </div>
              
              <div className="relative border-l-2 border-[#8D6E63] ml-3 pl-6 space-y-6">
                {currentDayData?.events.map((event, idx) => (
                  <div key={event.id} className="relative bg-white p-3 rounded-xl border-2 border-[#8D6E63] shadow-[3px_3px_0px_#8D6E63]">
                    <div className="absolute -left-[35px] top-4 w-4 h-4 bg-[#D9B48F] rounded-full border-2 border-[#8D6E63]"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{event.time} {event.title}</h3>
                        {event.note && <p className="text-sm text-gray-600 mt-1">{event.note}</p>}
                        {event.cost && (
                          <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block border font-bold ${event.status === 'paid' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
                            {event.status === 'paid' ? '已付' : '未付'} ${event.cost}
                          </span>
                        )}
                      </div>
                      {event.location && (
                        <button onClick={() => openSingleGoogleMap(event.location)} className="bg-[#F5E6D3] p-2 rounded-full border-2 border-[#8D6E63] active:bg-[#D9B48F] flex-shrink-0 ml-2 shadow-[1px_1px_0px_#8D6E63]">
                          <Navigation size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI 智慧安插按鈕 */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#8D6E63]">
                <button onClick={() => setShowAI(!showAI)} className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-xl font-bold shadow-[4px_4px_0px_#D9B48F] active:translate-y-1 active:shadow-[0px_0px_0px_#D9B48F] transition-all">
                  <Sparkles size={20} /> AI 智慧安插行程
                </button>
                {showAI && (
                  <div className="grid grid-cols-2 gap-3 mt-4 animate-fade-in">
                    <button onClick={() => handleAIAddSpot('gas')} className="flex flex-col items-center p-3 bg-white border-2 border-[#8D6E63] rounded-xl font-bold active:bg-gray-100">
                      <Fuel className="mb-2 text-blue-500" size={24} />順路找加油站
                    </button>
                    <button onClick={() => handleAIAddSpot('food')} className="flex flex-col items-center p-3 bg-white border-2 border-[#8D6E63] rounded-xl font-bold active:bg-gray-100">
                      <Coffee className="mb-2 text-orange-500" size={24} />神級在地美食
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* === 記帳分頁 === */}
        {activeTab === 'ledger' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-bold text-2xl border-b-4 border-[#D9B48F] inline-block pb-1">旅費總覽 💰</h2>
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-[#EFEBE9] p-4 rounded-xl border-2 border-[#8D6E63] flex flex-col items-center shadow-[4px_4px_0px_#8D6E63]">
                <span className="text-gray-600 font-bold mb-1">已付款 ✅</span>
                <span className="font-black text-2xl text-green-700">${trip.budget.totalPaid}</span>
              </div>
              <div className="bg-[#FFEBEE] p-4 rounded-xl border-2 border-[#8D6E63] flex flex-col items-center shadow-[4px_4px_0px_#8D6E63]">
                <span className="text-red-500 font-bold mb-1">未付款需帶現金 ⚠️</span>
                <span className="font-black text-2xl text-red-600">${trip.budget.totalUnpaid}</span>
              </div>
            </section>
            
            <div className="bg-white p-4 rounded-xl border-2 border-[#8D6E63]">
              <h3 className="font-bold text-lg mb-4">款項明細</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">台東蘋果商務旅店</span><span className="text-green-600 font-bold">已付 $1770</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">花蓮美麗家民宿</span><span className="text-green-600 font-bold">已付 $900</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">遠雄海洋公園門票</span><span className="text-green-600 font-bold">已付 $1423</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">海洋公園美人魚秀</span><span className="text-green-600 font-bold">已付 $320</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">礁溪香檳溫泉飯店</span><span className="text-green-600 font-bold">已付 $985</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">烏石港賞鯨(牛奶海)</span><span className="text-green-600 font-bold">已付 $1199</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">羅東金城客棧</span><span className="text-green-600 font-bold">已付 $1138</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">新莊幸福讚精品飯店</span><span className="text-green-600 font-bold">已付 $1975</span></li>
                <li className="flex justify-between bg-red-50 p-2 rounded"><span className="font-bold">綠島柴口岸 (含船票/體驗)</span><span className="text-red-600 font-bold">未付 $4600</span></li>
              </ul>
            </div>
          </div>
        )}

        {/* === 日記分頁 === */}
        {activeTab === 'diary' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-bold text-2xl border-b-4 border-[#D9B48F] inline-block pb-1">旅行回憶錄 📷</h2>
            <div className="bg-white p-6 rounded-xl border-2 border-[#8D6E63] text-center border-dashed">
              <Camera size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="font-bold text-gray-500 mb-4">這趟旅程還沒開始呢！<br/>拍些美照上傳吧！</p>
              <button className="bg-[#D9B48F] text-[#4A3728] px-6 py-2 rounded-full border-2 border-[#8D6E63] font-bold shadow-[2px_2px_0px_#8D6E63] active:translate-y-1 active:shadow-[0px_0px_0px_#8D6E63]">
                上傳照片
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 底部導航列 (Tab Switcher) */}
      <footer className="fixed bottom-0 w-full bg-[#F5E6D3] border-t-2 border-[#8D6E63] flex justify-around p-3 pb-8 z-50">
        <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center w-1/3 transition-colors ${activeTab === 'itinerary' ? 'text-[#8D6E63]' : 'text-gray-400'}`}>
          <MapPin size={24} className={activeTab === 'itinerary' ? 'fill-[#D9B48F]' : ''} />
          <span className="text-xs font-bold mt-1">行程</span>
        </button>
        <button onClick={() => setActiveTab('ledger')} className={`flex flex-col items-center w-1/3 transition-colors ${activeTab === 'ledger' ? 'text-[#8D6E63]' : 'text-gray-400'}`}>
          <Wallet size={24} className={activeTab === 'ledger' ? 'fill-[#D9B48F]' : ''} />
          <span className="text-xs font-bold mt-1">記帳</span>
        </button>
        <button onClick={() => setActiveTab('diary')} className={`flex flex-col items-center w-1/3 transition-colors ${activeTab === 'diary' ? 'text-[#8D6E63]' : 'text-gray-400'}`}>
          <Camera size={24} className={activeTab === 'diary' ? 'fill-[#D9B48F]' : ''} />
          <span className="text-xs font-bold mt-1">日記</span>
        </button>
      </footer>
    </div>
  );
}
