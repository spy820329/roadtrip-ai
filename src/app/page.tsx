'use client';
import { useState } from 'react';
import { MapPin, Navigation, Droplet, Wallet, Camera, ChevronLeft, Share, Route } from 'lucide-react';

const tripData = {
  tripName: "花東六天五夜熱血環島",
  car: {
    model: "Toyota Vios",
    tankCapacity: 35,
    currentGas: 100,
    efficiency: 14,
  },
  budget: {
    totalPaid: 9710, 
    totalUnpaid: 4600,
  },
  days: [
    {
      day: 1,
      date: "7/26 (日)",
      summary: "台南出發 ➔ 台東",
      gasWarning: "⚠️ 台南至台東約 160km，出發前請確認油表，預計消耗 1/3 桶油。",
      events: [
        { time: "12:00", title: "出發", location: "台南火車站", type: "drive" },
        { time: "15:00", title: "抵達台東住宿", location: "蘋果商務旅店", type: "hotel", cost: 1770, status: "paid" },
        { time: "18:30", title: "逛鐵花村、台東夜市", location: "鐵花村音樂聚落", type: "spot", note: "美食推薦：林家臭豆腐" }
      ]
    },
    {
      day: 2,
      date: "7/27 (一)",
      summary: "台東 ➔ 綠島探險",
      gasWarning: "🅿️ 車輛停放富岡漁港，無需加油。",
      events: [
        { time: "11:30", title: "搭船 (綠島之星)", location: "富岡漁港", type: "boat" },
        { time: "14:00", title: "藍洞探險", location: "綠島 藍洞", type: "spot" },
        { time: "20:00", title: "夜探梅花鹿、海邊看流星", location: "綠島", type: "spot" },
        { time: "22:00", title: "夜宿柴口岸", location: "綠島 柴口岸民宿", type: "hotel", cost: 4600, status: "unpaid", note: "含船票與體驗" }
      ]
    },
    {
      day: 3,
      date: "7/28 (二)",
      summary: "綠島 ➔ 花蓮市區",
      gasWarning: "⛽ 沿途經台11線，建議在成功鎮加油站補充電量與油料。",
      events: [
        { time: "09:00", title: "半潛船", location: "綠島南寮漁港", type: "spot" },
        { time: "12:30", title: "搭船回台東", location: "富岡漁港", type: "boat" },
        { time: "14:00", title: "小野柳", location: "小野柳", type: "spot" },
        { time: "14:50", title: "水往上流", location: "水往上流遊憩區", type: "spot" },
        { time: "15:20", title: "金樽遊憩區", location: "金樽遊憩區", type: "spot", note: "可上廁所休息" },
        { time: "15:40", title: "東河買包子", location: "東河包子", type: "spot" },
        { time: "16:40", title: "三仙台", location: "三仙台", type: "spot" },
        { time: "17:30", title: "沿途順遊", location: "北迴歸線地標 台11線", type: "spot", note: "北迴歸線地標、月洞" },
        { time: "20:00", title: "花蓮美麗家民宿", location: "花蓮市國民八街96號", type: "hotel", cost: 900, status: "paid" },
        { time: "21:00", title: "逛夜市", location: "東大門夜市", type: "spot" }
      ]
    },
    {
      day: 4,
      date: "7/29 (三)",
      summary: "遠雄海洋公園 ➔ 宜蘭礁溪",
      gasWarning: "⛽ 花蓮至宜蘭路途遙遠，上蘇花改前請確保油量充足。",
      events: [
        { time: "08:30", title: "出發", location: "花蓮市國民八街96號", type: "drive" },
        { time: "09:40", title: "抵達海洋公園", location: "遠雄海洋公園", type: "spot", cost: 1423, status: "paid" },
        { time: "11:00", title: "美人魚秀", location: "遠雄海洋公園", type: "spot", cost: 320, status: "paid" },
        { time: "15:00", title: "出發往宜蘭", location: "七星潭", type: "drive", note: "經過七星潭，車程約2.5小時" },
        { time: "18:00", title: "香檳溫泉飯店", location: "宜蘭縣忠孝路8號", type: "hotel", cost: 985, status: "paid" },
        { time: "19:00", title: "晚餐", location: "正好鮮肉小籠包 礁溪", type: "spot" }
      ]
    },
    {
      day: 5,
      date: "7/30 (四)",
      summary: "烏石港賞鯨 ➔ 羅東",
      gasWarning: "🚗 短程移動，隨時留意油表即可。",
      events: [
        { time: "09:00", title: "前往烏石港", location: "烏石港漁會大樓", type: "drive", note: "集合地點：1樓2號櫃檯" },
        { time: "09:30", title: "賞鯨+繞島(牛奶海)", location: "烏石港", type: "spot", cost: 1199, status: "paid", note: "行程約3小時" },
        { time: "12:30", title: "烏石港吃午餐", location: "烏石港", type: "spot" },
        { time: "15:00", title: "宜蘭景點", location: "羅東林業文化園區", type: "spot", note: "下午彈性安排景點" },
        { time: "18:00", title: "金城客棧", location: "宜蘭縣公正路60號", type: "hotel", cost: 1138, status: "paid" }
      ]
    },
    {
      day: 6,
      date: "7/31 (五)",
      summary: "台北市區 ➔ 新莊看球",
      gasWarning: "⛽ 台北市區走走停停較耗油，結束旅程前可順路加滿。",
      events: [
        { time: "09:30", title: "台北101", location: "台北101", type: "spot" },
        { time: "13:00", title: "科教館 & 天文館", location: "國立臺灣科學教育館", type: "spot" },
        { time: "18:00", title: "新莊看棒球", location: "新莊棒球場", type: "spot" },
        { time: "22:00", title: "幸福讚精品飯店", location: "台北市思源路332巷9號", type: "hotel", cost: 1975, status: "paid" }
      ]
    }
  ],
  packingList: ["6件衣服", "4件短褲2件長褲", "諾恩墨鏡", "3個豆腐頭", "泳衣", "盥洗用品", "毛巾", "牙刷牙膏", "隱形眼鏡藥水", "保養品", "防曬", "手持電扇"]
};

