
type SidebarProps = {
  activePage: string
  onNavigate: (page: string) => void
}

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const menuItems = [
    {
      name: "Ana Sayfa",
      icon: "⌂",
    },
    {
      name: "Kurumsal Yapı",
      icon: "▦",
    },
    {
      name: "Haberler",
      icon: "▤",
    },
    {
      name: "Duyurular",
      icon: "!",
    },
    {
      name: "Arşiv",
      icon: "□",
    },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">SGK</div>

        <div className="brand-text">
          <strong>Kurumsal Bilgi</strong>
          <span>Sistemi</span>
        </div>
      </div>

      <div className="sidebar-divider" />

      <nav>
        <p className="menu-label">MENÜ</p>

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`menu-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => onNavigate(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>SGK</span>
        <p>Kurumsal Bilgi Sistemi</p>
      </div>
    </aside>
  )
}

export default Sidebar

