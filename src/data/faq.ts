import * as XLSX from "xlsx"

export type FAQItem = {
  id: number
  category: string
  subCategory: string
  question: string
  answer: string
}

export async function loadFAQItems(): Promise<FAQItem[]> {
  const response = await fetch("/SSS.xlsx")

  const arrayBuffer = await response.arrayBuffer()

  const workbook = XLSX.read(arrayBuffer, {
    type: "array",
  })

  console.log("SSS Excel başarıyla okundu:", workbook.SheetNames)

  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    worksheet
  )

  console.log("SSS satırları:", rows)

  // İLK SATIRIN SÜTUNLARINI GÖSTER
  if (rows.length > 0) {
    console.log(
      "SSS sütunları:",
      Object.keys(rows[0])
    )
  }

  return rows
    .filter((row) => row["Soru"])
    .map((row, index) => ({
      id: index + 1,

      category: String(
        row["Üst Kategori"] || ""
      ),

      subCategory: String(
        row["AltKategori"] || ""
      ),

      question: String(
        row["Soru"] || ""
      ),

      answer: String(
        row["Cevap"] || ""
      ),
    }))
}