export type OrganizationUnit = {
    id: string
    name: string
    type:
      | "Başkanlık"
      | "Başkan Yardımcılığı"
      | "Genel Müdürlük"
      | "Daire Başkanlığı"
      | "Müşavirlik"
    parentId: string | null
    description?: string
  }
  
  export const organizationUnits: OrganizationUnit[] = [
    {
      id: "presidency",
      name: "Kurum Başkanı",
      type: "Başkanlık",
      parentId: null,
      description: "SGK'nın üst yönetim birimi.",
    },
  
    {
      id: "presidency-deputy-1",
      name: "Başkan Yardımcılığı",
      type: "Başkan Yardımcılığı",
      parentId: "presidency",
      description: "Başkanlık tarafından verilen görevlerin koordinasyonunu sağlar.",
    },
  
    {
      id: "it-department",
      name: "Bilgi Teknolojileri Daire Başkanlığı",
      type: "Daire Başkanlığı",
      parentId: "presidency-deputy-1",
      description: "Kurumun bilgi teknolojileri ve bilişim sistemleri süreçlerini yürütür.",
    },
  
    {
      id: "hr-department",
      name: "İnsan Kaynakları Daire Başkanlığı",
      type: "Daire Başkanlığı",
      parentId: "presidency-deputy-1",
      description: "Personel ve insan kaynakları süreçlerinin yürütülmesini sağlar.",
    },
  
    {
      id: "support-department",
      name: "Destek Hizmetleri Daire Başkanlığı",
      type: "Daire Başkanlığı",
      parentId: "presidency-deputy-1",
      description: "Kurumun idari ve destek hizmetlerini yürütür.",
    },
  
    {
      id: "legal-advisor",
      name: "Hukuk Müşavirliği",
      type: "Müşavirlik",
      parentId: "presidency",
      description: "Kurumun hukuki süreçlerine ilişkin danışmanlık hizmeti sağlar.",
    },
  ]