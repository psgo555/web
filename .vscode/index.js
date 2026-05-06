// Banner slideshow: 輪播圖一次只顯示一張並自動播放
const banner = document.querySelector('.banner');
const slides = banner.querySelectorAll('.pic1 li');
// 輪播圖圓點
const dots = banner.querySelectorAll('ol li');

// 目前顯示的圖片索引（從 0 開始）
let currentIndex = 0;

// 顯示指定索引的圖片
function showSlide(index) {
  // 更新目前索引
  currentIndex = index;
  // 逐一遍歷每張圖 -> forEach:(把陣列裡的每一個元素都拿出來做一次)
  slides.forEach((slide, i) => {
    // 只顯示目前那一張
    slide.style.display = i === currentIndex ? 'block' : 'none';
  });
  //  逐一遍歷每個圓點
  dots.forEach((dot, i) => {
    // 讓目前索引的圓點加上 current
    dot.classList.toggle('current', i === currentIndex);
  });
}

// 切到下一張圖
function nextSlide() {
  // 計算下一張索引（超過回到 0)
  const nextIndex = (currentIndex + 1) % slides.length;
  //  顯示下一張
  showSlide(nextIndex);
}

// 初始化並開始自動播放:
// 頁面載入先顯示第一張
showSlide(currentIndex);
// 每三秒切換
setInterval(nextSlide, 3000);

// 滑鼠點圓點->顯示點擊的當前圖片
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
  });
});

// 取得購物車資料
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
// 儲存購物車資料
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 更新右上角購物車數量徽章
const cartCount = document.querySelector('.cart span');
function renderCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = total;
}
// 頁面載入先渲染一次
renderCartCount();

// 逐一幫每個按鈕綁定點擊事件
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    // 防止點擊按鈕造成 <a href="#"> 跳到頂端
    event.preventDefault();
    event.stopPropagation();

    // 從按鈕往上找到該商品的 <li>
    const itemEl = btn.closest('li');

    // 讀取 <li> 上的 data- 資料
    const id = itemEl.dataset.id;
    const name = itemEl.dataset.name;
    const price = Number(itemEl.dataset.price); // 轉成數字
    const img = itemEl.dataset.img;

    // 取得目前購物車資料
    const cart = getCart();

    // 檢查購物車裡是否已經有這個商品
    const exist = cart.find(item => item.id === id);

    if (exist) {
      // 有的話，數量 +1
      exist.qty += 1;
    } else {
      // 沒有的話，新增一筆商品
      cart.push({ id, name, price, img, qty: 1 });
    }

    // 存回 localStorage
    saveCart(cart);
    // 立刻更新徽章數量（不需刷新）
    renderCartCount();
  });
});

// 回到頂部按鈕：滾動時顯示，點擊回頂部
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 80 ? 'flex' : 'none';
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 熱門品牌輪播：點箭頭切換，並更新箭頭顏色
const brand = document.querySelector('.brand');
if (brand) {
  const brandList = brand.querySelector('.bd ul');
  const brandItems = brand.querySelectorAll('.bd li');
  const prevBtn = brand.querySelector('.button .prev');
  const nextBtn = brand.querySelector('.button .next');

  const perPage = 5;
  const maxIndex = Math.max(0, Math.ceil(brandItems.length / perPage) - 1);
  let pageIndex = 0;

  function updateBrand() {
    const itemWidth = brandItems[0]?.getBoundingClientRect().width || 244;
    const gap = 16;
    const shift = perPage * itemWidth + (perPage - 1) * gap;
    brandList.style.transform = `translateX(${-pageIndex * shift}px)`;

    // 兩頁循環輪播：箭頭永遠可點
    prevBtn.classList.add('is-active');
    nextBtn.classList.add('is-active');
    prevBtn.classList.remove('is-disabled');
    nextBtn.classList.remove('is-disabled');
  }

  prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // 往左：第一頁時跳到最後一頁
    pageIndex = pageIndex === 0 ? maxIndex : pageIndex - 1;
    updateBrand();
  });

  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // 往右：最後一頁時回到第一頁
    pageIndex = pageIndex === maxIndex ? 0 : pageIndex + 1;
    updateBrand();
  });

  window.addEventListener('resize', updateBrand);
  updateBrand();
}
