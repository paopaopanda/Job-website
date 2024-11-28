# 使用到的工具

tutorial:
vite + react:
json-server:
react-router-dom:
html 檔: https://github.com/bradtraversy/react-crash-2024/tree/main/_theme_files
proxy:
tailwind css:

# 學習內容

目錄結構
jsx 語法
拆分 component
useState
react-router
json-server
useEffect

proxy
在 vite.config.js 內設置
server: {
proxy: {
"/api": {
target: "http://localhost:3000",
changeOrigin: true,
rewrite: (path) => path.replace(/^\/api/, ""),
},
},
},

dynamic_router 設置
dynamic link

        path: "/job/:id",  -> 使用:id代表根據回傳資料id前往對應路徑
        element: <JobDetail />,

## react loader

APP 切換到/job/:id 會自動執行 getJobDetailLoader 取得資料，
JobDetail 面透過 useLoaderData();取得 loader 回傳的資料

import JobDetail, { getJobDetailLoader } from "./pages/JobDetail";

{
path: "/job/:id",
element: <JobDetail />,
loader: getJobDetailLoader,
},

#### JobDetail

const JobDetail = () => {
const job = useLoaderData();
}

const getJobDetailLoader = async ({ params }) => {
let res = await fetch(`/api/jobs/${params.id}`);
return await res.json();
};

export { JobDetail as default, getJobDetailLoader };
