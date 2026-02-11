import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"
import "pdfjs-dist/legacy/build/pdf.worker.mjs"

export async function extractText(buffer: Buffer): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({ data: buffer })
  const pdf = await loadingTask.promise

  let fullText = ""

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    const strings = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .filter(Boolean)

    fullText += strings.join(" ") + "\n"
  }

  return fullText
}
