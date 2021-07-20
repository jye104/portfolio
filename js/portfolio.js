$(document).ready(function() {
  // 마우스 효과
  $('body').on('mousemove', function(e){
    // 스크롤바가 이동한 거리를 포함
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    console.log(mouseX, mouseY);
    gsap.to('.cursor', {left: mouseX-150, top: mouseY-150, /* duration: 0.3 , delay: 0.1*/});
  });
});