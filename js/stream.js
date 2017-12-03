  var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function(){var $this=this;
                                  $('.panel.show').removeClass('show');setTimeout(function(){ $this.classList.toggle("active");
                                                                                             $this.nextElementSibling.classList.toggle("show"); },300);
                                 }
    }
  </script>

  <script type="text/javascript">
    window.onload=function(){var c=['qrnfmpjgtg22egdqimk6c5mavh3kiw','n1nk68mmhcrfmewf8706xit604ovvx','ca3v73uqyjgquzscgo4fnwvxjvki3y','5jv5pxar2gqwwvrbgqogsfmul303sd','im3q22bhp3s2i402d3j660ovo5hq4d'],s='TheLucky7Sniper',a=s.split(/\s*,\s*/);a.forEach(function(u){$.get('https://api.twitch.tv/kraken/streams/'+u+'?client_id='+c[Math.random()*c.length>>0],function(r){
                             if(r.stream!=null){
                               listItem = '<li class="stream-entry"><a href="https://twitch.tv/'+u+'" target="_blank"><div class="steam-avatar"><img src="'+r.stream.channel.logo+'" class="stream-avatar-image" alt="'+u+' logo"></div><p class="stream-username">'+u+' is live!</p> <p class="stream-viewers">('+r.stream.viewers+' viewer'+(r.stream.viewers>1?'s':'')+')</p></a></li>';
                             }
                             else{
                               listItem = '<li class="noLive">No Live Broadcasts</li>';
                             }
                             document.getElementById('streamer-modal').innerHTML+=listItem;});});};
  </script>

  <script>
    function openNav() {
      document.getElementById("myNav").style.height = "100%";
    }

    function closeNav() {
      document.getElementById("myNav").style.height = "0%";
    }
