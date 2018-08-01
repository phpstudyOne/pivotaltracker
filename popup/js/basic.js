(()=>{
    let data = store.get('data');
    if(data == undefined){
        data = {
            labelName:{},
            colorValue:{}
        }
    }else{
        let showAllAddedLabelHTML = '';
        Object.keys(data.labelName).forEach(labelName=>{
            showAllAddedLabelHTML +=`<li class="LIlabelName" style="background-color:${data.labelName[labelName]}">`
            showAllAddedLabelHTML +=    `<span class="LIlabelNameRemove" data-labelName="${labelName}" data-colorValue="${data.labelName[labelName]}">X</span>${labelName}`
            showAllAddedLabelHTML +=`</li>`
        });
        $('#showAllAddedLabel').html(showAllAddedLabelHTML);
    }

    /**
     * show color value input change
     */
    $('body').on('change','#colorValue' ,function(){
        $('#showColor').css({"background-color":$(this).val()});
        $('#showColor').val($('#labelName').val());
    });

    $('body').on('change','#labelName' ,function(){
        var colorValue = $('#showColor').val();
        $('#showColor').css({"background-color":colorValue});
        $('#showColor').val($('#labelName').val());
    });

    /**
     * select color 
     */
    $('body').on('click','td' ,function(){
        var colorValue = $(this).attr('bgcolor');
        $('#colorValue').change(function(){
            $('#showColor').css({"background-color":$(this).val()});
            $('#showColor').val($('labelName').val());
        });


        if(colorValue == undefined){
            return false;
        }
        $('#colorValue').val(colorValue);
        $('#colorValue').change();
    });

    /**
     * click remove label button
     */
    $('body').on('click','.LIlabelNameRemove',function(){
        let labelName = $(this).attr('data-labelName');
        let colorValue = $(this).attr('data-colorValue');
        delete data.labelName[labelName];
        delete data.colorValue[colorValue];
        $(this).parent('.LIlabelName').remove();
        store.set('data', data);
        chrome.storage.local.set(data);
    });

    /**
     * click save button
     */
    $('body').on('click','#saveSelect' ,()=>{
        let labelName = $('#labelName').val();
        let colorValue = $('#colorValue').val();
        if(!validation(labelName,colorValue)){
            return true;
        }
        data.labelName[labelName] = colorValue;
        data.colorValue[colorValue] = labelName;
        store.set('data', data);
        chrome.storage.local.set(data);
        let showAllAddedLabelHTML =`<li class="LIlabelName" style="background-color:${colorValue}">`
        showAllAddedLabelHTML     +=    `<span class="LIlabelNameRemove" data-labelName="${labelName}" data-colorValue="${colorValue}">X</span>${labelName}`
        showAllAddedLabelHTML     +=`</li>`
        $('#showAllAddedLabel').append(showAllAddedLabelHTML);
    });
    
    const validation = (labelName,colorValue)=>{
        if(!labelName){
            alert(`labelName Cann't empty!`);
            return false; 
        }
        if(!colorValue){
            alert(`lable color cann't empty`);
            return false;
        }
        if(undefined != data.labelName[labelName]){
            alert(`lable ${labelName} has existed`);
            return false;
        }
        if(undefined != data.colorValue[colorValue]){
            alert(`color ${colorValue} has existed`);
            return false;
        }
        return true;
    };
})()