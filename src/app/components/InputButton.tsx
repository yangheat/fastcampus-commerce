'use client'

import { useRef } from 'react'

export default function InputButton() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    const value = inputRef.current?.value
    if (!value) {
      alert('Please enter name.')
      return
    }

    fetch(`/api/item?name=${value}`, { method: 'post' })
      .then((res) => res.json())
      .then((data) => alert(data.message))
  }
  return (
    <>
      <input ref={inputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>Add Jacket</button>
    </>
  )
}
