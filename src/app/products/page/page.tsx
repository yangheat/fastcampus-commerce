'use client'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Pagination } from '@mantine/core'

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
  // const [page, setPage] = useState({ start: 0, end: TAKE })
  const [activePage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  /** 페이징 계산식
   * start: (n-1) * 9
   * end: n * 8 + (n-1)
   */
  useEffect(() => {
    const start = (activePage - 1) * (TAKE + 1)
    const end = activePage * TAKE + (activePage - 1)

    axios
      .get(`/api/products?start=${start}&end=${end}`)
      .then((result) => {
        const data = result.data
        setProducts(data.product)
        setTotalPage(data.total / TAKE)
      })
      .catch((error) => console.error(error))
  }, [activePage])

  return (
    <main className="my-32">
      <article className="grid grid-cols-3 px-32  gap-5">
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
      </article>
      <section className="flex mt-5">
        <Pagination
          className="m-auto"
          value={activePage}
          onChange={setPage}
          total={totalPage}
        />
      </section>
    </main>
  )
}
