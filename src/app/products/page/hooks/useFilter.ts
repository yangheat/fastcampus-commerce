import { FILTERS } from '@/app/constants/products'
import { ComboboxItem } from '@mantine/core'
import { ChangeEvent, useCallback, useReducer, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type FILTER_STATE = {
  segment: string
  select: ComboboxItem
  keyword: string
}

type FILTER_ACTION =
  | { type: 'SEGMENT'; segment: string }
  | { type: 'SELECT'; select: ComboboxItem }
  | { type: 'KEYWORD'; keyword: string }

const initialFilter: FILTER_STATE = {
  segment: 'All',
  select: FILTERS[0],
  keyword: ''
}

function filterReducer(state: FILTER_STATE, action: FILTER_ACTION) {
  switch (action.type) {
    case 'SEGMENT':
      return { ...state, segment: action.segment }
    case 'SELECT':
      return { ...state, select: action.select }
    case 'KEYWORD':
      return { ...state, keyword: action.keyword }
    default:
      return state
  }
}

export function useFilter() {
  const [state, dispatch] = useReducer(filterReducer, initialFilter)

  const debounceKeywordDispatch = useDebouncedCallback((value: string) => {
    dispatch({ type: 'KEYWORD', keyword: value })
  }, 1000)

  const handleSegmentFilterChange = useCallback((segment: string) => {
    dispatch({ type: 'SEGMENT', segment })
  }, [])

  const handleSelectFilterChange = useCallback(
    (_value: string | null, option: ComboboxItem) => {
      dispatch({ type: 'SELECT', select: option })
    },
    []
  )

  const handleKeywordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debounceKeywordDispatch(event.currentTarget.value)
    },
    [debounceKeywordDispatch]
  )

  return {
    filter: state,
    handleSegmentFilterChange,
    handleSelectFilterChange,
    handleKeywordChange
  }
}
