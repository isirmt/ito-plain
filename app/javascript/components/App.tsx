import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import RequireAuth from "./requireAuth"
import ItemDetailPage from "../pages/itemDetailPage"
import ItemListPage from "../pages/itemListPage"
import MyPage from "../pages/myPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemListPage />} />
        <Route path="/d/:id" element={<ItemDetailPage />} />
        <Route
          path="/my/*"
          element={
            <RequireAuth>
              <MyPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
