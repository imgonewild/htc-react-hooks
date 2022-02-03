# hTC (RWD card list & view details with global search & storage functions)

This project was generated with [React](https://github.com/facebook/react/) version 17.0.2

This project is also available on [Codesandbox](https://codesandbox.io/s/htc-rwd-card-list-detail-view-h4504?file=/src/app/park-list/park-list.component.html).

| ![Result](https://github.com/imgonewild/htc-react-hooks/blob/main/src/assets/htc-react-hooks.gif) |
|:--:| 
| Flow.gif |

# Environment

Run `git clone https://github.com/imgonewild/htc-react-hooks.git` for downloading repository to local.

Run `cd htc/ && npm install` for installing the dependencies in the local node_modules folder.

Run `ng serve` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

# Logics

- Verify that the JSON data is correct

- Verify RWD requirements

- Verify the Detail View page field data and JSON are correct

- **extra features:**
  - **(Bonus)Embedded map(Leaflet)**
  - **(Bonus)Local search function**
  - **Local/Global search switch and function**
  - **Loading bar**
  - **Save and load user activities in localStorage**

# Difficulties
- learning and coding timeline
  - 1/29, 1/30, 1/31 read offical react hooks documents, react hooks blogs and watched react hook youtube tutorial videos
  - 2/1, 2/2, 2/3 rewrote [angular project](https://github.com/imgonewild/htc) to react hooks
  
- react-leaflet can't show marker icon correctly
  - It's an issue on official github, [solution](https://github.com/PaulLeCam/react-leaflet/issues/453) provided by programmer
  
- Won't able to go to next page while using global search
  - Because it would redirect to first page while using global search.
  - Added `isGlobalAction` variable to determine if user change page in global search to solve this problem

# Requirements

- Use Ract, Vue or Angular
- Data source:
  - 台北市公園基本資料 [Open data](https://data.gov.tw/dataset/128366)

- According to [Figma](https://www.figma.com/file/uj8MJ9dZfIlJB2kzhkxjfK/Interview?node-id=10%3A3) layout
- Show 12 data each page
- RWD feature 
  - bigger than 768px, display four data per line
  - 768px ~ 500px, display three data per line
  - less than 500px, display two data per line

- Data information
  - Title: pm_name -> park name
  - Description: pm_overview -> park overview
  - Remark: pm_construction -> park constructed year
  - Location: pm_location -> park location
  - Transit: pm_transit -> ways to transit to park 

- Pagination function
  - Click card and redirect to detail view page which including data information and use park id as index
  
- Route:
  - /parks (list view)
  - /parks/:park_id (detail view)

- Provide README:
  - Environment
  - Logics
  - Difficulties

- Use git version control
- Uploaded project to GitHub

- Bonus:
  - Use embedded map(OpenStreetMap)
  - local search function
