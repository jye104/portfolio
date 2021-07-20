$(document).ready(function() {
  // intro 글씨 나타나기
  $('#intro .txt').each(function(){
    let wordArray = $(this).html().split(' ');
    // console.log(wordArray);
    let tagWrite = '';
    for (let i = 0; i < wordArray.length; i++) {
      $(this).html(''); //기존 태그 지우기
      if (wordArray[i] === '<br>') {
        tagWrite += '<br>';
       } else {
        let spanArray = wordArray[i].split('');
        tagWrite += '<div class="txt">';
        for (let j = 0; j < spanArray.length; j++) {
          tagWrite += `<span class="up">${spanArray[j]}</span>`;
        }
        tagWrite += '</div>';
      }
      $(this).append(tagWrite);
    }
  });

  $('#intro .txt'). each(function(){
    $(this).find('.up').each(function(idx){
      $(this).css('animationDelay', (idx * 0.03) + 0.3 + 's');
    });
  })

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {$('#intro').addClass('d_n');}
  });
});