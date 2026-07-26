// @ts-nocheck
/* eslint-disable */
'use client';
import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Droplet, Wallet, Camera, ChevronLeft, Share, Route, Sparkles, Clock, Pencil, Trash2, Plus, ImagePlus, X, Bot, PlusCircle, Phone, FileText } from 'lucide-react';

const initialTripData = {
  tripName: "花東六天五夜熱血環島",
  car: { model: "Toyota Vios", tankCapacity: 35, currentGas: 100 },
  days: [
    {
      day: 1, date: "7/26 (日)", summary: "台南出發 ➔ 台東", gasWarning: "⚠️ 預計消耗 1/3 桶油。",
      events: [
        { id: "d1-1", time: "12:00", title: "出發", location: "台南火車站" },
        { id: "d1-2", time: "15:00", title: "抵達台東住宿", location: "蘋果商務旅店" },
        { id: "d1-3", time: "18:30", title: "逛鐵花村、台東夜市", location: "鐵花村音樂聚落" }
      ],
      expenses: [{ id: "e1-1", title: "蘋果商務旅店", amount: 1770, status: "paid", category: "住宿" }]
    },
    {
      day: 2, date: "7/27 (一)", summary: "台東 ➔ 綠島探險", gasWarning: "🅿️ 車輛停放富岡漁港",
      events: [
        { id: "d2-1", time: "11:30", title: "搭船 (綠島之星)", location: "富岡漁港" },
        { id: "d2-2", time: "14:00", title: "藍洞探險", location: "綠島 藍洞" },
        { id: "d2-3", time: "20:00", title: "夜探梅花鹿", location: "綠島" },
        { id: "d2-4", time: "22:00", title: "夜宿柴口岸", location: "綠島 柴口岸民宿" }
      ],
      expenses: [{ id: "e2-1", title: "綠島柴口岸", amount: 4600, status: "unpaid", category: "套裝" }]
    },
    {
      day: 3, date: "7/28 (二)", summary: "綠島 ➔ 花蓮市區", gasWarning: "⛽ 建議在成功鎮補充電量與油料。",
      events: [
        { 
          id: "d3-1", time: "09:00", title: "半潛艇（玻璃船）", location: "南寮漁港登船口第6根柱子", phone: "0912151471", 
          note: "提前10分鐘集合", mapUrl: "https://goo.gl/maps/Vcsc1Sfr6QBtPW7P9",
          remarks: ["藍鯨五號黃色招牌處上船", "⚠️ 臨時取消不作退費。", "活動視天候由船長通知為主。", "未準時集合視同放棄亦不退費。"]
        },
        { id: "d3-2", time: "12:30", title: "搭船回台東", location: "富岡漁港" },
        { id: "d3-3", time: "14:00", title: "小野柳", location: "小野柳" },
        { id: "d3-4", time: "14:50", title: "水往上流", location: "水往上流遊憩區" },
        { id: "d3-5", time: "15:20", title: "金樽遊憩區", location: "金樽遊憩區" },
        { id: "d3-6", time: "15:40", title: "東河買包子", location: "東河包子" },
        { id: "d3-7", time: "16:40", title: "三仙台", location: "三仙台" },
        { id: "d3-8", time: "20:00", title: "花蓮美麗家民宿", location: "花蓮市國民八街96號" },
        { id: "d3-9", time: "21:00", title: "逛夜市", location: "東大門夜市" }
      ],
      expenses: [{ id: "e3-1", title: "花蓮美麗家民宿", amount: 900, status: "paid", category: "住宿" }]
    },
    {
      day: 4, date: "7/29 (三)", summary: "遠雄海洋公園 ➔ 宜蘭", gasWarning: "⛽ 上蘇花改前請確保油量充足。",
      events: [
        { id: "d4-1", time: "08:30", title: "出發", location: "花蓮市國民八街96號" },
        { id: "d4-2", time: "09:40", title: "抵達海洋公園", location: "遠雄海洋公園" },
        { id: "d4-3", time: "11:00", title: "美人魚秀", location: "遠雄海洋公園" },
        { id: "d4-4", time: "18:00", title: "香檳溫泉飯店", location: "宜蘭縣忠孝路8號" }
      ],
      expenses: [{ id: "e4-1", title: "香檳溫泉飯店", amount: 985, status: "paid", category: "住宿" }]
    },
    {
      day: 5, date: "7/30 (四)", summary: "烏石港賞鯨 ➔ 羅東", gasWarning: "🚗 短程移動，留意油表即可。",
      events: [
        { id: "d5-1", time: "09:30", title: "前往烏石港", location: "烏石港漁會大樓" },
        { 
          id: "d5-2", time: "10:30", title: "宜蘭龜山島登島賞鯨半日遊", location: "宜蘭縣頭城鎮烏石港路168號", phone: "0911217567",
          note: "請於 10:00 前完成報到",
          remarks: ["⚠️ 必帶：身分證件", "建議帶防曬油、上船前吃暈船藥", "現場另付登島費100元", "前一晚加 Line(0963499016) 聯繫"]
        },
        { id: "d5-3", time: "18:00", title: "金城客棧", location: "宜蘭縣公正路60號" }
      ],
      expenses: [{ id: "e5-1", title: "烏石港賞鯨", amount: 1199, status: "paid", category: "門票" }]
    },
    {
      day: 6, date: "7/31 (五)", summary: "台北市區 ➔ 新莊看球", gasWarning: "⛽ 結束旅程前可順路加滿。",
      events: [
        { id: "d6-1", time: "09:30", title: "台北101", location: "台北101" },
        { id: "d6-3", time: "18:00", title: "新莊看棒球", location: "新莊棒球場" },
        { id: "d6-4", time: "22:00", title: "幸福讚精品飯店", location: "台北市思源路332巷9號" }
      ],
      expenses: [{ id: "e6-1", title: "幸福讚精品飯店", amount: 1975, status: "paid", category: "住宿" }]
    }
  ]
};

