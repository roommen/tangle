var product = $('#product').text();
cropped_digits = String($('#product').text());

//Check the range of product
function rangeKeyUp(){
    cropped_digits = String($('#product').text());
    if($("#prodrange-from").val() == -8 && $("#prodrange-to").val() == '')
        {
            cropped_digits = cropped_digits.slice($("#prodrange-from").val());
        }else{
            cropped_digits = cropped_digits.slice($("#prodrange-from").val(), $("#prodrange-to").val());
        }
    $("#digits").text(cropped_digits);
    if(cropped_digits.length < 8){
        $("#alert").show();
    }else{
        $("#alert").hide();
    }
}


function replaceStr(str, pos, value){
    var arr = str.split('');
    arr[pos]=value;
    return arr.join('');
}

//Ajax call for Encryption
$("#encrypt-btn").click(function(){
    var message = $("#plain-text").val();
    var product = String($("#digits").text());
    product = replaceStr(product, 0, '1');
    product = replaceStr(product, 1, '0');
    console.log(product);
    localStorage.setItem("product", product);
    $.ajax({
        url :'https://pjaqzs646c.execute-api.ap-south-1.amazonaws.com/tangle/encrypt?message=' + message + "&product=" + product,
        type : 'GET',
        dataType: 'html',
        success : function(resp){
            result = $.parseJSON(resp);
            encrypted_message = result['result'];
            window.open(
                'http://alice.runcy.me/bob.html?message=' + encrypted_message,
                '_blank' // <- This is what makes it open in a new window.
              );
        }
    });
})