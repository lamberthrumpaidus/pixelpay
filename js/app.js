const GAME_DB = {
  ml: {
    name: 'Mobile Legends',
    banner: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    currency: '💎',
    items: [
      { id: 'ml_86', name: '86 💎', price: 19000, label: 'Rp 19.000' },
      { id: 'ml_172', name: '172 💎', price: 38000, label: 'Rp 38.000' },
      { id: 'ml_257', name: '257 💎', price: 57000, label: 'Rp 57.000' },
      { id: 'ml_344', name: '344 💎', price: 76000, label: 'Rp 76.000' },
      { id: 'ml_429', name: '429 💎', price: 95000, label: 'Rp 95.000' },
      { id: 'ml_706', name: '706 💎', price: 155000, label: 'Rp 155.000' }
    ],
    idPlaceholder: 'Masukkan User ID (Server ID)',
    idRegex: /^\d{8,10}\(\d{4}\)$/,
    formatTip: 'Contoh: 12345678(1234)'
  },
  ff: {
    name: 'Free Fire',
    banner: 'linear-gradient(135deg, #b91c1c, #ea580c)',
    currency: '💎',
    items: [
      { id: 'ff_70', name: '70 💎', price: 10000, label: 'Rp 10.000' },
      { id: 'ff_140', name: '140 💎', price: 20000, label: 'Rp 20.000' },
      { id: 'ff_355', name: '355 💎', price: 50000, label: 'Rp 50.000' },
      { id: 'ff_720', name: '720 💎', price: 100000, label: 'Rp 100.000' },
      { id: 'ff_1440', name: '1440 💎', price: 190000, label: 'Rp 190.000' },
      { id: 'ff_2180', name: '2180 💎', price: 280000, label: 'Rp 280.000' }
    ],
    idPlaceholder: 'Masukkan Player ID',
    idRegex: /^\d{8,12}$/,
    formatTip: 'Contoh: 876543210'
  },
  pubg: {
    name: 'PUBG Mobile',
    banner: 'linear-gradient(135deg, #78350f, #ca8a04)',
    currency: 'UC',
    items: [
      { id: 'pubg_60', name: '60 UC', price: 15000, label: 'Rp 15.000' },
      { id: 'pubg_325', name: '325 UC', price: 75000, label: 'Rp 75.000' },
      { id: 'pubg_660', name: '660 UC', price: 150000, label: 'Rp 150.000' },
      { id: 'pubg_1800', name: '1800 UC', price: 375000, label: 'Rp 375.000' },
      { id: 'pubg_3850', name: '3850 UC', price: 750000, label: 'Rp 750.000' },
      { id: 'pubg_8100', name: '8100 UC', price: 1500000, label: 'Rp 1.500.000' }
    ],
    idPlaceholder: 'Masukkan Character ID',
    idRegex: /^\d{7,11}$/,
    formatTip: 'Contoh: 512345678'
  },
  gi: {
    name: 'Genshin Impact',
    banner: 'linear-gradient(135deg, #0f766e, #0d9488)',
    currency: '💎',
    items: [
      { id: 'gi_60', name: '60 Genesis', price: 16000, label: 'Rp 16.000' },
      { id: 'gi_300', name: '300 Genesis', price: 79000, label: 'Rp 79.000' },
      { id: 'gi_980', name: '980 Genesis', price: 249000, label: 'Rp 249.000' },
      { id: 'gi_1980', name: '1980 Genesis', price: 479000, label: 'Rp 479.000' },
      { id: 'gi_3280', name: '3280 Genesis', price: 799000, label: 'Rp 799.000' },
      { id: 'gi_6480', name: '6480 Genesis', price: 1599000, label: 'Rp 1.599.000' }
    ],
    idPlaceholder: 'Masukkan UID (Pilih Server)',
    idRegex: /^\d{9}$/,
    formatTip: 'Contoh: 184758392'
  }
};

const PAYMENT_METHODS = {
  qris: { name: 'QRIS (Gopay, OVO, ShopeePay)', fee: 0, icon: '📱' },
  dana: { name: 'DANA E-Wallet', fee: 500, icon: '👛' },
  va: { name: 'BCA Virtual Account', fee: 2500, icon: '🏦' }
};

let currentLanguage = 'id';
let currentActiveGame = 'ml';
let selectedDiamondObj = null;
let selectedPaymentMethod = 'qris';
let currentVerificationUsername = '';
let isUserVerified = false;
let checkoutTimer = null;
let simulatedTxCount = 10000;

