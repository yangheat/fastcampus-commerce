import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

const notion = new Client({
  auth: 'secret_zB5k5tdyoBFPBiTVbk5IZlYfiiGopfPphKuN1c2m4j2'
})
const databaseId = '79562dccb61e4a93b4f6cbe706c82adf'

async function getItems() {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'Price', direction: 'ascending' }]
  })
  return response
}

export async function GET() {
  try {
    const response = await getItems()
    return NextResponse.json(
      { items: response?.results, message: 'success' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(JSON.stringify(error))
  }
}
