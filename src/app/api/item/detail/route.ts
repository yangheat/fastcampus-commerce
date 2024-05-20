import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const notion = new Client({
    auth: 'secret_zB5k5tdyoBFPBiTVbk5IZlYfiiGopfPphKuN1c2m4j2'
  })
  //   const databaseId = '79562dccb61e4a93b4f6cbe706c82adf'
  //   await notion.databases.retrieve({ database_id: databaseId })
  const pageId = request.nextUrl.searchParams.get('pageId')
  const propertyId = request.nextUrl.searchParams.get('propertyId')
  console.log(request.nextUrl.searchParams)
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: String(pageId),
      property_id: String(propertyId)
    })
    return NextResponse.json(
      { data: response, message: 'Success' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed' }, { status: 400 })
  }
}
