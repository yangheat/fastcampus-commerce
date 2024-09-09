import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getProductOrderBy } from '@/app/constants/products'

const BAD_REQUEST = { status: 400 }
const OK = { status: 200 }

const supabaseUrl = 'https://gpztwglyopczhoutiqgh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwenR3Z2x5b3BjemhvdXRpcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTc1MDAsImV4cCI6MjAzNTA3MzUwMH0.URlsIEdjSB5WCJhtApkBkIlkW7hBVt3yzdswTNLilPw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const category = searchParams.get('category')
  const filter = searchParams.get('filter')
  const search = searchParams.get('search')

  const PRODUCTS = supabase.from('products')
  let query
  if (start && end) {
    // 페이징 계산
    query = PRODUCTS.select('*', { count: 'exact' }).range(
      Number(start),
      Number(end)
    )
  } else {
    // id 검색
    query = PRODUCTS.select().eq('id', id)
  }

  if (category) {
    query = query.eq('category_id', Number(category))
  }

  if (filter) {
    const { column, ascending } = getProductOrderBy(filter)
    query = query.order(column, ascending)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, count, error } = await query

  if (error) {
    console.error('error', error)
    return NextResponse.json(error, BAD_REQUEST)
  }

  let result = {
    product: data,
    total: count
  }

  return NextResponse.json(result, OK)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const id = body.id
  const contents = body.contents
  const PRODUCTS = supabase.from('products')

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
