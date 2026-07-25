'use client';
import { useState, useRef } from 'react';
import { MapPin, Navigation, Droplet, Wallet, Camera, ChevronLeft, Share, Route, Sparkles, Clock, Coffee, Fuel, Pencil, Trash2, Plus, ImagePlus, X, Bot, PlusCircle, Phone, FileText } from 'lucide-react';

// --- 初始資料庫 ---
const initialTripData = {
  tripName: "花東六天五夜熱血環島",
  car: { model: "Toyota Vios", tankCapacity: 35, currentGas: 100, efficiency: 14 },
  days: [
    {
      day: 1, date: "7/26 (日)", summary: "台南出發 ➔ 台東",
      gasWarning: "⚠️ 台南至台東約 160km，預計消耗 1/3 桶油。",
      events: [
        { id: "d1-1", time: "12:00", title: "出發", location: "台南火車站", type: "drive" },
        { id: "d1-2", time: "15:00", title: "抵達台東住宿", location: "蘋果商務旅店", type: "hotel" },
        { id: "d1-3", time: "18:30", title: "逛鐵花村、台東夜市", location: "鐵花村音樂聚落", type: "spot", note: "美食推薦：林家臭豆腐" }
      ],
      expenses: [
        { id: "e1-1", title: "蘋果商務旅店", amount: 1770, status: "paid", category: "住宿" }
      ]
    },
    {
      day: 2, date: "7/27 (一)", summary: "台東 ➔ 綠島探險",
      gasWarning: "🅿️ 車輛停放富岡漁港，無需加油。",
      events: [
        { id: "d2-1", time: "11:30", title: "搭船 (綠島之星)", location: "富岡漁港", type: "boat" },
        { id: "d2-2", time: "14:00", title: "藍洞探險", location: "綠島 藍洞", type: "spot" },
        { id: "d2-3", time: "20:00", title: "夜探梅花鹿、海邊看流星", location: "綠島", type: "spot" },
        { id: "d2-4", time: "22:00", title: "夜宿柴口岸", location: "綠島 柴口岸民宿", type: "hotel", note: "含船票與體驗" }
      ],
      expenses: [
        { id: "e2-1", title: "綠島柴口岸 (含船票/體驗)", amount: 4600, status: "unpaid", category: "套裝" }
      ]
    },
    {
      day: 3, date: "7/28 (二)", summary: "綠島 ➔ 花蓮市區",
      gasWarning: "⛽ 建議在成功鎮加油站補充電量與油料。",
      events: [
        { 
          id: "d3-1", 
          time: "09:00", 
          title: "半潛艇（玻璃船）", 
          location: "南寮漁港右道登船口第6根柱子", 
          mapUrl: "https://goo.gl/maps/Vcsc1Sfr6QBtPW7P9",
          phone: "0912151471",
          type: "spot", 
          note: "09:00 發船，請提前10分鐘集合（逾時不候）",
          remarks: [
            "藍鯨五號的黃色招牌處上船",
            "⚠️ 臨時取消、減少人數或更改時間不作退費。",
            "活動如因天候因素影響，將依船長評估決定是否成團出航，活動是否正常進行以船長通知為主。",
            "如當天未依活動時間於集合地點集合，即視同自行放棄參加活動權利，亦不退費。"
          ]
        },
        { id: "d3-2", time: "12:30", title: "搭船回台東", location: "富岡漁港", type: "boat" },
        { id: "d3-3", time: "14:00", title: "小野柳", location: "小野柳", type: "spot" },
        { id: "d3-4", time: "14:50", title: "水往上流", location: "水往上流遊憩區", type: "spot" },
        { id: "d3-5", time: "15:20", title: "金樽遊憩區", location: "金樽遊憩區", type: "spot", note: "可上廁所休息" },
        { id: "d3-6", time: "15:40", title: "東河買包子", location: "東河包子", type: "spot" },
        { id: "d3-7", time: "16:40", title: "三仙台", location: "三仙台", type: "spot" },
        { id: "d3-8", time: "17:30", title: "沿途順遊", location: "北迴歸線地標 台11線", type: "spot", note: "北迴歸線地標、月洞" },
        { id: "d3-9", time: "20:00", title: "花蓮美麗家民宿", location: "花蓮市國民八街96號", type: "hotel" },
        { id: "d3-10", time: "21:00", title: "逛夜市", location: "東大門夜市", type: "spot" }
      ],
      expenses: [
        { id: "e3-1", title: "花蓮美麗家民宿", amount: 900, status: "paid", category: "住宿" }
      ]
    },
    {
      day: 4, date: "7/29 (三)", summary: "遠雄海洋公園 ➔ 宜蘭礁溪",
      gasWarning: "⛽ 上蘇花改前請確保油量充足。",
      events: [
        { id: "d4-1", time: "08:30", title: "出發", location: "花蓮市國民八街96號", type: "drive" },
        { id: "d4-2", time: "09:40", title: "抵達海洋公園", location: "遠雄海洋公園", type: "spot" },
        { id: "d4-3", time: "11:00", title: "美人魚秀", location: "遠雄海洋公園", type: "spot" },
        { id: "d4-4", time: "15:00", title: "出發往宜蘭", location: "七星潭", type: "drive", note: "經過七星潭，車程約2.5小時" },
        { id: "d4-5", time: "18:00", title: "香檳溫泉飯店", location: "宜蘭縣忠孝路8號", type: "hotel" },
        { id: "d4-6", time: "19:00", title: "晚餐", location: "正好鮮肉小籠包 礁溪", type: "spot" }
      ],
      expenses: [
        { id: "e4-1", title: "海洋公園門票", amount: 1423, status: "paid", category: "門票" },
        { id: "e4-2", title: "美人魚秀", amount: 320, status: "paid", category: "門票" },
        { id: "e4-3", title: "香檳溫泉飯店", amount: 985, status: "paid", category: "住宿" }
      ]
    },
    {
      day: 5, date: "7/30 (四)", summary: "烏石港賞鯨 ➔ 羅東",
      gasWarning: "🚗 短程移動，隨時留意油表即可。",
      events: [
        { id: "d5-1", time: "09:00", title: "前往烏石港", location: "烏石港漁會大樓", type: "drive", note: "集合地點：1樓2號櫃檯" },
        { id: "d5-2", time: "09:30", title: "賞鯨+繞島(牛奶海)", location: "烏石港", type: "spot", note: "行程約3小時" },
        { id: "d5-3", time: "12:30", title: "烏石港吃午餐", location: "烏石港", type: "spot" },
        { id: "d5-4", time: "15:00", title: "宜蘭景點", location: "羅東林業文化園區", type: "spot", note: "下午彈性安排景點" },
        { id: "d5-5", time: "18:00", title: "金城客棧", location: "宜蘭縣公正路60號", type: "hotel" }
      ],
      expenses: [
        { id: "e5-1", title: "烏石港賞鯨", amount: 1199, status: "paid", category: "門票" },
        { id: "e5-2", title: "羅東金城客棧", amount: 1138, status: "paid", category: "住宿" }
      ]
    },
    {
      day: 6, date: "7/31 (五)", summary: "台北市區 ➔ 新莊看球",
      gasWarning: "⛽ 結束旅程前可順路加滿。",
      events: [
        { id: "d6-1", time: "09:30", title: "台北101", location: "台北101", type: "spot" },
        { id: "d6-2", time: "13:00", title: "科教館 & 天文館", location: "國立臺灣科學教育館", type: "spot" },
        { id: "d6-3", time: "18:00", title: "新莊看棒球", location: "新莊棒球場", type: "spot" },
        { id: "d6-4", time: "22:00", title: "幸福讚精品飯店", location: "台北市思源路332巷9號", type: "hotel" }
      ],
      expenses: [
        { id: "e6-1", title: "幸福讚精品飯店", amount: 1975, status: "paid", category: "住宿" }
      ]
    }
  ]
};

