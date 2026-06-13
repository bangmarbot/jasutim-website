export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export const siteConfig = {
  name: "Yayasan JASUTIM",
  shortName: "JASUTIM",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://jasutim.aidia.uk",
  email: "yayasanjasutim@gmail.com",
  phone: "+62 838-7707-6054",
  location: "Jatirahayu, Bekasi, Indonesia",
  legalShort: "Badan hukum — SK Kemenkumham RI No. AHU-0030240.AH.01.04.Tahun 2025",
  socials: {
    instagram: "https://www.instagram.com/jasutim/",
    whatsapp: "https://wa.me/6283877076054",
  },
};

export const navigation = {
  id: [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Program", href: "/program" },
    { label: "Dampak", href: "/dampak" },
    { label: "Kontak", href: "/kontak" },
  ],
  en: [
    { label: "Home", href: "/" },
    { label: "About", href: "/tentang" },
    { label: "Programs", href: "/program" },
    { label: "Impact", href: "/dampak" },
    { label: "Contact", href: "/kontak" },
  ],
} as const;

export const content = {
  id: {
    localeLabel: "ID",
    meta: {
      title: "Yayasan JASUTIM — Dari Sampah Menjadi Dampak",
      description:
        "Yayasan Jalandra Suwara Timu membangun ekonomi sirkular berbasis komunitas melalui bank sampah, edukasi lingkungan, dan pemberdayaan warga di Bekasi.",
    },
    cta: {
      primary: "Kolaborasi dengan Kami",
      secondary: "Lihat Dampak Kami",
    },
    hero: {
      eyebrow: "Ekonomi sirkular · Pemberdayaan komunitas · Edukasi lingkungan",
      title: "Dari sampah menjadi dampak yang nyata untuk komunitas.",
      description:
        "Yayasan JASUTIM adalah yayasan berbasis komunitas di Bekasi yang mengubah pengelolaan sampah menjadi gerakan bersama — menghadirkan lingkungan yang lebih bersih, nilai ekonomi untuk warga, dan ruang tumbuh bagi perempuan serta keluarga.",
      stats: [
        { value: "200+", label: "rumah tangga terjangkau" },
        { value: "3 ton/bulan", label: "volume sampah terkelola" },
        { value: "4 tahun", label: "jejak pengabdian komunitas" },
      ],
      spotlight: {
        eyebrow: "Inisiatif Inovasi 2026",
        title: "Mengubah minyak jelantah menjadi eco-candle yang bernilai.",
        description:
          "JASUTIM mengembangkan inisiatif yang mengolah minyak jelantah rumah tangga menjadi eco-candle — mengurangi polusi, membuka peluang kerja bagi perempuan, dan menambah nilai ekonomi dari limbah.",
        metricOneLabel: "Nilai tambah dari jelantah",
        metricOneValue: "hingga 33×",
        metricTwoLabel: "Peluang kerja perempuan",
        metricTwoValue: "3–5 orang",
      },
    },
    problem: {
      title: "Kenapa isu ini penting?",
      items: [
        "Minyak jelantah dan sampah rumah tangga sering berakhir di saluran air atau dibuang tanpa proses yang tepat.",
        "Banyak keluarga belum melihat sampah sebagai aset ekonomi dan alat belajar perubahan perilaku.",
        "Komunitas lokal membutuhkan model yang sederhana, terukur, dan bisa direplikasi untuk mengelola sampah dari sumbernya.",
      ],
    },
    impact: {
      title: "Jejak dampak yang sudah berjalan",
      cards: [
        { title: "Bank Sampah Komunitas", body: "Mendorong kebiasaan memilah, menabung sampah, dan membangun transparansi hasil penimbangan bagi warga." },
        { title: "Pemberdayaan Perempuan", body: "Membuka peluang keterampilan dan pekerjaan produktif berbasis ekonomi sirkular untuk ibu-ibu di lingkungan sekitar." },
        { title: "Edukasi Berkelanjutan", body: "Mengubah isu lingkungan menjadi percakapan praktis yang dekat dengan keseharian keluarga dan anak-anak." },
      ],
    },
    programs: {
      title: "Program utama JASUTIM",
      items: [
        {
          name: "Bank Sampah JASUTIM",
          description: "Program inti pengumpulan, pemilahan, penimbangan, dan pencatatan sampah warga secara berkala.",
        },
        {
          name: "Eco-Candle dari Jelantah",
          description: "Inisiatif peningkatan nilai minyak jelantah menjadi produk eco-candle yang estetik dan punya daya jual.",
        },
        {
          name: "Pelatihan Komunitas",
          description: "Workshop pengelolaan sampah, ekonomi sirkular, dan pembentukan kebiasaan lingkungan di tingkat warga.",
        },
      ],
    },
    timeline: {
      title: "Perjalanan singkat JASUTIM",
      items: [
        { year: "2022", text: "Bank sampah komunitas mulai berjalan di lingkungan warga." },
        { year: "2022–2025", text: "Menjangkau 200+ rumah tangga dan mengelola sekitar 3 ton sampah per bulan." },
        { year: "Des 2025", text: "JASUTIM resmi diformalkan sebagai yayasan berbadan hukum." },
        { year: "2026", text: "Memasuki fase scale-up: produk turunan, kemitraan strategis, dan penguatan kelembagaan." },
      ],
    },
    uvp: {
      title: "Yang membuat JASUTIM berbeda",
      tagline: "Kami menggerakkan ton, bukan sekadar gerakan.",
      points: [
        { title: "Substansi nyata", text: "3 ton sampah setiap bulan benar-benar terkelola — bukan sekadar kampanye." },
        { title: "Institusi matang", text: "Yayasan berbadan hukum dengan roadmap (RPJM) lima tahun yang terukur." },
        { title: "Hilirisasi bertahap", text: "Dari pilah–timbang menuju produk turunan bernilai hingga inovasi teknologi sirkular." },
      ],
    },
    theoryOfChange: {
      title: "Bagaimana kami menciptakan perubahan",
      steps: [
        { label: "Tantangan", text: "Sampah rumah tangga dan minyak jelantah berakhir di saluran air atau TPA; warga belum melihat sampah sebagai aset; belum ada model pengelolaan dari sumber yang terukur dan bisa direplikasi." },
        { label: "Intervensi", text: "Bank sampah komunitas (pilah–timbang–catat), edukasi perubahan perilaku, hilirisasi selektif seperti eco-candle dari jelantah, serta pendampingan replikasi ke ranting binaan." },
        { label: "Hasil langsung", text: "Rumah tangga memilah dan menabung sampah, produk turunan bernilai jual, kader serta ranting terlatih, dan SOP yang terstandar." },
        { label: "Dampak 2030", text: "Menjadi tulang punggung ekosistem ekonomi sirkular berbasis komunitas — lingkungan lebih bersih, ekonomi warga tumbuh, dan model yang dapat direplikasi hingga skala nasional." },
      ],
    },
    org: {
      title: "Struktur organisasi",
      intro: "Susunan organ resmi sesuai pengesahan Kementerian Hukum Republik Indonesia.",
      members: [
        { name: "Muhamad Muslih", role: "Ketua Pembina", organ: "Pembina" },
        { name: "Dian Rivian Kustia, S.E.", role: "Ketua Pengurus", organ: "Pengurus" },
        { name: "A. David Louhenapessy", role: "Sekretaris", organ: "Pengurus" },
        { name: "Agah Januar Pribadi", role: "Bendahara", organ: "Pengurus" },
        { name: "Rezha Octaryanto, S.H., M.H.", role: "Ketua Pengawas", organ: "Pengawas" },
      ],
    },
    legal: {
      title: "Legalitas & badan hukum",
      intro: "Yayasan Jalandra Suwara Timu adalah badan hukum resmi yang disahkan oleh Kementerian Hukum Republik Indonesia.",
      items: [
        "SK Menteri Hukum RI No. AHU-0030240.AH.01.04.Tahun 2025 (5 Desember 2025)",
        "Akta Pendirian No. 02 — Notaris Annisa Nurul Hikmah, S.H., M.Kn.",
        "Berkedudukan di Kota Bekasi, Jawa Barat",
      ],
    },
    collaboration: {
      title: "Kenapa bermitra dengan kami?",
      points: [
        "Akar komunitas yang kuat dan dampak yang nyata di lapangan.",
        "Model program yang sederhana, transparan, dan bisa dikembangkan bertahap.",
        "Potensi kolaborasi CSR, grant, edukasi, kampanye, dan product incubation berbasis circular economy.",
      ],
    },
    contact: {
      title: "Mari bangun kolaborasi yang bermanfaat",
      description:
        "Kami terbuka untuk kolaborasi program, grant, dukungan CSR, workshop komunitas, maupun pengembangan produk turunan ekonomi sirkular.",
      officeHours: "Senin–Sabtu · 08.00–17.00 WIB",
    },
    footer: {
      tagline: "Gerakan komunitas untuk lingkungan yang lebih bersih, berdaya, dan berkelanjutan.",
    },
  },
  en: {
    localeLabel: "EN",
    meta: {
      title: "Yayasan JASUTIM — Turning Waste into Community Impact",
      description:
        "Yayasan Jalandra Suwara Timu advances circular economy through a community waste bank, environmental education, and grassroots empowerment in Bekasi.",
    },
    cta: {
      primary: "Partner with Us",
      secondary: "See Our Impact",
    },
    hero: {
      eyebrow: "Circular economy · Community empowerment · Environmental education",
      title: "Turning waste into meaningful impact for the community.",
      description:
        "Yayasan JASUTIM is a community-based foundation in Bekasi that transforms waste management into a collective movement—creating cleaner neighborhoods, economic value for families, and growth opportunities for women and local residents.",
      stats: [
        { value: "200+", label: "households reached" },
        { value: "3 tons/month", label: "waste managed" },
        { value: "4 years", label: "of community work" },
      ],
      spotlight: {
        eyebrow: "2026 Innovation Initiative",
        title: "Turning used cooking oil into valuable eco-candles.",
        description:
          "JASUTIM is developing an initiative that turns household used cooking oil into eco-candles—reducing pollution, creating jobs for women, and adding economic value to waste.",
        metricOneLabel: "Value added from used oil",
        metricOneValue: "up to 33×",
        metricTwoLabel: "Jobs for women",
        metricTwoValue: "3–5 people",
      },
    },
    problem: {
      title: "Why does this matter?",
      items: [
        "Used cooking oil and household waste often end up in waterways or are discarded without proper treatment.",
        "Many families still do not see waste as an economic asset and a tool for behavior change.",
        "Local communities need simple, measurable, and replicable models to manage waste from the source.",
      ],
    },
    impact: {
      title: "Impact already in motion",
      cards: [
        { title: "Community Waste Bank", body: "Encouraging sorting habits, waste savings, and transparent weighing records for residents." },
        { title: "Women Empowerment", body: "Creating productive skills and livelihood opportunities rooted in circular economy." },
        { title: "Sustained Education", body: "Making environmental issues practical and relevant for families and children." },
      ],
    },
    programs: {
      title: "JASUTIM core programs",
      items: [
        {
          name: "JASUTIM Waste Bank",
          description: "A recurring collection, sorting, weighing, and recording program for community household waste.",
        },
        {
          name: "Eco-Candle from Used Cooking Oil",
          description: "An upcycling initiative that turns used cooking oil into aesthetic, marketable eco-candles.",
        },
        {
          name: "Community Training",
          description: "Workshops on waste management, circular economy, and practical environmental habits.",
        },
      ],
    },
    timeline: {
      title: "JASUTIM journey",
      items: [
        { year: "2022", text: "The community waste bank started operating locally." },
        { year: "2022–2025", text: "Reached 200+ households and managed around 3 tons of waste per month." },
        { year: "Dec 2025", text: "JASUTIM was formally established as a legal foundation." },
        { year: "2026", text: "Entering a scale-up phase: value-added products, strategic partnerships, and institutional strengthening." },
      ],
    },
    uvp: {
      title: "What makes JASUTIM different",
      tagline: "We move tons, not just sentiment.",
      points: [
        { title: "Real substance", text: "3 tons of waste genuinely managed every month — not just a campaign." },
        { title: "Mature institution", text: "A legally established foundation with a measurable five-year roadmap (RPJM)." },
        { title: "Staged downstreaming", text: "From sorting and weighing to value-added products and circular technology innovation." },
      ],
    },
    theoryOfChange: {
      title: "How we create change",
      steps: [
        { label: "Challenge", text: "Household waste and used cooking oil end up in waterways or landfills; residents don’t yet see waste as an asset; there is no measurable, replicable model to manage waste at the source." },
        { label: "Intervention", text: "A community waste bank (sort–weigh–record), behavior-change education, selective downstreaming such as eco-candles from used cooking oil, and replication support for affiliated units." },
        { label: "Direct results", text: "Households sort and save waste, value-added products emerge, cadres and units are trained, and SOPs become standardized." },
        { label: "2030 impact", text: "Becoming the backbone of a community-based circular economy — cleaner neighborhoods, growing local economies, and a model replicable at national scale." },
      ],
    },
    org: {
      title: "Organizational structure",
      intro: "Official governing organs as ratified by the Ministry of Law of the Republic of Indonesia.",
      members: [
        { name: "Muhamad Muslih", role: "Chair of Trustees", organ: "Board of Trustees" },
        { name: "Dian Rivian Kustia, S.E.", role: "Chair of Management", organ: "Management" },
        { name: "A. David Louhenapessy", role: "Secretary", organ: "Management" },
        { name: "Agah Januar Pribadi", role: "Treasurer", organ: "Management" },
        { name: "Rezha Octaryanto, S.H., M.H.", role: "Chair of Supervisors", organ: "Supervisory Board" },
      ],
    },
    legal: {
      title: "Legal status",
      intro: "Yayasan Jalandra Suwara Timu is a legally established foundation, ratified by the Ministry of Law of the Republic of Indonesia.",
      items: [
        "Ministerial Decree No. AHU-0030240.AH.01.04.Tahun 2025 (5 December 2025)",
        "Deed of Establishment No. 02 — Notary Annisa Nurul Hikmah, S.H., M.Kn.",
        "Domiciled in Bekasi City, West Java",
      ],
    },
    collaboration: {
      title: "Why partner with us?",
      points: [
        "Strong community roots with tangible, field-level impact.",
        "A practical and transparent model that can grow in stages.",
        "Collaboration potential across CSR, grants, education, campaigns, and circular product incubation.",
      ],
    },
    contact: {
      title: "Let’s build meaningful collaboration",
      description:
        "We are open to program partnerships, grants, CSR support, community workshops, and circular economy product development.",
      officeHours: "Monday–Saturday · 08.00–17.00 WIB",
    },
    footer: {
      tagline: "A community movement for a cleaner, more empowered, and more sustainable future.",
    },
  },
} as const;
