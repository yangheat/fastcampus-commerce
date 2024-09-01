export const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie']

export const TAKE = 9

export const FILTERS = [
  { label: '최신순', value: 'lastst' },
  { label: '가격 높은 순', value: 'expensive' },
  { label: '가격 낮은 순', value: 'cheap' }
]

export const getProductOrderBy = (category: String) => {
  let column = 'lastst'
  let ascending = false

  switch (category) {
    case 'expensive':
      column = 'price'
      ascending = false
      break
    case 'cheap':
      column = 'price'
      ascending = true
      break
  }

  return { column, ascending: { ascending } }
}
