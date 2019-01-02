var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}

var button = document.getElementById("download_btn");
button.onclick = function(){
    console.log($("textarea").val());
    download("text.txt",$("textarea").val());
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

$("#saveDataBtn").on('click',function(event){
    var text = $("textarea").val();
    console.log(text);
    var data = {};
    data["text"] = text;

    if(text.trim("").length == 0){
        alert("text is empty")
        
    }
    else{
        $.ajax({
            url: '/saveFile',
            type: 'POST',
            data: data,
            success: function(data){
                alert('yes');
            }
        })
    }
});

$("#formLoadFilebtn").on('click',function(event){
    event.preventDefault();
    
    var formData = new FormData();
    var file_tag = document.getElementById("imagefile");
    var file = file_tag.files[0];
    formData.append('file',file,file.name);

    // $.ajax({
    //     url: '/loadFile',
    //     type: 'POST',
    //     data: formData,
    //     async: false,
    //     success: function (data) {
    //         alert("yes")
    //     },
    //     cache: false,
    //     contentType: false,
    //     processData: false
    // });

    var settings = {
        "async": true,
        "url": "/loadFile",
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
          "Postman-Token": "de4856e7-a4a3-4a2f-8606-7105ed478086"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formData
      }
      
      $.ajax(settings).done(function (response) {
          console.log("received response fccc" + response.length );
        $("textarea").text(response);
      });

});


// $("form#formLoadFile").submit(function(){

//     var formData = $(this).serialize();

//     $.ajax({
//         url: '/loadFile',
//         type: 'POST',
//         data: formData,
//         async: false,
//         success: function (data) {
//             alert("yes")
//         },
//         cache: false,
//         contentType: false,
//         processData: false
//     });

//     return false;
// });

