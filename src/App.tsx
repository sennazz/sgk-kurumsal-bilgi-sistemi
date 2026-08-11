import { OrganizationTree } from "./components/OrganizationTree"
import { useState } from "react"
import { organizationUnits } from "./data/organization"
import { newsItems } from "./data/news"
import "./App.css"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {
  const [activePage, setActivePage] = useState("Ana Sayfa")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Tümü")
  const [selectedNews, setSelectedNews] = useState<number | null>(null)

  const newsTypes = [
    "Tümü",
    ...Array.from(
      new Set(newsItems.map((news) => news.type))
    ),
  ]

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

  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        <main className="content">

          {/* ANA SAYFA */}

{activePage === "Ana Sayfa" && (
  <>
    <div className="dashboard-welcome">
      <div>
        <span className="dashboard-eyebrow">
          KURUMSAL BİLGİ SİSTEMİ
        </span>

        <h2>Hoş Geldiniz</h2>

        <p>
          Sosyal Güvenlik Kurumu kurumsal bilgi,
          haber ve organizasyon arşivine genel bakış.
        </p>
      </div>

      <div className="dashboard-date">
        <span>Durum</span>
        <strong>● Sistem Aktif</strong>
      </div>
    </div>


    <div className="dashboard-stats">

      <div className="stat-card">
        <div className="stat-icon">▦</div>

        <div>
          <div className="stat-number">
            {organizationUnits.length}
          </div>

          <div className="stat-label">
            Kurumsal Birim
          </div>
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-icon">▤</div>

        <div>
          <div className="stat-number">
            {newsItems.length}
          </div>

          <div className="stat-label">
            Haber
          </div>
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-icon">!</div>

        <div>
          <div className="stat-number">
            —
          </div>

          <div className="stat-label">
            Duyuru
          </div>
        </div>
      </div>

    </div>


    <section className="dashboard-section">

      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            KURUMSAL YAPI
          </span>

          <h2>Kurumsal Yapı</h2>

          <p>
            SGK'nın organizasyon yapısına genel bakış.
          </p>
        </div>

        <button
          className="view-all-button"
          onClick={() =>
            setActivePage("Kurumsal Yapı")
          }
        >
          Tümünü Gör →
        </button>
      </div>


      <div className="quick-info-grid">

        <div className="quick-info-card">
          <span className="quick-icon">🏢</span>

          <div>
            <strong>Organizasyon Birimleri</strong>

            <p>
              Kurumun mevcut birimlerini ve
              organizasyon yapısını görüntüleyin.
            </p>
          </div>
        </div>


        <div className="quick-info-card">
          <span className="quick-icon">📰</span>

          <div>
            <strong>Haber Arşivi</strong>

            <p>
              SGK tarafından yayımlanan haberleri
              inceleyin ve filtreleyin.
            </p>
          </div>
        </div>

      </div>

    </section>


    <section className="dashboard-section">

      <div className="section-heading">
        <div>
          <span className="section-eyebrow">
            SON İÇERİKLER
          </span>

          <h2>Son Haberler</h2>

          <p>
            Sisteme eklenen güncel haber kayıtları.
          </p>
        </div>

        <button
          className="text-button"
          onClick={() => setActivePage("Haberler")}
        >
          Haberleri Gör →
        </button>
      </div>


      <div className="recent-news-list">

        {newsItems.slice(0, 3).map((news) => (
          <div
            className="recent-news-item"
            key={news.id}
          >
            <div className="recent-news-date">
              {news.date}
            </div>

            <div className="recent-news-content">
              <span>{news.type}</span>

              <h3>{news.title}</h3>

              <p>{news.topic}</p>
            </div>

            <span className="news-arrow">
              →
            </span>
          </div>
        ))}

      </div>

    </section>
  </>
)}

          {/* KURUMSAL YAPI */}
          {activePage === "Kurumsal Yapı" && (
            <section className="organization-section">
              <div className="section-title">
                <div>
                  <h2>SGK Kurumsal Yapı</h2>

                  <p>
                    Sosyal Güvenlik Kurumu'nun organizasyon yapısı.
                  </p>
                </div>

                <span>
                  {organizationUnits.length} birim
                </span>
              </div>

             <OrganizationTree />
            </section>
          )}

          {/* HABERLER */}

{activePage === "Haberler" && (
  <section className="news-page">

    <div className="news-page-header">
      <div>
        <span className="section-eyebrow">
          KURUMSAL HABER ARŞİVİ
        </span>

        <h2>SGK Haberleri</h2>

        <p>
          Sosyal Güvenlik Kurumu tarafından yayımlanan
          haber ve içerikleri inceleyin.
        </p>
      </div>

      <div className="news-count">
        <strong>{filteredNews.length}</strong>
        <span>kayıt</span>
      </div>
    </div>
    {selectedNews && (
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

              <h2>{news.title}</h2>
            </div>

            <button
              className="close-detail"
              onClick={() => setSelectedNews(null)}
            >
              ×
            </button>
          </div>

          <div className="news-detail-meta">
            <div>
              <span>TARİH</span>
              <strong>{news.date}</strong>
            </div>

            <div>
              <span>TÜR</span>
              <strong>{news.type}</strong>
            </div>

            <div>
              <span>KONU</span>
              <strong>{news.topic}</strong>
            </div>

            <div>
              <span>KAYNAK</span>
              <strong>{news.source || "Belirtilmemiş"}</strong>
            </div>
          </div>

          <div className="news-detail-description">
            <span>AÇIKLAMA</span>

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

                  <h2>{news.title}</h2>
                </div>

                <button
                  className="close-detail"
                  onClick={() => setSelectedNews(null)}
                >
                  ×
                </button>
              </div>

              <div className="news-detail-meta">
                <div>
                  <span>TÜR</span>
                  <strong>{news.type}</strong>
                </div>

                <div>
                  <span>TARİH</span>
                  <strong>{news.date}</strong>
                </div>

                <div>
                  <span>KONU</span>
                  <strong>{news.topic}</strong>
                </div>

                {news.source && (
                  <div>
                    <span>KAYNAK</span>
                    <strong>{news.source}</strong>
                  </div>
                )}
              </div>

              <div className="news-detail-description">
                <span>AÇIKLAMA</span>

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


    {filteredNews.length === 0 ? (

      <div className="empty-news">
        <div className="empty-news-icon">
          ?
        </div>

        <h3>Haber bulunamadı</h3>

        <p>
          Arama veya filtre kriterlerinize uygun
          bir haber kaydı bulunmuyor.
        </p>
      </div>

    ) : (

      <div className="news-grid">

        {filteredNews.map((news) => (

          <article
            className="news-card"
            key={news.id}
          >

            <div className="news-card-top">

              <span className="news-type">
                {news.type}
              </span>

              <span className="news-date">
                {news.date}
              </span>

            </div>


            <h3>{news.title}</h3>


            {news.description && (
              <p className="news-description">
                {news.description}
              </p>
            )}


            <div className="news-card-meta">

              <div>
                <span>KONU</span>
                <strong>{news.topic}</strong>
              </div>

              {news.source && (
                <div>
                  <span>KAYNAK</span>
                  <strong>{news.source}</strong>
                </div>
              )}

            </div>


            <button
  className="news-detail-button"
  onClick={() => setSelectedNews(news.id)}
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
              <h2>Duyurular</h2>

              <p>
                SGK duyuruları burada görüntülenecek.
              </p>
            </section>
          )}

          {/* ARŞİV */}
          {activePage === "Arşiv" && (
            <section className="welcome">
              <h2>Arşiv</h2>

              <p>
                Arşiv içerikleri burada görüntülenecek.
              </p>
            </section>
          )}

        </main>
      </div>
    </div>
  )
}

export default App
