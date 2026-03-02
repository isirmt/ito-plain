import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type ItemResponse = {
  id: number
  title: string
  description: string
  html: string
  css: string
  status: number
  createdAt: string
  updatedAt: string
}

export default function ItemListPage() {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch("/api/items");
        if (!response.ok) {
          setError(`${response.status}: ${response.statusText}`);
        }
        console.log("Response:", response);
        const data = await response.json();
        console.log("Data:", data);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="w-full relative">
      {isLoading && <div>loading</div>}
      {error && <div>{error}</div>}
      <div className="flex flex-wrap gap-8 w-full relative p-20">
        {items.map(item => (
          <Link key={item.id} to={{
            pathname: `/d/${item.id}`,
          }}>
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
          </Link>
        ))}
      </div>
    </div>
  )
}