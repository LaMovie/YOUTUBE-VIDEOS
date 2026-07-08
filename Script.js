let playlistActual = [];
let indiceActual = 0;
let codigoCarpetaActual = "";

// Elementos del DOM
const Reproductor = document.getElementById("Player");
const InfoCancion = document.getElementById("NowPlayingInfo");
const I = document.getElementById("I");
const ListaGeneros = document.getElementById("Lista");
const ListaCancionesContenedor = document.getElementById("ListaCanciones");
const VistaGeneros = document.getElementById("VistaGeneros");
const VistaPlaylist = document.getElementById("VistaPlaylist");
const VistaBusqueda = document.getElementById("VistaBusqueda");
const ListaBusqueda = document.getElementById("ListaBusqueda");
const TituloCarpeta = document.getElementById("TituloCarpeta");
const LoadingBox = document.getElementById("LoadingBox");
const BtnSync = document.getElementById("BtnSync");

// Elementos del Reproductor Customizado
const BtnPlay = document.getElementById("BtnPlay");
const ProgressBar = document.getElementById("ProgressBar");
const TimeCurrent = document.getElementById("TimeCurrent");
const TimeTotal = document.getElementById("TimeTotal");

// ✨ FUNCIÓN SECRETA ✨
function toggleSecret() {
    if (BtnSync.style.display === "none" || BtnSync.style.display === "") {
        BtnSync.style.display = "flex";
    } else {
        BtnSync.style.display = "none";
    }
}

// 1. Mostrar Cuadrícula Base
function mostrarGenerosBase() {
    ListaGeneros.innerHTML = "";
    GEN.forEach((genero, i) => {
        let li = document.createElement('li');
        li.className = "genre-card"; 
        li.onclick = () => abrirCarpeta(i);
        li.innerHTML = `
            <div class="genre-emoji">${genero.logo}</div>
            <div class="genre-name">${genero.name}</div>
        `;
        ListaGeneros.appendChild(li);  
    });
}

// 2. Indexación Inteligente con LocalStorage
async function indexarCanciones() {
    let cache = localStorage.getItem("music_cloud_cache");
    if (cache) {
        GEN = JSON.parse(cache);
        mostrarGenerosBase();
        return; 
    }

    for (let genero of GEN) {
        try {
            let urlObj = new URL(genero.url);
            let code = urlObj.searchParams.get('code');
            if (!code) continue;
            genero.code = code;

            let response = await fetch(`https://api.pcloud.com/showpublink?code=${code}`);
            let data = await response.json();
            if (data.metadata && data.metadata.contents) {
                genero.canciones = data.metadata.contents
                    .filter(f => !f.issubdir)
                    .map(archivo => ({ name: archivo.name, id: archivo.fileid }));
            }
        } catch (err) {
            console.error(err);
        }
    }
    localStorage.setItem("music_cloud_cache", JSON.stringify(GEN));
    mostrarGenerosBase();
}

function removerCache() {
    if(confirm("¿Quieres buscar canciones nuevas en pCloud? Esto recargará tu biblioteca.")) {
        localStorage.removeItem("music_cloud_cache");
        location.reload(); 
    }
}

function mostrarGeneros() {
    VistaGeneros.style.display = "block";
    VistaPlaylist.style.display = "none";
    VistaBusqueda.style.display = "none";
    I.value = "";
}

function abrirCarpeta(indexGenero) {
    let genero = GEN[indexGenero];
    if (!genero.canciones) {
        alert("Indexando datos, aguarda un segundo...");
        return;
    }

    VistaGeneros.style.display = "none";
    VistaBusqueda.style.display = "none";
    VistaPlaylist.style.display = "block";
    TituloCarpeta.innerText = `${genero.logo} ${genero.name}`;
    
    playlistActual = genero.canciones;
    codigoCarpetaActual = genero.code;

    ListaCancionesContenedor.innerHTML = "";
    genero.canciones.forEach((cancion, i) => {
        let div = document.createElement('div');
        div.className = "song-item";
        div.setAttribute("data-id", cancion.id); // Identificador para el Fucsia
        div.innerHTML = `<span class="song-title">🎵 ${cancion.name}</span>`;
        div.onclick = () => reproducirCancion(codigoCarpetaActual, cancion, i);
        ListaCancionesContenedor.appendChild(div);
    });
}

