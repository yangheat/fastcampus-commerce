import { CATEGORY_MAP, TAKE } from '@/app/constants/products'
import { ComboboxItem } from '@mantine/core'
import axios from 'axios'
import { useCallback, useReducer } from 'react'
import { PRODUCT } from '../types/product.types'

type PRODUCT_STATE = {
  products: PRODUCT[]
  totalPage: number
  loading: boolean
  error: string | null
}

type PRODUCT_ACTION =
  | { type: 'FETCH_START' }
  | {
      type: 'FETCH_SUCCESS'
      payload: { products: PRODUCT[]; totalPage: number }
    }
  | { type: 'FETCH_ERROR'; payload: string }

const initialState: PRODUCT_STATE = {
  products: [],
  totalPage: 0,
  loading: true,
  error: null
}

function productReducer(state: PRODUCT_STATE, action: PRODUCT_ACTION) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        totalPage: action.payload.totalPage,
        loading: false
      }
    case 'FETCH_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
export function useProductSearch() {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const fetchProduct = useCallback(
    async (
      activePage: number,
      category: string,
      filter: ComboboxItem | null,
      searchTerm: string
    ) => {
      dispatch({ type: 'FETCH_START' })

      try {
        /** 페이징 계산식
         * start: (n-1) * 9
         * end: n * 8 + (n-1)
         */
        const start = (activePage - 1) * TAKE
        const end = activePage * (TAKE - 1) + (activePage - 1)
        const categoryIndex = CATEGORY_MAP.indexOf(category)

        let url: string = `/api/products?start=${start}&end=${end}`
        if (categoryIndex !== -1) url += `&category=${categoryIndex + 1}`
        if (filter?.value) url += `&filter=${filter.value}`
        if (searchTerm) url += `&search=${searchTerm}`

        const response = await axios.get(url)
        const data = response.data

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            products: data.product,
            totalPage: Math.ceil(data.total / TAKE)
          }
        })
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch product' })
      }
    },
    []
  )

  return { state, fetchProduct }
}