const TRANSLATIONS = {
  id: {
    navFitur: 'Fitur',
    navCaraKerja: 'Cara Kerja',
    navHarga: 'Paket',
    navFaq: 'FAQ',
    navCta: 'Top Up Sekarang',
    heroBadge: '⚡ USP: Top up game otomatis, cepat, dan aman 24/7',
    heroH1Part1: 'Top up game ',
    heroH1Gradient: 'anti ribet',
    heroH1Part2: ',<br>saldo masuk lebih cepat.',
    heroSub: 'PixelPay TopUp membantu gamer membeli diamond, UC, voucher, dan item digital dengan proses otomatis, harga transparan, serta bukti transaksi real-time.',
    heroCta: 'Mulai Top Up',
    heroDemo: 'Lihat Demo',
    proofTx: 'transaksi sukses',
    proofSystem: 'sistem aktif',
    proofProcess: 'estimasi proses',
    phoneDashboard: 'Dashboard TopUp',
    phoneOrderFast: 'Order cepat',
    phoneOrderSub: 'dari satu halaman',
    phoneInputId: 'Masukkan User ID (Server ID)',
    phoneCekId: 'Cek ID',
    phonePaymentTitle: 'Metode Pembayaran',
    phoneTotalPlaceholder: 'Pilih nominal item',
    phoneBayar: 'Bayar Sekarang',
    gateTotalLabel: 'Total Pembayaran',
    gateQrisScan: 'Silakan pindai kode QRIS dengan aplikasi pembayaran Anda.',
    gateVaTitle: 'Nomor Virtual Account BCA',
    gateVaStep: 'Cara Pembayaran:',
    gateVaS1: 'Buka aplikasi m-BCA atau ATM BCA.',
    gateVaS2: 'Pilih menu <b>Transfer ➡️ Virtual Account</b>.',
    gateVaS3: 'Masukkan Nomor VA di atas.',
    gateVaS4: 'Konfirmasi nama tagihan dan klik Bayar.',
    gateVaCopy: 'Salin',
    gateTimer: 'Selesaikan pembayaran dalam',
    gateTimerExpired: '⚠️ Transaksi kedaluwarsa. Silakan coba kembali.',
    gatePaid: 'Saya Sudah Bayar',
    gateProcessing1: '⏳ Mendeteksi sinyal pembayaran...',
    gateProcessing2: '⚡ Mencocokkan mutasi bank partner...',
    gateProcessing3: '✅ Pembayaran terkonfirmasi! Mengirim diamond...',
    gateSuccess: '✓ Pembayaran Diterima!',
    gateConnecting: '⏳ Menghubungkan ke Server...',
    gateVerifying: '⚡ Memverifikasi Pembayaran...',
    gateRedirect: '💳 Mengarahkan ke halaman pembayaran...',
    successTitle: 'Pembayaran Berhasil!',
    successDesc: 'Top up Anda diproses & saldo langsung terkirim otomatis.',
    receiptGame: 'Game',
    receiptId: 'ID Akun',
    receiptItem: 'Item',
    receiptPay: 'Pembayaran',
    receiptTotal: 'Total Harga',
    receiptTxId: 'ID Transaksi',
    receiptSN: 'No. Serial (SN)',
    receiptTime: 'Waktu',
    successBtn: 'Top Up Lagi',
    problemTitle: 'Solusi Top-Up Game Terbaik Anda',
    problemSub: 'Kami hadir untuk menyelesaikan masalah utama yang sering dialami oleh para gamer saat melakukan transaksi digital.',
    problem1Title: 'Masalah Klasik Top-Up',
    problem1Desc: 'Proses transfer manual yang lambat, biaya admin tersembunyi yang mahal, serta maraknya diamond ilegal yang berisiko membuat akun game Anda terkena banned permanent.',
    problem2Title: 'Sistem Otomatis Instan',
    problem2Desc: 'Platform kami terintegrasi langsung dengan server publisher game. Cukup isi ID, pilih nominal, bayar, dan saldo langsung masuk otomatis dalam hitungan detik.',
    problem3Title: 'Jaminan Keamanan 100% Legal',
    problem3Desc: 'Semua produk digital kami bersumber dari distributor resmi (authorized distributor). Transaksi terjamin aman, legal, terpercaya, dan dilengkapi bukti invoice elektronik yang sah untuk setiap pembelian Anda.',
    fiturTitle: 'Promo Bundling Spesial',
    fiturSub: 'Dapatkan paket item premium dengan bonus loyalty poin dan harga termurah.',
    caraKerjaTitle: 'Proses Instan 3 Langkah',
    caraKerjaSub: 'Top-up game Anda berjalan kilat dengan sistem verifikasi dan pengiriman otomatis.',
    step1Title: 'Pilih Game & Paket',
    step1Desc: 'Tentukan game favorit Anda dan pilih nominal diamond atau paket bundling spesial.',
    step2Title: 'Masukkan ID Akun',
    step2Desc: 'Masukkan User ID Anda. Sistem verifikasi instan kami akan mencocokkan data profil secara real-time.',
    step3Title: 'Bayar & Terima',
    step3Desc: 'Selesaikan transaksi via QRIS/Virtual Account, saldo langsung terkirim otomatis dalam 3 detik.',
    socialProofTitle: 'Social Proof',
    testimonialSub: 'Apa kata para gamer yang telah mencoba layanan PixelPay?',
    testi1: '"UI-nya jelas, tinggal isi ID dan bayar. Cocok buat yang tidak mau chat panjang."',
    testi1Name: '- Raka, Gamer',
    testi2: '"Status order mudah dipantau, jadi lebih tenang."',
    testi2Name: '- Dinda, Mahasiswa',
    testi3: '"Landing page-nya langsung menjawab pertanyaan utama: cepat, aman, dan berapa harganya."',
    testi3Name: '- Bima, Streamer',
    ctaTitle: 'Siap top up tanpa drama?',
    ctaSub: 'Dapatkan penawaran eksklusif dan info promo flash sale mingguan.',
    ctaBtn: 'Daftar Promo',
    ctaNote: 'Kami menjaga privasi Anda. Tanpa spam, kirim hanya promo terbaik.',
    formNamaPlaceholder: 'Nama / WhatsApp',
    formEmailPlaceholder: 'Email',
    formSuccess: '✅ Terima kasih',
    formSuccessSuffix: '! Kami akan menghubungi Anda.',
    faqTitle: 'FAQ (Pertanyaan Umum)',
    faqSub: 'Semua yang perlu Anda ketahui tentang layanan PixelPay TopUp.',
    faqQ1: 'Apakah diamond / UC yang dijual legal dan aman?',
    faqA1: 'Ya, 100% legal dan sangat aman. Semua produk digital kami diproses langsung dari distributor resmi (authorized distributor) masing-masing game. Akun Anda sepenuhnya aman dari risiko banned.',
    faqQ2: 'Berapa lama waktu proses saldo masuk?',
    faqA2: 'Hanya butuh waktu beberapa detik. Sistem kami terotomatisasi secara real-time 24/7. Begitu pembayaran terverifikasi, item game langsung masuk ke akun Anda tanpa penundaan manual.',
    faqQ3: 'Bagaimana jika salah memasukkan User ID game?',
    faqA3: 'Harap pastikan kembali data akun Anda sebelum checkout. Gunakan fitur tombol "Cek ID" yang kami sediakan untuk menampilkan nama/username pemilik ID guna memastikan kesesuaian sebelum membayar.',
    footerDesc: 'Layanan top-up game otomatis instan 24/7. Cepat, aman, dan tepercaya.',
    footerPaymentLabel: 'Metode Pembayaran Partner',
    toastPaySelect: '💳 Pembayaran via',
    toastItemSelect: 'dipilih —',
    toastIdEmpty: '⚠️ Masukkan User ID terlebih dahulu!',
    toastUserIdEmpty: '⚠️ Masukkan User ID / Akun ID terlebih dahulu!',
    toastItemEmpty: '⚠️ Pilih nominal item (diamond/UC/Genesis)!',
    toastVerified: '✅ ID Akun Terverifikasi:',
    toastBundle: '🎁 Paket Bundel Terpilih! Masukkan ID Anda.',
    toastCopyVa: '📋 Nomor VA berhasil disalin!',
    toastCopyFail: '⚠️ Gagal menyalin secara otomatis.',
    toastWa: '📱 Membuka Customer Service WhatsApp PixelPay (24/7)...',
    verifyLoading: '⚡ Memverifikasi ID akun...',
    verifyError: '⚠️ Format kurang tepat!',
    verifySuccess: '✓ Akun ditemukan:',
    drawerTopUp: 'Top Up Sekarang',
    langSwitchToEn: '🌐 Language switched to English',
    langSwitchToId: '🌐 Bahasa diubah ke Indonesia',
  },
  en: {
    navFitur: 'Features',
    navCaraKerja: 'How it Works',
    navHarga: 'Bundles',
    navFaq: 'FAQ',
    navCta: 'Top Up Now',
    heroBadge: '⚡ USP: Fast, automated, and safe game top-up 24/7',
    heroH1Part1: 'Game top-up ',
    heroH1Gradient: 'made effortless',
    heroH1Part2: ',<br>balance arrives instantly.',
    heroSub: 'PixelPay TopUp helps gamers buy diamonds, UC, vouchers, and digital items with an automated process, transparent pricing, and real-time transaction proof.',
    heroCta: 'Start Top Up',
    heroDemo: 'Watch Demo',
    proofTx: 'successful transactions',
    proofSystem: 'system uptime',
    proofProcess: 'avg. process time',
    phoneDashboard: 'TopUp Dashboard',
    phoneOrderFast: 'Quick Order',
    phoneOrderSub: 'all from one page',
    phoneInputId: 'Enter User ID (Server ID)',
    phoneCekId: 'Check ID',
    phonePaymentTitle: 'Payment Method',
    phoneTotalPlaceholder: 'Select an item',
    phoneBayar: 'Pay Now',
    gateTotalLabel: 'Total Payment',
    gateQrisScan: 'Scan the QRIS code with your preferred payment app.',
    gateVaTitle: 'BCA Virtual Account Number',
    gateVaStep: 'How to Pay:',
    gateVaS1: 'Open m-BCA app or BCA ATM.',
    gateVaS2: 'Select <b>Transfer ➡️ Virtual Account</b>.',
    gateVaS3: 'Enter the VA number above.',
    gateVaS4: 'Confirm the billing name and click Pay.',
    gateVaCopy: 'Copy',
    gateTimer: 'Complete payment within',
    gateTimerExpired: '⚠️ Transaction expired. Please try again.',
    gatePaid: 'I Have Paid',
    gateProcessing1: '⏳ Detecting payment signal...',
    gateProcessing2: '⚡ Matching bank mutation...',
    gateProcessing3: '✅ Payment confirmed! Sending diamonds...',
    gateSuccess: '✓ Payment Received!',
    gateConnecting: '⏳ Connecting to Server...',
    gateVerifying: '⚡ Verifying Payment...',
    gateRedirect: '💳 Redirecting to payment page...',
    successTitle: 'Payment Successful!',
    successDesc: 'Your top-up is processed & balance is sent automatically.',
    receiptGame: 'Game',
    receiptId: 'Account ID',
    receiptItem: 'Item',
    receiptPay: 'Payment',
    receiptTotal: 'Total Price',
    receiptTxId: 'Transaction ID',
    receiptSN: 'Serial No. (SN)',
    receiptTime: 'Time',
    successBtn: 'Top Up Again',
    problemTitle: 'Your Best Game Top-Up Solution',
    problemSub: 'We are here to solve the main pain points gamers face during digital transactions.',
    problem1Title: 'Classic Top-Up Problems',
    problem1Desc: 'Slow manual transfers, hidden admin fees, and illegal diamonds that risk getting your game account permanently banned.',
    problem2Title: 'Instant Automated System',
    problem2Desc: 'Our platform is integrated directly with game publisher servers. Just fill in your ID, pick an amount, pay, and the balance lands automatically in seconds.',
    problem3Title: '100% Legal Security Guarantee',
    problem3Desc: 'All our digital products are sourced from authorized distributors. Every transaction is safe, legal, trusted, and comes with a valid electronic invoice.',
    fiturTitle: 'Special Bundling Promos',
    fiturSub: 'Get premium item packages with loyalty point bonuses and the cheapest prices.',
    caraKerjaTitle: 'Instant 3-Step Process',
    caraKerjaSub: 'Your game top-up runs lighting-fast with automatic verification and delivery.',
    step1Title: 'Choose Game & Bundle',
    step1Desc: 'Select your favorite game and choose the diamond amount or special bundle package.',
    step2Title: 'Enter Account ID',
    step2Desc: 'Input your User ID. Our instant verification system checks your profile data in real-time.',
    step3Title: 'Pay & Receive',
    step3Desc: 'Complete the payment via QRIS/VA, and balance is sent automatically in 3 seconds.',
    socialProofTitle: 'Social Proof',
    testimonialSub: 'What gamers are saying after using PixelPay services.',
    testi1: '"The UI is clear, just fill in the ID and pay. Perfect for those who hate long chats."',
    testi1Name: '- Raka, Gamer',
    testi2: '"Order status is easy to track, so much more peace of mind."',
    testi2Name: '- Dinda, Student',
    testi3: '"The landing page directly answers the main questions: fast, safe, and how much it costs."',
    testi3Name: '- Bima, Streamer',
    ctaTitle: 'Ready to top up without drama?',
    ctaSub: 'Get exclusive offers and weekly flash sale promo alerts.',
    ctaBtn: 'Subscribe Promo',
    ctaNote: 'We protect your privacy. No spam, only the best deals.',
    formNamaPlaceholder: 'Name / WhatsApp',
    formEmailPlaceholder: 'Email',
    formSuccess: '✅ Thank you',
    formSuccessSuffix: '! We will contact you shortly.',
    faqTitle: 'FAQ (Frequently Asked Questions)',
    faqSub: 'Everything you need to know about PixelPay TopUp services.',
    faqQ1: 'Are the diamonds / UC sold legal and safe?',
    faqA1: 'Yes, 100% legal and safe. All our digital products are sourced directly from authorized game publishers. Your account is fully protected from any ban risks.',
    faqQ2: 'How long does the delivery process take?',
    faqA2: 'Only a few seconds. Our system is fully automated 24/7 in real-time. Once the payment is verified, the items are sent directly to your account.',
    faqQ3: 'What if I enter the wrong game User ID?',
    faqA3: 'Please double-check your account details before checking out. Use the "Check ID" button to verify the account owner name before paying to avoid errors.',
    footerDesc: '24/7 automatic instant game top-up service. Fast, secure, and highly trusted.',
    footerPaymentLabel: 'Payment Partner Methods',
    toastPaySelect: '💳 Payment via',
    toastItemSelect: 'selected —',
    toastIdEmpty: '⚠️ Please enter your User ID first!',
    toastUserIdEmpty: '⚠️ Please enter your User ID / Account ID first!',
    toastItemEmpty: '⚠️ Select an item amount (diamond/UC/Genesis)!',
    toastVerified: '✅ Account ID Verified:',
    toastBundle: '🎁 Bundle Package Selected! Please enter your ID.',
    toastCopyVa: '📋 VA number copied successfully!',
    toastCopyFail: '⚠️ Failed to copy automatically.',
    toastWa: '📱 Opening PixelPay WhatsApp Customer Service (24/7)...',
    verifyLoading: '⚡ Verifying account ID...',
    verifyError: '⚠️ Incorrect format!',
    verifySuccess: '✓ Account found:',
    drawerTopUp: 'Top Up Now',
    langSwitchToEn: '🌐 Language switched to English',
    langSwitchToId: '🌐 Bahasa diubah ke Indonesia',
  }
};

