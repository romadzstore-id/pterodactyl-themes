function randomPassword() {
  return Math.random().toString(36).slice(-10) + "@SC";
}

async function buatTransaksi() {
  const user = username.value;
  let pass = password.value || randomPassword();
  const paket = paketSelect = document.getElementById("paket").value;

  if (!user) return alert("Username wajib diisi!");

  const ref = "SC" + Date.now();

  const data = new URLSearchParams({
    api_key: ATLANTIC_CONFIG.api_key,
    code: PAKET[paket].code,
    reff_id: ref,
    target: user,
    limit_price: PAKET[paket].price
  });

  const res = await fetch(ATLANTIC_CONFIG.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data
  });

  const json = await res.json();

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("result").innerHTML = `
    <h3>✅ Transaksi Dibuat</h3>
    <p>Status: ${json.data.status}</p>
    <p>Username: <b>${user}</b></p>
    <p>Password: <b>${pass}</b></p>
    <button onclick="navigator.clipboard.writeText('${user}|${pass}')">
      Salin Data Login
    </button>
    <a href="https://panel.yourdomain.com" target="_blank">
      <button>Login Panel</button>
    </a>
  `;
}