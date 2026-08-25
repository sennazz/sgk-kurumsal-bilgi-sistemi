export type OrganizationUnit = {
  id: string
  name: string
  type:
    | "Üst Kurul"
    | "Başkanlık"
    | "Merkez Teşkilatı"
    | "Başkan Yardımcılığı"
    | "Genel Müdürlük"
    | "Daire Başkanlığı"
    | "Müşavirlik"
    | "İç Denetim"
    | "İl Müdürlüğü"
  parentId: string | null
  description?: string
}

export const organizationUnits: OrganizationUnit[] = [

  // =========================
  // ÜST YÖNETİM
  // =========================

  {
    id: "general-assembly",
    name: "Genel Kurul",
    type: "Üst Kurul",
    parentId: null,
    description: "Kurumun en üst karar ve yönetim organlarından biridir.",
  },

  {
    id: "board",
    name: "Yönetim Kurulu",
    type: "Üst Kurul",
    parentId: "general-assembly",
    description: "Kurumun yönetim ve karar süreçlerini yürütür.",
  },

  {
    id: "presidency",
    name: "Başkanlık",
    type: "Başkanlık",
    parentId: "board",
    description: "Sosyal Güvenlik Kurumunun üst yönetim yapısını ifade eder.",
  },

  // =========================
  // MERKEZ TEŞKİLATI
  // =========================

  {
    id: "central-organization",
    name: "Merkez Teşkilatı",
    type: "Merkez Teşkilatı",
    parentId: "presidency",
    description: "Kurumun merkez teşkilatını oluşturan yönetim birimleridir.",
  },

  {
    id: "institution-president",
    name: "Kurum Başkanı",
    type: "Başkanlık",
    parentId: "central-organization",
    description: "Sosyal Güvenlik Kurumunun en üst yöneticisidir.",
  },

  // =========================
  // KURUM BAŞKANINA BAĞLI BİRİMLER
  // =========================

  {
    id: "guidance-inspection",
    name: "Rehberlik ve Teftiş Başkanlığı",
    type: "Başkanlık",
    parentId: "institution-president",
    description: "Kurumun rehberlik, inceleme ve teftiş faaliyetlerini yürütür.",
  },

  {
    id: "personnel-department",
    name: "Personel Daire Başkanlığı",
    type: "Daire Başkanlığı",
    parentId: "institution-president",
    description: "Kurumun personel ve insan kaynakları süreçlerini yürütür.",
  },

  {
    id: "legal-advisor",
    name: "Hukuk Müşavirliği",
    type: "Müşavirlik",
    parentId: "institution-president",
    description: "Kurumun hukuki süreçlerine ilişkin danışmanlık hizmeti sağlar.",
  },

  {
    id: "press-public-relations",
    name: "Basın ve Halkla İlişkiler Müşavirliği",
    type: "Müşavirlik",
    parentId: "institution-president",
    description: "Kurumun basın, iletişim ve halkla ilişkiler faaliyetlerini yürütür.",
  },

  {
    id: "internal-audit",
    name: "İç Denetim Birimi Başkanlığı",
    type: "İç Denetim",
    parentId: "institution-president",
    description: "Kurumun iç denetim faaliyetlerini yürütür.",
  },

  // =========================
  // 1. BAŞKAN YARDIMCISI
  // =========================

  {
    id: "deputy-president-1",
    name: "Başkan Yardımcısı",
    type: "Başkan Yardımcılığı",
    parentId: "institution-president",
    description: "Başkanlık tarafından verilen görevlerin koordinasyonunu sağlar.",
  },

  {
    id: "retirement-services",
    name: "Emeklilik Hizmetleri Genel Müdürlüğü",
    type: "Genel Müdürlük",
    parentId: "deputy-president-1",
    description: "Emeklilik hizmetlerine ilişkin süreçleri yürütür.",
  },

  {
    id: "strategy-development",
    name: "Strateji Geliştirme Başkanlığı",
    type: "Başkanlık",
    parentId: "deputy-president-1",
    description: "Kurumun stratejik planlama ve geliştirme faaliyetlerini yürütür.",
  },

  {
    id: "actuary-fund-management",
    name: "Aktüerya ve Fon Yönetimi Daire Başkanlığı",
    type: "Daire Başkanlığı",
    parentId: "deputy-president-1",
    description: "Aktüeryal çalışmalar ve fon yönetimi süreçlerini yürütür.",
  },

  {
    id: "construction-real-estate",
    name: "İnşaat ve Emlak Daire Başkanlığı",
    type: "Daire Başkanlığı",
    parentId: "deputy-president-1",
    description: "Kurumun taşınmaz, inşaat ve emlak işlemlerini yürütür.",
  },

  {
    id: "education-research",
    name: "Eğitim, Araştırma ve Geliştirme Merkezi Başkanlığı",
    type: "Başkanlık",
    parentId: "deputy-president-1",
    description: "Eğitim, araştırma ve geliştirme faaliyetlerini yürütür.",
  },

  {
    id: "provincial-directorates-1",
    name: "İl Müdürlükleri (Konusuna Göre)",
    type: "İl Müdürlüğü",
    parentId: "deputy-president-1",
    description: "İllerde yürütülen sosyal güvenlik hizmetlerini gerçekleştirir.",
  },

  // =========================
  // 2. BAŞKAN YARDIMCISI
  // =========================

  {
    id: "deputy-president-2",
    name: "Başkan Yardımcısı",
    type: "Başkan Yardımcılığı",
    parentId: "institution-president",
    description: "Başkanlık tarafından verilen görevlerin koordinasyonunu sağlar.",
  },

  // =========================
  // 3. BAŞKAN YARDIMCISI
  // =========================

  {
    id: "deputy-president-3",
    name: "Başkan Yardımcısı",
    type: "Başkan Yardımcılığı",
    parentId: "institution-president",
    description: "Başkanlık tarafından verilen görevlerin koordinasyonunu sağlar.",
  },

  {
    id: "insurance-premiums",
    name: "Sigorta Primleri Genel Müdürlüğü",
    type: "Genel Müdürlük",
    parentId: "deputy-president-3",
    description: "Sigorta primleri ve ilgili sosyal güvenlik süreçlerini yürütür.",
  },

  {
    id: "information-technologies",
    name: "Bilgi Teknolojileri Genel Müdürlüğü",
    type: "Genel Müdürlük",
    parentId: "deputy-president-3",
    description: "Kurumun bilişim teknolojileri ve bilgi sistemleri süreçlerini yürütür.",
  },

  {
    id: "general-health-insurance",
    name: "Genel Sağlık Sigortası Genel Müdürlüğü",
    type: "Genel Müdürlük",
    parentId: "deputy-president-3",
    description: "Genel sağlık sigortası hizmetlerine ilişkin süreçleri yürütür.",
  },

  {
    id: "support-services",
    name: "Destek Hizmetleri Daire Başkanlığı",
    type: "Daire Başkanlığı",
    parentId: "deputy-president-3",
    description: "Kurumun idari, lojistik ve destek hizmetlerini yürütür.",
  },

  {
    id: "provincial-directorates-3",
    name: "İl Müdürlükleri (Konusuna Göre)",
    type: "İl Müdürlüğü",
    parentId: "deputy-president-3",
    description: "İllerde yürütülen sosyal güvenlik hizmetlerini gerçekleştirir.",
  },
]