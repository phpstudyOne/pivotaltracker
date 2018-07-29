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
            showAllAddedLabelHTML += `<button type="button" class="btn btn-primary" style="color: ${data.labelName[labelName]}">${labelName}</button>`
        });
        $('#showAllAddedLabel').html(showAllAddedLabelHTML);
    }

    /**
     * show color value input change
     */
    $('#colorValue').change(function(){
        $('#showColor').css({"background-color":$(this).val()});
        $('#showColor').val($('#labelName').val());
    });

    $('#labelName').change(function(){
        var colorValue = $('#showColor').val();
        $('#showColor').css({"background-color":colorValue});
        $('#showColor').val($('#labelName').val());
    });

    /**
     * select color 
     */
    $('td').click(function(){
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

    $('#saveSelect').click(()=>{
        let labelName = $('#labelName').val();
        let colorValue = $('#colorValue').val();
        if(!validation(labelName,colorValue)){
            return true;
        }

        data.labelName[labelName] = colorValue;
        data.colorValue[colorValue] = labelName;
        store.set('data', data);
        chrome.storage.local.set(data);
        $('#showAllAddedLabel').append(`<button type="button" class="btn btn-primary" style="background-color: ${colorValue}">${labelName}</button>`);
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