const BUNDLE_PACKAGES = {
  ml: {
    id: {
      title: 'Promo Mobile Legends',
      items: [
        { name: 'Epic Comeback', detail: '86 💎 + Bonus Shield Card. Naik rank tanpa takut kalah bintang!', tag: 'Hemat', price: 19000, itemId: 'ml_86' },
        { name: 'Savage Push', detail: '257 💎 + Loyalty Poin. Paling pas kejar rank Mythic akhir pekan.', tag: 'Populer', price: 57000, itemId: 'ml_257' },
        { name: 'Sultan Supreme', detail: '706 💎 + Prioritas Fast Pass. Unlock skin incaran instan.', tag: 'Sultan', price: 155000, itemId: 'ml_706' }
      ]
    },
    en: {
      title: 'Mobile Legends Promo',
      items: [
        { name: 'Epic Comeback', detail: '86 💎 + Shield Card Bonus. Climb ranks without star-loss fear!', tag: 'Budget', price: 19000, itemId: 'ml_86' },
        { name: 'Savage Push', detail: '257 💎 + Loyalty Points. Best deal for weekend Mythic push.', tag: 'Popular', price: 57000, itemId: 'ml_257' },
        { name: 'Sultan Supreme', detail: '706 💎 + Priority Fast Pass. Unlock target skins instantly.', tag: 'Sultan', price: 155000, itemId: 'ml_706' }
      ]
    }
  },
  ff: {
    id: {
      title: 'Promo Free Fire',
      items: [
        { name: 'Auto Booyah', detail: '70 💎 + Tactic Pass. Bertahan hidup dan kuasai pertempuran.', tag: 'Hemat', price: 10000, itemId: 'ff_70' },
        { name: 'Sultan Squad', detail: '720 💎 + Bonus Poin Loyalitas. Paling modis mendarat di Bermuda.', tag: 'Populer', price: 100000, itemId: 'ff_720' },
        { name: 'Survivor Pro', detail: '1440 💎 + Gold Pass Bundle. Kuasai ranked match level tinggi.', tag: 'Sultan', price: 190000, itemId: 'ff_1440' }
      ]
    },
    en: {
      title: 'Free Fire Promo',
      items: [
        { name: 'Auto Booyah', detail: '70 💎 + Tactic Pass. Survive and master the battlefield.', tag: 'Budget', price: 10000, itemId: 'ff_70' },
        { name: 'Sultan Squad', detail: '720 💎 + Loyalty Point Bonus. Drop down Bermuda with elite style.', tag: 'Popular', price: 100000, itemId: 'ff_720' },
        { name: 'Survivor Pro', detail: '1440 💎 + Gold Pass Bundle. Dominate high-level ranked match.', tag: 'Sultan', price: 190000, itemId: 'ff_1440' }
      ]
    }
  },
  pubg: {
    id: {
      title: 'Promo PUBG Mobile',
      items: [
        { name: 'Chicken Dinner', detail: '60 UC + Crate Voucher. Amunisi awal pertempuran taktis.', tag: 'Hemat', price: 15000, itemId: 'pubg_60' },
        { name: 'Royale Champion', detail: '660 UC + Upgrade Royale Pass. Dapatkan skin eksklusif musim ini.', tag: 'Populer', price: 150000, itemId: 'pubg_660' },
        { name: 'Sultan Airdrop', detail: '1800 UC + Fast Process. Unlock crate militer incaran Anda.', tag: 'Sultan', price: 375000, itemId: 'pubg_1800' }
      ]
    },
    en: {
      title: 'PUBG Mobile Promo',
      items: [
        { name: 'Chicken Dinner', detail: '60 UC + Crate Voucher. Starter pack for tactical battlefields.', tag: 'Budget', price: 15000, itemId: 'pubg_60' },
        { name: 'Royale Champion', detail: '660 UC + Upgrade Royale Pass. Get this season exclusive skins.', tag: 'Popular', price: 150000, itemId: 'pubg_660' },
        { name: 'Sultan Airdrop', detail: '1800 UC + Fast Process. Instantly unlock military drops.', tag: 'Sultan', price: 375000, itemId: 'pubg_1800' }
      ]
    }
  },
  gi: {
    id: {
      title: 'Promo Genshin Impact',
      items: [
        { name: 'Welkin Blessing', detail: '60 Gen + Bonus Petualang. Paling pas untuk traveler pemula.', tag: 'Hemat', price: 16000, itemId: 'gi_60' },
        { name: 'Primogem Hunt', detail: '980 Gen + Daily Blessing Card. Persiapan gacha hero bintang 5.', tag: 'Populer', price: 249000, itemId: 'gi_980' },
        { name: 'Archon Sovereign', detail: '3280 Gen + Upgrade Material. Upgrade konstelasi maksimal.', tag: 'Sultan', price: 799000, itemId: 'gi_3280' }
      ]
    },
    en: {
      title: 'Genshin Impact Promo',
      items: [
        { name: 'Welkin Blessing', detail: '60 Gen + Adventurer Bonus. Best choice for beginner travelers.', tag: 'Budget', price: 16000, itemId: 'gi_60' },
        { name: 'Primogem Hunt', detail: '980 Gen + Daily Blessing Card. Get ready for 5-star banners.', tag: 'Popular', price: 249000, itemId: 'gi_980' },
        { name: 'Archon Sovereign', detail: '3280 Gen + Upgrade Material. Max out your constellation.', tag: 'Sultan', price: 799000, itemId: 'gi_3280' }
      ]
    }
  }
};

