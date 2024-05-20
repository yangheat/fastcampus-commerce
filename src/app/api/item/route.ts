import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_zB5k5tdyoBFPBiTVbk5IZlYfiiGopfPphKuN1c2m4j2'
})

const databaseId = '79562dccb61e4a93b4f6cbe706c82adf'

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name
            }
          }
        ]
      }
    })

    console.log(response)
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}

export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const name = params.get('name')

  if (!name) {
    return NextResponse.json({ error: 'No name' }, { status: 400 })
  }
  try {
    await addItem(name)
    return NextResponse.json({ message: `Success ${name}` }, { status: 200 })
  } catch (error) {
    console.error(JSON.stringify(error))
    return NextResponse.json({ message: `Failed ${name}` }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {}
