import { useEffect, useState } from "react"
import type { FAQItem } from "../data/faq"

type FAQProps = {
  faqItems: FAQItem[]
  initialSearchTerm?: string
}

function FAQ({ faqItems, initialSearchTerm }: FAQProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "")
  
  const [openId, setOpenId] = useState<number | null>(null)
  useEffect(() => {
    setSearchTerm(initialSearchTerm || "")
  }, [initialSearchTerm])
  const [currentPage, setCurrentPage] = useState(1)

  // HER SAYFADA 10 SORU
  const itemsPerPage = 10

  // ARAMA
  const filteredFAQs = faqItems.filter((faq) => {
    const search = searchTerm.toLowerCase().trim()

    return (
      String(faq.question || "")
        .toLowerCase()
        .includes(search) ||
      String(faq.answer || "")
        .toLowerCase()
        .includes(search) ||
      String(faq.category || "")
        .toLowerCase()
        .includes(search) ||
      String(faq.subCategory || "")
        .toLowerCase()
        .includes(search)
    )
  })

  // TOPLAM SAYFA
  const totalPages = Math.ceil(
    filteredFAQs.length / itemsPerPage
  )

  // ARAMA YAPILINCA 1. SAYFAYA DÖN
  useEffect(() => {
    setCurrentPage(1)
    setOpenId(null)
  }, [searchTerm])

  // MEVCUT SAYFADAKİ SORULAR
  const startIndex =
    (currentPage - 1) * itemsPerPage

  const displayedFAQs = filteredFAQs.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // SAYFA DEĞİŞTİR
  const changePage = (page: number) => {
    setCurrentPage(page)
    setOpenId(null)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <section className="faq-page">
      
      {/* BAŞLIK */}

      <div
        style={{
          background: "#173f73",
          padding: "32px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >

        <span
          style={{
            color: "#b9d7f5",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          BİLGİ MERKEZİ
        </span>

        <h2
          style={{
            margin: "8px 0",
            fontSize: "28px",
            color: "#ffffff",
          }}
        >
          Sıkça Sorulan Sorular
        </h2>

        <p
          style={{
            color: "#dbe7f5",
            marginBottom: 0,
            lineHeight:1.6,        }}
        >
          SGK hizmetleri ve uygulamaları hakkında sıkça
          sorulan soruların cevaplarına ulaşabilirsiniz.
        </p>

      </div>


      {/* ARAMA */}

      <div
        style={{
          width: "100%",
          border: "1px solid #d9dee7",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
          padding: "14px 16px",
          borderRadius: "14px",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          color: "#172033",
        }}
      >

        <input
          type="text"
          placeholder="Soru, konu veya kategori ara..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value)
          }}
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1px solid #d9dee7",
            borderRadius: "10px",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            color: "#172033",
          }}
        />

      </div>


      {/* SORULAR */}

      <div>

        {displayedFAQs.map((faq) => (

          <div
            key={faq.id}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              marginBottom: "12px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
            }}
          >

            <button
              onClick={() =>
                setOpenId(
                  openId === faq.id
                    ? null
                    : faq.id
                )
              }
              style={{
                width: "100%",
                border: "none",
                background: "#ffffff",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                cursor: "pointer",
              }}
            >

              <div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#1d4f91",
                    fontWeight: 700,
                    marginBottom: "7px",
                  }}
                >
                  {String(
                    faq.category || "GENEL"
                  )}
                </div>

                <strong
                  style={{
                    fontSize: "15px",
                    color: "#172033",
                  }}
                >
                  {String(
                    faq.question ||
                    "Soru bulunamadı"
                  )}
                </strong>

              </div>

              <span
                style={{
                  fontSize: "24px",
                  color: "#1d4f91",
                  marginLeft: "20px",
                  flexShrink: 0,
                }}
              >
                {openId === faq.id
                  ? "−"
                  : "+"}
              </span>

            </button>


            {/* CEVAP */}

            {openId === faq.id && (

              <div
                style={{
                  padding: "0 20px 20px",
                  borderTop:
                    "1px solid #eef0f4",
                }}
              >

                <p
                  style={{
                    color: "#596579",
                    lineHeight: 1.7,
                    marginBottom: 0,
                  }}
                >
                  {String(
                    faq.answer ||
                    "Bu soru için cevap bulunamadı."
                  )}
                </p>

              </div>

            )}

          </div>

        ))}

      </div>


      {/* SONUÇ YOK */}

      {displayedFAQs.length === 0 && (

        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "14px",
            textAlign: "center",
          }}
        >

          <h3>
            Soru bulunamadı
          </h3>

          <p
            style={{
              color: "#667085",
            }}
          >
            Arama kriterlerinize uygun
            bir soru bulunmuyor.
          </p>

        </div>

      )}


      {/* SAYFALAMA */}

      {totalPages > 1 && (

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "14px",
            marginTop: "30px",
            paddingBottom: "20px",
          }}
        >

          {/* ÖNCEKİ */}

          <button
            onClick={() =>
              changePage(currentPage - 1)
            }
            disabled={currentPage === 1}
            style={{
              padding: "11px 20px",
              borderRadius: "9px",
              border: "1px solid #d9dee7",
              background:
                currentPage === 1
                  ? "#f1f3f5"
                  : "#ffffff",
              color:
                currentPage === 1
                  ? "#adb5bd"
                  : "#172033",
              cursor:
                currentPage === 1
                  ? "default"
                  : "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            ← Önceki
          </button>


          {/* SORU ARALIĞI */}

          <span
            style={{
              fontSize: "14px",
              color: "#596579",
              fontWeight: 600,
              minWidth: "65px",
              textAlign: "center",
            }}
          >
            {startIndex + 1}–
            {Math.min(
              startIndex + itemsPerPage,
              filteredFAQs.length
            )}
          </span>


          {/* SONRAKİ */}

          <button
            onClick={() =>
              changePage(currentPage + 1)
            }
            disabled={
              currentPage === totalPages
            }
            style={{
              padding: "11px 20px",
              borderRadius: "9px",
              border: "1px solid #d9dee7",
              background:
                currentPage === totalPages
                  ? "#f1f3f5"
                  : "#ffffff",
              color:
                currentPage === totalPages
                  ? "#adb5bd"
                  : "#172033",
              cursor:
                currentPage === totalPages
                  ? "default"
                  : "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Sonraki →
          </button>

        </div>

      )}

    </section>
  )
}

export default FAQ