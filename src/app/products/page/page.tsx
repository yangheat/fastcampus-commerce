'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Pagination, SegmentedControl, Select } from '@mantine/core'
import { CATEGORY_MAP, FILTERS, TAKE } from '@/app/constants/products'
import PostList from './components/PostLIST'

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
  const [filter, setFilter] = useState<String | null>(null)

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

    if (filter) {
      url += `&filter=${filter}`
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
  }, [activePage, category, filter])

  return (
    <main className="my-32">
      <section className="flex justify-between mb-5 mx-5">
        <SegmentedControl
          value={category}
          onChange={(curr) => {
            setPage(1)
            setCategory(curr)
          }}
          data={['All', ...CATEGORY_MAP]}
        />
        <Select
          placeholder="Filter"
          data={FILTERS}
          onChange={setFilter}
          clearable
        />
      </section>
      <PostList products={products} loading={loading} />
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
