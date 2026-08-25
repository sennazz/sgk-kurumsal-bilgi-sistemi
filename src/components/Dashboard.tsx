
import type { NewsItem } from "../data/news"
import { organizationUnits } from "../data/organization"

type DashboardProps = {
  onNavigate: (page: string) => void
  newsItems: NewsItem[]
  savedNews: number[]
}

function Dashboard({
  onNavigate,
  newsItems,
  savedNews,
}: DashboardProps) {

  const unitNewsCounts = newsItems.reduce<Record<string, number>>(
  (counts, news) => {
    const unit = news.relatedUnit?.trim() || "Belirtilmemiş"

    counts[unit] = (counts[unit] || 0) + 1

    return counts
  },
  {}
)

  return (
    <div className="dashboard-container">

      {/* =========================
          HOŞ GELDİNİZ
      ========================== */}

      <div className="dashboard-welcome-card">

        <div className="welcome-text-content">

          <span className="dashboard-eyebrow">
            KURUMSAL BİLGİ SİSTEMİ
          </span>

          <h1>
            Hoş Geldiniz
          </h1>

          <p className="dashboard-slogan">
            Sosyal Güvenlik Kurumu'nun kurumsal bilgi,
            haber ve organizasyon arşivine genel bakış.
          </p>

        </div>

        

      </div>


      {/* =========================
          İSTATİSTİK KARTLARI
      ========================== */}

      <div className="dashboard-stats-grid">

        {/* TOPLAM HABER */}

        <div
          className="stat-card"
          onClick={() => onNavigate("Haberler")}
        >

          <div className="stat-icon-wrapper">
            📰
          </div>

          <div className="stat-info">

            <div className="stat-number">
              {newsItems.length}
            </div>

            <div className="stat-label">
              Toplam Haber
            </div>

          </div>

        </div>


        {/* SSS */}

        <div
          className="stat-card"
          onClick={() =>
            onNavigate("Sıkça Sorulan Sorular")
          }
        >

          <div className="stat-icon-wrapper">
            ❓
          </div>

          <div className="stat-info">

            <div className="stat-number">
              879
            </div>

            <div className="stat-label">
              Sıkça Sorulan Soru
            </div>

          </div>

        </div>


        {/* KURUMSAL BİRİM */}

        <div
          className="stat-card"
          onClick={() =>
            onNavigate("Kurumsal Yapı")
          }
        >

          <div className="stat-icon-wrapper">
            🏢
          </div>

          <div className="stat-info">

            <div className="stat-number">
              {organizationUnits.length}
            </div>

            <div className="stat-label">
              Kurumsal Birim
            </div>

          </div>

        </div>


        {/* KAYDEDİLEN HABER */}

        <div
          className="stat-card"
          onClick={() =>
            onNavigate("Kaydettiklerim")
          }
        >

          <div className="stat-icon-wrapper">
            ☆
          </div>

          <div className="stat-info">

            <div className="stat-number">
              {savedNews.length}
            </div>

            <div className="stat-label">
              Kaydedilen Haber
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          ALT BÖLÜM
      ========================== */}

      <div className="dashboard-three-columns-grid">


        {/* =========================
            HABER ANALİZİ
        ========================== */}

        <section
          className="dashboard-box dashboard-analysis-box"
          onClick={() =>
            onNavigate("Haber Analizi")
          }
        >

          <div className="section-heading-block">

            <span className="section-eyebrow">
              HABER ANALİZİ
            </span>

            <h2>
              Birimlere Göre Haber Dağılımı
            </h2>

            <p>
              Haberlerin birimlere göre dağılımı.
            </p>

          </div>


          <div className="news-type-list">

            {Object.entries(unitNewsCounts).map(
              ([unit, count]) => {

                const percentage =
                  newsItems.length > 0
                    ? Math.round(
                        (count / newsItems.length) * 100
                      )
                    : 0

                return (

                  <div
                    className="news-type-row"
                    key={unit}
                  >

                    <div className="news-type-info">

                      <span className="type-name">
                        {unit}
                      </span>

                      <span className="type-count">
                        {count}
                      </span>

                    </div>


                    <div className="news-type-bar">

                      <div
                        className="news-type-bar-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                )
              }
            )}

          </div>


          <div className="analysis-card-link">
            Detaylı analize git →
          </div>

        </section>


        {/* =========================
            HIZLI ERİŞİM
        ========================== */}

        <section className="dashboard-box">

          <div className="section-heading-block">

            <span className="section-eyebrow">
              HIZLI ERİŞİM
            </span>

            <h2>
              Bilgi Merkezi
            </h2>

            <p>
              Kurumsal içeriklere hızlıca ulaşın.
            </p>

          </div>


          <div className="dashboard-quick-links">

            <button
              onClick={() =>
                onNavigate("Haberler")
              }
            >

              <span className="quick-link-icon">
                ▤
              </span>

              <div className="quick-link-text">

                <strong>
                  Haberler
                </strong>

                <small>
                  Kurumsal haber arşivi
                </small>

              </div>

              <span className="quick-link-arrow">
                →
              </span>

            </button>


            <button
              onClick={() =>
                onNavigate("Sıkça Sorulan Sorular")
              }
            >

              <span className="quick-link-icon">
                ?
              </span>

              <div className="quick-link-text">

                <strong>
                  Sıkça Sorulan Sorular
                </strong>

                <small>
                  SGK hakkında merak edilenler
                </small>

              </div>

              <span className="quick-link-arrow">
                →
              </span>

            </button>


            <button
              onClick={() =>
                onNavigate("Kurumsal Yapı")
              }
            >

              <span className="quick-link-icon">
                ▦
              </span>

              <div className="quick-link-text">

                <strong>
                  Kurumsal Yapı
                </strong>

                <small>
                  Kurum organizasyon yapısı
                </small>

              </div>

              <span className="quick-link-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* =========================
            KURUMSAL BİLGİ
        ========================== */}

        <section className="dashboard-box">

          <div className="section-heading-block">

            <span className="section-eyebrow">
              SİSTEM BİLGİSİ
            </span>

            <h2>
              Kurumsal Bilgi
            </h2>

            <p>
              Sistemde bulunan içeriklerin genel görünümü.
            </p>

          </div>


          <div className="dashboard-info-list">

            {/* HABER */}

            <div className="dashboard-info-row">

              <div className="dashboard-info-icon">
                ▤
              </div>

              <div className="dashboard-info-label">

                <strong>
                  Haber Kaydı
                </strong>

                <span>
                  Kurumsal haberler
                </span>

              </div>

              <strong className="dashboard-info-value">
                {newsItems.length}
              </strong>

            </div>


            {/* SSS */}

            <div className="dashboard-info-row">

              <div className="dashboard-info-icon">
                ?
              </div>

              <div className="dashboard-info-label">

                <strong>
                  SSS Kaydı
                </strong>

                <span>
                  Sıkça sorulan sorular
                </span>

              </div>

              <strong className="dashboard-info-value">
                879
              </strong>

            </div>


            {/* KURUMSAL BİRİM */}

            <div className="dashboard-info-row">

              <div className="dashboard-info-icon">
                ▦
              </div>

              <div className="dashboard-info-label">

                <strong>
                  Kurumsal Birim
                </strong>

                <span>
                  Organizasyon yapısı
                </span>

              </div>

              <strong className="dashboard-info-value">
                {organizationUnits.length}
              </strong>

            </div>


            {/* KAYDEDİLEN HABER */}

            <div className="dashboard-info-row">

              <div className="dashboard-info-icon">
                ☆
              </div>

              <div className="dashboard-info-label">

                <strong>
                  Kaydedilen Haber
                </strong>

                <span>
                  Kişisel haber listeniz
                </span>

              </div>

              <strong className="dashboard-info-value">
                {savedNews.length}
              </strong>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default Dashboard
