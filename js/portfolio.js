$(document).ready(function () {
  // 마우스 커서 효과
  $('body').on('mousemove', function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    const cnt3Y = $('#cnt3').offset().top;
    //console.log(mouseX)
    if(mouseX >= 1700){
      $('body').addClass('overflowX');
    } else{
      gsap.to('.first_cursor', {left: mouseX - 15, top: mouseY - 15},'easeOutBounce');
      gsap.to('.second_cursor', {left: mouseX - 25, top: mouseY - 25}, );
      gsap.to('.second_cursor', {duration: 0.2, delay: 0.3});
    }
    if(mouseY >= cnt3Y) {$('.cursor_wrap').addClass('d_n');}
    else {$('.cursor_wrap').removeClass('d_n');}
  });
  
  // #intro ↓버튼
  $('#intro .arrow').on('click', function(){
    if ($('html, body').is(':animated')) return false;
    $('html, body').stop().animate({scrollTop: $('#welcome').offset().top}, 800, 'easeOutBack', a11y);

  });

  let listNum
  // #ipod 제어 
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
    $ipodBtn.parent($ipod).stop().animate({left: '30%'}).find('.click').addClass('d_n').parent().attr({
      tabIndex: -1
    });

    $ipod.siblings().attr({
      'aria-hidden': true, inert: ''
    });

    // #dim 동적생성
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
      $ipod.stop().animate({left: '98%', marginLeft: 0}).find('.click').removeClass('d_n').parent().attr({tabIndex: 0}).siblings().removeAttr('aria-hidden inert');
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
      $('html, body').stop().animate({scrollTop: cntY[listNum]}, 700, 'easeOutBack', a11y);
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
        $('html, body').stop().animate({scrollTop: cntY[listNum]}, 700, 'easeOutBack', a11y);
      }
    });

    // $ipod.on('keydown', function(e){
    //   if ($('html, body').is(':animated')) return false;
    //   const key = e.keycode;
    //   const $tg = $(e.target);
    //   console.log(key, $tg);
    //   if((key === 37)) $('.btn_left').click();
    // });

    // 접근성 추가
  });
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

  // fade 효과
  $(window).on('scroll', function(){
      const scrollY = $(this).scrollTop() + $(this).height()*2/3;
  
      $('.fade').each(function(idx, ele){
        if(scrollY > $(this).offset().top) $(this).addClass('on');
        else $(this).removeClass('on');
      });
  });

  // skill hover,focus 제어
  $('#container_wrap').find('.skill_list li').attr({tabIndex: 0});
  $('#container_wrap').find('.skill_list li').on({
    'mouseenter focus': function(){
      $(this).addClass('on');
    },
    'mouseleave blur': function(){
      $(this).removeClass('on');
    }
  });

  // transform(rotateY)
  $('#container_wrap .photo_wrap').on({
    focusin: function(){
      $(this).addClass('flip');
    },
    focusout: function(){
      $(this).removeClass('flip');
    }
  });

  // 페럴록스
  $(window).on('scroll',function(){
    const scrollY = $(this).scrollTop() + $(this).height();

    $('#container_wrap .container').each(function(idx){
      if(scrollY > $(this).offset().top){
        $(this).addClass('pllx');
      } else{
        $(this).removeClass('pllx');
      }
    });
  });
  $(window).trigger('scroll');

  // 설화수 글씨 이동 효과
  $(window).scroll(function(){
    const nowY = $(this).scrollTop();        
    const tranX1 = (nowY - $(".tranX1").offset().top) * 1.7;
    const tranX2 = (nowY - $(".tranX2").offset().top) * 1.7;
    const tranX3 = (nowY - $(".tranX3").offset().top) * 1.7;
    const tranX4 = (nowY - $(".tranX4").offset().top) * 1.7;
    const tranX5 = (nowY - $(".tranX5").offset().top) * 1.7;
    const tranX6 = (nowY - $(".tranX6").offset().top) * 1.7;
    
    $(".tranX1").css({left:tranX1 +"px"});
    $(".tranX2").css({right:tranX2 +"px"});
    $(".tranX3").css({left:tranX3 +"px"});
    $(".tranX4").css({right:tranX4 +"px"});
    $(".tranX5").css({left: tranX5 +"px"});
    $(".tranX6").css({right:tranX6 +"px"});
  });

  // intro_sulwhasoo
  const stickyWrapY = $('.sticky_wrap').offset().top;
  const computerX = $('.computer').offset().left;
  const computerY = $('.computer').offset().top - stickyWrapY;
  const lastScale = 0.65;           //초기 .computer의 transform : scale
  // console.log(stickyWrapY, computerX, computerY, $('.bg_sulwhasoo').offset().top);
  // 947    969.234375    205.050048828125      5879
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop();
    const move = scrollY - stickyWrapY;
    const winWid = $(this).width();
    const winHei = $(this).height();
    let leftPos;
    // console.log(scrollY, move, winWid, winHei);
    // 957  10    1903    947
    
    //console.log(scrollY);
    $('.sticky_wrap').css({height: winWid + $('.up_img').height() + (winHei -$('.monitor_wrap').height())});  //5422px;

    // fixed로 고정시(sticky가 적용되는 동안 .intro_sulwhasoo.fix 라는 클래스명이 추가됨) => 필요없으면 제거하기
    if (scrollY >= stickyWrapY && scrollY < $('.bg_sulwhasoo').offset().top) {
      $('.intro_sulwhasoo').addClass('fix');
    } else {
      $('.intro_sulwhasoo').removeClass('fix');
    }

    // 모니터 프레임
    if (scrollY < stickyWrapY) { //스티키 상단영역
      // console.log('1) 스티키 상단영역');
      gsap.to('.computer', {scale: 0.65, left: 0, duration: 0.5, ease: Power3.easeOut});
      gsap.to('.up_img', {top: 0, duration: 0.5, ease: Power3.easeOut});
    } else if (scrollY < stickyWrapY + winWid) { //스티키 영역진입 부터 1920(브라우저 가로)픽셀 까지만 - .computer 크기 0.65에서 1로 확대하기
      // console.log('2) 스티키 영역진입 부터 1920(브라우저 가로)픽셀 까지만');
      const ratio =  ((1-lastScale) / winWid ) * move + lastScale;
      // const ratio =  ((1-0.65) / 1903 ) * move + 0.65;
      // .computer를 가운데 위치 시키기 위한 변수: 175는 .computer가 scale 0.65일 경우 650픽셀에서 1이 되었을 경우 1000 => 1000-650 / 2 = 175
      leftPos = ((computerX-175) - ((winWid - $('.computer').width()) / 2)) * move / winWid;
      // console.log(ratio, leftPos);

      gsap.to('.computer', {scale: ratio, left: -leftPos, duration: 0.5, ease: Power3.easeOut});
      // gsap.to('.computer', {scale: ratio, left: -move*0.2, duration: 0.5, ease: Power3.easeOut});
      gsap.to('.up_img', {top: 0, duration: 0.5, ease: Power3.easeOut});
      $('#cnt2').find('.txt_sulwhasoo').removeClass('opacity hidden');
      $('#cnt2').find('.brand_txt').removeClass('visible');

    } else if (scrollY < $('.bg_sulwhasoo').offset().top) { //스티키  영역
      console.log('3) 스티키  영역');

      gsap.to('.computer', {scale: 1, left: -leftPos, duration: 0.5, ease: Power3.easeOut});
      $('#cnt2').find('.txt_sulwhasoo').addClass('opacity hidden');
      $('#cnt2').find('.brand_txt').addClass('visible');
      if (scrollY < stickyWrapY + winWid + $('.up_img').height() - $('.monitor_wrap').height()) {  
        //947(sticky_wrap의시작위치)+1903(winWid)+3012(.up_img높이)-517(.monitor_wrap높이)=5355
        gsap.to('.up_img', {top: -(move-winWid), duration: 0.5, ease: Power3.easeOut});
      }
    } else {  //스티키 하단 영역
      // console.log('4) 스티키 하단 영역');

      gsap.to('.computer', {scale: 1, left: -leftPos, duration: 0.5, ease: Power3.easeOut});
      gsap.to('.up_img', {top: -2506, duration: 0.5, ease: Power3.easeOut});
      $('#cnt2').find('.txt_sulwhasoo').removeClass('opacity hidden');
      $('#cnt2').find('.brand_txt').removeClass('visible');
    }
  });

  // with wine 모달 창 제어
  $('.md_open_btn').on('click',function(){
    const $openBtn = $(this);
    const $mdBox = $($(this).attr('data-href'));
    //console.log($mdBox, typeof $mdBox);
    const $closeBtn = $mdBox.find('.md_close_btn');
    const $first = $mdBox.find('[data-link="first"]');
    const $last = $mdBox.find('.md_close_btn');
    const wrapHei = $('#wrap').outerHeight();
    $closeBtn.focus();

    $('html, body').css({height: wrapHei, overflow: 'hidden'});
      $mdBox.siblings().attr({'aria-hidden': true, inert: ''});
      $mdBox.before('<div id="md_dim"></div>');
      const $mdDim = $('#md_dim');
      $mdDim.stop().fadeIn().next().css({visibility: 'visible'});
      $closeBtn.focus();

      // 키보드 제어
      $first.on('keydown', function(e){
        console.log(e.keyCode);
        if (e.keyCode===9 && e.shiftKey) {
          e.preventDefault();
          $last.focus();
        }          
      });
      $last.on('keydown', function(e){
        if (e.keyCode===9 && !e.shiftKey){
          e.preventDefault();
          $first.focus();
        }
      });
    
    // 닫기 버튼
    $closeBtn.on('click', function () {
      $('html, body').removeAttr('style');
      $mdDim.stop().fadeOut(function () {
        $mdDim.remove();
      });
      $mdBox.css('visibility', 'hidden').siblings().removeAttr('aria-hidden inert');
      $openBtn.focus();
   });

    $mdDim.on('click', function(){
      $closeBtn.trigger('click');
    });

    $(window).on('keydown', function(e){
      if(e.keyCode===27) $closeBtn.click();
    });

  // 모달 안에 효과
  $('#modal1').on('scroll', function(){
    const mdScrollY =  $(this).scrollTop();
    const $mdCnt = $('.md_sticky .hover_wrap');
    // const mdTotal = $mdCnt.length;
    // let mdCntY = new Array(mdTotal);
    // for (let i = 0; i < mdTotal; i++) {
    //   mdCntY[i] = $mdCnt.eq(i).offset().top;
    // }
    // console.log($mdCnt, mdTotal, mdCntY);
    // cntNum = $mdCnt.index();

    // if(mdScrollY >= mdCntY[cntNum]) $mdCnt.eq(cntNum).addClass('on').siblings().removeClass('on');
    $mdCnt.eq(0).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 220) $mdCnt.eq(1).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 500) $mdCnt.eq(2).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 920) $mdCnt.eq(3).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 1310) $mdCnt.eq(4).addClass('on').siblings().removeClass('on');
   });
  // $('.md_box').on('scroll', function(){
  //   const mdScrollY =  $(this).scrollTop();
  //   const $mdCnt = $('.md_sticky').find('.hover_wrap');
  //   //console.log(mdScrollY);
  //   $mdCnt.eq(0).addClass('on').siblings().removeClass('on');
  //   if(mdScrollY >= 220) $mdCnt.eq(1).addClass('on').siblings().removeClass('on');
  //   if(mdScrollY >= 500) $mdCnt.eq(2).addClass('on').siblings().removeClass('on');
  //   if(mdScrollY >= 920) $mdCnt.eq(3).addClass('on').siblings().removeClass('on');
  //   if(mdScrollY >= 1310) $mdCnt.eq(4).addClass('on').siblings().removeClass('on');
  //  });


  $('#modal3').on('scroll', function(){
    const mdScrollY =  $(this).scrollTop();
    const $mdCnt = $('#modal3 .md_sticky').find('.hover_wrap');
    console.log(mdScrollY);
    $mdCnt.eq(0).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 270) $mdCnt.eq(1).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 820) $mdCnt.eq(2).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 1360) $mdCnt.eq(3).addClass('on').siblings().removeClass('on');
    if(mdScrollY >= 1910) $mdCnt.eq(4).addClass('on').siblings().removeClass('on');
  });
  $('.md_box').trigger('scroll');

  const $loupe = $('.md_sticky').find('.loupe');
  $loupe.on({
    'mouseenter focusin': function(){
      $(this).next().next().next().fadeIn();
    },
    'mouseleave focusout': function(){
      $(this).next().next().next().fadeOut();
    }
  });
  });

  $('#cnt3').find('.sticky_btn button').on('click', function(){
    if($(this).is('.normal')){
      $('#cnt3').removeClass('spring summer fall winter');
    }
    else if($(this).is('.spring')){
      $('#cnt3').addClass('spring').removeClass('summer fall winter');
    }
    else if($(this).is('.summer')){
      $('#cnt3').addClass('summer').removeClass('spring fall winter');
    }
    else if($(this).is('.fall')){
      $('#cnt3').addClass('fall').removeClass('spring summer winter');
    }
    else if($(this).is('.winter')){
      $('#cnt3').addClass('winter').removeClass('spring summer fall');
    }
  });

});