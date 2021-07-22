$(document).ready(function() {
  // 마우스 커서 효과
  $('body').on('mousemove', function(e){
    // 스크롤바가 이동한 거리를 포함
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    // console.log(mouseX, mouseY);
    gsap.to('.cursor', {left: mouseX-100, top: mouseY-100});
    // gsap.to('.second_cursor', {duration: 0.3, delay: 0.1});

  });
/*   $('body').addClass('overflowy');
  $('#intro').stop().delay(8000).fadeOut('slow', function () {
    $('body').removeClass('overflowy');
  }); */

  const $ipod = $('#cnt1 .ipod');
  // cnt1 ipod button 클릭해서 cnt2로 이동하기
  // $ipod.on('click', function(){
  //   $(this).animate({left: '400px'}, 1000, function(){
  //     $(this).css('position','fixed');
  //     // 윈도우창을 cnt2로 이동하기
  //     $('html, body').stop().animate({scrollTop: $('#cnt2').offset().top}, 700, function(){
  //       $ipod.find('.click').addClass('hidden');
  //     });
  //   });
  // });
    

});