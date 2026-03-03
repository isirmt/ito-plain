import React, { useEffect, useState } from "react"
import { ArrowLeftIcon, CodeBracketIcon } from "@heroicons/react/24/solid"
import { codeToHtml } from "shiki/bundle/web"

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
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const [highlightedCss, setHighlightedCss] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [itemId])

  useEffect(() => {
    if (!item) {
      setHighlightedHtml("");
      setHighlightedCss("");
      return;
    }

    const highlightCode = async () => {
      const [html, css] = await Promise.all([
        codeToHtml(item.html, {
          lang: "html",
          theme: "one-light"
        }),
        codeToHtml(item.css, {
          lang: "css",
          theme: "one-light"
        })
      ]);
      setHighlightedHtml(html);
      setHighlightedCss(css);
    }

    highlightCode();
  }, [item])

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
                className="size-60 border border-[#e0e0e0] rounded-xl"
                title="preview"
                srcDoc={`
                <html>
                  <head>
                    <style>${item.css}</style>
                  </head>
                  <body>
                    ${item.html}
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
          <div className="flex justify-center gap-4 mt-10">
            <div className="w-120">
              <h2 className="text-lg bg-[#e6e6e6] leading-none rounded-t-lg gap-1 py-2 flex justify-center items-center text-[#444] font-bold w-full text-center">
                <CodeBracketIcon className="size-5 mt-0.5" />
                HTML
              </h2>
              <div
                className="overflow-x-auto min-h-72 p-2 bg-[#fafafa] border-[#e0e0e0]"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            </div>
            <div className="w-120">
              <h2 className="text-lg bg-[#e6e6e6] leading-none rounded-t-lg gap-1 py-2 flex justify-center items-center text-[#444] font-bold w-full text-center">
                <CodeBracketIcon className="size-5 mt-0.5" />
                CSS
              </h2>
              <div
                className="overflow-x-auto min-h-72 p-2 bg-[#fafafa] border-[#e0e0e0]"
                dangerouslySetInnerHTML={{ __html: highlightedCss }}
              />
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
