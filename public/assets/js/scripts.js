$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

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
});
