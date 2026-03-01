import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type ItemResponse = {
  id: number
  title: string
  description: string
  status: number
  createdAt: string
  updatedAt: string
}

export default function ItemListPage() {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setError(null);
      setLoading(true);
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
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <main>
      <div>
        {loading && <div>loading</div>}
        {error && <div>{error}</div>}
        {items.map(item => (
          <Link key={item.id} to={{
            pathname: `/d/${item.id}`,
          }}>
            <div>{item.title}</div>
            <div>{item.description}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}