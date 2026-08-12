import { organizationUnits } from "../data/organization"
import { newsItems } from "../data/news"

function Dashboard() {
  const newsTypeCounts = newsItems.reduce(
    (counts, news) => {
      counts[news.type] = (counts[news.type] || 0) + 1
      return counts
    },
    {} as Record<string, number>
  )

  return (
    <section className="dashboard-section">

      {/* GENEL BAKIŞ */}

      <div className="section-heading">
        <span className="section-eyebrow">
          KURUMSAL BİLGİ SİSTEMİ
        </span>

        <h2>Genel Bakış</h2>

        <p>
          SGK kurumsal bilgi sistemindeki güncel verilere genel bakış.
        </p>
      </div>


      {/* İSTATİSTİK KARTLARI */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">▤</div>

          <div>
            <div className="stat-number">
              {newsItems.length}
            </div>

            <div className="stat-label">
              Toplam Haber
            </div>
          </div>
        </div>


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

      </div>


      {/* HABER TÜRLERİ */}

      <div className="dashboard-section">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              HABER ANALİZİ
            </span>

            <h2>Haber Türlerine Göre Dağılım</h2>

            <p>
              Sistemde bulunan haberlerin türlerine göre dağılımı.
            </p>
          </div>

        </div>


        <div className="quick-info-grid">

          {Object.entries(newsTypeCounts).map(
            ([type, count]) => (

              <div
                className="quick-info-card"
                key={type}
              >

                <span className="quick-icon">
                  📰
                </span>

                <div>
                  <strong>{type}</strong>

                  <p>
                    {count} kayıt
                  </p>
                </div>

              </div>

            )
          )}

        </div>

      </div>


      {/* KURUMSAL YAPI */}

      <div className="dashboard-section">

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

        </div>


        <div className="quick-info-grid">

          <div className="quick-info-card">

            <span className="quick-icon">
              🏢
            </span>

            <div>
              <strong>Organizasyon Birimleri</strong>

              <p>
                Kurumun mevcut birimlerini ve
                organizasyon yapısını görüntüleyin.
              </p>
            </div>

          </div>


          <div className="quick-info-card">

            <span className="quick-icon">
              📊
            </span>

            <div>
              <strong>{organizationUnits.length} Kurumsal Birim</strong>

              <p>
                SGK'nın organizasyon yapısındaki
                mevcut birimler.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* SON HABERLER */}

      <div className="dashboard-section">

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

                <span>
                  {news.type}
                </span>

                <h3>
                  {news.title}
                </h3>

                <p>
                  {news.topic}
                </p>

              </div>


              <span className="news-arrow">
                →
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Dashboard