window.toggleLanguage = function() {
  currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
  
  const switchBtn = document.getElementById('langSwitchBtn');
  const langID = document.getElementById('langID');
  const langEN = document.getElementById('langEN');
  const drawerLangID = document.getElementById('drawerLangID');
  const drawerLangEN = document.getElementById('drawerLangEN');
  const drawerLangSwitch = document.getElementById('drawerLangSwitch');
  
  if (currentLanguage === 'en') {
    if (switchBtn) switchBtn.classList.add('en');
    if (langID) langID.classList.remove('active');
    if (langEN) langEN.classList.add('active');
    if (drawerLangSwitch) drawerLangSwitch.classList.add('en');
    if (drawerLangID) drawerLangID.classList.remove('active');
    if (drawerLangEN) drawerLangEN.classList.add('active');
    showToast(TRANSLATIONS.en.langSwitchToEn);
  } else {
    if (switchBtn) switchBtn.classList.remove('en');
    if (langID) langID.classList.add('active');
    if (langEN) langEN.classList.remove('active');
    if (drawerLangSwitch) drawerLangSwitch.classList.remove('en');
    if (drawerLangID) drawerLangID.classList.add('active');
    if (drawerLangEN) drawerLangEN.classList.remove('active');
    showToast(TRANSLATIONS.id.langSwitchToId);
  }
  
  translatePage();
};

