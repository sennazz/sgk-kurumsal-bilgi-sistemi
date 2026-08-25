import * as XLSX from "xlsx"

export type NewsItem = {
  id: number
  title: string
  date: string
  type: string
  topic: string
  description?: string
  relatedUnit?: string
  source?: string
  status?: string
}

// Excel'den gelen tarihi düzgün formata çevirir
function formatExcelDate(value: any): string {
  if (!value) {
    return ""
  }

  // Excel tarihi Date olarak geldiyse
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toLocaleDateString("tr-TR")
  }

  // Excel tarihi sayı olarak geldiyse
  if (typeof value === "number") {
    const excelDate = XLSX.SSF.parse_date_code(value)

    if (excelDate) {
      const day = String(excelDate.d).padStart(2, "0")
      const month = String(excelDate.m).padStart(2, "0")
      const year = excelDate.y

      return `${day}.${month}.${year}`
    }
  }

  // Metin olarak geldiyse
  const stringValue = String(value).trim()

  if (!stringValue) {
    return ""
  }

  // Zaten tarih formatındaysa olduğu gibi kullan
  return stringValue
}

export async function loadNewsItems(): Promise<NewsItem[]> {
  try {
    const response = await fetch("/Haberler.xlsx")

    if (!response.ok) {
      throw new Error("Haberler.xlsx dosyası bulunamadı.")
    }

    const arrayBuffer = await response.arrayBuffer()

    const workbook = XLSX.read(arrayBuffer, {
      type: "array",
      cellDates: true,
    })

    console.log(
      "Excel başarıyla okundu:",
      workbook.SheetNames
    )

    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    console.log("Çalışma sayfası:", worksheet)
    console.log(
      "Excel veri aralığı:",
      worksheet["!ref"]
    )
    console.log("Sayfa adı:", sheetName)

    const rows = XLSX.utils.sheet_to_json<any>(
      worksheet,
      {
        defval: "",
      }
    )

    console.log("Excel satırları:", rows)

    return rows.map((row, index) => ({
      id: Number(row["Haber ID"]) || index + 1,

      title: String(
        row["Haber Başlığı"] || ""
      ),

      date: formatExcelDate(
        row["Tarih"]
      ),

      type: String(
        row["Haber Türü"] || ""
      ),

      topic: String(
        row["Konu"] || ""
      ),

      description: String(
        row["Durum"] || ""
      ),                                  
    

      source: String(
        row["Kaynak"] || ""
      ),
      relatedUnit: String(row["İlgili Birim"] || ""),

  status: String(row["Durum"] || ""),
    }))
  } catch (error) {
    console.error(
      "Haberler yüklenirken hata oluştu:",
      error
    )

    return []
  }
}