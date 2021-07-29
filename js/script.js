$(document).ready(function() {
  // 공통 변수 선언
  const $cnt = $('#contents .section'); // home, portfolio, about me
  const total = $cnt.length; // $cnt 개수
  let cntY = new Array(total); // 각 $cnt마다 높이값
  for (let i = 0; i < total; i++){
    cntY[i] = $cnt.eq(i).offset().top;
  }
  let timerScroll = 0;
  const $ipodList = $('#ipodScreen ul li a');
  
  // 마우스 커서
  $('body').on('mousemove', function(e){
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    if(mouseX <= 1700){
      gsap.to('.first_cursor', {left: mouseX - 15, top: mouseY - 15});
      gsap.to('.second_cursor', {left: mouseX - 25, top: mouseY - 25, duration: 0.3, delay: 0.1});
    }
    if(mouseY >= cntY[2]) {
      $('cursor_wrap').addClass('d_n');
    } else{$('.cursor_wrap').removeClass('d_n');}
  });

  // intro ↓버튼
  $('#intro .arrow').on('click', function(){
    if($('html, body').is(':animated')) return false;
    $('html, body').stop().animate({scrollTop: $('#welcome').offset().top}, 800, 'easeOutBack')
  });

  // ipod nav 제어
  $('#ipod .btn_ipod').on('click', function(){
    const $ipod = $('#ipod');
    const $ipodBtn = $(this);
    const $ctrlBtn = $ipod.find('.btn_ctrl button');
    const $first = $ipod.find('.first');
    const $last = $ipod.find('.last');
    const $close = $ipod.find('.close');
    const $end = $ipod.find('end');
    let listNum;
    
    // 클릭하면 .click 없애고, 탭인덱스 없애고, first에 포커스 들어오기
    $ipod.stop().animate({left: '30%'}).attr({tabIndex: -1}).find('.click').addClass('d_n').parent().parent().siblings().attr({'aria-hidden': true, inert: ''});
    $('.first').focus();
    
    // 밖의 영역에 scroll 안되게 하기
    $('html, body').css({height: $('#contents').outerHeight(), overflow: 'hidden'});

    // #dim 동적생성
    $ipodBtn.before('<div id="dim"></div>');
    const $dim = $('#dim');
    $dim.stop().fadeIn();

    // 포커스 ipod 안에서 움직이기(first last)
    $first.on('keydown', function(e){
      if (e.shiftKey && e.keyCode === 9){
        e.preventDefault();
        $last.focus();
      }
    });
    $last.on('keydown', function(e){
      if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      $first.focus();
      }
    });

    // 닫기 버튼 
    $close.on('click', function(){
      $dim.stop().fadeOut(function(){
        $(this).remove();
      });
      $ipod.stop().animate({left: '98%', marginLeft: 0}).find('.click').removeClass('d_n').parent().parent().attr({tabIndex: 0}).siblings().removeAttr('aria-hidden inert');
      $ipodBtn.focus();
      $('html, body').removeAttr('style');
    });
    // #dim 클릭
    $dim.on('click', function(){
      $close.trigger('click');
    })
    $(window).on('keydown', function (e) {
      if (e.keyCode === 27) $close.click();
    });

    
    // $ipodList (a태그) 한 번 클릭
    $ipodList.on('click', function(){
      $(this).parent().addClass('on').siblings().removeClass('on');
      return false;
    });
    // 더블클릭
    $ipodList.dblclick(function(){
      if ($('html, body').is(':animated')) return false;
      listNum = $(this).parent().index();
      $('html, body').stop().animate({scrollTop: cntY[listNum]}, 500, 'easeOutBack', a11y);
    });
    
    // 접근성 함수
    // 현재본문
    function a11y(){
    $cnt.eq(listNum).removeAttr('aria-hidden inert').find('a, button').removeAttr('tabIndex');
    $cnt.eq(listNum).find('.tabIndex').attr('tabIndex', 0);
    // 나머지 본문
    $cnt.eq(listNum).siblings().attr({'aria-hidden': true, inert: ''}).find('a, button, .tabIndex').attr('tabIndex', -1);
    }
  });

  // scroll
  $(window).on('scroll', function(){
    clearTimeout(timerScroll);
    timerScroll = setTimeout(function(){
      $ipodList.each(function(idx){
        if ($(window).scrollTop() >= cntY[idx]){
          $(this).parent().addClass('on').siblings().removeClass('on');
          listNum = idx;
          a11y();
        }
      });
    }, 20);
  });
  


});
