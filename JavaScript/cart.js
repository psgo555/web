// item:那筆商品物件
// cart:整個陣列

// 1.讀取購物車資料:
// 建立讀取購物車函式
function getCart() {
  const raw = localStorage.getItem('cart')
  // 將資料轉回陣列;沒資料轉空陣列
  return raw ? JSON.parse(raw) : []
}

// 2.渲染畫面:
// 建立儲存購物車函式 -> 將新的購物車資料存進
function saveCart(cart) {
  // 將更新後的購物車陣列 -> 轉字串
  localStorage.setItem('cart', JSON.stringify(cart))
}
// 抓取購物車清單容器
const cartList = document.querySelector('.cart-list')
// 抓取金額總計
const cartTotal = document.querySelector('.cart-total')
// 抓取清空購物車按鈕
const clearBtn = document.querySelector('.cart-clear')

// 建立更新購物車畫面函式
function renderCart() {
  // 確認清單容器和總計元素是否存在
  if (!cartList || !cartTotal) return
  // 讀取目前購物車資料 -> 產生清單用
  const cart = getCart()
  //  將表頭匯入
  let html = `
          <div class="cart-row cart-header">
          <div>商品</div>
          <div>單價</div>
          <div>數量</div>
          <div>小計</div>
          <div>操作</div>
          </div>
        `
  let total = 0

  // 遍歷購物車陣列 -> 逐一處理
  cart.forEach((item) => {
    const subtotal = item.price * item.qty
    total += subtotal
    // 將商品列匯入
    html += `
    <div class="cart-row" data-id="${item.id}">
          <div class="cart-product">
            <img src="${item.img}">
            <span>${item.name}</span>
          </div>
          <div class="cart-price">$${item.price}</div>
          <div class="cart-qty">
            <button class="qty-minus">-</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-plus">+</button>
          </div>
          <div class="cart-subtotal">$${subtotal}</div>
          <div><button class="cart-remove">刪除</button></div>
        </div>
    `
  });
  // 將拼好的(表頭、商品列)html 塞入畫面
  cartList.innerHTML = html
  // 更新總計金額文字 -> 純文字
  cartTotal.textContent = `總計:$${total}`
}
// 當頁面一載入就將內容渲染出
renderCart()

// 清空購物車功能
if (clearBtn) {
  // 點擊清空事件
  clearBtn.addEventListener('click', () => {
    // 將購物車儲存成空陣列
    saveCart([]) //呼叫函式要寫()
    // 清空後重新渲染
    renderCart()
  })
}

// 綁定 + / - / 刪除 事件
// 1.從「按鈕」找到「那一列商品」
// 2.將那一列的 data-id 去購物車陣列找出對應的商品物件

// 確保清單存在才綁定
if (cartList) {
  cartList.addEventListener('click', (event) => {
    const target = event.target //實際點到的元素
    // 確保點擊的是HTML元素 
    if (!(target instanceof HTMLElement)) return //判斷是否為HTML元素
    // 將點到的按鈕往上找最近的.cart-row
    const row = target.closest('.cart-row')
    // 拿出data-id找對應的商品
    const id = row?.dataset.id // ?. -> 可選連結

    // 如未拿到商品id,則結束 -> 避免找不到對應商品
    if (!id) return
    // 取得購物車陣列 -> 找對應的商品
    const cart = getCart()
    // 從購物車陣列找出「被點到的那個商品」, p:每筆商品
    const item = cart.find((p) => p.id === id)
    // 如未找到商品,則停止
    if (!item) return

    // 處理「+」按鈕:

    // 判斷點到的元素是否為 +按鈕 (用class區分)
    if (target.classList.contains('qty-plus')) { //contains:是否包含
      item.qty += 1
      // 將更新後的購物車存回localStorage
      saveCart(cart)
      // 重新渲染畫面
      renderCart()
      return
    }

    // 處理「-」按鈕:
    if (target.classList.contains('qty-minus')) {
      // 取較大的值, 如數量-1變成0或負數, 則強制回至少1
      item.qty = Math.max(1, item.qty - 1) //最少為1
      saveCart(cart)
      renderCart()
      return
    }

    // 處理「刪除」按鈕:
    if (target.classList.contains('cart-remove')) {
      // filter:把被刪除的商品移除
      const nextCart = cart.filter((p) => p.id !== id)
      saveCart(nextCart)
      renderCart()
      return
    }
  })
}


