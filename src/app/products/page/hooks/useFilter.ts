import { FILTERS } from '@/app/constants/products'
import { ComboboxItem } from '@mantine/core'
import { useReducer } from 'react'

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

  return { filter: state, setFilter: dispatch }
}
