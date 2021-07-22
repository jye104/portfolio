$(document).ready(function() {
  let listNum
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



  //  ipod 제어 
  $('#ipod .btn_ipod').on('click',function(){
    const $ipod = $('#ipod');
    const $ipodBtn = $(this);
    const $ctrlBtn = $ipod.find('.btn_ctrl');
    const $ipodList = $('#ipodScreen .ipod_list a');
    const $first = $ipod.find('.first');
    const $last = $ipod.find('.last');
    const $close = $('#ipod .close');
    const $cnt = $('#contents .section');
    const total = $cnt.length;
    let cntY;
    cntY = new Array(total);
    for (let i=0; i<total; i++){
      cntY[i] = $cnt.eq(i).offset().top;
    }
    //console.log($first, $last);
    
    // 클릭하면 나오고 '.click' 없애기
    $ipodBtn.parent($ipod).stop().animate({left: '50%', marginLeft: '-238.5px'}).find('.click').addClass('d_n').parent().attr({tabIndex: -1});
    
    // #dim 동적생성
    $ipod.siblings().attr({'aria-hidden': true, inert: ''});
    $ipodBtn.before('<div id="dim"></div>');
    const $dim = $('#dim');
    $dim.stop().fadeIn();


    // 키보드 트래핑 - first, last 요소 제어
    $first.on('keydown', function (e) {
      console.log(e.keyCode); // tab -> 9
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $last.focus();
      }
    });
    $last.on('keydown', function(e){
      if (!e.shiftKey && e.keycode ===9){
        e.preventDefault();
        $first.focus();
      }
    });

    // 닫기버튼
    $close.on('click', function(){
      $dim.stop().fadeOut(function(){
        $(this).remove();
      });
      $ipod.stop().animate({left: '98%', marginLeft: 0}).find('.click').removeClass('d_n').parent().attr({tabIndex: 0}).siblings().removeAttr('aria-hidden inert');
      $ipodBtn.focus();
    });
    // #dim 클릭
    $dim.on('click',function(){
      $close.trigger('click');
    });
    // esc로 닫기
    $(window).on('keydown', function(e){
      if(e.keyCode===27) $close.click();
    });

    // $ipodList(a태그) 제어
    $ipodList.on('click', function(){
      $('#ipodScreen .ipod_list li').removeClass('on');
      $(this).parent().addClass('on');
      return false;
    });
    $ipodList.dblclick(function(){
      if ($('html, body').is(':animated')) return false;
      listNum = $(this).parent().index();
      // console.log(listNum)
      $('html, body').stop().animate({scrollTop: cntY[listNum]}, 700, 'easeOutBack', a11y);
    });

    // .btn_ctrl 제어
    $ctrlBtn.on('click', function(){

    });



  function a11y(){
    // 현재 본문
    $cnt.eq(listNum).removeAttr('aria-hidden inert').find('a, button').removeAttr('tabIndex'); 
    $cnt.eq(listNum).find('.tabIndex').attr('tabIndex', 0)
    // 나머지 본문들
    $cnt.eq(listNum).siblings().attr({'aria-hidden': true, 'inert': ''}).find('a, button, .tabIndex').attr('tabIndex', -1);
  }
  });




});