import sgkIkon from "../assets/sgk-ikon.svg"

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img
        src={sgkIkon}
        alt="SGK"
        className="sgk-header-icon"
        />

        <div className="header-title">
        
            <h1>SGK Kurumsal Bilgi Sistemi</h1>
  
       
          
        </div>
      </div>

      <div className="header-right">
        <span className="system-status">
          Sistem Aktif
        </span>
      </div>
    </header>
  )
}

export default Header










