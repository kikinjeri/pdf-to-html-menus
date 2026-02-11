import { supabase } from "@/lib/supabase"
import { extractText } from "@/lib/pdf/extractText"
import { detectSections } from "@/lib/pdf/detectSections"
import { generateHtml } from "@/lib/pdf/generateHtml"
import { generateMenuCss } from "@/lib/pdf/generateMenuCss"
import { generateSchema } from "@/lib/pdf/generateSchema"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // 1. Fetch menu + restaurant
  const { data: menu } = await supabase
    .from("menus")
    .select("*, restaurants(*)")
    .eq("id", id)
    .single()

  if (!menu) {
    return new Response("Menu not found", { status: 404 })
  }

  const restaurant = menu.restaurants

  // 2. Download PDF
  const { data: pdfFile } = await supabase.storage
    .from("menus")
    .download(menu.pdf_path)

  if (!pdfFile) {
    return new Response("PDF not found", { status: 404 })
  }

  const buffer = Buffer.from(await pdfFile.arrayBuffer())

  // 3. Re-run pipeline
  const rawText = await extractText(buffer)
  const parsedMenu = detectSections(rawText)
  const html = generateHtml(parsedMenu)

  const css = generateMenuCss(
    restaurant.primary_color,
    restaurant.secondary_color,
    restaurant.text_color
  )

  const schema = generateSchema(parsedMenu)

  // 4. Update menu
  await supabase
    .from("menus")
    .update({
      html,
      css,
      schema,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  return Response.json({ success: true })
}
