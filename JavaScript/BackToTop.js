// 置頂按鈕:
const BackToTopbtn = document.querySelector('.back-to-top')
// 事件監聽(發生在window上)
window.addEventListener('scroll', () => {
  // 當畫面垂直滾動大於80px
  if (window.scrollY > 80) {
    BackToTopbtn.style.display = 'flex'
  } else {
    BackToTopbtn.style.display = 'none'
  }
})

// 點擊按鈕返回頂部:
BackToTopbtn.addEventListener('click', () => {
  // 將頁面捲動到指定位置 (平滑捲動)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})