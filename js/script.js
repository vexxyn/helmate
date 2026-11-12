(function () {
  // ===== EDIT DI SINI =====
  var WA = "6285222134009";          // nomor WhatsApp (format 62)
  var BASE = 35000;                  // harga normal per botol
  var LEFT = 63, TOTAL = 200;        // sisa kuota dan total kuota
  var USED = "500+", RATE = "4,9";   // placeholder, ganti dengan data asli
  var P = {
    1: { n: 1, name: "1 Botol", price: 35000 },
    2: { n: 2, name: "2 Botol", price: 60000 },
    3: { n: 3, name: "3 Botol", price: 80000 }
  };
  // ========================

  var sel = 3; // paket terpilih otomatis
  var box = document.getElementById("packs");
  function all(q) { return [].slice.call(document.querySelectorAll(q)); }
  function rp(v) { return "Rp" + Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

  // Link WhatsApp dengan pesan otomatis sesuai paket
  function link(k) {
    var p = P[k];
    var msg = "Halo HELMATE! Gue mau pesan paket " + p.name + " (" + rp(p.price) + ").\n\nNama:\nAlamat lengkap:\nBayar: transfer / COD";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
  }

  // Render 3 kartu harga (harga per botol dan hemat dihitung otomatis)
  box.innerHTML = Object.keys(P).map(function (k) {
    var p = P[k], save = BASE * p.n - p.price, top = k == 3;
    return '<button type="button" class="pack' + (top ? ' top' : '') + '" data-k="' + k + '" aria-pressed="false">' +
      (top ? '<span class="pack-tag">PALING LAKU</span>' : '') +
      '<span class="pack-name">' + p.name + '</span>' +
      (save ? '<s>' + rp(BASE * p.n) + '</s>' : '<span></span>') +
      '<span class="pack-unit">' + rp(p.price / p.n) + ' per botol</span>' +
      '<span class="pack-price">' + rp(p.price) + '</span>' +
      (save ? '<span class="pack-save">Hemat ' + rp(save) + '</span>' : '') +
      '</button>';
  }).join("");

  // Sinkronkan kartu, link semua tombol, dan label tombol beli
  function update() {
    all(".pack").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.dataset.k === sel)); });
    all("[data-cta]").forEach(function (a) { a.href = link(a.dataset.pack || sel); });
    all(".sel-name").forEach(function (e) { e.textContent = P[sel].name; });
    all(".sel-price").forEach(function (e) { e.textContent = rp(P[sel].price); });
  }

  box.addEventListener("click", function (e) {
    var b = e.target.closest(".pack");
    if (b) { sel = +b.dataset.k; update(); }
  });

  document.getElementById("used").textContent = USED;
  document.getElementById("rate").textContent = RATE;
  document.getElementById("ql").textContent = LEFT;
  update();

  // Bar kuota terisi sekali saat halaman dibuka
  setTimeout(function () {
    document.getElementById("qb").style.width = Math.round((TOTAL - LEFT) / TOTAL * 100) + "%";
  }, 250);
})();
