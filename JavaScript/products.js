function renderProducts(items) {
  const list = document.querySelector(".goods .bd ul");
  if (!list) return;

  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    li.dataset.name = item.name;
    li.dataset.price = item.price;
    li.dataset.img = item.img;

    li.innerHTML = `
      <a href="#">
        <div class="pic"><img src="${item.img}" alt="">
          <button class="add-to-cart">加入購物車</button>
        </div>
        <div class="txt">
          <h4>${item.name}</h4>
          <p>$<span>${item.price}</span></p>
        </div>
      </a>
    `;

    list.appendChild(li);
  });
}

async function loadProducts() {
  try {
    const res = await fetch("../api/products.php");
    if (!res.ok) throw new Error(String(res.status));
    const items = await res.json();
    renderProducts(items);
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
