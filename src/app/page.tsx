import Image from 'next/image'
import InputButton from './components/InputButton'
import ProductList from './components/ProductList'

export default function Home() {
  return (
    <main className="flex justify-center h-screen items-center bg-gray-100 flex-col">
      <section>
        <InputButton />
      </section>
      <section>
        <ProductList />
      </section>
    </main>
  )
}
