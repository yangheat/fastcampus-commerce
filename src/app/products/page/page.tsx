'use client'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Pagination, SegmentedControl } from '@mantine/core'
import { CATEGORY_MAP, TAKE } from '@/app/constants/products'

type PRODUCT = {
  id: number
  price: number
  category_id: number
}

export default function Page() {
  const [category, setCategory] = useState('All')
  const [products, setProducts] = useState<PRODUCT[]>([])
  const [activePage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)

  /** 페이징 계산식
   * start: (n-1) * 9
   * end: n * 8 + (n-1)
   */
  useEffect(() => {
    const start = (activePage - 1) * TAKE
    const end = activePage * (TAKE - 1) + (activePage - 1)
    const categoryIndex = CATEGORY_MAP.indexOf(category)

    let url = `/api/products?start=${start}&end=${end}`

    setLoading(true)
    if (categoryIndex !== -1) {
      url += `&category=${categoryIndex + 1}`
    }

    axios
      .get(url)
      .then((result) => {
        const data = result.data
        setProducts(data.product)
        setTotalPage(Math.ceil(data.total / TAKE))
        setLoading(false)
      })
      .catch((error) => console.error(error))
  }, [activePage, category])

  return (
    <main className="my-32">
      <section className="flex mb-5">
        <SegmentedControl
          value={category}
          onChange={(curr) => {
            setPage(1)
            setCategory(curr)
          }}
          data={['All', ...CATEGORY_MAP]}
          className="m-auto"
        />
      </section>
      <article className="grid grid-cols-3 px-32  gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map(({ id, price, category_id }: PRODUCT) => (
            <div key={id} className="justify-self-center">
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
              <span className="text-zinc-400">
                {CATEGORY_MAP[category_id - 1]}
              </span>
            </div>
          ))
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
