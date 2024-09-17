import { FILTERS } from '@/app/constants/products'
import { ComboboxItem } from '@mantine/core'
import { ChangeEvent, useCallback, useReducer, useState } from 'react'

type FILTER_STATE = {
  segment: string
  select: ComboboxItem
  search: string
}

type FILTER_ACTION =
  | { type: 'SEGMENT'; segment: string }
  | { type: 'SELECT'; select: ComboboxItem }
  | { type: 'SEARCH'; search: string }

const initialFilter: FILTER_STATE = {
  segment: 'All',
  select: FILTERS[0],
  search: ''
}

function filterReducer(state: FILTER_STATE, action: FILTER_ACTION) {
  switch (action.type) {
    case 'SEGMENT':
      return { ...state, segment: action.segment }
    case 'SELECT':
      return { ...state, select: action.select }
    case 'SEARCH':
      return { ...state, search: action.search }
    default:
      return state
  }
}

export function useFilter() {
  const [state, dispatch] = useReducer(filterReducer, initialFilter)
  const [search, setSearch] = useState('')

  const handleSegmentFilterChange = useCallback((segment: string) => {
    dispatch({ type: 'SEGMENT', segment })
  }, [])

  const handleSelectFilterChange = useCallback(
    (_value: string | null, option: ComboboxItem) => {
      dispatch({ type: 'SELECT', select: option })
    },
    []
  )

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.currentTarget.value)
    },
    []
  )

  const handleSearchIconClick = () => {
    dispatch({ type: 'SEARCH', search })
  }

  const handleSearchFilterChange = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        dispatch({ type: 'SEARCH', search })
      }
    },
    [search]
  )

  return {
    filter: state,
    search,
    handleSegmentFilterChange,
    handleSelectFilterChange,
    handleSearchChange,
    handleSearchFilterChange,
    handleSearchIconClick
  }
}
