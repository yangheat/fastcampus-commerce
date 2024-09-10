'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  ComboboxItem,
  Input,
  Pagination,
  SegmentedControl,
  Select
} from '@mantine/core'
import { CATEGORY_MAP, FILTERS, TAKE } from '@/app/constants/products'
import PostList from './components/PostList'
import { IconSearch } from '@tabler/icons-react'
import { PRODUCT } from './types/product.types'

export default function Page() {
  const [category, setCategory] = useState('All')
  const [products, setProducts] = useState<PRODUCT[]>([])
  const [activePage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<ComboboxItem | null>(FILTERS[0])
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

    if (filter?.value) {
      url += `&filter=${filter.value}`
    }

    if (searchTerm) {
      url += `&search=${searchTerm}`
    }

    setProducts([])
    setTotalPage(0)
    setLoading(false)

    console.log(url)
    // axios
    //   .get(url)
    //   .then((result) => {
    //     const data = result.data
    //     setProducts(data.product)
    //     setTotalPage(Math.ceil(data.total / TAKE))
    //     setLoading(false)
    //   })
    //   .catch((error) => console.error(error))
  }, [activePage, category, filter, searchTerm])

  return (
    <main className="my-32">
      <section>
        <section className="flex justify-between mx-5">
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
            value={filter ? filter.value : null}
            onChange={(_value, option) => setFilter(option)}
            clearable
          />
        </section>
        <section className="mx-5">
          <Input
            value={search}
            onChange={(event: { currentTarget: { value: any } }) =>
              setSearch(event.currentTarget.value)
            }
            onKeyDown={(event: { key: string }) => {
              if (event.key === 'Enter') {
                setSearchTerm(search)
              }
            }}
            rightSectionPointerEvents="all"
            rightSection={
              <IconSearch
                className="cursor-pointer"
                size={16}
                onClick={() => setSearchTerm(search)}
              />
            }
          />
        </section>
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
