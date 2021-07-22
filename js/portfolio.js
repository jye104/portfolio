$(document).ready(function () {
  let listNum
  // 마우스 커서 효과
  $('body').on('mousemove', function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    //console.log(mouseX)
  //   if(mouseX >= 1530){
  //       $('body').addClass('overflowX');
  //       gsap.to('.cursor', {left: mouseX - 100, top: mouseY - 100});
  //   } else{
  //   gsap.to('.cursor', {left: mouseX - 100, top: mouseY - 100});
  // }


    // gsap.to('.second_cursor', {duration: 0.3, delay: 0.1});
  });

  /*   $('body').addClass('overflowy');
  $('#intro').stop().delay(8000).fadeOut('slow', function () {
    $('body').removeClass('overflowy');
  }); */

  //  ipod 제어 
  $('#ipod .btn_ipod').on('click', function () {
    const $ipod = $('#ipod');
    const $ipodBtn = $(this);
    const $ctrlBtn = $ipod.find('.btn_ctrl button');
    const $ipodList = $('#ipodScreen .ipod_list a');
    const $first = $ipod.find('.first');
    const $last = $ipod.find('.last');
    const $close = $ipod.find('.close');
    const $end = $ipod.find('.end');
    const $cnt = $('#contents .section');
    const total = $cnt.length;
    let cntY = new Array(total);
    for (let i = 0; i < total; i++) {
      cntY[i] = $cnt.eq(i).offset().top;
    }
    console.log($end, typeof $end);

    // 클릭하면 나오고 '.click' 없애기
    $ipodBtn.parent($ipod).stop().animate({left: '50%',marginLeft: '-238.5px'}).find('.click').addClass('d_n').parent().attr({
      tabIndex: -1
    });

    // #dim 동적생성
    $ipod.siblings().attr({
      'aria-hidden': true, inert: ''
    });
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
    $last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $first.focus();
      }
    });

    // 닫기버튼
    $close.on('click', function () {
      $dim.stop().fadeOut(function () {
        $(this).remove();
      });
      $ipod.stop().animate({
        left: '98%',
        marginLeft: 0
      }).find('.click').removeClass('d_n').parent().attr({
        tabIndex: 0
      }).siblings().removeAttr('aria-hidden inert');
      $ipodBtn.focus();
    });
    // #dim 클릭
    $dim.on('click', function () {
      $close.trigger('click');
    });
    // esc로 닫기
    $(window).on('keydown', function (e) {
      if (e.keyCode === 27) $close.click();
    });

    // $ipodList(a태그) 제어
    $ipodList.on('click', function () {
      $ipodList.parent().removeClass('on');
      $(this).parent().addClass('on');
      return false;
    });
    $ipodList.dblclick(function () {
      if ($('html, body').is(':animated')) return false;
      listNum = $(this).parent().index();
      // console.log(listNum)
      $('html, body').stop().animate({
        scrollTop: cntY[listNum]
      }, 700, 'easeOutBack', a11y);
    });

    // .btn_ctrl 제어
    $ctrlBtn.on('click', function () {
      if ($(this).parent().is('.btn_left')) {
        if ($ipodList.parent('.on').children().is('.first')) {
          $first.parent().removeClass('on');
          $end.parent().addClass('on');
        } else {
          $ipodList.parent('.on').removeClass('on').prev().addClass('on');
        }
      } else if ($(this).parent().is('.btn_right')) {
        if ($ipodList.parent('.on').children().is('.end')) {
          $end.parent().removeClass('on');
          $first.parent().addClass('on');
        } else {
          $ipodList.parent('.on').removeClass('on').next().addClass('on');
        }
      } else if ($(this).parent().is('.btn_play')) {
        if ($('html, body').is(':animated')) return false;
        listNum = $ipodList.parent('.on').index();
        $('html, body').stop().animate({
          scrollTop: cntY[listNum]
        }, 700, 'easeOutBack', a11y);
      }
    });

    // 접근성 추가
    function a11y() {
      // 현재 본문
      $cnt.eq(listNum).removeAttr('aria-hidden inert').find('a, button').removeAttr('tabIndex');
      $cnt.eq(listNum).find('.tabIndex').attr('tabIndex', 0)
      // 나머지 본문들
      $cnt.eq(listNum).siblings().attr({
        'aria-hidden': true,
        'inert': ''
      }).find('a, button, .tabIndex').attr('tabIndex', -1);
    }
  });

  // portfolio
  // $(window).on('scroll', function(){
  //   const scrollY = $(this).scrollTop()/*  + $(this).height()*2/3 */;
  //   console.log(scrollY);

  //   if(scrollY > $('#cnt2').offset().top + 20){
  //     //gsap.to('.computer', {left: -300, top: 600, transform: 'scale(1)'});
  //     $('.intro_sulwhasoo').addClass('on');
  //   } else {
  //     $('.intro_sulwhasoo').removeClass('on');
  //   }

  //     if(scrollY >= 1355){
  //       $('.brand_txt').addClass('on');
  //     } else{
  //       $('.brand_txt').removeClass('on');
  //     }
  // });




});