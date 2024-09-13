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
import { useFilter } from './hooks/useFilter'

export default function Page() {
  const [activePage, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { filter, setFilter } = useFilter()
  const { state, fetchProduct } = useProductSearch()

  useEffect(() => {
    fetchProduct(activePage, filter)
  }, [activePage, filter, fetchProduct])

  return (
    <main className="my-32">
      <section>
        <section className="flex justify-between mx-5">
          <SegmentedControl
            value={filter.segment}
            onChange={(curr) => {
              setPage(1)
              setFilter({ type: 'SEGMENT', segment: curr })
            }}
            data={['All', ...CATEGORY_MAP]}
          />
          <Select
            placeholder="Filter"
            data={FILTERS}
            value={filter.select.value}
            onChange={(_value, option) =>
              setFilter({ type: 'SELECT', select: option })
            }
            clearable
          />
        </section>
        <section className="mx-5">
          <Input
            value={search}
            onChange={(event: { currentTarget: { value: string } }) =>
              setSearch(event.currentTarget.value)
            }
            onKeyDown={(event: { key: string }) => {
              if (event.key === 'Enter') {
                setFilter({ type: 'SEARCH', search })
              }
            }}
            rightSectionPointerEvents="all"
            rightSection={
              <IconSearch
                className="cursor-pointer"
                size={16}
                onClick={() => setFilter({ type: 'SEARCH', search })}
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
