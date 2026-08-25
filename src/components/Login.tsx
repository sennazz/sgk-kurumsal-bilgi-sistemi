import { useState } from "react"

type LoginProps = {
  onLogin: () => void
}

type RegisteredUser = {
  fullName: string
  username: string
  email: string
  password: string
}

function Login({ onLogin }: LoginProps) {

  const [page, setPage] = useState<"login" | "register" | "forgot">("login")

  // GİRİŞ
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // YENİ KULLANICI
  const [registerFullName, setRegisterFullName] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerPasswordAgain, setRegisterPasswordAgain] = useState("")

  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showRegisterPasswordAgain, setShowRegisterPasswordAgain] = useState(false)

  const [error, setError] = useState("")
  const [message, setMessage] = useState("")


  // =========================================
  // GİRİŞ
  // =========================================

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    // Varsayılan demo hesabı
    if (
      username === "admin" &&
      password === "sgk2026"
    ) {

      setError("")

      if (rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          username
        )
      } else {
        localStorage.removeItem("rememberedUser")
      }

      onLogin()
      return
    }

    // Kayıtlı kullanıcıları kontrol et
    const storedUsers = localStorage.getItem("registeredUsers")

    if (storedUsers) {

      const users: RegisteredUser[] =
        JSON.parse(storedUsers)

      const user = users.find(
        (registeredUser) =>
          registeredUser.username === username &&
          registeredUser.password === password
      )

      if (user) {

        setError("")

        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            username
          )
        } else {
          localStorage.removeItem("rememberedUser")
        }

        onLogin()
        return
      }
    }

    setError(
      "Kullanıcı adı veya şifre hatalı."
    )
  }


  // =========================================
  // ŞİFRE KONTROLLERİ
  // =========================================

  const passwordRequirements = {
    minLength: registerPassword.length >= 8,
    uppercase: /[A-Z]/.test(registerPassword),
    lowercase: /[a-z]/.test(registerPassword),
    number: /[0-9]/.test(registerPassword)
  }

  const isPasswordValid =
    passwordRequirements.minLength &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number

  const passwordsMatch =
    registerPassword.length > 0 &&
    registerPassword === registerPasswordAgain


  // =========================================
  // YENİ KULLANICI
  // =========================================
