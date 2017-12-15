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

function encodeData(s){
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}


//Ajax call for Encryption
$("#encrypt-btn").click(function(){
    var message = $("#plain-text").val();
    var product = String($("#digits").text());
    var buffer = $("#buf-size").val();
    product = replaceStr(product, 0, '1');
    product = replaceStr(product, 1, '0');
    localStorage.setItem("product", product);
    $.ajax({
        url :'https://pjaqzs646c.execute-api.ap-south-1.amazonaws.com/tangle/encrypt',
        type : 'GET',
        dataType: 'html',
        data : {"message" : message, "product" : product, "buffer" : buffer},
        success : function(resp){
            result = $.parseJSON(resp);
            encrypted_message = result['result'];
            encryption_url = 'http://alice.runcy.me/bob.html?message=' + encodeData(encrypted_message);
            window.open(
                encryption_url,
                '_blank' // <- This is what makes it open in a new window.
              );
        }
    });
});