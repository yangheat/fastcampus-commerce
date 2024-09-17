'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  ComboboxItem,
  Input,
  Pagination,
  SegmentedControl,
  Select
} from '@mantine/core'
import { CATEGORY_MAP, FILTERS } from '@/app/constants/products'
import PostList from './components/PostList'
import { IconSearch } from '@tabler/icons-react'
import { useProductSearch } from './hooks/useProductSearch'
import { useFilter } from './hooks/useFilter'

export default function Page() {
  const [activePage, setPage] = useState(1)
  const { state, fetchProduct } = useProductSearch()
  const {
    filter,
    search,
    handleSegmentFilterChange,
    handleSelectFilterChange,
    handleSearchChange,
    handleSearchFilterChange,
    handleSearchIconClick
  } = useFilter()

  useEffect(() => {
    fetchProduct(activePage, filter)
  }, [activePage, filter, fetchProduct])

  return (
    <main className="my-32">
      <section className="space-y-4">
        <section className="flex justify-between mx-5">
          <SegmentedControl
            value={filter.segment}
            onChange={handleSegmentFilterChange}
            data={['All', ...CATEGORY_MAP]}
            aria-label="Category filter"
          />
          <Select
            placeholder="Filter"
            data={FILTERS}
            value={filter.select.value}
            onChange={handleSelectFilterChange}
            clearable
            aria-label="Select filter"
          />
        </section>
        <section className="mx-5">
          <Input
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchFilterChange}
            rightSectionPointerEvents="all"
            rightSection={
              <IconSearch
                className="cursor-pointer"
                size={16}
                onClick={handleSearchIconClick}
                aria-label="Search button"
              />
            }
            placeholder="Search products"
            aria-label="Search input box"
          />
        </section>
        <PostList products={state.products} loading={state.loading} />
        <section className="flex">
          <Pagination
            className="m-auto"
            value={activePage}
            onChange={setPage}
            total={state.totalPage}
            aria-label="Page navigation"
          />
        </section>
      </section>
    </main>
  )
}