const addMinutes = (timeStr, minsToAdd) => {
  const [h, m] = timeStr.split(':').map(Number);
  const date = new Date(2026, 0, 1, h, m + minsToAdd);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export default function MyTrip() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [trip, setTrip] = useState(initialTripData);
  const [showAI, setShowAI] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showEventEditForm, setShowEventEditForm] = useState(false);
  const [editingEventData, setEditingEventData] = useState({ id: '', time: '', title: '', remarks: '' });
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ title: '', amount: '', status: 'paid', category: '飲食' });
  const [dayPhotos, setDayPhotos] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    const savedTrip = localStorage.getItem('roadtrip-ai-v3-data');
    if (savedTrip) setTrip(JSON.parse(savedTrip));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('roadtrip-ai-v3-data', JSON.stringify(trip));
  }, [trip, isMounted]);

  if (!isMounted) return null; 

  const currentDayData = trip.days.find(d => d.day === activeDay);
  const dailyPaid = currentDayData?.expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + Number(e.amount), 0) || 0;
  const dailyUnpaid = currentDayData?.expenses.filter(e => e.status === 'unpaid').reduce((sum, e) => sum + Number(e.amount), 0) || 0;

  const openNav = (loc, url) => window.open(url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`, '_blank');

  const deleteEvent = (id) => {
    if (!currentDayData) return;
    if (confirm("刪除此行程？")) {
      const updated = currentDayData.events.filter(e => e.id !== id);
      setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, events: updated } : d) });
    }
  };

  const saveEventEdit = () => {
    if (!currentDayData) return;
    const updated = currentDayData.events.map(e => e.id === editingEventData.id ? {
      ...e, time: editingEventData.time, title: editingEventData.title, remarks: editingEventData.remarks.split('\n').filter(r => r.trim() !== '')
    } : e);
    updated.sort((a, b) => {
      const [ah, am] = a.time.split(':').map(Number);
      const [bh, bm] = b.time.split(':').map(Number);
      return (ah * 60 + am) - (bh * 60 + bm);
    });
    setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, events: updated } : d) });
    setShowEventEditForm(false);
  };

  const askAIForSuggestions = (query) => {
    if (!query.trim() || !currentDayData) return;
    setIsThinking(true);
    setTimeout(() => {
      const lastEvent = currentDayData.events[currentDayData.events.length - 1];
      const baseTime = lastEvent ? lastEvent.time : "09:00";
      const travelMins = Math.floor(Math.random() * 20) + 20; 
      const stayMins = query.includes('加油') ? 20 : 60;
      const suggestedTime = addMinutes(baseTime, 60 + travelMins);

      setAiSuggestions([{ 
        id: `ai-new-${Date.now()}`, time: suggestedTime, title: query, location: query, 
        note: `🚗 預估車程：${travelMins}分鐘 | ⏳ 建議停留：${stayMins}分鐘`, 
        travelMins: travelMins, stayMins: stayMins,
        remarks: ["💡 系統已根據預估時間，自動為您順延後續行程", "導航前請留意實際路況"] 
      }]);
      setIsThinking(false);
    }, 1000);
  };

  const addSuggestedEvent = (suggestion) => {
    if (!currentDayData) return;
    let newEvents = [...currentDayData.events, suggestion];
    newEvents.sort((a, b) => {
      const [ah, am] = a.time.split(':').map(Number);
      const [bh, bm] = b.time.split(':').map(Number);
      return (ah * 60 + am) - (bh * 60 + bm);
    });
    const addedIdx = newEvents.findIndex(e => e.id === suggestion.id);
    const shiftMins = suggestion.travelMins + suggestion.stayMins;
    for (let i = addedIdx + 1; i < newEvents.length; i++) {
      newEvents[i].time = addMinutes(newEvents[i].time, shiftMins);
    }
    setTrip({ ...trip, days: trip.days.map(d => d.day === activeDay ? { ...d, events: newEvents } : d) });
    setAiSuggestions([]);
    setCustomQuery('');
  };

  const handlePhotoUpload = (e) => {
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
        <button className="p-2" onClick={() => navigator.share && navigator.share({ url: window.location.href })}><Share size={24} /></button>
      </header>

      <main className="p-4">
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
          {trip.days.map((d) => (
            <button key={d.day} onClick={() => setActiveDay(d.day)} className={`whitespace-nowrap px-4 py-2 rounded-lg border-2 border-[#8D6E63] font-bold transition-all ${activeDay === d.day ? 'bg-[#D9B48F] shadow-[2px_2px_0px_#8D6E63] translate-y-[-2px]' : 'bg-white'}`}>
              Day {d.day}
            </button>
          ))}
        </div>

        {activeTab === 'itinerary' && (
          <div className="animate-fade-in space-y-6">
            <section className="bg-white p-4 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold flex items-center gap-2"><Droplet size={18} className="text-blue-500" /> Vios 狀態</h2>
                <span className="text-sm bg-[#D7CCC8] px-2 py-1 rounded-full font-bold">預估油量: 充足</span>
              </div>
              <p className="text-sm text-red-600 font-bold">{currentDayData?.gasWarning}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-bold text-lg border-b-2 border-dashed border-[#8D6E63] pb-2">{currentDayData?.date} - {currentDayData?.summary}</h2>
              
              <div className="relative border-l-2 border-[#8D6E63] ml-3 pl-6 space-y-6">
                {currentDayData?.events.map((event) => (
                  <div key={event.id} className="relative bg-white p-3.5 rounded-xl border-2 border-[#8D6E63] shadow-[3px_3px_0px_#8D6E63] flex flex-col space-y-2">
                    <div className="absolute -left-[35px] top-4 w-4 h-4 bg-[#D9B48F] rounded-full border-2 border-[#8D6E63]"></div>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex-1 pr-2">
                        <h3 className="font-bold text-lg">{event.time} {event.title}</h3>
                        {event.note && <p className="text-sm font-semibold text-[#8D6E63] mt-1">{event.note}</p>}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {event.location && <button onClick={() => openNav(event.location, event.mapUrl)} className="bg-[#F5E6D3] p-2 rounded-full border-2 border-[#8D6E63] active:bg-[#D9B48F] shadow-[1px_1px_0px_#8D6E63]"><Navigation size={18} /></button>}
                        <button onClick={() => { setEditingEventData({ id: event.id, time: event.time, title: event.title, remarks: event.remarks ? event.remarks.join('\n') : '' }); setShowEventEditForm(true); }} className="bg-blue-50 text-blue-500 p-2 rounded-full border-2 border-blue-200"><Pencil size={18} /></button>
                        <button onClick={() => deleteEvent(event.id)} className="bg-red-50 text-red-500 p-2 rounded-full border-2 border-red-200"><Trash2 size={18} /></button>
                      </div>
                    </div>

                    {(event.location || event.phone) && (
                      <div className="text-xs bg-[#F9F5EF] p-2 rounded-lg border border-[#D7CCC8] space-y-1">
                        {event.location && <p className="flex items-center gap-1 font-medium text-gray-700"><MapPin size={14} className="text-[#8D6E63]" /> {event.location}</p>}
                        {event.phone && <p className="flex items-center gap-1 font-bold text-blue-600"><Phone size={14} /> <a href={`tel:${event.phone}`} className="underline">{event.phone}</a></p>}
                      </div>
                    )}

                    {event.remarks && event.remarks.length > 0 && (
                      <div className="bg-[#FFF8E7] p-3 rounded-lg border-2 border-dashed border-[#D9B48F] space-y-1 mt-2">
                        <div className="flex items-center gap-1 font-bold text-sm text-[#4A3728] border-b border-[#D9B48F] pb-1"><FileText size={16} className="text-[#8D6E63]" /> 備註事項：</div>
                        <ul className="list-disc list-inside text-xs space-y-1 text-gray-700 font-medium leading-relaxed">
                          {event.remarks.map((rem, rIdx) => <li key={rIdx} className={rem.includes('⚠️') ? 'text-red-600 font-bold' : ''}>{rem}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {showEventEditForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-[#FDF9F1] w-full max-w-sm p-6 rounded-2xl border-4 border-[#8D6E63] shadow-[8px_8px_0px_#8D6E63]">
                    <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-xl">編輯行程</h3><button onClick={() => setShowEventEditForm(false)}><X size={24}/></button></div>
                    <div className="space-y-4">
                      <div><label className="text-xs font-bold text-[#8D6E63]">時間 (更改會重新排序)</label><input type="time" value={editingEventData.time} onChange={e => setEditingEventData({...editingEventData, time: e.target.value})} className="w-full border-2 border-[#8D6E63] p-2 rounded-xl mt-1 font-bold" /></div>
                      <div><label className="text-xs font-bold text-[#8D6E63]">名稱</label><input type="text" value={editingEventData.title} onChange={e => setEditingEventData({...editingEventData, title: e.target.value})} className="w-full border-2 border-[#8D6E63] p-2 rounded-xl mt-1" /></div>
                      <div><label className="text-xs font-bold text-[#8D6E63]">備註 (換行變清單)</label><textarea rows={4} value={editingEventData.remarks} onChange={e => setEditingEventData({...editingEventData, remarks: e.target.value})} className="w-full border-2 border-[#8D6E63] p-2 rounded-xl mt-1 text-sm" /></div>
                      <button onClick={saveEventEdit} className="w-full bg-[#D9B48F] border-2 border-[#8D6E63] p-3 rounded-xl font-bold shadow-[2px_2px_0px_#8D6E63] active:translate-y-1 active:shadow-none transition-all">儲存修改</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-4 border-t-2 border-dashed border-[#8D6E63]">
                <button onClick={() => setShowAI(!showAI)} className="w-full flex items-center justify-center gap-2 bg-black text-white p-3 rounded-xl font-bold shadow-[4px_4px_0px_#D9B48F] active:translate-y-1 active:shadow-[0px_0px_0px_#D9B48F] transition-all"><Sparkles size={20} /> AI 智慧行程顧問</button>
                {showAI && (
                  <div className="p-4 bg-white border-2 border-[#8D6E63] rounded-xl mt-4 space-y-4 animate-fade-in shadow-[4px_4px_0px_#8D6E63]">
                    <div className="flex gap-2">
                      <input type="text" placeholder="輸入想去的景點..." value={customQuery} onChange={(e) => setCustomQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && askAIForSuggestions(customQuery)} className="flex-1 border-2 border-[#8D6E63] p-2 rounded-xl outline-none" />
                      <button onClick={() => askAIForSuggestions(customQuery)} className="bg-[#D9B48F] px-4 rounded-xl border-2 border-[#8D6E63] font-bold">搜尋</button>
                    </div>
                    {isThinking && <div className="text-center py-4 text-gray-500 font-bold animate-pulse">計算地圖預估時間中...</div>}
                    {!isThinking && aiSuggestions.length > 0 && (
                      <div className="space-y-3 mt-4 pt-4 border-t border-dashed border-gray-300">
                        {aiSuggestions.map(suggestion => (
                          <div key={suggestion.id} className="flex flex-col bg-[#FDF9F1] p-3 rounded-lg border border-[#8D6E63] space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-sm text-blue-700">{suggestion.time} 預計抵達</p>
                                <p className="font-bold text-base">{suggestion.title}</p>
                                <p className="text-xs text-red-600 font-bold mt-1">{suggestion.note}</p>
                              </div>
                              <button onClick={() => addSuggestedEvent(suggestion)} className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 rounded-lg text-xs font-bold shadow-[2px_2px_0px_black] active:translate-y-0.5 active:shadow-[0px_0px_0px_black] flex-shrink-0"><PlusCircle size={14}/> 加入</button>
                            </div>
                            <div className="text-xs bg-[#FFF8E7] p-2 rounded border border-dashed border-[#D9B48F] text-gray-600">
                              <p className="font-bold mb-1">💡 自動帶入備註：</p>
                              <ul className="list-disc list-inside">{suggestion.remarks.map((rem, idx) => <li key={idx}>{rem}</li>)}</ul>
                            </div>
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

        {activeTab === 'ledger' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-bold text-xl border-b-4 border-[#D9B48F] inline-block pb-1">Day {activeDay} 每日花費 💰</h2>
            <div className="bg-white p-4 rounded-xl border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">款項明細</h3><button onClick={() => setShowExpenseForm(true)} className="bg-[#D9B48F] p-1.5 rounded-full border-2 border-[#8D6E63]"><Plus size={20} /></button></div>
              <ul className="space-y-3">
                {currentDayData?.expenses.map(exp => (
                  <li key={exp.id} className="flex justify-between items-center border-b border-dashed border-[#8D6E63] pb-3">
                    <div><span className="font-bold text-lg">{exp.title}</span><div className={`text-sm font-bold mt-1 ${exp.status === 'paid' ? 'text-green-600' : 'text-red-500'}`}>{exp.status === 'paid' ? '已付' : '未付'} ${exp.amount}</div></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'diary' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-bold text-xl border-b-4 border-[#D9B48F] inline-block pb-1">Day {activeDay} 照片日記 📷</h2>
            <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
            <div className="space-y-4">
              <button onClick={() => fileInputRef.current?.click()} className="w-full flex justify-center items-center gap-2 bg-[#D9B48F] border-2 border-[#8D6E63] p-3 rounded-xl font-bold shadow-[2px_2px_0px_#8D6E63]"><ImagePlus size={20} /> 上傳照片</button>
              <div className="grid grid-cols-2 gap-3">
                {(dayPhotos[activeDay] || []).map((url, idx) => (<div key={idx} className="aspect-square rounded-xl border-2 border-[#8D6E63] overflow-hidden shadow-[2px_2px_0px_#8D6E63]"><img src={url} alt="照片" className="w-full h-full object-cover" /></div>))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full bg-[#F5E6D3] border-t-2 border-[#8D6E63] flex justify-around p-3 pb-8 z-40">
        <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center w-1/3 ${activeTab === 'itinerary' ? 'text-[#8D6E63]' : 'text-gray-400'}`}><MapPin size={24} /><span className="text-xs font-bold mt-1">行程</span></button>
        <button onClick={() => setActiveTab('ledger')} className={`flex flex-col items-center w-1/3 ${activeTab === 'ledger' ? 'text-[#8D6E63]' : 'text-gray-400'}`}><Wallet size={24} /><span className="text-xs font-bold mt-1">記帳</span></button>
        <button onClick={() => setActiveTab('diary')} className={`flex flex-col items-center w-1/3 ${activeTab === 'diary' ? 'text-[#8D6E63]' : 'text-gray-400'}`}><Camera size={24} /><span className="text-xs font-bold mt-1">日記</span></button>
      </footer>
    </div>
  );
}
