$(document).ready(function() {
    // about me 버튼 클릭시 class 제어
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

  $('#cnt3').find('.sticky_btn button').on('click', function(){
    const $cntWrap = $('#container_wrap');
    const $pageLi = $('.pagination li');
    const cntTotal = $('#cnt3 .container').length;
    const maxStep = cntTotal - 1;
    let winWid = $(window).width();
    let tgNum = 0;
  
    //console.log($cntWrap, cntTotal);
    // 봄
    if ($(this).is('.spring')){
        $pageLi.eq(tgNum).addClass('on').siblings().removeClass('on');
        $cntWrap.css({width: cntTotal * winWid}).attr({'aria-live': 'polite'});
        $pageLi.children().on('click', function(){
        if($cntWrap.is(':animated')) return false;
        tgNum = $(this).parent().index();
        $pageLi.eq(tgNum).addClass('on').siblings().removeClass('on');
        $cntWrap.stop().animate({marginLeft: -tgNum * winWid}, 500, accessibility);
      });
      // prev, next 버튼
      $('#cnt3 .p_n button').on('click', function (){
          const btnNum = $(this).index();
          if ($cntWrap.is(':animated')) return false;
          if(btnNum === 0 && tgNum === 0) return false;
          else if(btnNum === 1 && tgNum === maxStep) return false; 
          btnNum === 0? tgNum-- : tgNum++;
          $pageLi.eq(tgNum).addClass('on').siblings().removeClass('on');
          // console.log(tgNum);
          $cntWrap.stop().animate({marginLeft: -tgNum * winWid}, 500, accessibility);
        });

        $(document).on('keydown', function(e){
          if ($cntWrap.is(':animated')) return false;
          const key = e.keyCode;
          const $tg = $(e.target);
          console.log(key);
          if ((key == 37) && tgNum > 0) tgNum--; // 왼쪽방향키
          else if ((key === 39) && tgNum < cntTotal-1) tgNum++; //  오른쪽 방향키
          else if ((key === 13 || key === 32) && ($tg.is('.p_n button'))) tgNum = $tg.index();
          else if ((key === 13 || key === 32) && ($tg.is('.page_btn'))) tgNum = $tg.parent().index();
          
          $pageLi.eq(tgNum).addClass('on').siblings().removeClass('on');
          $cntWrap.stop().animate({marginLeft: -tgNum * winWid}, 500, accessibility);
          // console.log(tgNum);
        });        

    } 
  else {
    $cntWrap.removeAttr('style').attr({'aria-live': 'off'});
    }

    // 여름
    if($(this).is('.summer')){
      $win.on('resize',function(){
        clearTimeout(timerResize);
        timerResize = setTimeout(function(){
          cntY = new Array(total);
          for (let i=0; i<total; i++){
          cntY[i] = $cnt.eq(i).offset().top;
          }         
          $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 1000, 'easeOutBack');
          accessibility();
        }, 50);
      });
      $win.trigger('resize');
      
      $win.on('scroll', function () {
        clearTimeout(timerScroll);    
        timerScroll = setTimeout(function () {
          $pageEle.each(function (idx) {
            if ($win.scrollTop() >= cntY[idx]) {
              $(this).addClass('on').siblings().removeClass('on');
              tgIdx = idx; 
              accessibility();
            }
          });
        }, 20);
      });

      $pageEle.children().on('click', function () {
        if ($('html, body').is(':animated')) return false;
        tgIdx = $(this).parent().index();
        $(this).parent().addClass('on').siblings().removeClass('on');
       $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 700, accessibility);
      });

      $(document).on('keydown', function(e){
        if ($('html, body').is(':animated')) return false;
        const key = e.keyCode;
        // console.log(key);
        // keydown 이벤트를 일으키는 대상 선택자 알아오기 => e.target
        const $tg = $(e.target);
        if (key === 38 && tgIdx > 0) tgIdx--; // 상단 방향키
        else if (key === 40 && tgIdx < total) tgIdx++; // 하단 방향키
        else if ((key === 13 || key === 32) && $tg.is('.nav_btn')) tgIdx = $(this).parent().index();
        
        // animate()가 일어나면 스크롤 이벤트가 자동으로 생성되어 #fp-nav li.on은 제어됨
        $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 700, accessibility);
      });

      $cnt.on('mousewheel DOMMouseScroll', function(e){
        clearTimeout(timerWheel);
        timerWheel = setTimeout(function(){
    
          if ($('html, body').is(':animated')) return false;
          const delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
    
          if(delta > 0 && tgIdx > 0){ // 휠 올리기
              tgIdx--;
            } else if(delta < 0 && tgIdx < total ){ // 휠 내리기
              tgIdx++;
            } 
          $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 700, 'easeOutBack', accessibility);
        }, 150);
      });

    }

    //가을
    $('#cnt3').find('.sticky_btn button').on('click', function(){
      const winHei = $(window).height();
      const stickyY = $('#container_wrap').offset().top;
      if ($(this).is('.fall')){
      //console.log(stickyY);
       $(window).on('scroll', function(){
         const scrollY = $(this).scrollTop();
         $('#container_wrap > div').each(function(idx, ele){
           console.log(idx);
           if (scrollY > stickyY + winHei*idx) {$(this).addClass('on').siblings().removeClass('on');}
          });
       });
      }
    });


  
});
  function accessibility(){
    // 현재 선택된 본문
    $cnt.eq(tgIdx).removeAttr('aria-hidden inert').find('a, button').removeAttr('tabIndex'); 
    $cnt.eq(tgIdx).find('.tabIndex').attr('tabIndex', 0)
    // 나머지 본문들
    $cnt.eq(tgIdx).siblings().attr({'aria-hidden': true, 'inert': ''}).find('a, button, .tabIndex').attr('tabIndex', -1);
  }





});