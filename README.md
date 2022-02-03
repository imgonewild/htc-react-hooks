# hTC (RWD card list & view details with global search & storage functions)

This project was generated with [React](https://github.com/facebook/react/) version 17.0.2

This project is also available on [Codesandbox](https://codesandbox.io/s/htc-rwd-card-list-detail-view-h4504?file=/src/app/park-list/park-list.component.html).

| ![Result](https://github.com/imgonewild/htc-react-hooks/blob/main/src/assets/htc-react-hooks.gif) |
|:--:| 
| 示意圖.gif |

# 執行專案的方法,步驟,環境設定

Run `git clone https://github.com/imgonewild/htc-react-hooks.git` for downloading repository to local.

Run `cd htc/ && npm install` for installing the dependencies in the local node_modules folder.

Run `ng serve` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

# 專案設計邏輯

- 確認 JSON 資料是否正確
- 確認 RWD 需求
- 確認 Detail View 欄位資料和 JSON 是否正確
- **額外功能:**
  - **Local/global search switch and function**
  - **Save user activities in localStorage**

# 專案執行時遇到痛點以及解法

- 點下一頁後再點選 Card 會進入錯誤的 Detail view
  - 將 card id 值依照真正的 Index 顯示, 原本 id 是 0 到 11
- 在Codesandbox上執行會延遲(載入JSON時間過長)
  - 加入Loading spinner(loader)
- react-leaflet無法抓到Marker icon
  - 爬文後找到這是一個Issue，網友提供了[解法](https://github.com/PaulLeCam/react-leaflet/issues/453)
- 使用global search後，無法到下一頁
  - 因為使用global search會把頁面自動跳轉到第一頁，所以我需要加上isGlobalAction來判斷是否在global search有切換頁面

# 需求

- 請使用 Ract, Vue or Angular 進行開發
- 請參照開放平台取得資料

  - 台北市公園基本資料 [Open data](https://data.gov.tw/dataset/128366)

- 根據[Figma](https://www.figma.com/file/uj8MJ9dZfIlJB2kzhkxjfK/Interview?node-id=10%3A3)進行 layout
- 每頁需顯示 12 筆資料
- 需支援 RWD，list view >768px 每行顯示四筆，768px~500px 每行顯示三筆，<500px 每行顯示兩筆

- 每筆資料內包含
  - Title: pm_name 公園名稱
  - Description: pm_overview 公園概述
  - Remark: pm_construction 建造年度
  - Location: pm_location 地址
  - Transit: pm_transit 交通方式

- 需製作分頁功能
  點擊卡片需跳至 Detail View，包含上述資料，park id 使用陣列 index 即可
- Route:
  - /parks (list view)
  - /parks/:park_id (detail view)

- 提供一份 README:
  - 執行專案的方法,步驟,環境設定
  - 專案設計邏輯
  - 專案執行時遇到痛點以及解法

- 使用 git 來做整個專案的版本控管
- 請將專案上傳到 GitHub

- 加分項目
  - 內嵌地圖: OpenStreetMap
  - 搜尋功能, 僅 local search 即可
