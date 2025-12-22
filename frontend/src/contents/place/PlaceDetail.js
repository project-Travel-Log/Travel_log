// function changeImage(imageSrc) {const mainImage = document.querySelector('.spg-subheader-image');mainImage.src = imageSrc;}


//  // 하트 버튼 클릭 이벤트
//     document.querySelectorAll('.heart-btn').forEach(btn => {
//       btn.addEventListener('click', function() {
//         if (this.textContent === '♡') {
//           this.textContent = '♥';
//           this.style.color = '#ff6b6b';
//           this.style.borderColor = '#ff6b6b';
//         } else {
//           this.textContent = '♡';
//           this.style.color = '';
//           this.style.borderColor = '#ddd';
//         }
//       });
//     });

//     // 상세 정보 버튼 클릭 이벤트
//     document.querySelectorAll('.detail-btn').forEach(btn => {
//       btn.addEventListener('click', function() {
//         alert('상세 정보 페이지로 이동합니다.');
//       });
//     });

// placeDetail.js

export function initHeartButtons() {
  document.querySelectorAll('.heart-btn').forEach(btn => {
    btn.onclick = () => {
      if (btn.textContent === '♡') {
        btn.textContent = '♥'
        btn.style.color = '#FF0000'
        btn.style.borderColor = '#FF0000'
      } else {
        btn.textContent = '♡'
        btn.style.color = ''
        btn.style.borderColor = '#ddd'
      }
    }
  })
}

export function initDetailButtons() {
  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.onclick = () => {
      alert('상세 정보 페이지로 이동합니다.')
    }
  })
}
