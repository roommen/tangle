function encodeData(s){
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

//Ajax call for Decryption
function decryptMessage(){
    var url_string = window.location.href;
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    window.history.replaceState({}, document.title, clean_uri);
    var decryption_url = new URL(url_string);
    var message = url.searchParams.get("message");
    var product = localStorage.getItem("product");
    var url = encodeURI("https://pjaqzs646c.execute-api.ap-south-1.amazonaws.com/tangle/decrypt?message=" + encodeData(message) + "&product=" + product);
    $.ajax({
        url : decryption_url,
        type : 'GET',
        dataType: 'html',
        success : function(resp){
            result = $.parseJSON(resp);
            decrypted_message = result['result'];
            $("#encrypted-text").val(message);
            $("#decrypted-text").val(decrypted_message);
        }
    });
}