export default function MyTrip() {
  const [activeDay, setActiveDay] = useState(1);
  const currentDayData = tripData.days.find(d => d.day === activeDay);

  // 單點導航
  const openSingleGoogleMap = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  // 🌟 一鍵串連當天所有地點（含起點、沿途景點、終點飯店）的多點導航
  const openFullDayRoute = () => {
    if (!currentDayData || !currentDayData.events) return;

    // 提取當天所有不重複的地點名稱
    const locations = currentDayData.events
      .map(e => e.location)
      .filter((loc): loc is string => Boolean(loc && loc.trim()));

    if (locations.length === 0) return;

    if (locations.length === 1) {
      openSingleGoogleMap(locations[0]);
      return;
    }

    const origin = encodeURIComponent(locations[0]);
    const destination = encodeURIComponent(locations[locations.length - 1]);

    if (locations.length === 2) {
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank');
      return;
    }

    // Google Maps 網址參數最多支援 9 個中間停靠點 (waypoints)
    const waypoints = locations
      .slice(1, -1)
      .slice(0, 9)
      .map(loc => encodeURIComponent(loc))
      .join('|');

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-[#FDF9F1] text-[#4A3728] font-sans pb-24">
      <header className="flex justify-between items-center p-4 border-b-2 border-[#8D6E63] bg-[#F5E6D3] rounded-b-2xl">
        <button className="p-2"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold tracking-wider">我的旅行 🚗</h1>
        <button className="p-2"><Share size={24} /></button>
      </header>

      <main className="p-4 space-y-6">
        {/* Vios 狀態卡片 */}
        <section className="bg-white p-4 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold flex items-center gap-2"><Droplet size={18} className="text-blue-500" /> {tripData.car.model} 狀態</h2>
            <span className="text-sm bg-[#D7CCC8] px-2 py-1 rounded-full">油量: {tripData.car.currentGas}%</span>
          </div>
          <p className="text-sm text-red-600 font-bold">{currentDayData?.gasWarning}</p>
        </section>

        {/* 預算卡片 */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-[#EFEBE9] p-3 rounded-xl border-2 border-[#8D6E63] flex flex-col items-center">
            <span className="text-sm text-gray-600">已付款 ✅</span>
            <span className="font-bold text-lg">${tripData.budget.totalPaid}</span>
          </div>
          <div className="bg-[#FFEBEE] p-3 rounded-xl border-2 border-[#8D6E63] flex flex-col items-center">
            <span className="text-sm text-red-500">未付款 ⚠️</span>
            <span className="font-bold text-lg">${tripData.budget.totalUnpaid}</span>
          </div>
        </section>

        {/* Day 1 ~ Day 6 切換選單 */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {tripData.days.map((d) => (
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
            
            {/* 🗺️ 一鍵當天全行程導航按鈕 */}
            <button
              onClick={openFullDayRoute}
              className="flex items-center gap-1.5 bg-[#D9B48F] hover:bg-[#C8A37E] active:scale-95 text-[#4A3728] px-3 py-1.5 rounded-xl border-2 border-[#8D6E63] font-bold text-xs shadow-[2px_2px_0px_#8D6E63] transition-all"
            >
              <Route size={16} />
              <span>一鍵串連當天全導航</span>
            </button>
          </div>
          
          <div className="relative border-l-2 border-[#8D6E63] ml-3 pl-6 space-y-6">
            {currentDayData?.events.map((event, idx) => (
              <div key={idx} className="relative bg-white p-3 rounded-xl border-2 border-[#8D6E63] shadow-[3px_3px_0px_#8D6E63]">
                <div className="absolute -left-[35px] top-4 w-4 h-4 bg-[#D9B48F] rounded-full border-2 border-[#8D6E63]"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{event.time} {event.title}</h3>
                    {event.note && <p className="text-sm text-gray-500 mt-1">{event.note}</p>}
                    {event.cost && (
                      <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block border ${event.status === 'paid' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                        {event.status === 'paid' ? '已付' : '未付'} ${event.cost}
                      </span>
                    )}
                  </div>
                  
                  {/* 單點導航按鈕 */}
                  {event.location && (
                    <button 
                      onClick={() => openSingleGoogleMap(event.location)}
                      title="單獨導航此地點"
                      className="bg-[#F5E6D3] p-2 rounded-full border-2 border-[#8D6E63] active:bg-[#D9B48F] flex-shrink-0 ml-2 shadow-[1px_1px_0px_#8D6E63]"
                    >
                      <Navigation size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full bg-[#F5E6D3] border-t-2 border-[#8D6E63] flex justify-around p-3 pb-6">
        <button className="flex flex-col items-center text-[#8D6E63]"><MapPin size={24} /><span className="text-xs font-bold mt-1">行程</span></button>
        <button className="flex flex-col items-center text-gray-400"><Wallet size={24} /><span className="text-xs font-bold mt-1">記帳</span></button>
        <button className="flex flex-col items-center text-gray-400"><Camera size={24} /><span className="text-xs font-bold mt-1">日記</span></button>
      </footer>
    </div>
  );
}
