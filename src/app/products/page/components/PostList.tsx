import { CATEGORY_MAP } from '@/app/constants/products'
import Image from 'next/image'

type PRODUCT = {
  id: number
  price: number
  category_id: number
}

export default function PostList({
  products,
  loading
}: {
  products: PRODUCT[]
  loading: boolean
}) {
  return (
    <article className="grid grid-cols-3 px-32 gap-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map(({ id, price, category_id }: PRODUCT) => (
          <div key={id} className="justify-self-center">
            <Image
              className="rounded"
              src={`https://picsum.photos/id/${id}/300/200`}
              alt="image"
              width={300}
              height={200}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            <div className="flex justify-between">
              <span>{id}</span>
              <span>{price}원</span>
            </div>
            <span className="text-zinc-400">
              {CATEGORY_MAP[category_id - 1]}
            </span>
          </div>
        ))
      )}
    </article>
  )
}