function translatePage() {
  const dict = TRANSLATIONS[currentLanguage];

  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length >= 4) {
    navLinks[0].textContent = dict.navFitur;
    navLinks[1].textContent = dict.navCaraKerja;
    navLinks[2].textContent = dict.navHarga;
    navLinks[3].textContent = dict.navFaq;
  }

  const drawerLinks = document.querySelectorAll('.drawer-links a');
  if (drawerLinks.length >= 4) {
    drawerLinks[0].textContent = dict.navFitur;
    drawerLinks[1].textContent = dict.navCaraKerja;
    drawerLinks[2].textContent = dict.navHarga;
    drawerLinks[3].textContent = dict.navFaq;
  }
  const drawerTopUpBtn = document.getElementById('drawerTopUpBtn');
  if (drawerTopUpBtn) drawerTopUpBtn.innerHTML = `<span class="shimmer"></span>${dict.drawerTopUp}`;

  const navCtaEl = document.getElementById('navCta');
  if (navCtaEl) navCtaEl.innerHTML = `<span class="shimmer"></span>${dict.navCta}`;

  const heroBadgeEl = document.getElementById('heroBadge');
  if (heroBadgeEl) heroBadgeEl.textContent = dict.heroBadge;

  const heroH1El = document.getElementById('heroH1');
  if (heroH1El) heroH1El.innerHTML = `${dict.heroH1Part1}<span id="heroGradient">${dict.heroH1Gradient}</span>${dict.heroH1Part2}`;

  const heroSubEl = document.getElementById('heroSub');
  if (heroSubEl) heroSubEl.textContent = dict.heroSub;

  const heroCtaBtn = document.getElementById('heroCtaBtn');
  if (heroCtaBtn) heroCtaBtn.innerHTML = `<span class="shimmer"></span>${dict.heroCta}`;

  const heroGhostBtn = document.getElementById('heroGhostBtn');
  if (heroGhostBtn) heroGhostBtn.textContent = dict.heroDemo;

  const proofTxEl = document.getElementById('proofTx');
  if (proofTxEl) proofTxEl.textContent = dict.proofTx;
  const proofSystemEl = document.getElementById('proofSystem');
  if (proofSystemEl) proofSystemEl.textContent = dict.proofSystem;
  const proofProcessEl = document.getElementById('proofProcess');
  if (proofProcessEl) proofProcessEl.textContent = dict.proofProcess;

  const phoneDashboardEl = document.getElementById('phoneDashboard');
  if (phoneDashboardEl) phoneDashboardEl.textContent = dict.phoneDashboard;
  const phoneOrderFastEl = document.getElementById('phoneOrderFast');
  if (phoneOrderFastEl) phoneOrderFastEl.textContent = dict.phoneOrderFast;
  const phoneOrderSubEl = document.getElementById('phoneOrderSub');
  if (phoneOrderSubEl) phoneOrderSubEl.textContent = dict.phoneOrderSub;
  const inputUserIdEl = document.getElementById('inputUserId');
  if (inputUserIdEl) inputUserIdEl.placeholder = dict.phoneInputId;
  const cekIdBtn = document.querySelector('.input-btn');
  if (cekIdBtn) cekIdBtn.textContent = dict.phoneCekId;
  const paymentTitleEl = document.getElementById('phonePaymentTitle');
  if (paymentTitleEl) paymentTitleEl.textContent = dict.phonePaymentTitle;
  const totalBayarTextEl = document.getElementById('totalBayarText');
  if (totalBayarTextEl && !selectedDiamondObj) totalBayarTextEl.textContent = dict.phoneTotalPlaceholder;
  const bayarBtnEl = document.getElementById('bayarBtn');
  if (bayarBtnEl) bayarBtnEl.innerHTML = `<span class="shimmer"></span>${dict.phoneBayar}`;

  const gateTotalLabelEl = document.getElementById('gateTotalLabel');
  if (gateTotalLabelEl) gateTotalLabelEl.textContent = dict.gateTotalLabel;
  const gateQrisMsgEl = document.getElementById('gateQrisMsg');
  if (gateQrisMsgEl) gateQrisMsgEl.textContent = dict.gateQrisScan;
  const gateVaTitleEl = document.getElementById('gateVaTitle');
  if (gateVaTitleEl) gateVaTitleEl.textContent = dict.gateVaTitle;
  const gateVaStepEl = document.getElementById('gateVaStep');
  if (gateVaStepEl) gateVaStepEl.textContent = dict.gateVaStep;
  const gateVaS1El = document.getElementById('gateVaS1');
  if (gateVaS1El) gateVaS1El.textContent = dict.gateVaS1;
  const gateVaS2El = document.getElementById('gateVaS2');
  if (gateVaS2El) gateVaS2El.innerHTML = dict.gateVaS2;
  const gateVaS3El = document.getElementById('gateVaS3');
  if (gateVaS3El) gateVaS3El.textContent = dict.gateVaS3;
  const gateVaS4El = document.getElementById('gateVaS4');
  if (gateVaS4El) gateVaS4El.textContent = dict.gateVaS4;
  const btnCopyVaEl = document.getElementById('btnCopyVa');
  if (btnCopyVaEl) btnCopyVaEl.textContent = dict.gateVaCopy;
  const btnGatewaySuccessEl = document.getElementById('btnGatewaySuccess');
  if (btnGatewaySuccessEl && !btnGatewaySuccessEl.classList.contains('processing')) {
    btnGatewaySuccessEl.innerHTML = `<span class="shimmer"></span>${dict.gatePaid}`;
  }

  const successTitleEl = document.getElementById('successTitleEl');
  if (successTitleEl) successTitleEl.textContent = dict.successTitle;
  const successDescEl = document.getElementById('successDescEl');
  if (successDescEl) successDescEl.textContent = dict.successDesc;
  const receiptGameLabelEl = document.getElementById('receiptGameLabel');
  if (receiptGameLabelEl) receiptGameLabelEl.textContent = dict.receiptGame;
  const receiptIdLabelEl = document.getElementById('receiptIdLabel');
  if (receiptIdLabelEl) receiptIdLabelEl.textContent = dict.receiptId;
  const receiptItemLabelEl = document.getElementById('receiptItemLabel');
  if (receiptItemLabelEl) receiptItemLabelEl.textContent = dict.receiptItem;
  const receiptPayLabelEl = document.getElementById('receiptPayLabel');
  if (receiptPayLabelEl) receiptPayLabelEl.textContent = dict.receiptPay;
  const receiptTotalLabelEl = document.getElementById('receiptTotalLabel');
  if (receiptTotalLabelEl) receiptTotalLabelEl.textContent = dict.receiptTotal;
  const receiptTxLabelEl = document.getElementById('receiptTxLabel');
  if (receiptTxLabelEl) receiptTxLabelEl.textContent = dict.receiptTxId;
  const receiptSnLabelEl = document.getElementById('receiptSnLabel');
  if (receiptSnLabelEl) receiptSnLabelEl.textContent = dict.receiptSN;
  const receiptTimeLabelEl = document.getElementById('receiptTimeLabel');
  if (receiptTimeLabelEl) receiptTimeLabelEl.textContent = dict.receiptTime;
  const btnSuccessFinishEl = document.getElementById('btnSuccessFinish');
  if (btnSuccessFinishEl) btnSuccessFinishEl.innerHTML = `<span class="shimmer"></span>${dict.successBtn}`;

  const problemTitleEl = document.getElementById('problemTitle');
  if (problemTitleEl) problemTitleEl.textContent = dict.problemTitle;
  const problemSubEl = document.getElementById('problemSub');
  if (problemSubEl) problemSubEl.textContent = dict.problemSub;
  const problem1TitleEl = document.getElementById('problem1Title');
  if (problem1TitleEl) problem1TitleEl.textContent = dict.problem1Title;
  const problem1DescEl = document.getElementById('problem1Desc');
  if (problem1DescEl) problem1DescEl.textContent = dict.problem1Desc;
  const problem2TitleEl = document.getElementById('problem2Title');
  if (problem2TitleEl) problem2TitleEl.textContent = dict.problem2Title;
  const problem2DescEl = document.getElementById('problem2Desc');
  if (problem2DescEl) problem2DescEl.textContent = dict.problem2Desc;
  const problem3TitleEl = document.getElementById('problem3Title');
  if (problem3TitleEl) problem3TitleEl.textContent = dict.problem3Title;
  const problem3DescEl = document.getElementById('problem3Desc');
  if (problem3DescEl) problem3DescEl.textContent = dict.problem3Desc;

  const fiturTitle = document.getElementById('fiturTitle');
  if (fiturTitle) fiturTitle.textContent = dict.fiturTitle;
  const fiturSub = document.getElementById('fiturSub');
  if (fiturSub) fiturSub.textContent = dict.fiturSub;
  renderPackages();
  const caraKerjaTitle = document.getElementById('caraKerjaTitle');
  if (caraKerjaTitle) caraKerjaTitle.textContent = dict.caraKerjaTitle;
  const caraKerjaSub = document.getElementById('caraKerjaSub');
  if (caraKerjaSub) caraKerjaSub.textContent = dict.caraKerjaSub;
  const step1Title = document.getElementById('step1Title');
  if (step1Title) step1Title.textContent = dict.step1Title;
  const step1Desc = document.getElementById('step1Desc');
  if (step1Desc) step1Desc.textContent = dict.step1Desc;
  const step2Title = document.getElementById('step2Title');
  if (step2Title) step2Title.textContent = dict.step2Title;
  const step2Desc = document.getElementById('step2Desc');
  if (step2Desc) step2Desc.textContent = dict.step2Desc;
  const step3Title = document.getElementById('step3Title');
  if (step3Title) step3Title.textContent = dict.step3Title;
  const step3Desc = document.getElementById('step3Desc');
  if (step3Desc) step3Desc.textContent = dict.step3Desc;

  const socialProofTitleEl = document.getElementById('socialProofTitle');
  if (socialProofTitleEl) socialProofTitleEl.textContent = dict.socialProofTitle;
  const testimonialSubEl = document.getElementById('testimonialSub');
  if (testimonialSubEl) testimonialSubEl.textContent = dict.testimonialSub;
  const testi1El = document.getElementById('testi1');
  if (testi1El) testi1El.textContent = dict.testi1;
  const testi1NameEl = document.getElementById('testi1Name');
  if (testi1NameEl) testi1NameEl.textContent = dict.testi1Name;
  const testi2El = document.getElementById('testi2');
  if (testi2El) testi2El.textContent = dict.testi2;
  const testi2NameEl = document.getElementById('testi2Name');
  if (testi2NameEl) testi2NameEl.textContent = dict.testi2Name;
  const testi3El = document.getElementById('testi3');
  if (testi3El) testi3El.textContent = dict.testi3;
  const testi3NameEl = document.getElementById('testi3Name');
  if (testi3NameEl) testi3NameEl.textContent = dict.testi3Name;

  const ctaTitle = document.getElementById('ctaTitle');
  if (ctaTitle) ctaTitle.textContent = dict.ctaTitle;
  const ctaSub = document.getElementById('ctaSub');
  if (ctaSub) ctaSub.textContent = dict.ctaSub;
  const ctaBtn = document.getElementById('ctaBtn');
  if (ctaBtn) ctaBtn.innerHTML = `<span class="shimmer"></span>${dict.ctaBtn}`;
  const ctaNote = document.getElementById('ctaNote');
  if (ctaNote) ctaNote.textContent = dict.ctaNote;
  const inputNamaEl = document.getElementById('inputNama');
  if (inputNamaEl) inputNamaEl.placeholder = dict.formNamaPlaceholder;
  const inputEmailEl = document.getElementById('inputEmail');
  if (inputEmailEl) inputEmailEl.placeholder = dict.formEmailPlaceholder;

  const faqTitle = document.getElementById('faqTitle');
  if (faqTitle) faqTitle.textContent = dict.faqTitle;
  const faqSub = document.getElementById('faqSub');
  if (faqSub) faqSub.textContent = dict.faqSub;
  const faqQ1 = document.getElementById('faqQ1');
  if (faqQ1) faqQ1.textContent = dict.faqQ1;
  const faqA1 = document.getElementById('faqA1');
  if (faqA1) faqA1.textContent = dict.faqA1;
  const faqQ2 = document.getElementById('faqQ2');
  if (faqQ2) faqQ2.textContent = dict.faqQ2;
  const faqA2 = document.getElementById('faqA2');
  if (faqA2) faqA2.textContent = dict.faqA2;
  const faqQ3 = document.getElementById('faqQ3');
  if (faqQ3) faqQ3.textContent = dict.faqQ3;
  const faqA3 = document.getElementById('faqA3');
  if (faqA3) faqA3.textContent = dict.faqA3;

  const footerDesc = document.getElementById('footerDesc');
  if (footerDesc) footerDesc.innerHTML = `<b>PixelPay TopUp</b><br>${dict.footerDesc}`;
  const footerPaymentLabelEl = document.getElementById('footerPaymentLabel');
  if (footerPaymentLabelEl) footerPaymentLabelEl.textContent = dict.footerPaymentLabel;
}

