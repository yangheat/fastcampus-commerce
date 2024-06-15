'use client'

import Image from 'next/image'
import { Carousel, SlideHandle } from 'nuka-carousel'
import { useRef } from 'react'

export default function Page() {
  const ref = useRef<SlideHandle>(null)
  const images = [
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1016/1000/600/',
      thumbnail: 'https://picsum.photos/id/1016/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1020/1000/600/',
      thumbnail: 'https://picsum.photos/id/1020/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1021/1000/600/',
      thumbnail: 'https://picsum.photos/id/1021/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1022/1000/600/',
      thumbnail: 'https://picsum.photos/id/1022/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1023/1000/600/',
      thumbnail: 'https://picsum.photos/id/1023/250/150/'
    }
  ]

  return (
    <>
      <Carousel showArrows autoplay={true} wrapMode="wrap" ref={ref}>
        {images.map((image) => (
          <Image
            key={image.original}
            src={image.original}
            alt="Picture of the author"
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto'
            }}
            width={1000}
            height={600}
          />
        ))}
      </Carousel>
      <div className="flex overflow-x-auto">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.thumbnail}
              alt="Picture of the author"
              width={250}
              height={150}
              onClick={() => {
                ref.current?.goToPage(index)
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
