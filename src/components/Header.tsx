import sgkIkon from "../assets/sgk-ikon.svg"

interface HeaderProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  onSearch: () => void
}

function Header({
  searchTerm,
  setSearchTerm,
  onSearch,
}: HeaderProps) {
  return (
    <header className="header">

      <div className="header-left">

        <img
          src={sgkIkon}
          alt="SGK"
          className="sgk-header-icon"
        />

        <div className="header-title">
          <h1>
            SGK Kurumsal Bilgi Sistemi
          </h1>
        </div>

      </div>

      <div className="header-right">

        <div className="search-box">

          <input
            type="text"
            placeholder="Sistemde ara..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch()
              }
            }}
          />

          <button
            type="button"
            onClick={onSearch}
            aria-label="Ara"
          >
            🔍
          </button>

        </div>

        <span className="system-status">
          Sistem Aktif
        </span>

      </div>

    </header>
  )
}

export default Header