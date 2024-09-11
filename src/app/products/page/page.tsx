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
import { useProductSearch } from './hooks/useProductSearch'

export default function Page() {
  const [category, setCategory] = useState('All')
  const [activePage, setPage] = useState(1)
  const [filter, setFilter] = useState<ComboboxItem | null>(FILTERS[0])
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { state, fetchProduct } = useProductSearch()

  useEffect(() => {
    fetchProduct(activePage, category, filter, searchTerm)
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
      <PostList products={state.products} loading={state.loading} />
      <section className="flex mt-5">
        <Pagination
          className="m-auto"
          value={activePage}
          onChange={setPage}
          total={state.totalPage}
        />
      </section>
    </main>
  )
}
