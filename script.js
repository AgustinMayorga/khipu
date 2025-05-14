document.getElementById('payment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const payerName = document.getElementById('payer-name').value;
  const amount = document.getElementById('amount').value;

  const data = {
    subject: "Pago de prueba desde GitHub Pages",
    amount: amount,
    currency: "CLP",
    payer_name: payerName,
    transaction_id: "demo-" + Math.floor(Math.random() * 100000),
    return_url: "https://AgustinMayorga.github.io/khipu/gracias.html"
  };

  // Preparar los headers
  const basicAuth = btoa("498311:d073e82a4bab1efa6dbe0cb65ea1b9ac01ad7807"); // sólo para pruebas

  fetch("https://khipu.com/api/2.0/payments", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + basicAuth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.payment_url) {
        document.getElementById("response").innerHTML = `<a href="${json.payment_url}" target="_blank">Ir al link de pago (sandbox)</a>`;
      } else {
        document.getElementById("response").textContent = JSON.stringify(json, null, 2);
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("response").textContent = "Error: " + err.message;
    });
});
