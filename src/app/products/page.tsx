'use client'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type PRODUCT = {
  id: number
  content: string
  price: number
  created_at: string
  category_id: number
}

const CATEGORY: { [key: string]: string } = {
  1: '의류',
  2: '의류2',
  3: '의류3'
}

const TAKE = 8

export default function Page() {
  const [products, setProducts] = useState<PRODUCT[]>([])
  const [page, setPage] = useState({ start: 0, end: TAKE })

  useEffect(() => {
    axios
      .get(`/api/products?start=${page.start}&end=${page.end}`)
      .then((result) => setProducts(result.data.product))
      .catch((error) => console.error(error))
  }, [])

  const handleSeeMore = useCallback(() => {
    const nextStart = page.end + 1
    const nextEnd = nextStart + TAKE

    axios
      .get(`/api/products?start=${nextStart}&end=${nextEnd}`)
      .then((result) => {
        setProducts([...products, ...result.data.product])
      })
      .catch((error) => {
        console.error(error)
      })

    setPage({ start: nextStart, end: nextEnd })
  }, [products, page])

  return (
    <main className="grid grid-cols-3 px-32 my-32 gap-5">
      {products.map(
        ({ id, content, price, created_at, category_id }: PRODUCT) => (
          <div key={id}>
            <Image
              className="rounded"
              src={`https://picsum.photos/id/${id}/300/200`}
              alt="image"
              width={300}
              height={200}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            <div className="flex justify-between">
              <span>{id}</span>
              <span>{price}원</span>
            </div>
            <span className="text-zinc-400">{CATEGORY[category_id]}</span>
          </div>
        )
      )}
      <button
        className="w-full mt-2 col-span-3 bg-zinc-200 p-4 rounded"
        onClick={handleSeeMore}
      >
        더보기
      </button>
    </main>
  )
}
