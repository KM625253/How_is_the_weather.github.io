window.addEventListener('load',()=>{
    let long;
    let lat;
    let tempDeg = document.querySelector('.temperature-degree');
    let tempDisc = document.querySelector('.temperature-description');
    let location = document.querySelector('.location-timezone');
    const video = document.querySelector(".vid-container video");
    const audio = document.querySelector("audio");
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat= position.coords.latitude;
            (function() {
            var cors_api_host = 'cors-anywhere.herokuapp.com';
            var cors_api_url = 'https://' + cors_api_host + '/';
            var slice = [].slice;
            var origin = window.location.protocol + '//' + window.location.host;
            var open = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function() {
                var args = slice.call(arguments);
                var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
                if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                    targetOrigin[1] !== cors_api_host) {
                    args[1] = cors_api_url + args[1];
                }
                return open.apply(this, args);
            };
        })();
            // const proxy= "https://cors-anywhere.herokuapp.com/";

            const api =`https://api.weatherapi.com/v1/current.json?key=a07dd6b14f314406a4541002211004&q=${lat},${long}&aqi=no`;
            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data =>{
               console.log(data);
                 const {temp_c,condition} = data.current;
               tempDeg.textContent = temp_c;
               tempDisc.textContent =condition.text ;
                
               location.textContent =data.location.name +" / "+ data.location.region +" / "+data.location.country;
               var str;
               var DorN;
               if(data.current.is_day){DorN="day";}
               else {DorN="night";}
               
               if(data.current.condition.text = "sunny")
               {
                   str="clear-"+DorN;
                   video.src="./Video/Cloudy.mp4"; 
                   video.play();
                }
               else 
               if(data.current.condition.text ="Overcast")
               {
                   str="cloudy"; 
                   video.src="./Video/Cloudy.mp4"; 
                   video.play();
                }
               else 
               if(data.current.condition.text ="Partly cloudy")
               {
                   str="partly-cloudy-night";
                   video.src="./Video/party-cloud-night.mp4";
                   video.play(); 
                } 
               else 
               if(data.current.will_it_rain)
               {
                   str="rain"; 
                   video.src="./Video/rain.mp4"; 
                   video.play();audio.src="./Audio/rain.mp3"; 
                   audio.play();
                } 
               else 
               if(data.current.condition.text ="Thunder")
               {
                   str="thunder-showers-night" ; 
                   video.src="./Video/Thender.mp4"; 
                   video.play();audio.src="./Audio/Thunder.mp3"; 
                   audio.play()
                } 
               else if(data.current.condition.text ="Moderate rain")
               {
                   str="sleet";
                } 
                console.log(data.current.condition.text);
                setIcons(str,document.querySelector('.icon1'))
                
            });

        });
        
    }else{
        
        alert("Hey you have to allow me to get your location");
    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({"color":"white"});
        
        console.log(icon);
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        console.log(currentIcon);
        return skycons.set(iconID, Skycons[currentIcon])
    }
    var skycons = new Skycons({"color":"white"});
    var btnS = document.querySelectorAll('li a');
    var vd = document.querySelector('.vid-container video');
    var aud = document.querySelector('audio');
    skycons.add("icon5", Skycons.SNOW);
    skycons.play();
    skycons.add("icon4", Skycons.RAIN);
    skycons.play();
    skycons.add("icon3", Skycons.FOG);
    skycons.play();
    skycons.add("icon2", Skycons.PARTLY_CLOUDY_NIGHT);
    skycons.play();
    btnS.forEach(video => {
        video.addEventListener('click',function(){
            vd.src=this.getAttribute('data-video'); 
            vd.play();
            console.log(this.getAttribute('data-sound'));
            if(this.getAttribute('data-sound') !=null){
                aud.src=this.getAttribute('data-sound');
                aud.play();
            } else{aud.pause();}
            console.log(this.getAttribute('data-video')[8]);
            if(this.getAttribute('data-video')[8]==="S"){
                tempDeg.textContent = 5;
                tempDisc.textContent ="Snowing";
                skycons.set("iconM", Skycons.SNOW);
                skycons.play();
            }else if(this.getAttribute('data-video')[8]==="t"){
                tempDeg.textContent = 27;
                tempDisc.textContent ="Thunder and Lieghtning";
                skycons.set("iconM", Skycons.FOG);
                skycons.play();
            }else if(this.getAttribute('data-video')[8]==="p"){
                tempDeg.textContent = 20;
                tempDisc.textContent ="Partly Cloudy Night";
                skycons.set("iconM", Skycons.PARTLY_CLOUDY_NIGHT);
                skycons.play();
            }else if(this.getAttribute('data-video')[8]==="r"){
                tempDeg.textContent = 11;
                tempDisc.textContent ="Raining ";
                skycons.set("iconM", Skycons.RAIN);
                skycons.play();
            }
        });
    });
    
    


});

