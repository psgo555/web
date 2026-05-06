// 購物車 (localStorage)
// 1.點擊「加入購物車」
// 2.從 localStorage 讀出 目前購物車
// 3.將商品加入及數量+1
// 4.再將更新後的購物車存回localStorage
// 5.更新右上角數量
// 註: localStorage 只能存字串

// 目標:用陣列儲存
// {
//   id:"goods1"
//   name:"商品名稱"
//   price:"3820"
//   img:"../uploads/goods1.png"
//   qty:1
// }

function getCart() {
  // 1.讀取: getItem拿到的是「字串」
  const raw = localStorage.getItem("cart")

  // 2.轉回陣列/物件
  const cart = raw ? JSON.parse(raw) : []
  // let cart
  // if (raw) {
  //   cart = JSON.parse(raw)
  // } else {
  //   cart = []
  // }
  return cart
}

// 3.存回 localStorage:(購物車跳轉頁面)
function saveCart(cart) {
  // 4.將(陣列/物件) 變成字串,再 setItem
  localStorage.setItem("cart", JSON.stringify(cart))
}

// 更新右上角購物車數量:
// 5.抓取購物車的數量
const cartCount = document.querySelector(".cart span")
// 6.購物車總數:先拿資料 → 準備加總
function renderCartCount() {
  const cart = getCart()
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    // 總數 += 這個商品的數量
    total += cart[i].qty
  }
  // 將算好的總是顯示到右上方, textContent:元素內的文字內容
  cartCount.textContent = total
}
renderCartCount()

// 當點擊按鈕，把商品資料加進購物車並更新數量:

// 使用事件代理，動態渲染的商品也能加入購物車
const goodsList = document.querySelector(".goods .bd")
if (goodsList) {
  goodsList.addEventListener("click", (event) => {
    const btn = event.target.closest(".add-to-cart")
    if (!btn) return

    // 因按鈕放在 a 標籤裡面，點擊會觸發連結的預設行為
    event.preventDefault()

    // 找到這按鈕所在的那個商品 <li>
    const itemEl = btn.closest("li")
    if (!itemEl) return

    // 用id判斷購物車是否有這商品
    const id = itemEl.dataset.id
    const name = itemEl.dataset.name
    const price = +itemEl.dataset.price // 價格轉成數字樣式
    const img = itemEl.dataset.img
    // 拿到目前購物車內容 -> 回傳購物車陣列
    const cart = getCart()
    // 看購物車是否有無該商品:
    // find:找第一個符合條件的商品 -> 條件:將商品id跟讀到id是否一致
    const exist = cart.find((item) => item.id === id)
    if (exist) {
      exist.qty += 1
    } else {
      // 否則往購物車陣列新增一筆
      cart.push({ id, name, price, img, qty: 1 })
    }
    // 存回localStorage
    saveCart(cart) // 將最新購物車存回去
    renderCartCount() // 立即更新右上角數字(不用刷新)
  })
}



