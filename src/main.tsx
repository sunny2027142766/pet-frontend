/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:22:13
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:27:25
 * @FilePath: \pet-frontend\src\main.tsx
 * @Description: 
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved. 
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
