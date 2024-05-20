'use client'

import { Alegreya } from 'next/font/google'
import { useEffect, useState } from 'react'

export default function ProductList() {
  const [products, setProducts] = useState<
    { id: string; properties: { id: string }[] }[]
  >([])

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  function handleClick() {
    fetch(`/api/item/detail?pageId={$i}`)
  }

  return (
    <>
      <p>Product List</p>
      {products?.map(
        (product) =>
          product.properties &&
          Object.entries(product.properties).map(([key, value]) => (
            <button
              key={value.id}
              onClick={() => {
                fetch(
                  `/api/item/detail?pageId=${product.id}&propertyId=${value.id}`
                )
                  .then((res) => res.json())
                  .then((data) => alert(JSON.stringify(data)))
              }}
            >
              {key}
            </button>
          ))
      )}
    </>
  )
}
