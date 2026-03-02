import React, { useEffect, useState } from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

import { Link, useParams } from "react-router-dom"

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
      } finally {
        setIsLoading(false);
      }
    }

    fetchItem();
  }, [])

  return (
    <div className="w-full relative">
      <div className="w-full relative h-12 flex items-start">
        <Link
          to={{
            pathname: "/"
          }}
          className="h-10 group cursor-pointer flex items-center justify-center"
        >
          <ArrowLeftIcon className="size-10 ml-4 transition-all duration-200 text-[#666] pl-4 group-hover:pr-4 group-hover:pl-0" />
          <span className="text-[#666] ml-2 text-lg">HOME</span>
        </Link>
      </div>
      {isLoading && <div>loading</div>}
      {error && <div>{error}</div>}
      {item && (
        <section className="w-full relative mt-6">
          <div className="flex gap-10 items-end justify-center">
            <div>
              <iframe
                className="size-120 border border-[#e0e0e0] rounded-2xl"
                title="preview"
                srcDoc={`
                <html>
                  <head>
                    <style>${item.css}</style>
                  </head>
                  <body>
                    ${item.html}
                    <script>${item.js}</script>
                  </body>
                </html>
              `}
              />
            </div>
            <div className="max-w-96 text-[#666] flex flex-col gap-2.5">
              <h1 className="text-4xl font-black">{item.title}</h1>
              <p className="font-bold">{item.description}</p>
              <p>@{item.user.username}</p>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
