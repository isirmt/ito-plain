import React from "react"

import { useParams } from "react-router-dom"

export default function ItemDetailPage() {
  const { id } = useParams();
  const itemId = id ? Number(id) : null;

  console.log("Item ID:", itemId);

  return (
    <main>

    </main>
  )
}