window.renderPackages = function() {
  const hargaGrid = document.getElementById('harga');
  if (!hargaGrid) return;
  
  const gameKey = currentActiveGame;
  const lang = currentLanguage;
  const packages = BUNDLE_PACKAGES[gameKey][lang];
  
  let html = '';
  packages.items.forEach((item, index) => {
    const isPopular = item.tag === 'Populer' || item.tag === 'Popular';
    const cardClass = isPopular ? 'card card-popular reveal visible' : 'card reveal visible';
    const btnClass = isPopular ? 'btn btn-primary' : 'btn btn-ghost';
    const badgeHTML = isPopular ? `<div class="badge" style="margin-bottom:10px;">${item.tag}</div>` : `<div class="badge" style="margin-bottom:10px; border-color: rgba(255,255,255,0.06);">${item.tag}</div>`;
    const btnText = lang === 'id' ? 'Pilih Paket' : 'Choose Bundle';
    
    html += `
      <div class="${cardClass}" style="transition-delay: .${index+1}s; margin-top: 10px;">
        ${badgeHTML}
        <h3>${item.name}</h3>
        <div class="price">${formatRupiah(item.price)}</div>
        <p class="muted" style="min-height: 48px; font-size: 13px; margin: 8px 0 14px;">${item.detail}</p>
        <a class="${btnClass}" href="#" onclick="selectPackageBundle('${gameKey}', '${item.itemId}'); return false;" style="width: 100%; justify-content: center;">
          ${isPopular ? '<span class="shimmer"></span>' : ''}${btnText}
        </a>
      </div>
    `;
  });
  
  hargaGrid.innerHTML = html;
};

window.selectPackageBundle = function(gameKey, itemId) {
  switchGame(gameKey);
  
  const db = GAME_DB[gameKey];
  const targetItem = db.items.find(i => i.id === itemId);
  if (targetItem) {
    const cards = document.querySelectorAll('.diamond');
    cards.forEach(card => {
      const strongText = card.querySelector('strong').textContent.trim();
      if (strongText.includes(targetItem.name.split(' ')[0])) {
        selectedDiamondObj = targetItem;
        document.querySelectorAll('.diamond').forEach(d => d.classList.remove('selected'));
        card.classList.add('selected');
        updateTotalPayment();
      }
    });
  }
  
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  showToast(TRANSLATIONS[currentLanguage].toastBundle);
};

window.toggleMobileMenu = function() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  
  if (toggleBtn && drawer && overlay) {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      toggleBtn.classList.remove('open');
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      toggleBtn.classList.add('open');
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
};

