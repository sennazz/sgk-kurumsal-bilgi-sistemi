import { useState } from "react"
import { organizationUnits } from "../data/organization"

export function OrganizationTree() {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(
    null
  )

  const getUnit = (id: string) =>
    organizationUnits.find((unit) => unit.id === id)

  const getChildren = (parentId: string) =>
    organizationUnits.filter((unit) => unit.parentId === parentId)

  const selectedUnit = selectedUnitId
    ? getUnit(selectedUnitId)
    : null

  const selectedParent = selectedUnit?.parentId
    ? getUnit(selectedUnit.parentId)
    : null

  const selectedChildren = selectedUnit
    ? getChildren(selectedUnit.id)
    : []

  const handleSelect = (unitId: string) => {
    setSelectedUnitId(unitId)

    setTimeout(() => {
      document
        .getElementById("unit-detail")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
    }, 100)
  }

  const renderCard = (unitId: string) => {
    const unit = getUnit(unitId)

    if (!unit) return null

    const isSelected = selectedUnitId === unit.id

    return (
      <button
        type="button"
        className={`tree-card ${isSelected ? "selected" : ""}`}
        onClick={() => handleSelect(unit.id)}
      >
        <span className="unit-type">
          {unit.type}
        </span>

        <h3>{unit.name}</h3>

        <span className="tree-card-action">
          Detayları Gör →
        </span>
      </button>
    )
  }

  /*
   * Kurum Başkanı'na doğrudan bağlı birimler
   */
  const presidentChildren = [
    "guidance-inspection",
    "personnel-department",
    "legal-advisor",
    "press-public-relations",
    "internal-audit",
  ]

  /*
   * Başkan Yardımcıları
   */
  const deputy1 = getUnit("deputy-president-1")
  const deputy2 = getUnit("deputy-president-2")
  const deputy3 = getUnit("deputy-president-3")

  const deputy1Children = getChildren("deputy-president-1")
  const deputy2Children = getChildren("deputy-president-2")
  const deputy3Children = getChildren("deputy-president-3")

  return (
    <>
      <div className="organization-tree">

        {/* =====================================
            1. ÜST YÖNETİM
        ===================================== */}

        <div className="top-level">

          {renderCard("general-assembly")}

          {renderCard("board")}

          {renderCard("presidency")}

        </div>


        {/* =====================================
            2. BAŞKANLIK → MERKEZ TEŞKİLATI
        ===================================== */}

        <div className="main-vertical-line" />

        <div className="center-column">

          {renderCard("central-organization")}

          <div className="small-vertical-line" />

          {renderCard("institution-president")}

        </div>


        {/* =====================================
            3. KURUM BAŞKANI → DOĞRUDAN BAĞLI
               5 BİRİM
        ===================================== */}

        <div className="president-connection">

          <div className="president-horizontal-line" />

          <div className="president-children">

            {presidentChildren.map((id) => (
              <div
                className="president-child"
                key={id}
              >
                {renderCard(id)}
              </div>
            ))}

          </div>

        </div>


        {/* =====================================
            4. BAŞKAN YARDIMCILARI
        ===================================== */}

        <div className="deputies-connection">

          <div className="deputies-vertical-line" />

          <div className="deputies-horizontal-line" />

          <div className="deputies-grid">

            {/* 1. BAŞKAN YARDIMCISI */}

            {deputy1 && (
              <div className="deputy-column">

                {renderCard(deputy1.id)}

                <div className="deputy-small-line" />

                <div className="deputy-children">

                  {deputy1Children.map((child) => (
                    <div
                      className="deputy-child"
                      key={child.id}
                    >
                      {renderCard(child.id)}
                    </div>
                  ))}

                </div>

              </div>
            )}


            {/* 2. BAŞKAN YARDIMCISI */}

            {deputy2 && (
              <div className="deputy-column">

                {renderCard(deputy2.id)}

                <div className="deputy-small-line" />

                <div className="deputy-children">

                  {deputy2Children.map((child) => (
                    <div
                      className="deputy-child"
                      key={child.id}
                    >
                      {renderCard(child.id)}
                    </div>
                  ))}

                </div>

              </div>
            )}


            {/* 3. BAŞKAN YARDIMCISI */}

            {deputy3 && (
              <div className="deputy-column">

                {renderCard(deputy3.id)}

                <div className="deputy-small-line" />

                <div className="deputy-children">

                  {deputy3Children.map((child) => (
                    <div
                      className="deputy-child"
                      key={child.id}
                    >
                      {renderCard(child.id)}
                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =====================================
          BİRİM DETAYI
      ===================================== */}

      {selectedUnit && (
        <div
          id="unit-detail"
          className="unit-detail"
        >

          <div className="unit-detail-header">

            <div>

              <span className="unit-detail-label">
                BİRİM DETAYI
              </span>

              <h2>
                {selectedUnit.name}
              </h2>

            </div>

            <button
              type="button"
              className="close-detail"
              onClick={() =>
                setSelectedUnitId(null)
              }
            >
              ×
            </button>

          </div>


          <div className="unit-detail-content">

            <div className="detail-item">
              <span>Birimi Türü</span>

              <strong>
                {selectedUnit.type}
              </strong>
            </div>


            <div className="detail-item">
              <span>Üst Birim</span>

              <strong>
                {selectedParent
                  ? selectedParent.name
                  : "Üst birim bulunmuyor"}
              </strong>
            </div>


            <div className="detail-item">
              <span>Alt Birim Sayısı</span>

              <strong>
                {selectedChildren.length}
              </strong>
            </div>


            <div className="detail-description">

              <span>Açıklama</span>

              <p>
                {selectedUnit.description ||
                  "Bu birim için açıklama bulunmuyor."}
              </p>

            </div>

          </div>


          {selectedChildren.length > 0 && (
            <div className="sub-units">

              <span>
                Bağlı Birimler
              </span>

              <div className="sub-unit-list">

                {selectedChildren.map((child) => (

                  <button
                    type="button"
                    key={child.id}
                    onClick={() =>
                      handleSelect(child.id)
                    }
                  >
                    {child.name}

                    <span>→</span>

                  </button>

                ))}

              </div>

            </div>
          )}

        </div>
      )}

    </>
  )
}