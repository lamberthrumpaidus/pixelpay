/* ===== DATABASE GAME DAN METODE BAYAR ===== */
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

/* ===== STATE APLIKASI ===== */
let currentActiveGame = 'ml';
let selectedDiamondObj = null;
let selectedPaymentMethod = 'qris';
let currentVerificationUsername = '';
let isUserVerified = false;
let checkoutTimer = null;
let simulatedTxCount = 10000;

/* ===== DOM ELEMENTS ===== */
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

// Gateway Screens elements
const gateTotalAmount = document.getElementById('gateTotalAmount');
const qrisView = document.getElementById('qrisView');
const vaView = document.getElementById('vaView');
const vaNumText = document.getElementById('vaNumText');
const gateTimer = document.getElementById('gateTimer');
const btnGatewaySuccess = document.getElementById('btnGatewaySuccess');

// Success Screen elements
const succGame = document.getElementById('succGame');
const succUser = document.getElementById('succUser');
const succItem = document.getElementById('succItem');
const succPay = document.getElementById('succPay');
const succTotal = document.getElementById('succTotal');
const succTxId = document.getElementById('succTxId');
const succSN = document.getElementById('succSN');
const succDate = document.getElementById('succDate');
const btnSuccessFinish = document.getElementById('btnSuccessFinish');

/* ===== ORIGINAL WEBSITE LOGIC ===== */

/* --- Navbar Scroll Effect --- */
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* --- Scroll Reveal Animation --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* --- Live Counter Animation --- */
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

/* --- Dynamic Global Toast --- */
let toastTimer = null;
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* --- Landing Page Lead Form Submission --- */
window.handleForm = function(e) {
  e.preventDefault();
  const nama = document.getElementById('inputNama').value.trim();
  showToast('✅ Terima kasih, ' + (nama || 'Gamer') + '! Kami akan menghubungi Anda.');
  e.target.reset();
};

/* ===== INTERACTIVE PAYMENT LOGIC ===== */

/* --- Format Currency --- */
function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

/* --- Switch Game Form --- */
window.switchGame = function(gameKey) {
  currentActiveGame = gameKey;
  const db = GAME_DB[gameKey];
  if (!db) return;

  // Visual active tab state
  [tabML, tabFF, tabPUBG, tabGI].forEach(tab => {
    if (tab) tab.classList.remove('active');
  });
  const activeTab = document.getElementById('tab' + gameKey.toUpperCase());
  if (activeTab) activeTab.classList.add('active');

  // Change Banner
  if (phoneGameBanner) {
    phoneGameBanner.style.background = db.banner;
    phoneGameBanner.textContent = db.name;
  }

  // Change Input Placeholder
  if (inputUserId) {
    inputUserId.placeholder = db.idPlaceholder;
    inputUserId.value = '';
  }

  // Show/Hide Server Dropdown (Only for ML & GI)
  if (selectGameServer) {
    if (gameKey === 'ml' || gameKey === 'gi') {
      selectGameServer.style.display = 'block';
    } else {
      selectGameServer.style.display = 'none';
    }
  }

  // Reset verification
  isUserVerified = false;
  currentVerificationUsername = '';
  const msgEl = document.getElementById('userVerifyMsg');
  if (msgEl) {
    msgEl.className = 'user-verification-msg';
    msgEl.style.display = 'none';
  }

  // Render game diamonds grid
  renderDiamonds(db.items);
  selectedDiamondObj = null;
  updateTotalPayment();
};

/* --- Render Diamonds Grid --- */
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

/* --- Select Diamond Item --- */
function selectDiamondCard(el, item) {
  document.querySelectorAll('.diamond').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  selectedDiamondObj = item;
  
  showToast(`💎 ${item.name} dipilih — ${formatRupiah(item.price)}`);
  updateTotalPayment();
}

/* --- Select Payment Method --- */
window.selectPayment = function(methodKey) {
  selectedPaymentMethod = methodKey;
  
  [payQris, payDana, payVA].forEach(el => {
    if (el) el.classList.remove('selected');
  });

  const activePay = document.getElementById('pay' + methodKey.charAt(0).toUpperCase() + methodKey.slice(1));
  if (activePay) activePay.classList.add('selected');

  showToast(`💳 Pembayaran via ${PAYMENT_METHODS[methodKey].name}`);
  updateTotalPayment();
};

