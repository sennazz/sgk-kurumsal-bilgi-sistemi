type SidebarProps = {
  activePage: string
  onNavigate: (page: string) => void
  onLogout: () => void
}

function Sidebar({
  activePage,
  onNavigate,
  onLogout,
}: SidebarProps) {
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
  name: "Haber Analizi",
  icon: "▥",
},
{
  name: "Sıkça Sorulan Sorular",
  icon: "?",
},
{
  name: "Duyurular",
  icon: "!",
},
    {
      name: "Kaydettiklerim",
      icon: "☆",
    },
    {
      name: "Arşiv",
      icon: "□",
    },
  ]

  return (
    <aside className="sidebar">

      
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
            <span className="menu-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* ÇIKIŞ ALANI */}

      <div className="logout-area">

        <button
          className="logout-button"
          onClick={onLogout}
        >
          <span className="logout-icon">↪</span>
          <span>Çıkış Yap</span>
        </button>

      </div>

      <div className="sidebar-footer">
        <span>SGK</span>
        <p>Kurumsal Bilgi Sistemi</p>
      </div>

    </aside>
  )
}

export default Sidebar