const handleRegister = (
  event: React.FormEvent<HTMLFormElement>
) => {

  event.preventDefault()

  setMessage("")
  setError("")

  if (
    !registerFullName.trim() ||
    !registerUsername.trim() ||
    !registerEmail.trim()
  ) {
    setError("Lütfen tüm alanları doldurun.")
    return
  }

  if (!isPasswordValid) {
    setError(
      "Lütfen şifre gereksinimlerini karşılayan yeni bir şifre oluşturun."
    )
    return
  }

  if (!passwordsMatch) {
    setError(
      "Şifreler eşleşmiyor. Lütfen tekrar kontrol edin."
    )
    return
  }

  const storedUsers =
    localStorage.getItem("registeredUsers")

  const users: RegisteredUser[] =
    storedUsers
      ? JSON.parse(storedUsers)
      : []

  const usernameExists = users.some(
    (user) =>
      user.username.toLowerCase() ===
      registerUsername.trim().toLowerCase()
  )

  if (
    registerUsername.trim().toLowerCase() === "admin" ||
    usernameExists
  ) {
    setError(
      "Bu kullanıcı adı zaten kullanılıyor."
    )
    return
  }

  const newUser: RegisteredUser = {
    fullName: registerFullName.trim(),
    username: registerUsername.trim(),
    email: registerEmail.trim(),
    password: registerPassword
  }

  const updatedUsers = [
    ...users,
    newUser
  ]

  localStorage.setItem(
    "registeredUsers",
    JSON.stringify(updatedUsers)
  )

  // Kullanıcı adı login ekranına aktarılır
  setUsername(registerUsername.trim())

  // Formu temizle
  setRegisterFullName("")
  setRegisterUsername("")
  setRegisterEmail("")
  setRegisterPassword("")
  setRegisterPasswordAgain("")

  setMessage(
    "Kullanıcı kaydı başarıyla oluşturuldu."
  )

  setTimeout(() => {
    setPage("login")
    setMessage("")
  }, 1200)

}

  // =========================================
  // ŞİFRE SIFIRLAMA
  // =========================================

  const handleForgotPassword = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    setMessage(
      "Şifre yenileme bağlantısı e-posta adresinize gönderildi."
    )
  }


  // =========================================
  // GİRİŞ EKRANI
  // =========================================

  if (page === "login") {

    return (

      <div className="login-page">

        <div className="login-card">

          <div className="login-brand">

            <div className="login-logo">
              KBS
            </div>

            <span>
              KURUMSAL BİLGİ SİSTEMİ
            </span>

          </div>


          <div className="login-header">

            <h1>
              Hoş Geldiniz
            </h1>

            <p>
              Sisteme devam etmek için kullanıcı
              bilgilerinizle giriş yapın.
            </p>

          </div>


          <form
            onSubmit={handleLogin}
            className="login-form"
          >

            <div className="login-field">

              <label>
                Kullanıcı Adı
              </label>

              <input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                autoComplete="username"
              />

            </div>


            <div className="login-field">

              <label>
                Şifre
              </label>

              <div className="password-input-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="show-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  title={
                    showPassword
                      ? "Şifreyi gizle"
                      : "Şifreyi göster"
                  }
                >
                  {showPassword
                    ? "👁️"
                    : "👁️‍🗨️"}
                </button>

              </div>

            </div>


            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                />

                <span>
                  Beni Hatırla
                </span>

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() => {

                  setPage("forgot")
                  setError("")
                  setMessage("")

                }}
              >
                Şifremi Unuttum
              </button>

            </div>


            {error && (

              <div className="login-error">
                {error}
              </div>

            )}


            <button
              type="submit"
              className="login-button"
            >
              Giriş Yap
            </button>

          </form>


          <div className="login-register">

            <span>
              Sistemde hesabınız yok mu?
            </span>

            <button
              type="button"
              onClick={() => {

                setPage("register")
                setError("")
                setMessage("")

                setRegisterFullName("")
                setRegisterUsername("")
                setRegisterEmail("")
                setRegisterPassword("")
                setRegisterPasswordAgain("")

              }}
            >
              Yeni Kullanıcı Oluştur
            </button>

          </div>


          <div className="login-footer">
            Sosyal Güvenlik Kurumu
          </div>

        </div>

      </div>

    )
  }


  // =========================================
  // YENİ KULLANICI EKRANI
  // =========================================

  if (page === "register") {

    return (

      <div className="login-page">

        <div className="login-card">

          <div className="login-brand">

            <div className="login-logo">
              KBS
            </div>

            <span>
              KURUMSAL BİLGİ SİSTEMİ
            </span>

          </div>


          <div className="login-header">

            <h1>
              Yeni Kullanıcı
            </h1>

            <p>
              Kurumsal Bilgi Sistemi için yeni
              kullanıcı hesabı oluşturun.
            </p>

          </div>


          <form
            onSubmit={handleRegister}
            className="login-form"
          >

            <div className="login-field">

              <label>
                Ad Soyad
              </label>

              <input
                type="text"
                placeholder="Ad ve soyadınızı girin"
                value={registerFullName}
                onChange={(event) =>
                  setRegisterFullName(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="login-field">

              <label>
                Kullanıcı Adı
              </label>

              <input
                type="text"
                placeholder="Yeni kullanıcı adı"
                value={registerUsername}
                onChange={(event) =>
                  setRegisterUsername(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="login-field">

              <label>
                E-posta
              </label>

              <input
                type="email"
                placeholder="E-posta adresinizi girin"
                value={registerEmail}
                onChange={(event) =>
                  setRegisterEmail(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="login-field">

              <label>
                Şifre
              </label>

              <div className="password-input-wrapper">

                <input
                  type={
                    showRegisterPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Yeni şifrenizi oluşturun"
                  value={registerPassword}
                  onChange={(event) =>
                    setRegisterPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="show-password-toggle"
                  onClick={() =>
                    setShowRegisterPassword(
                      !showRegisterPassword
                    )
                  }
                  title={
                    showRegisterPassword
                      ? "Şifreyi gizle"
                      : "Şifreyi göster"
                  }
                >
                  {showRegisterPassword
                    ? "👁️"
                    : "👁️‍🗨️"}
                </button>

              </div>


              <div className="password-requirements">

                <span
                  className={
                    passwordRequirements.minLength
                      ? "valid"
                      : ""
                  }
                >
                  {passwordRequirements.minLength
                    ? "✓"
                    : "•"}{" "}
                  En az 8 karakter
                </span>

                <span
                  className={
                    passwordRequirements.uppercase
                      ? "valid"
                      : ""
                  }
                >
                  {passwordRequirements.uppercase
                    ? "✓"
                    : "•"}{" "}
                  En az 1 büyük harf
                </span>

                <span
                  className={
                    passwordRequirements.lowercase
                      ? "valid"
                      : ""
                  }
                >
                  {passwordRequirements.lowercase
                    ? "✓"
                    : "•"}{" "}
                  En az 1 küçük harf
                </span>

                <span
                  className={
                    passwordRequirements.number
                      ? "valid"
                      : ""
                  }
                >
                  {passwordRequirements.number
                    ? "✓"
                    : "•"}{" "}
                  En az 1 rakam
                </span>

              </div>

            </div>


            <div className="login-field">

              <label>
                Şifre Tekrar
              </label>

              <div className="password-input-wrapper">

                <input
                  type={
                    showRegisterPasswordAgain
                      ? "text"
                      : "password"
                  }
                  placeholder="Şifrenizi tekrar girin"
                  value={registerPasswordAgain}
                  onChange={(event) =>
                    setRegisterPasswordAgain(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="show-password-toggle"
                  onClick={() =>
                    setShowRegisterPasswordAgain(
                      !showRegisterPasswordAgain
                    )
                  }
                  title={
                    showRegisterPasswordAgain
                      ? "Şifreyi gizle"
                      : "Şifreyi göster"
                  }
                >
                  {showRegisterPasswordAgain
                    ? "👁️"
                    : "👁️‍🗨️"}
                </button>

              </div>


              {registerPasswordAgain.length > 0 && (

                <div
                  className={
                    passwordsMatch
                      ? "password-match valid"
                      : "password-match"
                  }
                >

                  {passwordsMatch
                    ? "✓ Şifreler eşleşiyor."
                    : "✕ Şifreler eşleşmiyor."}

                </div>

              )}

            </div>


            {error && (

              <div className="login-error">
                {error}
              </div>

            )}


            {message && (

              <div className="login-success">
                {message}
              </div>

            )}


            <button
              type="submit"
              className="login-button"
            >
              Kullanıcı Oluştur
            </button>

          </form>


          <div className="login-back">

            <button
              type="button"
              onClick={() => {

                setPage("login")
                setMessage("")
                setError("")

              }}
            >
              ← Giriş ekranına Dön
            </button>

          </div>


          <div className="login-footer">
            Sosyal Güvenlik Kurumu
          </div>

        </div>

      </div>

    )
  }


  // =========================================
  // ŞİFREMİ UNUTTUM EKRANI
  // =========================================

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">

          <div className="login-logo">
            KBS
          </div>

          <span>
            KURUMSAL BİLGİ SİSTEMİ
          </span>

        </div>


        <div className="login-header">

          <h1>
            Şifremi Unuttum
          </h1>

          <p>
            Şifrenizi yenilemek için kayıtlı
            e-posta adresinizi girin.
          </p>

        </div>


        <form
          onSubmit={handleForgotPassword}
          className="login-form"
        >

          <div className="login-field">

            <label>
              E-posta
            </label>

            <input
              type="email"
              placeholder="E-posta adresinizi girin"
            />

          </div>


          {message && (

            <div className="login-success">
              {message}
            </div>

          )}


          <button
            type="submit"
            className="login-button"
          >
            Şifre Yenileme Bağlantısı Gönder
          </button>

        </form>


        <div className="login-back">

          <button
            type="button"
            onClick={() => {

              setPage("login")
              setMessage("")
              setError("")

            }}
          >
            ← Giriş ekranına Dön
          </button>

        </div>


        <div className="login-footer">
          Sosyal Güvenlik Kurumu
        </div>

      </div>

    </div>

  )
}

export default Login