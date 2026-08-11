import { useState } from "react"
import { organizationUnits } from "../data/organization"

export function OrganizationTree() {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(
    null
  )

  const rootUnits = organizationUnits.filter(
    (unit) => unit.parentId === null
  )

  const getChildren = (parentId: string) => {
    return organizationUnits.filter(
      (unit) => unit.parentId === parentId
    )
  }

  const selectedUnit = organizationUnits.find(
    (unit) => unit.id === selectedUnitId
  )

  const selectedParent = selectedUnit?.parentId
    ? organizationUnits.find(
        (unit) => unit.id === selectedUnit.parentId
      )
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

  const renderUnit = (unitId: string) => {
    const unit = organizationUnits.find(
      (item) => item.id === unitId
    )

    if (!unit) return null

    const children = getChildren(unit.id)

    const isSelected = selectedUnitId === unit.id

    return (
      <div className="tree-node" key={unit.id}>
        <button
          type="button"
          className={`tree-card ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => handleSelect(unit.id)}
        >
          <span className="unit-type">
            {unit.type}
          </span>

          <h3>{unit.name}</h3>

          {unit.description && (
            <p>{unit.description}</p>
          )}

          <span className="tree-card-action">
            Detayları Gör →
          </span>
        </button>

        {children.length > 0 && (
          <div className="tree-children">
            {children.map((child) =>
              renderUnit(child.id)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="organization-tree">
        {rootUnits.map((unit) =>
          renderUnit(unit.id)
        )}
      </div>

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

              <h2>{selectedUnit.name}</h2>
            </div>

            <button
              type="button"
              className="close-detail"
              onClick={() => setSelectedUnitId(null)}
            >
              ×
            </button>
          </div>

          <div className="unit-detail-content">
            <div className="detail-item">
              <span>Birim Türü</span>

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
              <span>Bağlı Birimler</span>

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