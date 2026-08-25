
import { useEffect, useState } from "react"
import type { NewsItem } from "../data/news"

type ArchiveProps = {
  newsItems: NewsItem[]
}

function Archive({ newsItems }: ArchiveProps) {

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Tümü")
  const [selectedYear, setSelectedYear] = useState("Tümü")
  const [selectedTopic, setSelectedTopic] = useState("Tümü")
  const [selectedUnit, setSelectedUnit] = useState("Tümü")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 8

  // HABER TÜRLERİ
  const newsTypes = [
    "Tümü",
    ...Array.from(
      new Set(
        newsItems
          .map((news) => String(news.type || "").trim())
          .filter(Boolean)
      )
    ),
  ]

  // KONULAR
  const topics = [
    "Tümü",
    ...Array.from(
      new Set(
        newsItems
          .map((news) => String(news.topic || "").trim())
          .filter(Boolean)
      )
    ),
  ]

  // İLGİLİ BİRİMLER
  const units = [
    "Tümü",
    ...Array.from(
      new Set(
        newsItems
          .map((news) =>
            String(news.relatedUnit || "").trim()
          )
          .filter(Boolean)
      )
    ),
  ]

  // YILLAR
  const years = [
    "Tümü",
    ...Array.from(
      new Set(
        newsItems
          .map((news) => {
            const match =
              String(news.date).match(/\d{4}/)

            return match ? match[0] : ""
          })
          .filter(Boolean)
      )
    ).sort(
      (a, b) =>
        Number(b) - Number(a)
    ),
  ]

  // DETAYLI ARŞİV FİLTRELEME
  const filteredNews = newsItems.filter((news) => {

    const search =
      searchTerm.toLowerCase().trim()

    const title =
      String(news.title || "").toLowerCase()

    const topic =
      String(news.topic || "").toLowerCase()

    const description =
      String(news.description || "").toLowerCase()

    const relatedUnit =
      String(news.relatedUnit || "").toLowerCase()

    const source =
      String(news.source || "").toLowerCase()

    // ANAHTAR KELİME
    const matchesSearch =
      !search ||
      title.includes(search) ||
      topic.includes(search) ||
      description.includes(search) ||
      relatedUnit.includes(search) ||
      source.includes(search)

    // TÜR
    const matchesType =
      selectedType === "Tümü" ||
      news.type === selectedType

    // KONU
    const matchesTopic =
      selectedTopic === "Tümü" ||
      news.topic === selectedTopic

    // BİRİM
    const matchesUnit =
      selectedUnit === "Tümü" ||
      news.relatedUnit === selectedUnit

    // YIL
    const newsYear =
      String(news.date).match(/\d{4}/)?.[0] || ""

    const matchesYear =
      selectedYear === "Tümü" ||
      newsYear === selectedYear

    return (
      matchesSearch &&
      matchesType &&
      matchesTopic &&
      matchesUnit &&
      matchesYear
    )
  })

  // SAYFA SAYISI
  const totalPages = Math.ceil(
    filteredNews.length / itemsPerPage
  )

  // SAYFALAMA
  const startIndex =
    (currentPage - 1) * itemsPerPage

  const displayedNews =
    filteredNews.slice(
      startIndex,
      startIndex + itemsPerPage
    )

  // FİLTRE DEĞİŞİNCE İLK SAYFAYA DÖN
  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchTerm,
    selectedType,
    selectedYear,
    selectedTopic,
    selectedUnit,
  ])

  // FİLTRELERİ TEMİZLE
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedType("Tümü")
    setSelectedYear("Tümü")
    setSelectedTopic("Tümü")
    setSelectedUnit("Tümü")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedType !== "Tümü" ||
    selectedYear !== "Tümü" ||
    selectedTopic !== "Tümü" ||
    selectedUnit !== "Tümü"

  return (
    <section className="archive-page">

      {/* BAŞLIK */}

      <div className="archive-header">

        <div>

          <span className="section-eyebrow">
            KURUMSAL ARŞİV
          </span>

          <h2>
            SGK İçerik Arşivi
          </h2>

          <p>
            <p>
  Geçmiş tarihli haber ve içerikleri filtreleyerek inceleyebilirsiniz.
</p>celeyebilirsiniz.
          </p>

        </div>

        <div className="archive-count">

          <strong>
            {filteredNews.length}
          </strong>

          <span>
            kayıt
          </span>

        </div>

      </div>


      {/* DETAYLI ARAMA */}

      <div className="archive-filter-panel">

        <div className="archive-filter-title">

          <div>
            <strong>
              Detaylı Arama
            
            </strong>
          </div>

          {hasActiveFilters && (

            <button
              className="archive-clear-button"
              onClick={clearFilters}
            >
              Filtreleri Temizle
            </button>

          )}

        </div>


        {/* ANAHTAR KELİME */}

        <div className="archive-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Başlık, konu, birim veya içerikte ara..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>
        <span className="archive-filter-description">
            Arşiv kayıtlarını başlık, konu, birim veya içerik içerisinde arayabilirsiniz.
          </span>


        {/* FİLTRELER */}

        <div className="archive-filter-grid">

          {/* BİRİM */}

          <div className="archive-filter-field">

            <label>
              İlgili Birim
            </label>

            <select
              value={selectedUnit}
              onChange={(event) =>
                setSelectedUnit(event.target.value)
              }
            >

              {units.map((unit) => (

                <option
                  key={unit}
                  value={unit}
                >
                  {unit === "Tümü"
                    ? "Tüm Birimler"
                    : unit}
                </option>

              ))}

            </select>

          </div>


          {/* KONU */}

          <div className="archive-filter-field">

            <label>
              Konu
            </label>

            <select
              value={selectedTopic}
              onChange={(event) =>
                setSelectedTopic(event.target.value)
              }
            >

              {topics.map((topic) => (

                <option
                  key={topic}
                  value={topic}
                >
                  {topic === "Tümü"
                    ? "Tüm Konular"
                    : topic}
                </option>

              ))}

            </select>

          </div>


          {/* TÜR */}

          <div className="archive-filter-field">

            <label>
              Haber Türü
            </label>

            <select
              value={selectedType}
              onChange={(event) =>
                setSelectedType(event.target.value)
              }
            >

              {newsTypes.map((type) => (

                <option
                  key={type}
                  value={type}
                >
                  {type === "Tümü"
                    ? "Tüm Türler"
                    : type}
                </option>

              ))}

            </select>

          </div>


          {/* YIL */}

          <div className="archive-filter-field">

            <label>
              Yıl
            </label>

            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(event.target.value)
              }
            >

              {years.map((year) => (

                <option
                  key={year}
                  value={year}
                >
                  {year === "Tümü"
                    ? "Tüm Yıllar"
                    : year}
                </option>

              ))}

            </select>

          </div>

        </div>

      </div>


      {/* SONUÇ BİLGİSİ */}

      <div className="archive-result-info">

        <span>
          Arşiv sonuçları
        </span>

        <strong>
          {filteredNews.length} kayıt
        </strong>

      </div>


      {/* ARŞİV LİSTESİ */}

      {displayedNews.length === 0 ? (

        <div className="archive-empty">

          <div className="archive-empty-icon">
            🗄️
          </div>

          <h3>
            Arşiv kaydı bulunamadı
          </h3>

          <p>
            Seçtiğiniz filtrelere uygun bir içerik
            bulunmuyor.
          </p>

          {hasActiveFilters && (

            <button
              className="archive-empty-clear"
              onClick={clearFilters}
            >
              Filtreleri Temizle
            </button>

          )}

        </div>

      ) : (

        <div className="archive-list">

          {displayedNews.map((news) => (

            <article
              className="archive-item"
              key={news.id}
            >

              <div className="archive-item-date">
                {news.date}
              </div>

              <div className="archive-item-content">

                <div className="archive-item-top">

                  <span className="news-type">
                    {news.type}
                  </span>

                  {news.relatedUnit && (

                    <span className="archive-topic">
                      {news.relatedUnit}
                    </span>

                  )}

                </div>

                <h3>
                  {news.title}
                </h3>

                {news.description && (

                  <p>
                    {news.description}
                  </p>

                )}

                

              </div>

            </article>

          ))}

        </div>

      )}


      {/* SAYFALAMA */}

      {totalPages > 1 && (

        <div className="archive-pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            ← Önceki
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Sonraki →
          </button>

        </div>

      )}

    </section>
  )
}

export default Archive

