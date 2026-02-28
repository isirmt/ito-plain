import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import ItemDetailPage from "../pages/itemDetailPage"
import ItemListPage from "../pages/itemListPage"
import MyPage from "../pages/myPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ItemListPage />} />
        <Route path="/d/:id" element={<ItemDetailPage />} />
        <Route path="/my/*" element={<MyPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
