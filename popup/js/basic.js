(()=>{

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
        if(colorValue == undefined){
            return false;
        }
        $('#colorValue').val(colorValue);
        $('#colorValue').change();
    })

    
})()