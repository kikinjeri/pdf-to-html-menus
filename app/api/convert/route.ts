import { supabase } from "@/lib/supabase"
import { extractText } from "@/lib/pdf/extractText"
import { detectSections } from "@/lib/pdf/detectSections"
import { generateHtml } from "@/lib/pdf/generateHtml"
import { generateMenuCss } from "@/lib/pdf/generateMenuCss"
import { generateSchema } from "@/lib/pdf/generateSchema"

export async function POST(req: Request) {
  const formData = await req.formData()
  const restaurantId = formData.get("restaurantId") as string
  const pdfFile = formData.get("file") as File

  if (!restaurantId || !pdfFile) {
    return new Response("Missing restaurantId or file", { status: 400 })
  }

  // 1. Fetch restaurant branding
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", restaurantId)
    .single()

  if (!restaurant) {
    return new Response("Restaurant not found", { status: 404 })
  }

  // 2. Upload PDF
  const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer())
  const pdfPath = `menus/${restaurantId}/${crypto.randomUUID()}.pdf`

  await supabase.storage.from("menus").upload(pdfPath, pdfBuffer, {
    contentType: "application/pdf",
  })

  // 3. Run pipeline
  const rawText = await extractText(pdfBuffer)
  const parsedMenu = detectSections(rawText)
  const html = generateHtml(parsedMenu)

  const css = generateMenuCss(
    restaurant.primary_color,
    restaurant.secondary_color,
    restaurant.text_color
  )

  const schema = generateSchema(parsedMenu)

  // 4. Save menu
  const { data: menu } = await supabase
    .from("menus")
    .insert({
      restaurant_id: restaurantId,
      html,
      css,
      schema,
      pdf_path: pdfPath,
    })
    .select()
    .single()

  return Response.json(menu)
}
