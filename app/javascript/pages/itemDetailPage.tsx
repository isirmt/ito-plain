import React from "react"

import { useParams } from "react-router-dom"

type TagResponse = {
  id: number
  name: string
  slug: string
}

type ItemResponse = {
  id: number
  title: string
  description: string
  html: string
  css: string
  js: string
  status: number
  createdAt: string
  updatedAt: string
  tags: TagResponse[]
  user
}

export default function ItemDetailPage() {
  const { id } = useParams();
  const itemId = id ? Number(id) : null;
  const [item, setItem] = React.useState();

  return (
    <main>

    </main>
  )
}