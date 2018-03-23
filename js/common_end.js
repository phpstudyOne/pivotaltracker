(()=>{
      setTimeout(aaa,5000);

      $('body').click(function(){
        aaa();
      });

      function aaa(){
        $('a:contains(v1.19.1)').css({"font-size":"20px","color":'#ec3909'});
        $('a:contains(v1.19.2)').css({"font-size":"20px","color":'#FF66FF'});
      }

})()