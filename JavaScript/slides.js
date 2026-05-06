// 製作banner區域的輪播圖
const banner = document.querySelector('.banner')
const slides = banner.querySelectorAll('.pic1 li')
// 圓點
const dots = banner.querySelectorAll('ol li')

// 目前顯示的圖片索引
let imgSlides = 0

// 把第index張圖顯示出,其餘隱藏,並同步更新圓點:
// 1.宣告函式,參數index代表要顯示第幾張
function showSlide(index) {
  //2. 把目前顯示的索引值更新成傳入的index
  imgSlides = index
  // 3.遍歷每張輪播圖
  slides.forEach((slide, i) => {
    // 4.如果這張索引i等於目前索引imgSlides,顯示block,否則隱藏
    if (i === imgSlides) {
      slide.style.display = 'block'
    } else {
      slide.style.display = 'none'
    }
  })
  // 5.加入圓點同步(逐一處理:forEach)
  // dots:所有圓點的集合，每次拿出一顆dot,i是順序
  dots.forEach((dot, i) => {
    if (i === imgSlides) {
      // 控制dot這元素的class
      dot.classList.add('current')
    } else {
      dot.classList.remove('current')
    }
  })
}
// 6.點擊圓點切換
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i)
  })
})
// 自動輪播:
function nextSlides() {
  // 索引值+1,超過最後一張就回到0
  const nextIndex = (imgSlides + 1) % slides.length
  // 呼叫showSlides顯示哪一張
  showSlide(nextIndex)
}
showSlide(imgSlides)
// 每三秒輪播(放最後)
setInterval(nextSlides, 3000)

// 製作熱門品牌區域的輪播:
// 目標:每按一次箭頭,列表要整頁移動
const brand = document.querySelector('.brand')

if (brand) {
  const brandList = brand.querySelector('.bd ul');
  const brandItems = brand.querySelectorAll('.bd li')
  // 找到左箭頭
  const prevBtn = brand.querySelector('.button .prev')
  // 找到右箭頭
  const nextBtn = brand.querySelector('.button .next')
  // 確認清單、項目、左右箭頭都存在(保護用)
  if (brandList && brandItems.length && prevBtn && nextBtn) {
    // 每頁顯示5個
    const perPage = 5
    // 計算有幾頁(x個 / 5) -> 大於5就變成第二頁
    const totalPages = Math.ceil(brandItems.length / perPage)
    // 最大頁面索引
    const maxIndex = totalPages - 1
    // 設定當前頁面在第幾頁
    let pageIndex = 0
    // 計算移動距離(每品牌列表li之間的間距)
    const gap = 16
    // 建立更新輪播位置 -> 移動列表+更新箭頭顏色
    function updateBrand() {
      // 量出元素的尺寸與位置 -> 只計算第一個li的卡片寬度
      const itemWidth = brandItems[0].getBoundingClientRect().width

      // 當前頁面要移動多少距離:
      // 整頁寬度 = (每頁卡片數 * 卡片寬度) + (卡片間距 * 卡片間隔數)
      const pageWidth = perPage * itemWidth + (perPage - 1) * gap;
      // pageIndex -> 第幾頁就移動幾倍
      // perPage * itemWidth -> 一頁的總寬
      // (perPage - 1) * gap -> 一頁中間的總間距
      const shift = pageIndex * pageWidth;

      // 把清單往左移
      brandList.style.transform = `translateX(${-shift}px)`
      // 更新左右箭頭顏色 -> 如果在第一頁,加上is-disabled讓左箭頭變灰 不能點
      prevBtn.classList.toggle('is-disabled', pageIndex === 0)
      // 如果在最後一頁,就把右箭頭變灰、不能點,不是最後一頁就恢復正常
      nextBtn.classList.toggle('is-disabled', pageIndex === maxIndex) //maxIndex:最後一頁的索引
      // 不是第一頁 -> 左箭頭變可點擊的綠色
      prevBtn.classList.toggle('is-active', pageIndex !== 0);
      // 不是最後一頁 -> 右箭頭變可點擊的綠色
      nextBtn.classList.toggle('is-active', pageIndex !== maxIndex); //maxIndex:最後一頁的索引
    }
    // 綁定左箭頭點擊事件
    prevBtn.addEventListener('click', (event) => {
      event.preventDefault() // 阻止預設行為
      // 判斷當前不是第一頁才允許往左
      if (pageIndex > 0) {
        // 將目前頁數往前一頁
        pageIndex -= 1;
        // 更新輪播位置與箭頭顏色
        updateBrand();
      }
    })
    // 綁定右箭頭點擊事件
    nextBtn.addEventListener('click', (event) => {
      event.preventDefault() // 阻止預設行為
      // 還沒到最後一頁才允許往右
      if (pageIndex < maxIndex) {
        pageIndex += 1;
        updateBrand();
      }
    })
    // 當視窗大小改變重新計算寬度與位置,resize:視窗大小改變
    window.addEventListener('resize', updateBrand);
    updateBrand();
  }
}