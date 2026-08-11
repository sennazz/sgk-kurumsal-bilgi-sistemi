
function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">
          <h1>SGK Kurumsal Bilgi Sistemi</h1>
          <p>Sosyal Güvenlik Kurumu</p>
        </div>
      </div>

      <div className="header-right">
        <span className="system-status">
          Sistem Aktif
        </span>

        <div className="user-info">
          <div className="user-avatar">S</div>

          <div>
            <strong>Stajyer</strong>
            <span>Kurumsal Kullanıcı</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
