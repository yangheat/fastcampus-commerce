'use client'

import { useRef } from 'react'
import { css } from '@emotion/react'
import Button from './Button'

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
      <input
        ref={inputRef}
        type="text"
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="name"
      />
      <button
        onClick={handleClick}
        className="flex justify-center"
        css={css`
          background-color: pink;
          padding: 16px;
          border-radius: 8px;
        `}
      >
        Add Jacket
      </button>
      <Button onClick={handleClick}>Add Jacket</Button>
    </>
  )
}
