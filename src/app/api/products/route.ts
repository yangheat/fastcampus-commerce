import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BAD_REQUEST = { status: 400 }
const OK = { status: 200 }

const supabaseUrl = 'https://gpztwglyopczhoutiqgh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwenR3Z2x5b3BjemhvdXRpcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTc1MDAsImV4cCI6MjAzNTA3MzUwMH0.URlsIEdjSB5WCJhtApkBkIlkW7hBVt3yzdswTNLilPw'
const supabase = createClient(supabaseUrl, supabaseKey)
const PRODUCTS = supabase.from('products')

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  let select
  if (start && end) {
    // 페이징 계산
    select = PRODUCTS.select('*', { count: 'exact' }).range(
      Number(start),
      Number(end)
    )
  } else {
    // id 검색
    select = PRODUCTS.select().eq('id', id).single()
  }

  const { data, count, error } = await select

  if (error) {
    console.error('error', error)
    return NextResponse.json(error, BAD_REQUEST)
  }

  let result = {
    product: data,
    total: count
  }
  if (count) {
    data.total = count
  }

  return NextResponse.json(result, OK)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const id = body.id
  const contents = body.contents

  if (!id) {
    return NextResponse.json({ error: 'No id' }, BAD_REQUEST)
  }

  if (!contents) {
    return NextResponse.json({ error: 'No contents' }, BAD_REQUEST)
  }

  try {
    const { data, error } = await PRODUCTS.upsert({ id, contents })

    if (error) throw error

    return NextResponse.json(data, OK)
  } catch (error) {
    return NextResponse.json(error, BAD_REQUEST)
  }
}
