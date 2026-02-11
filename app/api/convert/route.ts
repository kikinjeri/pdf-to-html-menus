import { NextRequest, NextResponse } from "next/server"
import { extractText } from "@/lib/pdf/extractText"
import { detectSections } from "@/lib/pdf/detectSections"
import { generateHtml } from "@/lib/pdf/generateHtml"
import { generateMenuCss } from "@/lib/pdf/generateMenuCss"
import { generateSchema } from "@/lib/pdf/generateSchema"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // 1. Extract raw text from PDF
    const rawText = await extractText(buffer)

    // 2. Convert raw text → structured menu
    const parsedMenu = detectSections(rawText)

    // 3. Generate HTML, CSS, Schema
    const html = generateHtml(parsedMenu)
    const css = generateMenuCss(parsedMenu)
    const schema = generateSchema(parsedMenu)

    return NextResponse.json({
      html,
      css,
      schema,
      parsedMenu
    })
  } catch (err) {
    console.error("PDF conversion error:", err)
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    )
  }
}
