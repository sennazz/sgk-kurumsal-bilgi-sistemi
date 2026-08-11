export type NewsItem = {
  id: number
  title: string
  date: string
  type: string
  topic: string
  description?: string
  source?: string
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Örnek SGK Haber Başlığı",
    date: "2026-08-01",
    type: "Haber",
    topic: "Genel",
    description: "Örnek haber kaydı.",
    source: "SGK",
  },
]