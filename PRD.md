# RoadTrip AI v3.0 - Product Requirement Document (PRD) & System Architecture

## 1. 產品願景 (Product Vision)
RoadTrip AI v3.0 旨在成為次世代的終極自駕旅行助理。結合地圖導航、動態記帳、車輛管理、分工清單與 LLM 「AI 旅行大腦 (Travel Brain)」，提供一站式、非線性且即時動態調整的自駕體驗。

---

## 2. 核心核心模組 (12 Major Modules + Travel Brain)

| 模組編號 | 模組名稱 | 核心功能說明 |
| :--- | :--- | :--- |
| **00** | **AI 旅行大腦 (Travel Brain)** | 核心 LLM Agent：接收自然語言指令（如：預算、時間 constraints、路線偏好），自動串接與輸出行程、美食、加油、停車建議。 |
| **01** | **使用者與旅伴 (User & Social)** | Google/Apple OAuth 登入、多玩家權限管理、行程即時共享與協同編輯。 |
| **02** | **行程規劃 (Itinerary)** | AI 多點排序、動態拖曳、順路最佳化（TSP 演算法支援）。 |
| **03** | **Google Maps 整合** | 導航 API 串接、景點/美食搜尋、附近停車場與加油站即時圖層。 |
| **04** | **AI 動態排程 (AI Scheduling)** | 時間預估、交通塞車預警、行程衝突提醒。 |
| **05** | **動態記帳 (Expenses)** | 多幣別收支紀錄、預算控制、Splitwise 式分帳計算、分帳圖表與 CSV 匯出。 |
| **06** | **車輛與油耗 (Vehicle & Maintenance)** | 支援 Toyota 等車款數據輸入、油耗計算、即時油價比對、定期保養提醒。 |
| **07** | **裝備與行李 (Packing List)** | 情境式清單範本（露營、海邊、泡湯、自駕行程應急包）。 |
| **08** | **動態天氣與海況 (Weather)** | 雨量預報、風速、浪高（海邊行程提示）、日出日落時間計算。 |
| **09** | **匯出與分享 (Export & Social)** | 網頁版行程分享、PDF 匯出、IG / Threads 格式視覺化卡片輸出。 |
| **10** | **AI 即時旅行助手 (Context Assistant)** | 突發狀況處理（如：「現在下大雨，幫我把戶外行程改室內」）。 |
| **11** | **旅行回憶錄 (Memories)** | 軌跡記錄、照片/影片地圖定位、動態生成旅行日誌與短片動畫。 |
| **12** | **系統與設定 (Settings)** | 深色模式、離線 PWA 同步、多語系、雲端備份與還原。 |

---

## 3. 系統架構與技術堆疊 (Tech Stack)

### Front-End (前端)
* **Framework**: React / Next.js (Progressive Web App - PWA)
* **UI Library**: Tailwind CSS + Shadcn UI
* **State Management**: Zustand / React Query

### Back-End & Database (後端與資料庫)
* **Platform**: Google Firebase (asia-east1 台灣機房)
* **Authentication**: Firebase Auth (Google & Apple)
* **Database**: Firestore (NoSQL Document DB)
* **Storage**: Firebase Cloud Storage (媒體檔案與圖片)
* **Serverless Functions**: Firebase Cloud Functions (Node.js/Python)

### AI & External APIs (AI 與外部服務)
* **AI Engine**: OpenAI GPT-4o / Google Gemini Flash (Travel Brain Agent Engine)
* **Map Services**: Google Maps Platform (Places API, Directions API, Distance Matrix API)
* **Weather Data**: OpenWeatherMap API / 中央氣象署 Open API

---

## 4. Firestore 資料庫 ER 結構設計 (Data Models)

### `users` Collection
* `uid`: string (Primary Key)
* `displayName`: string
* `email`: string
* `photoURL`: string
* `preferredVehicle`: object (model, fuelType, avgFuelConsumption)
* `createdAt`: timestamp

### `trips` Collection
* `tripId`: string (Primary Key)
* `title`: string
* `ownerId`: string (FK -> users.uid)
* `members`: array of userIds
* `startDate`: date
* `endDate`: date
* `budget`: number
* `createdAt`: timestamp

### `trips/{tripId}/itinerary` Sub-collection
* `itemId`: string
* `dayIndex`: number
* `order`: number
* `placeId`: string (Google Place ID)
* `name`: string
* `location`: GeoPoint (lat, lng)
* `category`: enum ('spot', 'restaurant', 'gas_station', 'parking', 'hotel')
* `estimatedDuration`: number (mins)
* `cost`: number

### `trips/{tripId}/expenses` Sub-collection
* `expenseId`: string
* `payerId`: string (FK -> users.uid)
* `amount`: number
* `category`: string
* `splitBetween`: array of userIds
* `createdAt`: timestamp

---

## 5. AI 旅行大腦 (Travel Brain) 運作流程架構

1. **User Prompt Input**: 接收自然語言（例如：「今天想去海邊，下午五點前入住，不想走回頭路，預算1000元」）。
2. **Context Enrichment**: 後端注入當前 GPS 位置、車輛油量狀態、當前時間與預設偏好。
3. **Agent Orchestration (LLM)**:
   - 解析 Intent 與 Constraints（預算 ≤ 1000, 目的地 constraint = 海邊, check-in time ≤ 17:00）。
   - 呼叫 Google Places API 搜尋沿線熱門海邊景點與美食。
   - 呼叫 Distance Matrix API 進行路徑最佳化（避免回頭路）。
   - 自動補全沿線最佳加油站與停車場。
4. **Structured JSON Output**: 輸出符合前端 UI 規格的 JSON 結構並自動更新至 Firestore。
