# hTC (RWD card list & view details with global search & storage functions)

This project was generated with [React](https://github.com/facebook/react/) version 17.0.2

This project is also available on [Codesandbox](https://codesandbox.io/s/htc-react-hooks-fuv8d?file=/src/index.js).

| ![Result](https://github.com/imgonewild/htc-react-hooks/blob/main/src/assets/htc-react-hooks.gif) |
|:--:| 
| Flow.gif |

# Environment

Run `git clone https://github.com/imgonewild/htc-react-hooks.git` for downloading repository to local.

Run `cd htc-react-hooks/ && npm install` for installing the dependencies in the local node_modules folder.

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

# Logics

- Verify that the JSON data is correct

- Verify RWD requirement

- Verify the Detail View page field data and JSON are correct

# **Extra features**
  - **(Bonus)** Embedded map(Leaflet)
  - **(Bonus)** Local search function
  - Local/Global search switch and function
  - Debounce for search input
  - Store user activities in localStorage
  - Show Loading bar while fetching json data

# Difficulties
- learning and coding timeline
  - 1/29, 1/30, 1/31 read official react hooks documents, react hooks blogs and watched react hook youtube tutorial videos
  - 2/1, 2/2, 2/3 rewrote [angular project](https://github.com/imgonewild/htc) to react hooks
  
- react-leaflet can't show marker icon correctly
  - It's an issue on github, [solution](https://github.com/PaulLeCam/react-leaflet/issues/453) provided by programmer
  
- Won't able to go to next page while using global search
  - (Why?) Because it would redirect to first page while using global search.
  - (Solution) Added `isGlobalAction` variable to determine if user change page in global search to solve this problem

# Requirements

- Use Ract, Vue or Angular
- Data source: [臺北市公園基本資料](https://data.gov.tw/dataset/128366)
- According to [Figma](https://www.figma.com/file/uj8MJ9dZfIlJB2kzhkxjfK/Interview?node-id=10%3A3) layout
- Show 12 data each page
- RWD feature 
  - Display four data per line when window size > 768px
  - Display three data per line when window size from 768px to 500px
  - Display two data per line when window size < 500px

- Data information
  - Title: pm_name(Park name)
  - Description: pm_overview(Park overview)
  - Remark: pm_construction(Park constructed year)
  - Location: pm_location(Park location)
  - Transit: pm_transit(Ways to transit to park)

- Pagination function
  - Click card and redirect to detail view page which including data information and use park id as index
  
- Route:
  - /parks (list view)
  - /parks/:park_id (detail view)

- Provide README:
  - Environment
  - Logics
  - Difficulties

- Use git version control and upload project to GitHub

- Bonus:
  - Use embedded map(OpenStreetMap)
  - local search function