/* --- Verify User ID --- */
window.verifyUserId = function() {
  const userId = inputUserId.value.trim();
  const db = GAME_DB[currentActiveGame];
  const msgEl = document.getElementById('userVerifyMsg');

  if (!userId) {
    showToast('⚠️ Masukkan User ID terlebih dahulu!');
    return;
  }

  msgEl.style.display = 'block';
  msgEl.className = 'user-verification-msg loading';
  msgEl.textContent = '⚡ Memverifikasi ID akun...';

  // Simulasi API Checker Delay 1 detik
  setTimeout(() => {
    // Validasi format ID
    const isValid = db.idRegex.test(userId);
    if (!isValid) {
      // Untuk demo, kita toleransi format kosong / salah, tetapi beri anjuran format
      msgEl.className = 'user-verification-msg error';
      msgEl.textContent = `⚠️ Format kurang tepat! ${db.formatTip}`;
      isUserVerified = false;
      return;
    }

    // Nama-nama gamer fiktif
    const randomUsernames = [
      'Rubaka_Gamer99', 'PixelHero_UTS', 'Lamberth_Paul', 
      'RakaPushRank', 'LegendSlayer_X', 'GamerNoCounter'
    ];
    const index = Math.abs(hashCode(userId)) % randomUsernames.length;
    currentVerificationUsername = randomUsernames[index];
    isUserVerified = true;

    msgEl.className = 'user-verification-msg success';
    msgEl.innerHTML = `✓ Akun ditemukan: <strong>${currentVerificationUsername}</strong>`;
    showToast(`✅ ID Akun Terverifikasi: ${currentVerificationUsername}`);
  }, 1000);
};

// Helper hash code function for deterministic username selection
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

/* --- Calculate & Update Total payment --- */
function updateTotalPayment() {
  if (!selectedDiamondObj) {
    if (totalBayarText) totalBayarText.textContent = 'Pilih nominal item';
    return;
  }

  const basePrice = selectedDiamondObj.price;
  const adminFee = PAYMENT_METHODS[selectedPaymentMethod].fee;
  const total = basePrice + adminFee;

  if (totalBayarText) {
    totalBayarText.innerHTML = `Total: <strong style="color:var(--primary); font-size:16px;">${formatRupiah(total)}</strong>`;
  }
}

/* --- Submit Order Flow (Screen transitions to Gateway) --- */
if (bayarBtn) {
  bayarBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const userId = inputUserId.value.trim();
    if (!userId) {
      showToast('⚠️ Masukkan User ID / Akun ID terlebih dahulu!');
      shakeGrid();
      return;
    }

    if (!selectedDiamondObj) {
      showToast('⚠️ Pilih nominal item (diamond/UC/Genesis)!');
      shakeGrid();
      return;
    }

    // Jika user belum memverifikasi ID, otomatis verifikasi simulasi
    if (!isUserVerified) {
      const serverVal = selectGameServer ? selectGameServer.value : 'Asia';
      // Generate nickname default
      currentVerificationUsername = 'User_' + Math.floor(1000 + Math.random() * 9000);
      isUserVerified = true;
    }

    // Beralih ke layar simulasi Payment Gateway
    showToast('💳 Mengarahkan ke halaman pembayaran...');
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

/* --- Layar 2: Buka Simulasi Payment Gateway --- */
function openPaymentGateway() {
  // Matikan orbs animasi agar ponsel responsif
  const orbs = document.querySelector('.bg-orbs');
  if (orbs) orbs.style.opacity = '0.3';

  // Toggle Screen
  if (screenOrder) screenOrder.classList.remove('active');
  if (screenGateway) screenGateway.classList.add('active');

  // Hitung total
  const basePrice = selectedDiamondObj.price;
  const adminFee = PAYMENT_METHODS[selectedPaymentMethod].fee;
  const total = basePrice + adminFee;

  // Update detail pembayaran di layar gateway
  if (gateTotalAmount) gateTotalAmount.textContent = formatRupiah(total);

  // Switch view E-wallet (QRIS) vs Bank Transfer (VA)
  if (selectedPaymentMethod === 'qris' || selectedPaymentMethod === 'dana') {
    if (qrisView) qrisView.style.display = 'block';
    if (vaView) vaView.style.display = 'none';
  } else {
    if (qrisView) qrisView.style.display = 'none';
    if (vaView) vaView.style.display = 'block';
    // Generate VA random code
    if (vaNumText) {
      vaNumText.textContent = '88012 ' + Math.floor(10000 + Math.random() * 90000) + ' ' + Math.floor(10000 + Math.random() * 90000);
    }
  }

  // Mulai Countdown Timer 10 Menit
  startCheckoutTimer(600); 
}

/* --- Countdown Timer Logic --- */
function startCheckoutTimer(duration) {
  clearInterval(checkoutTimer);
  let timer = duration, minutes, seconds;
  
  const updateTimer = () => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (gateTimer) gateTimer.textContent = `Selesaikan pembayaran dalam ${minutes}:${seconds}`;

    if (--timer < 0) {
      clearInterval(checkoutTimer);
      showToast('⚠️ Transaksi kedaluwarsa. Silakan coba kembali.');
      resetToOrderScreen();
    }
  };

  updateTimer();
  checkoutTimer = setInterval(updateTimer, 1000);
}