const nav = document.getElementById('mainNav');
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const counterEl = document.getElementById('counterTx');
const toastEl = document.getElementById('toast');

const tabML = document.getElementById('tabML');
const tabFF = document.getElementById('tabFF');
const tabPUBG = document.getElementById('tabPUBG');
const tabGI = document.getElementById('tabGI');

const phoneGameBanner = document.getElementById('phoneGameBanner');
const inputUserId = document.getElementById('inputUserId');
const selectGameServer = document.getElementById('selectGameServer');
const diamondGrid = document.getElementById('diamondGrid');

const payQris = document.getElementById('payQris');
const payDana = document.getElementById('payDana');
const payVA = document.getElementById('payVA');
const bayarBtn = document.getElementById('bayarBtn');
const totalBayarText = document.getElementById('totalBayarText');

const screenOrder = document.getElementById('screenOrder');
const screenGateway = document.getElementById('screenGateway');
const screenSuccess = document.getElementById('screenSuccess');

const gateTotalAmount = document.getElementById('gateTotalAmount');
const qrisView = document.getElementById('qrisView');
const vaView = document.getElementById('vaView');
const vaNumText = document.getElementById('vaNumText');
const gateTimer = document.getElementById('gateTimer');
const btnGatewaySuccess = document.getElementById('btnGatewaySuccess');

const succGame = document.getElementById('succGame');
const succUser = document.getElementById('succUser');
const succItem = document.getElementById('succItem');
const succPay = document.getElementById('succPay');
const succTotal = document.getElementById('succTotal');
const succTxId = document.getElementById('succTxId');
const succSN = document.getElementById('succSN');
const succDate = document.getElementById('succDate');
const btnSuccessFinish = document.getElementById('btnSuccessFinish');

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

function animateCount(el, target, duration = 1800, suffix = '+') {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

let counterStarted = false;
if (counterEl) {
  const counterObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counterStarted) {
      counterStarted = true;
      animateCount(counterEl, simulatedTxCount, 2000, '+');
      counterObs.disconnect();
    }
  }, { threshold: 0.5 });
  counterObs.observe(counterEl);
}

let toastTimer = null;
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

window.handleForm = function(e) {
  e.preventDefault();
  const dict = TRANSLATIONS[currentLanguage];
  const nama = document.getElementById('inputNama').value.trim();
  showToast(dict.formSuccess + ', ' + (nama || 'Gamer') + dict.formSuccessSuffix);
  e.target.reset();
};

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

window.switchGame = function (gameKey) {
  currentActiveGame = gameKey;
  const db = GAME_DB[gameKey];
  if (!db) return;

  [tabML, tabFF, tabPUBG, tabGI].forEach(tab => {
    if (tab) tab.classList.remove('active');
  });
  const activeTab = document.getElementById('tab' + gameKey.toUpperCase());
  if (activeTab) activeTab.classList.add('active');

  if (phoneGameBanner) {
    phoneGameBanner.style.background = db.banner;
    phoneGameBanner.textContent = db.name;
  }

  if (inputUserId) {
    inputUserId.placeholder = db.idPlaceholder;
    inputUserId.value = '';
  }

  if (selectGameServer) {
    if (gameKey === 'ml' || gameKey === 'gi') {
      selectGameServer.style.display = 'block';
    } else {
      selectGameServer.style.display = 'none';
    }
  }

  isUserVerified = false;
  currentVerificationUsername = '';
  const msgEl = document.getElementById('userVerifyMsg');
  if (msgEl) {
    msgEl.className = 'user-verification-msg';
    msgEl.style.display = 'none';
  }

  renderDiamonds(db.items);
  selectedDiamondObj = null;
  updateTotalPayment();
  
  if (typeof renderPackages === 'function') {
    renderPackages();
  }
};

function renderDiamonds(items) {
  if (!diamondGrid) return;
  diamondGrid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'diamond';
    card.innerHTML = `<strong>${item.name}</strong><span class="muted">${formatRupiah(item.price)}</span>`;
    card.onclick = () => selectDiamondCard(card, item);
    diamondGrid.appendChild(card);
  });
}

function selectDiamondCard(el, item) {
  document.querySelectorAll('.diamond').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  selectedDiamondObj = item;
  const dict = TRANSLATIONS[currentLanguage];
  showToast(`💎 ${item.name} ${dict.toastItemSelect} ${formatRupiah(item.price)}`);
  updateTotalPayment();
}

window.selectPayment = function(methodKey) {
  selectedPaymentMethod = methodKey;
  [payQris, payDana, payVA].forEach(el => {
    if (el) el.classList.remove('selected');
  });

  const activePay = document.getElementById('pay' + methodKey.charAt(0).toUpperCase() + methodKey.slice(1));
  if (activePay) activePay.classList.add('selected');

  const dict = TRANSLATIONS[currentLanguage];
  showToast(`${dict.toastPaySelect} ${PAYMENT_METHODS[methodKey].name}`);
  updateTotalPayment();
};

window.verifyUserId = function() {
  const userId = inputUserId.value.trim();
  const db = GAME_DB[currentActiveGame];
  const msgEl = document.getElementById('userVerifyMsg');
  const dict = TRANSLATIONS[currentLanguage];

  if (!userId) {
    showToast(dict.toastIdEmpty);
    return;
  }

  msgEl.style.display = 'block';
  msgEl.className = 'user-verification-msg loading';
  msgEl.textContent = dict.verifyLoading;

  setTimeout(() => {
    const isValid = db.idRegex.test(userId);
    if (!isValid) {
      msgEl.className = 'user-verification-msg error';
      msgEl.textContent = `${dict.verifyError} ${db.formatTip}`;
      isUserVerified = false;
      return;
    }

    const randomUsernames = [
      'Rubaka_Gamer99', 'LegendGamer', 'Lamberth_Paul', 
      'RakaPushRank', 'LegendSlayer_X', 'GamerNoCounter'
    ];
    const index = Math.abs(hashCode(userId)) % randomUsernames.length;
    currentVerificationUsername = randomUsernames[index];
    isUserVerified = true;

    msgEl.className = 'user-verification-msg success';
    msgEl.innerHTML = `${dict.verifySuccess} <strong>${currentVerificationUsername}</strong>`;
    showToast(`${dict.toastVerified} ${currentVerificationUsername}`);
  }, 1000);
};

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function updateTotalPayment() {
  const dict = TRANSLATIONS[currentLanguage];
  if (!selectedDiamondObj) {
    if (totalBayarText) totalBayarText.textContent = dict.phoneTotalPlaceholder;
    return;
  }

  const basePrice = selectedDiamondObj.price;
  const adminFee = PAYMENT_METHODS[selectedPaymentMethod].fee;
  const total = basePrice + adminFee;

  if (totalBayarText) {
    totalBayarText.innerHTML = `Total: <strong style="color:var(--primary); font-size:16px;">${formatRupiah(total)}</strong>`;
  }
}

