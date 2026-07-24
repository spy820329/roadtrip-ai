import { NextResponse } from 'next/server';

// System Prompt 定義：強制 AI 輸出結構化的 JSON 格式以利前端繪製與 Firestore 存儲
const TRAVEL_BRAIN_SYSTEM_PROMPT = `
You are the core intelligence of RoadTrip AI v3.0, known as "Travel Brain".
Your task is to analyze user requests for road trips and resolve them into a strictly structured JSON response.

Constraints & Rules:
1. Parse user intention, explicit constraints (budget, check-in time, route style), and implicit needs.
2. Generate optimized sequence of stops including Spots, Restaurants, Fuel Stations, and Parking.
3. Ensure no backtrack routing (optimize for direct sequential travel).

Response MUST strictly follow this JSON schema:
{
  "summary": "Brief travel strategy overview",
  "totalEstimatedCost": 1000,
  "routeHighlights": ["Coastal view", "Local seafood", "Easy parking"],
  "itinerary": [
    {
      "timeSlot": "09:00 - 11:30",
      "category": "spot",
      "title": "海邊秘境景點",
      "note": "最佳觀海點，附停車資訊",
      "estimatedCost": 0
    },
    {
      "timeSlot": "12:00 - 13:30",
      "category": "restaurant",
      "title": "沿海特色平價美食",
      "note": "海鮮熱炒或特色簡餐",
      "estimatedCost": 400
    },
    {
      "timeSlot": "14:00 - 14:30",
      "category": "gas_station",
      "title": "順路中油加油站",
      "note": "補給與洗手間",
      "estimatedCost": 300
    },
    {
      "timeSlot": "15:00 - 16:30",
      "category": "spot",
      "title": "下午茶觀景咖啡廳",
      "note": "享受海景並放鬆",
      "estimatedCost": 300
    },
    {
      "timeSlot": "17:00",
      "category": "hotel",
      "title": "飯店/民宿辦理入住 (Check-in)",
      "note": "準時抵達符合約束條件",
      "estimatedCost": 0
    }
  ]
}
`;

export async function POST(request: Request) {
  try {
    const { prompt, userLocation, vehiclePreferences } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // TODO: 串接 Google Gemini / OpenAI API
    // 這裡使用內建的模擬 Engine 響應結構化數據，確保前端能正常渲染與測試
    const mockAIResponse = {
      summary: `已為您規劃順路海邊自駕行程，符合 17:00 前辦理入住且預算控制在 $1000 以內。`,
      totalEstimatedCost: 1000,
      routeHighlights: ["不走回頭路", "順路加油", "海景餐廳", "17:00 準時 Check-in"],
      itinerary: [
        {
          timeSlot: "10:30 - 12:00",
          category: "spot",
          title: "淺水灣海景步道",
          note: "沿海步道散步，免費停車位充足",
          estimatedCost: 0
        },
        {
          timeSlot: "12:15 - 13:30",
          category: "restaurant",
          title: "海岸小農特色海鮮簡餐",
          note: "預估花費 $450，在地人推薦平價美食",
          estimatedCost: 450
        },
        {
          timeSlot: "13:45 - 14:00",
          category: "gas_station",
          title: "台灣中油直營站（順路補給）",
          note: "預估加油與飲料補給 $250",
          estimatedCost: 250
        },
        {
          timeSlot: "14:30 - 16:30",
          category: "spot",
          title: "懸崖海景咖啡館",
          note: "看海放鬆，抵用券消費 $300",
          estimatedCost: 300
        },
        {
          timeSlot: "17:00",
          category: "hotel",
          title: "海景飯店 Check-in",
          note: "順利準時抵達，結束今日完美行程",
          estimatedCost: 0
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: mockAIResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'AI Travel Brain Processing Failed', details: String(error) },
      { status: 500 }
    );
  }
}
