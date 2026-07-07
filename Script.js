var GEN = [
  {logo: "🇦🇷", name: "CUMBIA", url: "https://u.pcloud.link/publink/show?code=kZffQi5ZEsuLReGBsT8rwldpwogE75rqbDRk"}, 
  {logo: "🇵🇷", name: "PR CLASSIC", url: "https://u.pcloud.link/publink/show?code=kZCaQi5ZDJzh0KJ1zEFfTR1tNhTmDFD752J7"},
  {logo: "🕺🏽", name: "CLASICOS", url: "https://u.pcloud.link/publink/show?code=kZl3Qi5ZLBoAC5btaVf3ITQR6AXm5QQlse4y"}, 
  {logo: "🎹", name: "ALL IN BASS", url: "https://u.pcloud.link/publink/show?code=kZt3Qi5ZMUlbR4jtUsVYotr2hj5yqb7qzFFy"}, 
  {logo: "🇯🇲", name: "BASS HALL", url: "https://u.pcloud.link/publink/show?code=kZkGQi5ZSVivAi8p8wuHFC3gb72v3p1mtTrk"}, 
  {logo: "🍹", name: "COCTELITO", url: "https://u.pcloud.link/publink/show?code=kZa4xi5Z7jyPy9hnXQ0A28uvaT2250Jl7Rzk"}, 
  {logo: "🇨🇺", name: "CUBATON", url: "https://u.pcloud.link/publink/show?code=kZMLxi5ZHSXXOOv2a8R5iCnUuvbqJ8F5qvu7"}, 
  {logo: "💜", name: "DEL ALMA", url: "https://u.pcloud.link/publink/show?code=kZuIKi5ZYLRmfLRVkg52VKuXc8j4QhYQKYbk"}, 
  {logo: "💓", name: "DEL ALMA 2", url: "https://u.pcloud.link/publink/show?code=kZsEKi5Z9yFV4rXnm2RK3dygCryPb4SLsVgV"}, 
  {logo: "🪩", name: "DISCO RETRO", url: "https://u.pcloud.link/publink/show?code=kZkzli5ZIQM6s3GNez59e7zA0TXez0usnWc7"}, 
  {logo: "🏴‍☠️", name: "DRUM & BASS", url: "https://u.pcloud.link/publink/show?code=kZ0Fli5ZzfFktkCNfay6hvCGE6pdg55tYPny"}, 
  {logo: "🎭", name: "FREAK", url: "https://u.pcloud.link/publink/show?code=kZtJdi5Zo6p7IEedgULnk9vnfpT7xHjMVy00"}, 
  {logo: "🖕🏽", name: "FUCK U", url: "https://u.pcloud.link/publink/show?code=kZn0di5ZootYjfkvHSQPEdKb2NfqckJe0WTX"}, 
  {logo: "🇯🇲", name: "GANJA MUSIC", url: "https://u.pcloud.link/publink/show?code=kZesdi5Z1n9a6KznqgbG9p94WfYC1HjaYBFV"}, 
  {logo: "👅", name: "GOUSE HOUSE", url: "https://u.pcloud.link/publink/show?code=kZqDVr5Zo9jjxlSXCi7fVB75O9EXEkm6B4ty"}, 
  {logo: "🇨🇺", name: "MADE IN CUBA", url: "https://u.pcloud.link/publink/show?code=kZKDVr5Z2A051YliNP5KwI3MtnwY7kKXqJ9X"}, 
  {logo: "😈", name: "MALIANTEO", url: "https://u.pcloud.link/publink/show?code=kZteVr5ZbJ4bl8yc9guTnbU0Qo1kCfnxQBQk"}, 
  {logo: "🇦🇱", name: "MOOMBA VS TRAP", url: "https://u.pcloud.link/publink/show?code=kZxeVr5ZlN3DTmcatbR9ffgzproPxLH7JX47"}, 
  {logo: "🇧🇷", name: "OI BRASIL", url: "https://u.pcloud.link/publink/show?code=kZH9Vr5ZyEfPcCJjgebVuFVTx7CNmRMaxCNV"}, 
  {logo: "🇵🇷", name: "PR DELUXE", url: "https://u.pcloud.link/publink/show?code=kZF9Vr5Z2CH6a0qvPEyzeRiOUAArEQh745EV"}, 
  {logo: "🇵🇷", name: "REGAETON", url: "https://u.pcloud.link/publink/show?code=kZ19Vr5Z3mx3lG76nmYsGj1I3MP1rztwPbMV"}, 
  {logo: "🇻🇪", name: "SALSA MIX", url: "https://u.pcloud.link/publink/show?code=kZD9Vr5ZN9gGwnGUJahozq7QIBHAvuDAqzHk"}, 
  {logo: "🇵🇷", name: "SALSA", url: "https://u.pcloud.link/publink/show?code=kZU9Vr5Z0PpUG58HDAhP3dkXKdX9ep3fsegV"}, 
  {logo: "🫆", name: "TRAVEL", url: "https://u.pcloud.link/publink/show?code=kZ69Vr5ZLMkL01QGgjS0viJxsqq7lm1Mffs7"}, 
  {logo: "🔋", name: "ZERO", url: "https://u.pcloud.link/publink/show?code=kZbMVr5ZoqkKSadou24UJHRPi9TACBnCNwGy"}, 
  {logo: "🎧", name: "MIX", url: "https://u.pcloud.link/publink/show?code=kZe45r5ZgWxWGMtxO5fT1Sxehpdz2SXuNfoV"}
 ];
 
 
    GEN.forEach(genero => {
       let li = document.createElement('li');
    li.innerHTML = `<a class="DATA" data-url="${genero.url}" title="${genero.name}">${genero.logo} ${genero.name}</a>`;
    Lista.appendChild(li);  
 });
        
                
      <!-- FILTRADO -->
   I.oninput = (e) => {
       var In = e.target.value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
       if (In === "") {
   BOX.style.display = "none";
    F.style.display = "block";
    No.style.display = "none";
          return;
  }

      let foundMatch = false;
       document.querySelectorAll('.DATA').forEach(dat => {
          if (dat.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(In)) {
             dat.classList.remove('Filtro');
     foundMatch = true;
          } else {
             dat.classList.add('Filtro'); 
       }
    });
       
    No.style.display = foundMatch ? "none" : "block";
  BOX.style.display = foundMatch ? "block" : "";
    F.style.display = "none";   
 };   


    <!-- Manejo Del Enter -->
  document.onkeyup = (e) => {
    if (e.key === "Enter") {
      var In = e.target.value.toLowerCase().trim();
      var match = [...document.querySelectorAll(".DATA")].find(item => item.getAttribute('title').toLowerCase().trim() === In);

      if (match) {
        var URL = match.getAttribute('data-url');
   F.style.display = "block";
        F.src = URL;
        I.value = "";
  BOX.style.display = "none";
 I.placeholder = match.textContent;
     I.classList.add('activo');
         } else {
          I.value = '';
  BOX.style.display = 'none'; 
      }
    }
 };
   
    <!-- Manejo Del Click -->
   Lista.onclick = (e) => {    
    if (e.target.matches('.DATA')) {
        var Enlace = e.target.getAttribute('data-url');
 var Titulo = e.target.textContent;
        
    F.style.display = "block";
        F.src = Enlace;
        I.value = "";
     BOX.style.display = "none";
        I.placeholder = Titulo;
        I.classList.add('activo');
     }
 };