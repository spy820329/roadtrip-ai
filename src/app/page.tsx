'use client';
import { useState, useRef, useEffect } from 'react';
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
        { id: "d2-3", time: "20:00", title: "夜探梅花鹿、海邊看
