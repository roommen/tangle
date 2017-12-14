//Ajax call for Decryption
function decryptMessage(){
    var url_string = window.location.href;
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    window.history.replaceState({}, document.title, clean_uri);
    var url = new URL(url_string);
    var message = url.searchParams.get("message");
    var product = localStorage.getItem("product");
    $.ajax({
        url :'https://pjaqzs646c.execute-api.ap-south-1.amazonaws.com/tangle/decrypt',
        type : 'GET',
        dataType: 'html',
        data : {"message":message, "product":product},
        success : function(resp){
            result = $.parseJSON(data);
            decrypted_message = result['decrypted_message'];
            $("#encrypted-text").val(message);
            $("#decrypted-text").val(decrypted_message);
        }
    });
}