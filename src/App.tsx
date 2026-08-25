
import Login from "./components/Login"
import { OrganizationTree } from "./components/OrganizationTree"
import { useEffect, useState } from "react"
import Archive from "./components/Archive"
import { organizationUnits } from "./data/organization"
import { loadNewsItems, type NewsItem } from "./data/news"
import { loadFAQItems, type FAQItem } from "./data/faq"

import "./App.css"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import NewsAnalysis from "./components/NewsAnalysis"
import FAQ from "./components/FAQ"

function App() {

  // GİRİŞ DURUMU
  const [isLoggedIn, setIsLoggedIn] = useState(false

  )
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("rememberedUser") !== null)
  }, [])

  // AKTİF SAYFA
  const [activePage, setActivePage] = useState("Ana Sayfa")

  // HABER DURUMLARI
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Tümü")
  const [selectedNews, setSelectedNews] = useState<number | null>(null)

  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  // SSS VERİLERİ
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])

  // HABER SAYFALAMA
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // KAYDEDİLEN HABERLER
  const [savedNews, setSavedNews] = useState<number[]>(() => {
    const saved = localStorage.getItem("savedNews")

    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => {
  console.log("Kaydedilen haberler:", savedNews)
}, [savedNews])

  // EXCEL DOSYALARINI YÜKLE
  useEffect(() => {

    loadNewsItems().then((data) => {
      setNewsItems(data)
    })

    loadFAQItems().then((data) => {
      setFaqItems(data)
    })

  }, [])

  // HABER KAYDET / KAYITTAN ÇIKAR
  const toggleSavedNews = (newsId: number) => {

    setSavedNews((currentSaved) => {

      const updatedSaved = currentSaved.includes(newsId)
        ? currentSaved.filter((id) => id !== newsId)
        : [...currentSaved, newsId]

      localStorage.setItem(
        "savedNews",
        JSON.stringify(updatedSaved)
      )

      return updatedSaved
    })
  }

  // HABER DETAYINI AÇ
  const openNewsDetail = (newsId: number) => {
    setSelectedNews(newsId)
  }

  // ÇIKIŞ YAP
  const handleLogout = () => {
    localStorage.removeItem("rememberedUser")

    setIsLoggedIn(false)
    setActivePage("Ana Sayfa")
    setSearchTerm("")
    setSelectedType("Tümü")
    setSelectedNews(null)
    setCurrentPage(1)

  }

  // SAYFA DEĞİŞTİR
  const handlePageChange = (page: number) => {

    setCurrentPage(page)
    setSelectedNews(null)

  }

  // HABER TÜRLERİ
  const newsTypes = [
    "Tümü",
    ...Array.from(
      new Set(
        newsItems.map((news) => news.type)
      )
    ),
  ]

  // HABER FİLTRELEME
  const filteredNews = newsItems.filter((news) => {

    const search = searchTerm.toLowerCase()

    const matchesSearch =
      news.title.toLowerCase().includes(search) ||
      news.topic.toLowerCase().includes(search)

    const matchesType =
      selectedType === "Tümü" ||
      news.type === selectedType

    return matchesSearch && matchesType

  })

  // TOPLAM SAYFA
  const totalPages = Math.ceil(
    filteredNews.length / itemsPerPage
  )

  // MEVCUT SAYFADAKİ HABERLER
  const startIndex =
    (currentPage - 1) * itemsPerPage

  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // ARAMA DEĞİŞİNCE 1. SAYFAYA DÖN
  useEffect(() => {

    setCurrentPage(1)

  }, [searchTerm, selectedType])

  // GİRİŞ YAPILMADIYSA LOGIN
  if (!isLoggedIn) {

    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    )

  }

  return (

    <div className="app">

      <Header />

      <div className="layout">

        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          onLogout={handleLogout}
        />

        <main className="content">

          {/* ANA SAYFA */}

          {activePage === "Ana Sayfa" && (

            <Dashboard
              onNavigate={setActivePage}
              newsItems={newsItems}
              savedNews={savedNews}
            />

          )}
          {/* KURUMSAL YAPI */}
          {/* KURUMSAL YAPI */}

{activePage === "Kurumsal Yapı" && (
  <section className="organization-section">

    <div className="organization-header-card">

      <div className="section-title">

        <div>
          <h2>
            SGK Kurumsal Yapı
          </h2>

          <p>
            Sosyal Güvenlik Kurumu'nun
            organizasyon yapısı.
          </p>
        </div>

        <span>
          {organizationUnits.length} birim
        </span>

      </div>

    </div>

    <div className="organization-tree-card">
      <OrganizationTree />
    </div>

  </section>
)}



          {/* HABER ANALİZİ */}

          {activePage === "Haber Analizi" && (

            <NewsAnalysis
              newsItems={newsItems}
            />

          )}

          {/* HABERLER */}

          {activePage === "Haberler" && (

            <section className="news-page">

              <div className="news-page-header">

                <div>

                  
                  <h2>
                    SGK Haberleri
                  </h2>

                  <p>
                    Sosyal Güvenlik Kurumu tarafından
                    yayımlanan haber ve içerikleri inceleyin.
                  </p>

                </div>

                <div className="news-count">

                  <strong>
                    {filteredNews.length}
                  </strong>

                  <span>
                    kayıt
                  </span>

                </div>

              </div>

              {/* ARAMA VE FİLTRE */}

              <div className="news-controls">

                <div className="news-search">

                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Haber başlığı veya konu ara..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />

                </div>

                <select
                  value={selectedType}
                  onChange={(event) =>
                    setSelectedType(event.target.value)
                  }
                >

                  {newsTypes.map((type) => (

                    <option
                      value={type}
                      key={type}
                    >
                      {type}
                    </option>

                  ))}

                </select>

              </div>

              {/* HABER DETAYI */}

              {selectedNews !== null && (

                <div className="news-detail-panel">

                  {(() => {

                    const news = newsItems.find(
                      (item) => item.id === selectedNews
                    )

                    if (!news) return null

                    return (

                      <>

                        <div className="news-detail-header">

                          <div>

                            <span className="section-eyebrow">
                              HABER DETAYI
                            </span>

                            <h2>
                              {news.title}
                            </h2>

                          </div>

                          <button
                            className="close-detail"
                            onClick={() =>
                              setSelectedNews(null)
                            }
                          >
                            ×
                          </button>

                        </div>

                        <div className="news-detail-meta">

                          <div>
                            <span>TÜR</span>
                            <strong>
                              {news.type}
                            </strong>
                          </div>

                          <div>
                            <span>TARİH</span>
                            <strong>
                              {news.date}
                            </strong>
                          </div>

                          <div>
                            <span>KONU</span>
                            <strong>
                              {news.topic}
                            </strong>
                          </div>

                          {news.source && (

                            <div>
                              <span>KAYNAK</span>
                              <strong>
                                {news.source}
                              </strong>
                            </div>

                          )}

                        </div>

                        <div className="news-detail-description">

                          <span>
                            AÇIKLAMA
                          </span>

                          <p>
                            {news.description ||
                              "Bu haber için açıklama bulunmuyor."}
                          </p>

                        </div>

                      </>

                    )

                  })()}

                </div>

              )}

              {/* HABER LİSTESİ */}

              {filteredNews.length === 0 ? (

                <div className="empty-news">

                  <div className="empty-news-icon">
                    ?
                  </div>

                  <h3>
                    Haber bulunamadı
                  </h3>

                  <p>
                    Arama veya filtre kriterlerinize
                    uygun bir haber kaydı bulunmuyor.
                  </p>

                </div>

              ) : (

                <>

                  <div className="news-grid">

                    {paginatedNews.map((news) => (

                      <article
                        className="news-card"
                        key={news.id}
                        onClick={() =>
                          openNewsDetail(news.id)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {

                          if (
                            event.key === "Enter" ||
                            event.key === " "
                          ) {

                            openNewsDetail(news.id)

                          }

                        }}
                      >

                        <div className="news-card-top">

                          <span className="news-type">
                            {news.type}
                          </span>

                          <span className="news-date">
                            {news.date}
                          </span>

                          <button
                            className={`save-news-button ${
                              savedNews.includes(news.id)
                                ? "saved"
                                : ""
                            }`}
                            onClick={(event) => {

                              event.stopPropagation()

                              toggleSavedNews(news.id)

                            }}
                            title={
                              savedNews.includes(news.id)
                                ? "Kaydı kaldır"
                                : "Kaydet"
                            }
                          >

                            {savedNews.includes(news.id)
                              ? "★"
                              : "☆"}

                          </button>

                        </div>

                        <h3>
                          {news.title}
                        </h3>

                        {news.description && (

                          <p className="news-description">
                            {news.description}
                          </p>

                        )}

                        <div className="news-card-meta">

                          <div>

                            <span>
                              KONU
                            </span>

                            <strong>
                              {news.topic}
                            </strong>

                          </div>

                          {news.source && (

                            <div>

                              <span>
                                KAYNAK
                              </span>

                              <strong>
                                {news.source}
                              </strong>

                            </div>

                          )}

                        </div>

                        <button
                          className="news-detail-button"
                          onClick={(event) => {

                            event.stopPropagation()

                            openNewsDetail(news.id)

                          }}
                        >
                          Haberi Görüntüle →
                        </button>

                      </article>

                    ))}

                  </div>

                  {/* SAYFALAMA */}

                  {totalPages > 1 && (

                    <div className="pagination">

                      <button
                        className="pagination-button"
                        disabled={currentPage === 1}
                        onClick={() =>
                          handlePageChange(
                            currentPage - 1
                          )
                        }
                      >
                        ←
                      </button>

                      {Array.from(
                        { length: Math.min(totalPages, 10) },
                        (_, index) => index + 1
                      ).map((page) => (

                        <button
                          key={page}
                          className={`pagination-button ${
                            currentPage === page
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handlePageChange(page)
                          }
                        >
                          {page}
                        </button>

                      ))}

                      <button
                        className="pagination-button"
                        disabled={
                          currentPage === totalPages
                        }
                        onClick={() =>
                          handlePageChange(
                            currentPage + 1
                          )
                        }
                      >
                        →
                      </button>

                    </div>

                  )}

                </>

              )}

            </section>

          )}

          {/* KAYDETTİKLERİM */}

          {activePage === "Kaydettiklerim" && (

            <section className="news-page saved-news-page">

              <div className="news-page-header">

                <div>

                  <span className="section-eyebrow">
                    KİŞİSEL HABER LİSTESİ
                  </span>

                  <h2>
                    Kaydettiklerim
                  </h2>

                  <p>
                    Daha sonra tekrar incelemek
                    istediğiniz haberler burada bulunur.
                  </p>

                </div>

                <div className="news-count">

                  <strong>
                    {savedNews.length}
                  </strong>

                  <span>
                    kayıt
                  </span>

                </div>

              </div>

              {savedNews.length === 0 ? (

                <div className="empty-news">

                  <div className="empty-news-icon">
                    ☆
                  </div>

                  <h3>
                    Henüz kayıtlı haber yok
                  </h3>

                  <p>
                    Haberler bölümünden yıldız simgesine
                    tıklayarak haberleri buraya kaydedebilirsiniz.
                  </p>

                </div>

              ) : (

                <div className="news-grid">

                  {newsItems
                    .filter((news) =>
                      savedNews.includes(news.id)
                    )
                    .map((news) => (

                      <article
                        className="news-card"
                        key={news.id}
                        onClick={() =>
                          openNewsDetail(news.id)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {

                          if (
                            event.key === "Enter" ||
                            event.key === " "
                          ) {

                            openNewsDetail(news.id)

                          }

                        }}
                      >

                        <div className="news-card-top">

                          <span className="news-type">
                            {news.type}
                          </span>

                          <span className="news-date">
                            {news.date}
                          </span>

                          <button
                            className="save-news-button saved"
                            onClick={(event) => {

                              event.stopPropagation()

                              toggleSavedNews(news.id)

                            }}
                            title="Kaydı kaldır"
                          >
                            ★
                          </button>

                        </div>

                        <h3>
                          {news.title}
                        </h3>

                        {news.description && (

                          <p className="news-description">
                            {news.description}
                          </p>

                        )}

                        <div className="news-card-meta">

                          <div>

                            <span>
                              KONU
                            </span>

                            <strong>
                              {news.topic}
                            </strong>

                          </div>

                          {news.source && (

                            <div>

                              <span>
                                KAYNAK
                              </span>

                              <strong>
                                {news.source}
                              </strong>

                            </div>

                          )}

                        </div>

                        <button
                          className="news-detail-button"
                          onClick={(event) => {

                            event.stopPropagation()

                            openNewsDetail(news.id)

                          }}
                        >
                          Haberi Görüntüle →
                        </button>

                      </article>

                    ))}

                </div>

              )}

            </section>

          )}

          {/* DUYURULAR */}
          {activePage === "Duyurular" && (

  <section className="welcome">

    <h2>
      Duyurular
    </h2>

    <p>
      SGK duyuruları burada görüntülenecek.
    </p>

  </section>

)}
{/* ARŞİV */}

{activePage === "Arşiv" && (

  <Archive
    newsItems={newsItems}
  />

)}
          {/* SSS */}

          {activePage === "Sıkça Sorulan Sorular" && (

            <FAQ
              faqItems={faqItems}
            />

          )}

        </main>

      </div>

    </div>

  )
}

export default App

