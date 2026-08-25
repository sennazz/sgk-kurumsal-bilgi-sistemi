
import type { NewsItem } from "../data/news"

type NewsAnalysisProps = {
  newsItems: NewsItem[]
}

function NewsAnalysis({ newsItems }: NewsAnalysisProps) {
  // HABER TÜRLERİ
  const typeCounts = newsItems.reduce<Record<string, number>>(
    (counts, news) => {
      const type = news.type || "Belirtilmemiş"
      counts[type] = (counts[type] || 0) + 1
      return counts
    },
    {}
  )

  // KONULAR
  const topicCounts = newsItems.reduce<Record<string, number>>(
    (counts, news) => {
      const topic = news.topic || "Belirtilmemiş"
      counts[topic] = (counts[topic] || 0) + 1
      return counts
    },
    {}
  )
    // BİRİMLER
  const unitCounts = newsItems.reduce<Record<string, number>>(
    (counts, news) => {
      const unit = news.relatedUnit || "Belirtilmemiş"
      counts[unit] = (counts[unit] || 0) + 1
      return counts
    },
    {}
  )

  

  // AYLIK DAĞILIM
  const monthCounts = newsItems.reduce<Record<string, number>>(
    (counts, news) => {
      if (!news.date) return counts

      const date = new Date(news.date)

      if (isNaN(date.getTime())) {
        return counts
      }

      const month = date.toLocaleDateString("tr-TR", {
        month: "long",
        year: "numeric",
      })

      counts[month] = (counts[month] || 0) + 1

      return counts
    },
    {}
  )

  // EN ÇOK HABER BULUNAN TÜR
  const mostCommonType = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // EN ÇOK HABER BULUNAN KONU
  const mostCommonTopic = Object.entries(topicCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // AYLIK VERİLER
  const monthlyData = Object.entries(monthCounts)

  // EN YÜKSEK AYLIK DEĞER
  const maxMonthlyCount =
    monthlyData.length > 0
      ? Math.max(...monthlyData.map(([, count]) => count))
      : 1

  return (
    <section className="analysis-page">

      {/* BAŞLIK */}
      <div className="analysis-header">

        <div>
         

          <h2>
            Haber Analizi
          </h2>

          <p>
            SGK haber arşivindeki kayıtların tür, konu ve
            tarih bazında analizi.
          </p>
        </div>

      </div>
            {/* ÖZET KARTLARI */}
      <div className="analysis-stat-grid">

        {/* HABER TÜRÜ */}
        <div className="analysis-stat-card">

          <span className="analysis-stat-icon">
            🗂
          </span>

          <div>
            <strong>
              {Object.keys(typeCounts).length}
            </strong>

            <span>
              Haber Türü
            </span>
          </div>

        </div>


        {/* KONU */}
        <div className="analysis-stat-card">

          <span className="analysis-stat-icon">
            📁
          </span>

          <div>
            <strong>
              {Object.keys(topicCounts).length}
            </strong>

            <span>
              Konu
            </span>
          </div>

        </div>


        {/* EN YOĞUN TÜR */}
        <div className="analysis-stat-card">

          <span className="analysis-stat-icon">
            ⭐
          </span>

          <div>
            <strong>
              {mostCommonType ? mostCommonType[1] : 0}
            </strong>

            <span>
              En Yoğun Tür
            </span>
          </div>

        </div>


        {/* BİRİM */}
        <div className="analysis-stat-card">

          <span className="analysis-stat-icon">
            🏢
          </span>

          <div>
            <strong>
              {Object.keys(unitCounts).length}
            </strong>

            <span>
              Birim
            </span>
          </div>

        </div>
      </div>

      {/* İKİLİ ANALİZ */}
      <div className="analysis-two-column">


        {/* HABER TÜRLERİ */}
        <section className="analysis-box">

          <div className="analysis-box-header">

            <div>

              <span className="section-eyebrow">
                KATEGORİ
              </span>

              <h3>
                Haber Türlerine Göre Dağılım
              </h3>

            </div>

          </div>


          <div className="analysis-list">

            {Object.entries(typeCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => {

                const percentage =
                  newsItems.length > 0
                    ? Math.round(
                        (count / newsItems.length) * 100
                      )
                    : 0

                return (
                  <div
                    className="analysis-row"
                    key={type}
                  >

                    <div className="analysis-row-top">

                      <span>
                        {type}
                      </span>

                      <strong>
                        {count} haber
                      </strong>

                    </div>


                    <div className="analysis-progress">

                      <div
                        className="analysis-progress-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>


                    <span className="analysis-percentage">
                      %{percentage}
                    </span>

                  </div>
                )
              })}

          </div>

        </section>


        {/* KONULAR */}
        <section className="analysis-box">

          <div className="analysis-box-header">

            <div>

              <span className="section-eyebrow">
                KONU DAĞILIMI
              </span>

              <h3>
                Haber Konularına Göre Dağılım
              </h3>

            </div>

          </div>


          <div className="analysis-list">

            {Object.entries(topicCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([topic, count]) => {

                const percentage =
                  newsItems.length > 0
                    ? Math.round(
                        (count / newsItems.length) * 100
                      )
                    : 0

                return (
                  <div
                    className="analysis-row"
                    key={topic}
                  >

                    <div className="analysis-row-top">

                      <span>
                        {topic}
                      </span>

                      <strong>
                        {count} haber
                      </strong>

                    </div>


                    <div className="analysis-progress">

                      <div
                        className="analysis-progress-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>


                    <span className="analysis-percentage">
                      %{percentage}
                    </span>

                  </div>
                )
              })}

          </div>

        </section>

      </div>
            {/* BİRİM ANALİZİ */}
      <section className="analysis-box unit-analysis">

        <div className="analysis-box-header">

          <div>

            <span className="section-eyebrow">
              BİRİM DAĞILIMI
            </span>

            <h3>
              Haberlere Göre Birim Dağılımı
            </h3>

            <p>
              Haberlerin ilgili birimlere göre dağılımı.
            </p>

          </div>

        </div>


        <div className="analysis-list">

          {Object.entries(unitCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([unit, count]) => {

              const percentage =
                newsItems.length > 0
                  ? Math.round(
                      (count / newsItems.length) * 100
                    )
                  : 0

              return (
                <div
                  className="analysis-row"
                  key={unit}
                >

                  <div className="analysis-row-top">

                    <span>
                      {unit}
                    </span>

                    <strong>
                      {count} haber
                    </strong>

                  </div>

                  <div className="analysis-progress">

                    <div
                      className="analysis-progress-fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <span className="analysis-percentage">
                    %{percentage}
                  </span>

                </div>
              )
            })}

        </div>

      </section>


      {/* AYLIK ANALİZ */}
      <section className="analysis-box monthly-analysis">

        <div className="analysis-box-header">

          <div>

            <span className="section-eyebrow">
              ZAMAN ANALİZİ
            </span>

            <h3>
              Aylara Göre Haber Dağılımı
            </h3>

            <p>
              Haber kayıtlarının aylık dağılımı.
            </p>

          </div>

        </div>


        {monthlyData.length === 0 ? (

          <div className="analysis-empty">
            Tarih bilgisi bulunan haber kaydı bulunamadı.
          </div>

        ) : (

          <div className="monthly-chart">

            {monthlyData.map(([month, count]) => {

              const height =
                (count / maxMonthlyCount) * 100

              return (
                <div
                  className="month-column"
                  key={month}
                >

                  <div className="month-value">
                    {count}
                  </div>

                  <div className="month-bar-area">

                    <div
                      className="month-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  </div>

                  <span className="month-label">
                    {month}
                  </span>

                </div>
              )
            })}

          </div>

        )}

      </section>


      {/* ÖNE ÇIKAN ANALİZ */}
      <section className="analysis-insight">

        <div className="insight-icon">
          💡
        </div>

        <div>

          <span className="section-eyebrow">
            ÖNE ÇIKAN ANALİZ
          </span>

          <h3>
            Haber arşivindeki en yoğun kategori
          </h3>

          <p>

            {mostCommonType ? (
              <>
                <strong>
                  {mostCommonType[0]}
                </strong>{" "}
                kategorisinde toplam{" "}
                <strong>
                  {mostCommonType[1]}
                </strong>{" "}
                haber bulunmaktadır.
              </>
            ) : (
              "Henüz analiz edilecek haber verisi bulunmamaktadır."
            )}

          </p>

        </div>

      </section>


      {/* DETAYLI ÖZET TABLOSU */}
      <section className="analysis-box">

        <div className="analysis-box-header">

          <div>

            <span className="section-eyebrow">
              ÖZET
            </span>

            <h3>
              Analiz Özeti
            </h3>

          </div>

        </div>


        <div className="analysis-summary-grid">

          <div className="summary-item">

            <span>
              En fazla haber türü
            </span>

            <strong>
              {mostCommonType
                ? mostCommonType[0]
                : "-"}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              En fazla haber sayısı
            </span>

            <strong>
              {mostCommonType
                ? mostCommonType[1]
                : 0}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              En yoğun konu
            </span>

            <strong>
              {mostCommonTopic
                ? mostCommonTopic[0]
                : "-"}
            </strong>

          </div>


          <div className="summary-item">

            <span>
              Toplam kategori
            </span>

            <strong>
              {Object.keys(typeCounts).length}
            </strong>

          </div>

        </div>

      </section>

    </section>
  )
}

export default NewsAnalysis