if (bayarBtn) {
  bayarBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const dict = TRANSLATIONS[currentLanguage];
    const userId = inputUserId.value.trim();
    if (!userId) {
      showToast(dict.toastUserIdEmpty);
      shakeGrid();
      return;
    }

    if (!selectedDiamondObj) {
      showToast(dict.toastItemEmpty);
      shakeGrid();
      return;
    }

    if (!isUserVerified) {
      currentVerificationUsername = 'User_' + Math.floor(1000 + Math.random() * 9000);
      isUserVerified = true;
    }

    showToast(dict.gateRedirect);
    setTimeout(() => {
      openPaymentGateway();
    }, 1000);
  });
}

function shakeGrid() {
  if (diamondGrid) {
    diamondGrid.style.animation = 'shake .4s ease';
    setTimeout(() => {
      diamondGrid.style.animation = '';
    }, 400);
  }
}

function openPaymentGateway() {
  const orbs = document.querySelector('.bg-orbs');
  if (orbs) orbs.style.opacity = '0.3';

  if (screenOrder) screenOrder.classList.remove('active');
  if (screenGateway) screenGateway.classList.add('active');

  const basePrice = selectedDiamondObj.price;
  const adminFee = PAYMENT_METHODS[selectedPaymentMethod].fee;
  const total = basePrice + adminFee;

  if (gateTotalAmount) gateTotalAmount.textContent = formatRupiah(total);

  if (selectedPaymentMethod === 'qris' || selectedPaymentMethod === 'dana') {
    if (qrisView) qrisView.style.display = 'block';
    if (vaView) vaView.style.display = 'none';
  } else {
    if (qrisView) qrisView.style.display = 'none';
    if (vaView) vaView.style.display = 'block';
    if (vaNumText) {
      vaNumText.textContent = '88012 ' + Math.floor(10000 + Math.random() * 90000) + ' ' + Math.floor(10000 + Math.random() * 90000);
    }
  }

  startCheckoutTimer(600); 
}

function startCheckoutTimer(duration) {
  clearInterval(checkoutTimer);
  let timer = duration, minutes, seconds;
  const updateTimer = () => {
    const dict = TRANSLATIONS[currentLanguage];
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (gateTimer) gateTimer.textContent = `${dict.gateTimer} ${minutes}:${seconds}`;
    if (--timer < 0) {
      clearInterval(checkoutTimer);
      showToast(TRANSLATIONS[currentLanguage].gateTimerExpired);
      resetToOrderScreen();
    }
  };
  updateTimer();
  checkoutTimer = setInterval(updateTimer, 1000);
}

window.copyVA = function() {
  if (!vaNumText) return;
  const dict = TRANSLATIONS[currentLanguage];
  const rawNum = vaNumText.textContent.replace(/\s/g, '');
  navigator.clipboard.writeText(rawNum).then(() => {
    showToast(dict.toastCopyVa);
  }).catch(() => {
    showToast(dict.toastCopyFail);
  });
};

if (btnGatewaySuccess) {
  btnGatewaySuccess.addEventListener('click', function(e) {
    e.preventDefault();
    if (btnGatewaySuccess.classList.contains('processing')) return;
    btnGatewaySuccess.classList.add('processing');
    const dict = TRANSLATIONS[currentLanguage];

    const originalHTML = `<span class="shimmer"></span>${dict.gatePaid}`;
    btnGatewaySuccess.innerHTML = `<span class="spinner-icon" style="display:inline-block; margin-right: 8px;">⏳</span> ${dict.gateConnecting.replace('⏳ ', '')}`;
    showToast(dict.gateProcessing1);

    setTimeout(() => {
      btnGatewaySuccess.innerHTML = `<span class="spinner-icon" style="display:inline-block; margin-right: 8px;">⚡</span> ${dict.gateVerifying.replace('⚡ ', '')}`;
      showToast(dict.gateProcessing2);

      setTimeout(() => {
        btnGatewaySuccess.innerHTML = dict.gateSuccess;
        btnGatewaySuccess.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btnGatewaySuccess.style.color = '#fff';
        showToast(dict.gateProcessing3);

        setTimeout(() => {
          clearInterval(checkoutTimer);
          btnGatewaySuccess.classList.remove('processing');
          btnGatewaySuccess.innerHTML = originalHTML;
          btnGatewaySuccess.style.background = '';
          btnGatewaySuccess.style.color = '';

          simulatedTxCount += 1;
          if (counterEl) {
            counterEl.textContent = simulatedTxCount.toLocaleString('id-ID') + '+';
          }

          if (screenGateway) screenGateway.classList.remove('active');
          if (screenSuccess) screenSuccess.classList.add('active');

          const db = GAME_DB[currentActiveGame];
          const adminFee = PAYMENT_METHODS[selectedPaymentMethod].fee;
          const total = selectedDiamondObj.price + adminFee;
          const locale = currentLanguage === 'id' ? 'id-ID' : 'en-US';
          const now = new Date();
          const formatTime = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

          if (succGame) succGame.textContent = db.name;
          if (succUser) succUser.textContent = `${inputUserId.value.trim()} (${currentVerificationUsername})`;
          if (succItem) succItem.textContent = selectedDiamondObj.name;
          if (succPay) succPay.textContent = PAYMENT_METHODS[selectedPaymentMethod].name;
          if (succTotal) succTotal.textContent = formatRupiah(total);
          if (succTxId) succTxId.textContent = 'PX' + Math.random().toString(36).substring(2, 9).toUpperCase();
          if (succSN) succSN.textContent = 'SN-' + Math.floor(100000000 + Math.random() * 900000000);
          if (succDate) succDate.textContent = formatTime;
        }, 1000);
      }, 1500);
    }, 1500);
  });
}

if (btnSuccessFinish) {
  btnSuccessFinish.addEventListener('click', function(e) {
    e.preventDefault();
    resetToOrderScreen();
  });
}

function resetToOrderScreen() {
  clearInterval(checkoutTimer);
  const orbs = document.querySelector('.bg-orbs');
  if (orbs) orbs.style.opacity = '1';

  if (screenSuccess) screenSuccess.classList.remove('active');
  if (screenGateway) screenGateway.classList.remove('active');
  if (screenOrder) screenOrder.classList.add('active');

  if (inputUserId) inputUserId.value = '';
  isUserVerified = false;
  currentVerificationUsername = '';
  
  const msgEl = document.getElementById('userVerifyMsg');
  if (msgEl) {
    msgEl.className = 'user-verification-msg';
    msgEl.style.display = 'none';
  }

  selectedDiamondObj = null;
  document.querySelectorAll('.diamond').forEach(d => d.classList.remove('selected'));
  selectPayment('qris');
  updateTotalPayment();
}

document.addEventListener('DOMContentLoaded', () => {
  switchGame('ml');
  translatePage();

  const waBtn = document.getElementById('waSupportBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      showToast(TRANSLATIONS[currentLanguage].toastWa);
      setTimeout(() => {
        window.open('https://wa.me/6281247248519?text=Halo%20CS%20PixelPay,%20saya%20butuh%20bantuan%20terkait%20top%20up%20game.', '_blank');
      }, 1000);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('mobileDrawer');
      if (drawer && drawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    }
  });

  document.querySelectorAll('.drawer-links a, #drawerTopUpBtn').forEach(link => {
    link.addEventListener('click', () => {
      const drawer = document.getElementById('mobileDrawer');
      if (drawer && drawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }`;
  document.head.appendChild(style);
});
