(()=>{

      setTimeout(hanld,5000);

      $('body').click(()=>{
        hanld();
      })

      function hanld(){
        chrome.storage.local.get((data)=>{
          data && Object.keys(data.labelName).forEach((labelName)=>{
            $(`a:contains(${labelName})`) && $(`a:contains(${labelName})`).css({"font-size":"20px","color":`${data.labelName[labelName]}`});
          }); 
        });
      }
})()