/* --- Copy VA Clipboard --- */
window.copyVA = function() {
  if (!vaNumText) return;
  const rawNum = vaNumText.textContent.replace(/\s/g, '');
  navigator.clipboard.writeText(rawNum).then(() => {
    showToast('📋 Nomor VA berhasil disalin!');
  }).catch(() => {
    showToast('⚠️ Gagal menyalin secara otomatis.');
  });
};

/* --- Layar 2 ➡️ Layar 3: Konfirmasi / Simulasi Sukses Bayar --- */
if (btnGatewaySuccess) {
  btnGatewaySuccess.addEventListener('click', function(e) {
    e.preventDefault();
    clearInterval(checkoutTimer);

    showToast('⚡ Mengonfirmasi transaksi...');
    
    setTimeout(() => {
      // 1. Tambah live counter transaksi global
      simulatedTxCount += 1;
      if (counterEl) {
        counterEl.textContent = simulatedTxCount.toLocaleString('id-ID') + '+';
      }

      // 2. Beralih ke layar sukses
      if (screenGateway) screenGateway.classList.remove('active');
      if (screenSuccess) screenSuccess.classList.add('active');

      // 3. Render Invoice Struk Detail
      const db = GAME_DB[currentActiveGame];
      const adminFee = PAYMENT_METHODS[selectedPaymentMethod].fee;
      const total = selectedDiamondObj.price + adminFee;
      
      const now = new Date();
      const formatTime = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

      if (succGame) succGame.textContent = db.name;
      if (succUser) succUser.textContent = `${inputUserId.value.trim()} (${currentVerificationUsername})`;
      if (succItem) succItem.textContent = selectedDiamondObj.name;
      if (succPay) succPay.textContent = PAYMENT_METHODS[selectedPaymentMethod].name;
      if (succTotal) succTotal.textContent = formatRupiah(total);
      if (succTxId) succTxId.textContent = 'PX' + Math.random().toString(36).substring(2, 9).toUpperCase();
      if (succSN) succSN.textContent = 'SN-' + Math.floor(100000000 + Math.random() * 900000000);
      if (succDate) succDate.textContent = formatTime;

      showToast('🎉 Pembayaran Sukses! Diamond Anda sudah dikirim.');
    }, 1200);
  });
}

/* --- Layar 3 ➡️ Layar 1: Selesai & Reset Form --- */
if (btnSuccessFinish) {
  btnSuccessFinish.addEventListener('click', function(e) {
    e.preventDefault();
    resetToOrderScreen();
  });
}

function resetToOrderScreen() {
  clearInterval(checkoutTimer);
  
  // Reset orbs opacity
  const orbs = document.querySelector('.bg-orbs');
  if (orbs) orbs.style.opacity = '1';

  // Toggle View
  if (screenSuccess) screenSuccess.classList.remove('active');
  if (screenGateway) screenGateway.classList.remove('active');
  if (screenOrder) screenOrder.classList.add('active');

  // Reset inputs
  if (inputUserId) inputUserId.value = '';
  isUserVerified = false;
  currentVerificationUsername = '';
  
  const msgEl = document.getElementById('userVerifyMsg');
  if (msgEl) {
    msgEl.className = 'user-verification-msg';
    msgEl.style.display = 'none';
  }

  // Reset selected diamond & payments
  selectedDiamondObj = null;
  document.querySelectorAll('.diamond').forEach(d => d.classList.remove('selected'));
  
  // Default to QRIS
  selectPayment('qris');
  updateTotalPayment();
}

/* ===== INITIALIZE ON LOAD ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Load Default Mobile Legends Diamonds
  switchGame('ml');
  
  // Inject keyframe getar (shake) untuk fallback visual
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
