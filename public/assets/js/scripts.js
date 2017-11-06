$(function () {
function checkLoginState() {
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/me?fields=context,education,devices,favorite_athletes,favorite_teams,birthday,gender,hometown,first_name,inspirational_people,interested_in,about,events{category}', function(response) {
        console.log(response)

        var items = document.getElementById("likes");
        var likesArray = response.context.mutual_likes.data;

        for (var i = 0; i < likesArray.length; i++) {
          var output = document.createElement("li");

          output.innerHTML = likesArray[i].name;
          items.appendChild(output);
        }
      });
    } else {
      console.log('por algum motivo voce nao foi autorizado');
    }
  },{ scope: 'user_friends',
  return_scopes: true});
}


  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("seu browser nao possui suport para esta aventura =( )")
    }
  }
  function showPosition(position) {
    $.ajax({
             url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+position.coords.latitude+","+position.coords.longitude+"&sensor=true&rankby=distance&key=AIzaSyBYvBU49_WBC2AONA76_YDiLmDXwv3Jamc",
             type: "GET",
             dataType: 'json',
             cache: false,
             success: function(response){
                 results = response.results;
                 console.log(results)
             }
         });

         $(function () {
           var socket = io();
           $('.socket-chat').submit(function(){
             socket.emit('chat message', $('#m').val());
             $('#m').val('');
             $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
             return false;
           });
           socket.on('chat message', function(msg){
             $('#messages').append($('<li>').text(msg));
               if(msg == 'olá' || msg == 'ola' || msg == 'oi' ){
                   socket.emit('chat message','olá tudo bem?');
               }
               if(msg.startsWith("tudo bem") || msg == "tudo" ){
                 socket.emit('chat message','esta afim de sair?');
               }
               if(msg == 'quem é vc' || msg == 'quem é voce' || msg == 'com quem eu falo?'){
                 socket.emit('chat message','sou um robo que irá te ajudar');
               }
               if(msg == 'sim' || msg == 'vamos' || msg == 'quero sair'){
                 $('body').addClass('activebody');
                 socket.emit('chat message','esse lugar deve estar bombando:' + results[10].name+', será que esta aberto agora?:');
               }

             });

           });

}


   //google places
   getLocation();




});
