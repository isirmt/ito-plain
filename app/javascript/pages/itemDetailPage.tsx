import React, { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

type TagResponse = {
  id: number
  name: string
  slug: string
}

type UserResponse = {
  id: number
  username: string
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
  user: UserResponse
}

export default function ItemDetailPage() {
  const { id } = useParams();
  const itemId = id ? Number(id) : null;
  const [item, setItem] = useState<ItemResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) return;

    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${itemId}`);
        if (!response.ok) {
          console.error(`${response.status}: ${response.statusText}`);
          setError(`${response.status}: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    }

    fetchItem();
  }, [])

  return (
    <main>
      {isLoading && <div>loading</div>}
      {error && <div>{error}</div>}
      {item && (
        <div>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>@{item.user.username}</p>
        </div>
      )}

    </main>
  )
}