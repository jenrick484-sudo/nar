const backendUrl = 'https://narva-backend.onrender.com/api';

document.getElementById('salesForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const product = document.getElementById('product').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  await fetch(`${backendUrl}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, quantity, price })
  });

  loadSales();
  loadTotal();
});

async function loadSales() {
  const res = await fetch(`${backendUrl}/sales`);
  const data = await res.json();
  const list = document.getElementById('salesList');
  list.innerHTML = '';
  data.forEach(sale => {
    const li = document.createElement('li');
    li.textContent = `${sale.product} - ${sale.quantity} pcs @ ${sale.price} (Date: ${sale.date})`;
    list.appendChild(li);
  });
}

async function loadTotal() {
  const res = await fetch(`${backendUrl}/sales/total`);
  const data = await res.json();
  document.getElementById('totalSales').textContent = data.total_sales || 0;
}

loadSales();
loadTotal();