// ✨ APLICAR COLOR FUCSIA A LA CANCIÓN ACTIVA ✨
function marcarCancionActiva(idCancion) {
    // Le quitamos la clase a todas las canciones renderizadas
    document.querySelectorAll('.song-item').forEach(el => {
        el.classList.remove('active-song');
    });
    // Se la ponemos solo a la que tenga el ID correcto
    let cancionActiva = document.querySelector(`.song-item[data-id="${idCancion}"]`);
    if(cancionActiva) {
        cancionActiva.classList.add('active-song');
        // Hacemos scroll suave para que la canción seleccionada esté visible
        cancionActiva.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

async function reproducirCancion(code, cancion, index) {
    LoadingBox.style.display = "block";
    InfoCancion.innerText = "Conectando stream...";
    
    // Cambiamos el color visualmente de inmediato
    marcarCancionActiva(cancion.id);

    try {
        let res = await fetch(`https://api.pcloud.com/getpublinkdownload?code=${code}&fileid=${cancion.id}`);
        let data = await res.json();
        if (data.result === 0) {
            Reproductor.src = "https://" + data.hosts[0] + data.path;
            Reproductor.play();
            InfoCancion.innerText = cancion.name;
            indiceActual = index;
        }
    } catch (e) {
        InfoCancion.innerText = "Error de enlace";
    }
    LoadingBox.style.display = "none";
}

// Salto automático a la siguiente canción
Reproductor.addEventListener('ended', () => {
    if (playlistActual && indiceActual < playlistActual.length - 1) {
        let siguienteIndex = indiceActual + 1;
        reproducirCancion(codigoCarpetaActual, playlistActual[siguienteIndex], siguienteIndex);
    } else {
        InfoCancion.innerText = "Fin de la lista";
    }
});

// Buscador
I.oninput = (e) => {
    var In = e.target.value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (In === "") { mostrarGeneros(); return; }

    VistaGeneros.style.display = "none";
    VistaPlaylist.style.display = "none";
    VistaBusqueda.style.display = "block";
    ListaBusqueda.innerHTML = "";

    GEN.forEach((genero, i) => {
        let nomGen = genero.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (nomGen.includes(In)) {
            let li = document.createElement('li');
            li.className = "genre-card";
            li.onclick = () => abrirCarpeta(i);
            li.innerHTML = `<div class="genre-emoji">${genero.logo}</div><div class="genre-name">${genero.name}</div>`;
            ListaBusqueda.appendChild(li);
        }

        if (genero.canciones) {
            genero.canciones.forEach((cancion, songIndex) => {
                let nomCan = cancion.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (nomCan.includes(In)) {
                    let li = document.createElement('li');
                    li.className = "song-item";
                    li.style.gridColumn = "span 3"; 
                    li.setAttribute("data-id", cancion.id); // Identificador para el buscador
                    li.innerHTML = `<span class="song-title">🎵 ${cancion.name}</span> <span class="genre-badge">${genero.name}</span>`;
                    li.onclick = () => {
                        playlistActual = genero.canciones;
                        codigoCarpetaActual = genero.code;
                        reproducirCancion(genero.code, cancion, songIndex);
                    };
                    ListaBusqueda.appendChild(li);
                }
            });
        }
    });
};   

// ✨ LÓGICA DEL REPRODUCTOR CUSTOMIZADO ✨

// Play / Pausa
function togglePlay() {
    if (Reproductor.paused) {
        Reproductor.play();
    } else {
        Reproductor.pause();
    }
}

// Cambiar el icono de Play/Pausa dependiendo del estado real del audio
Reproductor.onplay = () => BtnPlay.innerText = "⏸️";
Reproductor.onpause = () => BtnPlay.innerText = "▶️";

// Formatear segundos a minutos:segundos (ej. 3:05)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
}

// Actualizar barra de progreso y tiempo actual
Reproductor.ontimeupdate = () => {
    if (!Reproductor.duration) return;
    ProgressBar.max = Reproductor.duration;
    ProgressBar.value = Reproductor.currentTime;
    TimeCurrent.innerText = formatTime(Reproductor.currentTime);
    TimeTotal.innerText = formatTime(Reproductor.duration);
};

// Adelantar/Atrasar canción al tocar la barra
function seekAudio() {
    Reproductor.currentTime = ProgressBar.value;
}

// Arrancar Sistema
indexarCanciones();