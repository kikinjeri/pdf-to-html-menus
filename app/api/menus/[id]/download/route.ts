import { supabase } from "@/lib/supabase"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const menuId = params.id

  // 1. Fetch menu HTML + CSS
  const { data: menu, error } = await supabase
    .from("menus")
    .select("html, css")
    .eq("id", menuId)
    .single()

  if (error || !menu) {
    return new Response("Menu not found", { status: 404 })
  }

  // 2. Combine HTML + CSS into a single downloadable file
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Menu</title>

<style>
${menu.css}
</style>

</head>
<body>
${menu.html}
</body>
</html>
  `.trim()

  // 3. Return as a downloadable .html file
  return new Response(fullHtml, {
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `attachment; filename="menu.html"`,
    },
  })
}