// --- 工具函數 ---
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
  
  // AI 相關 State
  const [showAI, setShowAI] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  
  // 記帳與相片 State
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [expenseForm, setExpenseForm] = useState({ title: '', amount: '', status: 'paid', category: '飲食' });
  const [dayPhotos, setDayPhotos] = useState<Record<number, string[]>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentDayData = trip.days.find(d => d.day === activeDay);

  const dailyPaid = currentDayData?.expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + Number(e.amount), 0) || 0;
  const dailyUnpaid = currentDayData?.expenses.filter(e => e.status === 'unpaid').reduce((sum, e) => sum + Number(e.amount), 0) || 0;

  // 🌍 導航功能
  const openSingleGoogleMap = (location: string, customUrl?: string) => {
    if (customUrl) {
      window.open(customUrl, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    }
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: trip.tripName, text: '我的花東環島行程，來看看吧！', url: window.location.href });
      } catch (err) {}
    } else alert("行程連結已複製！");
  };

  const handleDepartureTimeChange = (newTime: string) => {
    if (!currentDayData) return;
    const oldStartTime = currentDayData.events[0].time;
    const diffMins = getMinutesDiff(oldStartTime, newTime);
    const updatedEvents = currentDayData.events.map((ev) => ({ ...ev, time: addMinutes(ev.time, diffMins) }));
    setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, events: updatedEvents } : d) });
  };

  // 🗑️ 刪除單個行程
  const deleteEvent = (eventId: string) => {
    if (!currentDayData) return;
    if (confirm("確定要刪除這個行程嗎？")) {
      const updatedEvents = currentDayData.events.filter(e => e.id !== eventId);
      setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, events: updatedEvents } : d) });
    }
  };

  // 🤖 呼叫 AI 取得建議
  const askAIForSuggestions = (query: string) => {
    if (!query.trim()) return;
    setIsThinking(true);
    setAiSuggestions([]);
    
    setTimeout(() => {
      let suggestions = [];
      if (activeDay === 1) {
        suggestions = [
          { id: `ai-s1-${Date.now()}`, time: "13:30", title: `${query}推薦：大武之心南迴驛`, location: "大武之心南迴驛", type: "spot", note: "南迴最美休息站，非常順路" },
          { id: `ai-s2-${Date.now()}`, time: "14:30", title: `${query}推薦：多良車站`, location: "多良車站", type: "spot", note: "全台最美車站，適合短暫停留" }
        ];
      } else {
        suggestions = [
          { id: `ai-s3-${Date.now()}`, time: "16:00", title: `AI 嚴選：在地 ${query}`, location: `${query} 推薦景點`, type: "spot", note: "評價極高的順路選擇" }
        ];
      }
      setAiSuggestions(suggestions);
      setIsThinking(false);
    }, 1200);
  };

  const addSuggestedEvent = (suggestion: any) => {
    if (!currentDayData) return;
    const newEvents = [...currentDayData.events, suggestion];
    newEvents.sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });

    setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, events: newEvents } : d) });
    setAiSuggestions(aiSuggestions.filter(s => s.id !== suggestion.id));
    setCustomQuery('');
  };

  // 💰 記帳功能
  const saveExpense = () => {
    if (!currentDayData || !expenseForm.title || !expenseForm.amount) return;
    let updatedExpenses = [...currentDayData.expenses];
    if (editingExpenseId) {
      updatedExpenses = updatedExpenses.map(e => e.id === editingExpenseId ? { ...e, ...expenseForm, amount: Number(expenseForm.amount) } : e);
    } else {
      updatedExpenses.push({ id: `exp-${Date.now()}`, ...expenseForm, amount: Number(expenseForm.amount) });
    }
    setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, expenses: updatedExpenses } : d) });
    setShowExpenseForm(false);
    setEditingExpenseId(null);
    setExpenseForm({ title: '', amount: '', status: 'paid', category: '飲食' });
  };

  const deleteExpense = (id: string) => {
    if (!currentDayData) return;
    const updatedExpenses = currentDayData.expenses.filter(e => e.id !== id);
    setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, expenses: updatedExpenses } : d) });
  };

  // 📷 日記上傳
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setDayPhotos(prev => ({ ...prev, [activeDay]: [...(prev[activeDay] || []), ...newPhotos] }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] text-[#4A3728] font-sans pb-28">
      <header className="flex justify-between items-center p-4 border-b-2 border-[#8D6E63] bg-[#F5E6D3] rounded-b-2xl sticky top-0 z-40">
        <button className="p-2"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold tracking-wider">我的旅行 🚗</h1>
        <button className="p-2 active:scale-95 transition-transform" onClick={handleShare}><Share size={24} /></button>
      </header>

      <main className="p-4">
        {/* 全域 Day 選擇器 */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
          {trip.days.map((d) => (
            <button key={d.day} onClick={() => setActiveDay(d.day)} className={`whitespace-nowrap px-4 py-2 rounded-lg border-2 border-[#8D6E63] font-bold transition-all ${activeDay === d.day ? 'bg-[#D9B48F] shadow-[2px_2px_0px_#8D6E63] translate-y-[-2px]' : 'bg-white'}`}>
              Day {d.day}
            </button>
          ))}
        </div>

        {/* ================= 行程分頁 ================= */}
        {activeTab === 'itinerary' && (
          <div className="animate-fade-in space-y-6">
            <section className="bg-white p-4 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold flex items-center gap-2"><Droplet size={18} className="text-blue-500" /> {trip.car.model} 狀態</h2>
                <span className="text-sm bg-[#D7CCC8] px-2 py-1 rounded-full font-bold">預估油量: 充足</span>
              </div>
              <p className="text-sm text-red-600 font-bold">{currentDayData?.gasWarning}</p>
            </section>

            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-dashed border-[#8D6E63] pb-2">
                <h2 className="font-bold text-lg">{currentDayData?.date} - {currentDayData?.summary}</h2>
                <button onClick={openFullDayRoute} className="flex items-center gap-1.5 bg-[#D9B48F] hover:bg-[#C8A37E] active:scale-95 text-[#4A3728] px-3 py-1.5 rounded-xl border-2 border-[#8D6E63] font-bold text-xs shadow-[2px_2px_0px_#8D6E63] transition-all">
                  <Route size={16} /><span>一鍵串連當天全導航</span>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-[#F5E6D3] p-3 rounded-xl border-2 border-[#8D6E63]">
                <Clock size={20} className="text-[#8D6E63]" />
                <label className="font-bold text-sm">首站出發時間：</label>
                <input type="time" value={currentDayData?.events[0]?.time || "09:00"} onChange={(e) => handleDepartureTimeChange(e.target.value)} className="bg-white border-2 border-[#8D6E63] rounded px-2 py-1 font-bold outline-none" />
              </div>
              
              <div className="relative border-l-2 border-[#8D6E63] ml-3 pl-6 space-y-6">
                {currentDayData?.events.map((event) => (
                  <div key={event.id} className="relative bg-white p-3.5 rounded-xl border-2 border-[#8D6E63] shadow-[3px_3px_0px_#8D6E63] flex flex-col space-y-2">
                    <div className="absolute -left-[35px] top-4 w-4 h-4 bg-[#D9B48F] rounded-full border-2 border-[#8D6E63]"></div>
                    
                    <div className="flex justify-between items-start w-full">
                      <div className="flex-1 pr-2">
                        <h3 className="font-bold text-lg">{event.time} {event.title}</h3>
                        {event.note && <p className="text-sm font-semibold text-[#8D6E63] mt-1">{event.note}</p>}
                      </div>
                      
                      {/* 功能按鈕區：包含導航與刪除 */}
                      <div className="flex gap-2 flex-shrink-0">
                        {event.location && (
                          <button onClick={() => openSingleGoogleMap(event.location, event.mapUrl)} className="bg-[#F5E6D3] p-2 rounded-full border-2 border-[#8D6E63] active:bg-[#D9B48F] shadow-[1px_1px_0px_#8D6E63]">
                            <Navigation size={18} />
                          </button>
                        )}
                        <button onClick={() => deleteEvent(event.id)} className="bg-red-50 text-red-500 p-2 rounded-full border-2 border-red-200 hover:bg-red-100 active:bg-red-200 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* 📍 地點與電話顯示 */}
                    {(event.location || event.phone) && (
                      <div className="text-xs bg-[#F9F5EF] p-2 rounded-lg border border-[#D7CCC8] space-y-1">
                        {event.location && (
                          <p className="flex items-center gap-1 font-medium text-gray-700">
                            <MapPin size={14} className="text-[#8D6E63]" /> {event.location}
                          </p>
                        )}
                        {event.phone && (
                          <p className="flex items-center gap-1 font-bold text-blue-600">
                            <Phone size={14} /> 船長電話：
                            <a href={`tel:${event.phone}`} className="underline">{event.phone}</a>
                          </p>
                        )}
                      </div>
                    )}

                    {/* 📝 獨立備註欄位 (Remarks) */}
                    {event.remarks && event.remarks.length > 0 && (
                      <div className="bg-[#FFF8E7] p-3 rounded-lg border-2 border-dashed border-[#D9B48F] space-y-1.5 mt-2">
                        <div className="flex items-center gap-1 font-bold text-sm text-[#4A3728] border-b border-[#D9B48F] pb-1">
                          <FileText size={16} className="text-[#8D6E63]" /> 備註事項：
                        </div>
                        <ul className="list-disc list-inside text-xs space-y-1 text-gray-700 font-medium leading-relaxed">
                          {event.remarks.map((rem, rIdx) => (
                            <li key={rIdx} className={rem.includes('⚠️') || rem.includes('不退費') ? 'text-red-600 font-bold' : ''}>
                              {rem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 🌟 AI 智慧顧問模式 */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-[#8D6E63]">
                <button onClick={() => setShowAI(!showAI)} className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-xl font-bold shadow-[4px_4px_0px_#D9B48F] active:translate-y-1 active:shadow-[0px_0px_0px_#D9B48F] transition-all">
                  <Sparkles size={20} /> AI 智慧行程顧問
                </button>
                
                {showAI && (
                  <div className="p-4 bg-white border-2 border-[#8D6E63] rounded-xl mt-4 space-y-4 animate-fade-in shadow-[4px_4px_0px_#8D6E63]">
                    <p className="text-sm font-bold text-gray-600 flex items-center gap-1"><Bot size={16}/> 告訴我你想找什麼，我來幫你找順路的選項！</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="例如：海景咖啡廳、私房景點、加油站..." 
                        value={customQuery}
                        onChange={(e) => setCustomQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && askAIForSuggestions(customQuery)}
                        className="flex-1 border-2 border-[#8D6E63] p-2 rounded-xl outline-none focus:border-black"
                      />
                      <button onClick={() => askAIForSuggestions(customQuery)} className="bg-[#D9B48F] px-4 rounded-xl border-2 border-[#8D6E63] font-bold active:bg-[#C8A37E]">
                        搜尋
                      </button>
                    </div>

                    {isThinking && (
                      <div className="text-center py-4 text-gray-500 font-bold animate-pulse">
                        🧠 AI 正在分析路線與搜尋...
                      </div>
                    )}

                    {!isThinking && aiSuggestions.length > 0 && (
                      <div className="space-y-3 mt-4 pt-4 border-t border-dashed border-gray-300">
                        <h4 className="font-bold text-sm text-green-700">為您推薦以下順路選項：</h4>
                        {aiSuggestions.map(suggestion => (
                          <div key={suggestion.id} className="flex justify-between items-center bg-[#FDF9F1] p-3 rounded-lg border border-[#8D6E63]">
                            <div>
                              <p className="font-bold text-sm">{suggestion.time} {suggestion.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{suggestion.note}</p>
                            </div>
                            <button onClick={() => addSuggestedEvent(suggestion)} className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 rounded-lg text-xs font-bold shadow-[2px_2px_0px_black] active:translate-y-0.5 active:shadow-[0px_0px_0px_black]">
                              <PlusCircle size={14}/> 加入
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ================= 記帳分頁 ================= */}
        {activeTab === 'ledger' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-bold text-xl border-b-4 border-[#D9B48F] inline-block pb-1">Day {activeDay} 每日花費 💰</h2>
            
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl border-2 border-[#8D6E63] flex flex-col items-center shadow-[2px_2px_0px_#8D6E63]">
                <span className="text-gray-600 font-bold text-sm">本日已付 ✅</span>
                <span className="font-black text-xl text-green-700">${dailyPaid}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border-2 border-[#8D6E63] flex flex-col items-center shadow-[2px_2px_0px_#8D6E63]">
                <span className="text-red-500 font-bold text-sm">本日未付 ⚠️</span>
                <span className="font-black text-xl text-red-600">${dailyUnpaid}</span>
              </div>
            </section>
            
            <div className="bg-white p-4 rounded-xl border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">款項明細</h3>
                <button onClick={() => { setEditingExpenseId(null); setExpenseForm({ title: '', amount: '', status: 'paid', category: '飲食' }); setShowExpenseForm(true); }} className="bg-[#D9B48F] p-1.5 rounded-full border-2 border-[#8D6E63] active:scale-95"><Plus size={20} /></button>
              </div>

              {currentDayData?.expenses.length === 0 ? (
                <p className="text-gray-400 text-center py-4 font-bold">本日尚無花費紀錄</p>
              ) : (
                <ul className="space-y-3">
                  {currentDayData?.expenses.map(exp => (
                    <li key={exp.id} className="flex justify-between items-center border-b border-dashed border-[#8D6E63] pb-3">
                      <div>
                        <span className="text-xs bg-[#F5E6D3] px-2 py-0.5 rounded-full border border-[#8D6E63] mr-2">{exp.category}</span>
                        <span className="font-bold text-lg">{exp.title}</span>
                        <div className={`text-sm font-bold mt-1 ${exp.status === 'paid' ? 'text-green-600' : 'text-red-500'}`}>{exp.status === 'paid' ? '已付' : '未付'} ${exp.amount}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingExpenseId(exp.id); setExpenseForm({ title: exp.title, amount: String(exp.amount), status: exp.status, category: exp.category || '其他' }); setShowExpenseForm(true); }} className="p-2 bg-gray-100 rounded-full border border-gray-300 text-gray-600"><Pencil size={16}/></button>
                        <button onClick={() => deleteExpense(exp.id)} className="p-2 bg-red-50 rounded-full border border-red-200 text-red-500"><Trash2 size={16}/></button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {showExpenseForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-[#FDF9F1] w-full max-w-sm p-6 rounded-2xl border-4 border-[#8D6E63] shadow-[8px_8px_0px_#8D6E63]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">{editingExpenseId ? '修改花費' : '新增花費'}</h3>
                    <button onClick={() => setShowExpenseForm(false)}><X size={24}/></button>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="項目名稱 (例如：夜市小吃)" value={expenseForm.title} onChange={e => setExpenseForm({...expenseForm, title: e.target.value})} className="w-full border-2 border-[#8D6E63] p-2 rounded-xl outline-none" />
                    <input type="number" placeholder="金額 ($)" value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} className="w-full border-2 border-[#8D6E63] p-2 rounded-xl outline-none" />
                    <div className="flex gap-2">
                      <select value={expenseForm.category} onChange={e => setExpenseForm({...expenseForm, category: e.target.value})} className="w-1/2 border-2 border-[#8D6E63] p-2 rounded-xl bg-white font-bold outline-none appearance-none">
                        <option value="飲食">🍔 飲食</option>
                        <option value="住宿">🏨 住宿</option>
                        <option value="交通">🚗 交通</option>
                        <option value="門票">🎟️ 門票</option>
                        <option value="套裝">🤿 套裝</option>
                        <option value="其他">🛒 其他</option>
                      </select>
                      <select value={expenseForm.status} onChange={e => setExpenseForm({...expenseForm, status: e.target.value})} className="w-1/2 border-2 border-[#8D6E63] p-2 rounded-xl bg-white font-bold outline-none appearance-none">
                        <option value="paid">✅ 已付款</option>
                        <option value="unpaid">⚠️ 未付款</option>
                      </select>
                    </div>
                    <button onClick={saveExpense} className="w-full bg-[#D9B48F] border-2 border-[#8D6E63] p-3 rounded-xl font-bold shadow-[2px_2px_0px_#8D6E63] active:translate-y-1 active:shadow-none transition-all">儲存紀錄</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 日記分頁 ================= */}
        {activeTab === 'diary' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-bold text-xl border-b-4 border-[#D9B48F] inline-block pb-1">Day {activeDay} 照片日記 📷</h2>
            <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
            {(dayPhotos[activeDay] || []).length === 0 ? (
              <div onClick={() => fileInputRef.current?.click()} className="bg-white p-8 rounded-xl border-2 border-[#8D6E63] text-center border-dashed cursor-pointer hover:bg-[#F5E6D3] transition-colors">
                <ImagePlus size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="font-bold text-gray-500 mb-4">這天還沒有上傳照片喔！<br/>點擊這裡從手機相簿挑選吧！</p>
              </div>
            ) : (
              <div className="space-y-4">
                <button onClick={() => fileInputRef.current?.click()} className="w-full flex justify-center items-center gap-2 bg-[#D9B48F] border-2 border-[#8D6E63] p-3 rounded-xl font-bold shadow-[2px_2px_0px_#8D6E63] active:translate-y-1 active:shadow-none">
                  <ImagePlus size={20} /> 繼續上傳照片
                </button>
                <div className="grid grid-cols-2 gap-3">
                  {dayPhotos[activeDay].map((url, idx) => (
                    <div key={idx} className="aspect-square rounded-xl border-2 border-[#8D6E63] overflow-hidden shadow-[2px_2px_0px_#8D6E63]">
                      <img src={url} alt="日記照片" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full bg-[#F5E6D3] border-t-2 border-[#8D6E63] flex justify-around p-3 pb-8 z-40">
        <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center w-1/3 transition-colors ${activeTab === 'itinerary' ? 'text-[#8D6E63]' : 'text-gray-400'}`}><MapPin size={24} className={activeTab === 'itinerary' ? 'fill-[#D9B48F]' : ''} /><span className="text-xs font-bold mt-1">行程</span></button>
        <button onClick={() => setActiveTab('ledger')} className={`flex flex-col items-center w-1/3 transition-colors ${activeTab === 'ledger' ? 'text-[#8D6E63]' : 'text-gray-400'}`}><Wallet size={24} className={activeTab === 'ledger' ? 'fill-[#D9B48F]' : ''} /><span className="text-xs font-bold mt-1">記帳</span></button>
        <button onClick={() => setActiveTab('diary')} className={`flex flex-col items-center w-1/3 transition-colors ${activeTab === 'diary' ? 'text-[#8D6E63]' : 'text-gray-400'}`}><Camera size={24} className={activeTab === 'diary' ? 'fill-[#D9B48F]' : ''} /><span className="text-xs font-bold mt-1">日記</span></button>
      </footer>
    </div>
  );
}
