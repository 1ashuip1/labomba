import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg9KwWN44kyEFMGfmUdA8GB8Q45asGKTc",
  authDomain: "labomba-5367f.firebaseapp.com",
  projectId: "labomba-5367f",
  storageBucket: "labomba-5367f.firebasestorage.app",
  messagingSenderId: "970744670111",
  appId: "1:970744670111:web:6e245e6e6ca6d89c303faa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

cargarCartelera();
let cartelera = [];
let indiceActual = 0;
const banner = document.getElementById("bannerCartelera");
const indicadores = document.getElementById("indicadores");
const tabla = document.getElementById("tablaPresentaciones");
const reproductor = document.getElementById("streamPlayer");
const listaVideos = document.getElementById("listaVideos");

async function cargarCartelera() {

    const consulta = await getDocs(collection(db, "cartelera"));

    consulta.forEach(doc => {

        const data = doc.data();
          cartelera.push(data);

        tabla.innerHTML += `
            <tr class="hover:bg-theme-border/30 transition-colors">
                <td class="py-2.5 px-4 font-medium border-r border-theme-border/60">
                    ${data.fecha}
                </td>

                <td class="py-2.5 px-4">
                    ${data.grupo}
                </td>
            </tr>
        `;

    });mostrarBanner(indiceActual);
}
async function cargarYoutube() {

    const consulta = await getDocs(collection(db, "youtube"));

    listaVideos.innerHTML = "";

    let primerVideo = true;

    consulta.forEach(doc => {

        const data = doc.data();

        const videoID = obtenerVideoID(data.url);

        if (!videoID) return;

        const miniatura =
            `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;

        listaVideos.innerHTML += `

        <div
            onclick="cambiarVideo('${videoID}')"
            class="cursor-pointer p-2 rounded-lg hover:bg-theme-purple/30 flex gap-3 items-center">

            <img
                src="${miniatura}"
                class="w-24 rounded">

            <span class="text-xs text-slate-200 font-medium">
                ${data.titulo}
            </span>

        </div>

        `;

        if(primerVideo){

            reproductor.src =
            `https://www.youtube.com/embed/${videoID}`;

            primerVideo = false;

        }

    });

}

function mostrarBanner(indice){

    const item = cartelera[indice];

    if(window.innerWidth < 768){

        banner.src = item.banner_movil;

    }else{

        banner.src = item.banner_pc;

    }

    banner.className =
        window.innerWidth < 768
        ? "w-full h-[550px] object-cover transition-all duration-700"
        : "w-full h-[320px] object-cover transition-all duration-700";

    actualizarIndicadores();

}
function obtenerVideoID(url){

    const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    const match = url.match(regExp);

    return (match && match[2].length===11)
        ? match[2]
        : null;

}
window.cambiarVideo = function(id){

    reproductor.src =
    `https://www.youtube.com/embed/${id}`;

}
function actualizarIndicadores(){

    indicadores.innerHTML="";

    cartelera.forEach((_,i)=>{

        indicadores.innerHTML += `
            <button
                onclick="irBanner(${i})"
                class="w-3 h-3 rounded-full ${
                    i===indiceActual
                    ?'bg-white'
                    :'bg-white/40'
                }">
            </button>
        `;

    });

}
window.irBanner=function(i){

    indiceActual=i;

    mostrarBanner(indiceActual);

}
document.getElementById("btnAnterior").onclick=()=>{

    indiceActual--;

    if(indiceActual<0){

        indiceActual=cartelera.length-1;

    }

    mostrarBanner(indiceActual);

};

document.getElementById("btnSiguiente").onclick=()=>{

    indiceActual++;

    if(indiceActual>=cartelera.length){

        indiceActual=0;

    }

    mostrarBanner(indiceActual);

};
setInterval(()=>{

    indiceActual++;

    if(indiceActual>=cartelera.length){

        indiceActual=0;

    }

    mostrarBanner(indiceActual);

},5000);
cargarYoutube();
const listaPersonal = document.getElementById("listaPersonal");

async function cargarPersonal(){

    const consulta = await getDocs(collection(db,"personal"));

    listaPersonal.innerHTML="";

    consulta.forEach(doc=>{

        const data=doc.data();

        listaPersonal.innerHTML+=`

        <div class="bg-theme-card rounded-xl overflow-hidden border border-theme-border shadow-lg hover:scale-105 transition">

            <img
                src="${data.foto}"
                class="w-full h-64 object-cover">

            <div class="p-4">

                <h3 class="text-lg font-bold text-white">

                    ${data.nombre}

                </h3>

                <p class="text-slate-300 text-sm mt-2">

                    ${data.descripcion}

                </p>

            </div>

        </div>

        `;

    });

}
cargarPersonal();