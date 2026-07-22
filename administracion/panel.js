
import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

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
const auth = getAuth(app);
let imagenActual = "";

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    document
        .getElementById("bodyAdmin")
        .classList.remove("hidden");

});
let editandoId = null;
let bannerPcActual = "";
let bannerMovilActual = "";
let editandoCartelera = null;

let bannerPcCarteleraActual = "";
let bannerMovilCarteleraActual = "";
let editandoPersonal = null;
let fotoPersonalActual = "";
const contenido =
document.getElementById(
    "contenidoAdmin"
);

document.querySelectorAll(".menuBtn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.querySelectorAll(".menuBtn").forEach(item=>{

            item.classList.remove(
                "bg-blue-700",
                "text-white",
                "shadow-lg",
                "shadow-blue-900/40"
            );

            item.classList.add(
                "hover:bg-slate-800",
                "hover:translate-x-2"
            );

        });

        btn.classList.remove(
            "hover:bg-slate-800",
            "hover:translate-x-2"
        );

        btn.classList.add(
            "bg-blue-700",
            "text-white",
            "shadow-lg",
            "shadow-blue-900/40"
        );

        cargarSeccion(btn.dataset.seccion);

    });

});
cargarSeccion("cartelera");
function cargarSeccion(nombre) {

    if (nombre === "cartelera") {

        contenido.innerHTML = `
<div class="max-w-7xl mx-auto">

    <h1 class="text-4xl font-bold text-white mb-8">
        Administrar Cartelera
    </h1>

    <!-- FORMULARIO -->
    <div class="bg-[#111827] rounded-3xl shadow-2xl border border-blue-900 p-8 mb-10">

        <h2 class="text-2xl font-bold text-blue-400 mb-6">
            Nuevo Evento
        </h2>

        <input
    id="grupo"
    placeholder="Nombre del grupo"
    class="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white mb-4">


    <input
        id="fecha"
        placeholder="Ejemplo: 31-07-2026"
        class="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white mb-4">


        <div class="grid md:grid-cols-2 gap-6">

            <div>

                <label class="text-blue-300 font-bold">
                    Banner PC
                </label>

                <img
                    id="previewPc"
                    class="hidden rounded-xl border mt-3 mb-3 w-full">

                <input
                    id="bannerPc"
                    type="file"
                    class="w-full rounded-xl bg-gray-900 p-3 border border-gray-700">

            </div>

            <div>

                <label class="text-blue-300 font-bold">
                    Banner Móvil
                </label>

                <img
                    id="previewMovil"
                    class="hidden rounded-xl border mt-3 mb-3 w-full">

                <input
                    id="bannerMovil"
                    type="file"
                    class="w-full rounded-xl bg-gray-900 p-3 border border-gray-700">

            </div>

        </div>

        <button
            id="guardarCartelera"
            class="mt-8 bg-blue-700 px-8 py-4 rounded-xl text-white font-bold">

            Guardar Cartelera

            </button>

    </div>

    <!-- TABLA -->

    <div class="bg-[#111827] rounded-3xl shadow-2xl border border-blue-900 p-8">

        <h2 class="text-2xl font-bold text-blue-400 mb-6">

            Eventos Registrados

        </h2>

        <div id="tablaCartelera"></div>

    </div>

</div>

<!-- MODAL EDITAR CARTELERA -->

<div
id="modalEditarCartelera"
class="fixed inset-0 bg-black/80 hidden z-50 overflow-y-auto">

    <div class="min-h-screen flex items-center justify-center p-5">

        <div
        class="bg-[#111827] w-full max-w-3xl rounded-3xl shadow-2xl border border-blue-900 p-8 relative">


            <button
            id="cerrarModalCartelera"
            class="absolute top-4 right-5 text-white text-3xl hover:text-red-500">

                ✕

            </button>


            <h2 class="text-3xl font-bold text-blue-400 mb-6">

                Editar Cartelera

            </h2>


            <input
            id="editGrupo"
            placeholder="Grupo"
            class="w-full p-4 rounded-xl bg-gray-900 text-white mb-4">


            <input
            id="editFechaCartelera"
            placeholder="Fecha"
            class="w-full p-4 rounded-xl bg-gray-900 text-white mb-4">



            <div class="grid md:grid-cols-2 gap-6">


                <div>

                    <label class="text-blue-300 font-bold">
                        Banner PC
                    </label>


                    <img
                    id="editPreviewPcCartelera"
                    class="hidden w-full h-48 object-contain rounded-xl border bg-black mb-3">


                    <input
                    id="editBannerPcCartelera"
                    type="file">

                </div>



                <div>

                    <label class="text-blue-300 font-bold">
                        Banner Móvil
                    </label>


                    <img
                    id="editPreviewMovilCartelera"
                    class="hidden w-full h-48 object-contain rounded-xl border bg-black mb-3">


                    <input
                    id="editBannerMovilCartelera"
                    type="file">


                </div>


            </div>



            <button
            id="actualizarCartelera"
            class="mt-8 w-full bg-blue-700 hover:bg-blue-800 rounded-xl py-4 text-white font-bold">

                Actualizar Cartelera

            </button>



        </div>


    </div>

</div>
`;
document
.getElementById("cerrarModalCartelera")
.addEventListener("click",()=>{

    document
    .getElementById("modalEditarCartelera")
    .classList.add("hidden");

});

document
.getElementById("modalEditarCartelera")
.addEventListener("click",(e)=>{

    if(e.target.id==="modalEditarCartelera"){

        document
        .getElementById("modalEditarCartelera")
        .classList.add("hidden");

    }

});

document
.getElementById("bannerMovil")
.addEventListener(
    "change",
    e => {

        const archivo =
            e.target.files[0];

        if (!archivo) return;

        const preview =
            document.getElementById(
                "previewMovil"
            );

        preview.src =
            URL.createObjectURL(
                archivo
            );

        preview.classList.remove(
            "hidden"
        );

    }
);
cargarTablaCartelera();

    }
    if (nombre === "youtube") {

contenido.innerHTML = `

<div class="bg-[#0F172A] rounded-3xl shadow-2xl border border-slate-700 p-8">

    <div class="flex items-center justify-between mb-8">

        <div>

            <h2 class="text-4xl font-bold text-blue-400">
                🎥 Administrar Videos
            </h2>

            <p class="text-gray-400 mt-2">
                Agrega las transmisiones de Facebook o YouTube.
            </p>

        </div>

    </div>

    <div class="grid gap-6">

        <div>

            <label class="block mb-2 font-semibold text-gray-300">
                Título del Video
            </label>

            <input
                id="tituloVideo"
                placeholder="Ej. Transmisión Viernes 11"
                class="w-full rounded-2xl bg-slate-900 border border-slate-600 text-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none">

        </div>

        <div>

            <label class="block mb-2 font-semibold text-gray-300">
                URL del Video
            </label>

            <input
                id="urlVideo"
                placeholder="https://facebook.com/..."
                class="w-full rounded-2xl bg-slate-900 border border-slate-600 text-white p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none">

        </div>

        <div class="text-right">

            <button
                id="guardarVideo"
                class="bg-blue-700 hover:bg-blue-800 transition px-8 py-4 rounded-2xl text-white font-bold shadow-lg">

                💾 Guardar Video

            </button>

        </div>

    </div>

</div>

<div class="mt-10">

    <h3 class="text-3xl font-bold text-blue-400 mb-6">

        📹 Videos Registrados

    </h3>

    <div id="tablaVideos"></div>

</div>

`;

document
.getElementById("guardarVideo")
.addEventListener(
"click",
guardarVideo
);

cargarTablaYoutube();

}
if (nombre === "personal") {

    mostrarPersonal();

}

}
async function guardarPersonal(){


const nombre =
document.getElementById("nombrePersonal").value;


const descripcion =
document.getElementById("descripcionPersonal").value;


const archivo =
document.getElementById("fotoPersonal").files[0];


if(!archivo){

alert("Seleccione una foto");
return;

}


const foto =
await subirImagen(archivo);



await addDoc(
collection(db,"personal"),
{

nombre,
descripcion,
foto

}

);


alert("Staff agregado");


limpiarPersonal();


cargarTablaPersonal();


}
function limpiarPersonal(){

document.getElementById("nombrePersonal").value="";

document.getElementById("descripcionPersonal").value="";

document.getElementById("fotoPersonal").value="";


document
.getElementById("previewPersonal")
.classList.add("hidden");


editandoPersonal = null;

fotoPersonalActual = "";

}
async function cargarTablaPersonal(){


const tabla =
document.getElementById("tablaPersonal");


const snap =
await getDocs(
collection(db,"personal")
);



let html=`

<table class="w-full text-white">

<tr class="bg-blue-900">

<th class="p-4">Foto</th>
<th>Nombre</th>
<th>Descripción</th>
<th>Acciones</th>

</tr>

`;



snap.forEach(item=>{


let data=item.data();



html+=`

<tr class="border-b border-gray-700">


<td class="p-4">

<img src="${data.foto}"
class="w-20 h-20 rounded-full object-cover">

</td>


<td>

${data.nombre}

</td>


<td>

${data.descripcion}

</td>


<td>


<button
onclick="editarPersonal('${item.id}')"
class="bg-blue-700 px-4 py-2 rounded-xl">

✏️

</button>


<button
onclick="eliminarPersonal('${item.id}')"
class="bg-red-700 px-4 py-2 rounded-xl">

🗑

</button>


</td>


</tr>

`;

});


html+=`</table>`;


tabla.innerHTML=html;


}
window.eliminarPersonal=async function(id){


if(!confirm("¿Eliminar personal?"))
return;


await deleteDoc(
doc(db,"personal",id)
);


cargarTablaPersonal();


}
window.editarPersonal = async function(id){

const ref =
doc(db,"personal",id);


const snap =
await getDoc(ref);


const data=snap.data();


editandoPersonal=id;

fotoPersonalActual=data.foto;


// Cargar datos al modal

document
.getElementById("editNombrePersonal")
.value = data.nombre;


document
.getElementById("editDescripcionPersonal")
.value = data.descripcion;


document
.getElementById("editPreviewPersonal")
.src = data.foto;



document
.getElementById("modalPersonal")
.classList.remove("hidden");


}
async function guardarVideo(){

const titulo =
document.getElementById("tituloVideo").value;

const url =
document.getElementById("urlVideo").value;


if(!titulo || !url){

alert("Completa todos los campos");
return;

}


await addDoc(
collection(db,"youtube"),
{
titulo,
url
}
);


alert("Video guardado");


document.getElementById("tituloVideo").value="";
document.getElementById("urlVideo").value="";


cargarTablaYoutube();


}
async function cargarTablaYoutube(){


const tabla =
document.getElementById("tablaVideos");


const snapshot =
await getDocs(
collection(db,"youtube")
);



let html=`

<div class="overflow-x-auto rounded-3xl border border-slate-700">

<table class="w-full text-white">

<thead class="bg-blue-900">

<tr>

<th class="p-4">
Título
</th>

<th class="p-4">
Video
</th>

<th class="p-4">
Acciones
</th>

</tr>

</thead>


<tbody>

`;



snapshot.forEach(docSnap=>{


const video =
docSnap.data();



html+=`

<tr class="border-b border-gray-700">


<td class="p-4">

${video.titulo}

</td>



<td class="p-4">

<a 
href="${video.url}"
target="_blank"
class="bg-green-700 px-4 py-2 rounded-xl">

▶ Ver

</a>


</td>



<td class="p-4">


<button

onclick="eliminarYoutube('${docSnap.id}')"

class="bg-red-700 px-4 py-2 rounded-xl">

🗑 Eliminar

</button>


</td>


</tr>


`;



});



html+=`

</tbody>

</table>

</div>

`;


tabla.innerHTML=html;


}
window.eliminarYoutube = async function(id){


if(!confirm("¿Eliminar video?"))
return;



await deleteDoc(
doc(db,"youtube",id)
);



alert("Video eliminado");


cargarTablaYoutube();


}
function mostrarVideos() {
    contenido.innerHTML=`

<h2 class="text-3xl font-bold mb-6">

Administrar Videos

</h2>

<input
id="tituloVideo"
placeholder="Título"
class="border p-3 w-full mb-4">

<textarea
id="urlVideo"
placeholder="Pega aquí la URL del iframe de Facebook o Youtube"
class="border p-3 w-full mb-4 h-32">
</textarea>

<button
id="guardarVideo"
class="bg-purple-600 text-white px-6 py-3 rounded">

Guardar Video

</button>

<hr class="my-8">

<div id="tablaVideos"></div>

`;
    }
function mostrarBanner() {

contenido.innerHTML = `

<h2 class="text-3xl font-bold mb-6">
Banner
</h2>

<input
id="titulo"
placeholder="Titulo"
class="border p-3 w-full mb-3">

<input
id="fecha"
type="date"
class="border p-3 w-full mb-3">

<label>
Banner PC
</label>

<input
id="bannerPc"
type="file"
class="mb-3">

<label>
Banner Móvil
</label>

<input
id="bannerMovil"
type="file"
class="mb-3">

<button
id="guardarBanner"
class="bg-purple-600 text-white px-6 py-3 rounded">

Guardar

</button>

`;

document
.getElementById("guardarCartelera")
.addEventListener(
"click",
guardarCartelera
);

}
const CLOUD_NAME =
"rnbtubq2";

const UPLOAD_PRESET =
"labomba";
async function subirImagen(file){


const formData=new FormData();


formData.append(
"file",
file
);


formData.append(
"upload_preset",
UPLOAD_PRESET
);



const respuesta =
await fetch(

`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

{
method:"POST",
body:formData
}

);



const data =
await respuesta.json();



return data.secure_url;


}

async function guardarCartelera(){


const grupo =
document.getElementById("grupo").value;


const fecha =
document.getElementById("fecha").value;



const archivoPc =
document.getElementById("bannerPc")
.files[0];


const archivoMovil =
document.getElementById("bannerMovil")
.files[0];



if(!archivoPc || !archivoMovil){

alert("Selecciona ambas imágenes");

return;

}



const urlPc =
await subirImagen(archivoPc);



const urlMovil =
await subirImagen(archivoMovil);




await addDoc(

collection(db,"cartelera"),

{

grupo:grupo,

fecha:fecha,

banner_pc:urlPc,

banner_movil:urlMovil

}

);



alert("Cartelera guardada");


cargarTablaCartelera();


}
async function cargarCartelera(){


const tabla =
document.getElementById("tablaCartelera");



const snapshot =
await getDocs(
collection(db,"cartelera")
);



let html=`


<table class="w-full text-white">

<thead>

<tr class="bg-purple-900">

<th class="p-4">
Imagen
</th>


<th class="p-4">
Grupo
</th>


<th class="p-4">
Fecha
</th>


<th class="p-4">
Acciones
</th>

</tr>


</thead>


<tbody>

`;



snapshot.forEach(item=>{


const data=item.data();



html+=`

<tr class="border-b border-gray-700">


<td class="p-4">

<img 
src="${data.banner_pc}"
class="w-32 h-20 object-cover rounded-lg">

</td>


<td class="p-4">
${data.grupo}
</td>


<td class="p-4">
${data.fecha}
</td>


<td class="p-4">


<button 
class="bg-red-600 px-4 py-2 rounded"
onclick="eliminarCartelera('${item.id}')">

Eliminar

</button>


</td>


</tr>


`;


});



html+=`

</tbody>

</table>

`;



tabla.innerHTML=html;


}
window.eliminarCartelera = async function(id){


if(!confirm("Eliminar cartelera?"))
return;


await deleteDoc(

doc(
db,
"cartelera",
id
)

);



cargarCartelera();


}


function limpiarFormulario() {

    document.getElementById("titulo").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("descripcion").value = "";

    document.getElementById("bannerPc").value = "";
    document.getElementById("bannerMovil").value = "";

    document.getElementById("previewPc").src = "";
    document.getElementById("previewMovil").src = "";

    document.getElementById("previewPc").classList.add("hidden");
    document.getElementById("previewMovil").classList.add("hidden");

    bannerPcActual = "";
    bannerMovilActual = "";

    editandoId = null;

    document.getElementById(
        "guardarCartelera"
    ).innerText = "Guardar";
}
document
.getElementById("logoutBtn")
.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href =
        "login.html";

});

async function cargarTablaCartelera(){


const tabla =
document.getElementById("tablaCartelera");


const snapshot =
await getDocs(
    collection(db,"cartelera")
);



let html=`

<table class="w-full text-white">

<thead class="bg-blue-900">

<tr>

<th class="p-4">
Banner
</th>

<th class="p-4">
Grupo
</th>

<th class="p-4">
Fecha
</th>

<th class="p-4">
Acciones
</th>

</tr>

</thead>

<tbody>

`;



snapshot.forEach(docSnap=>{


const data = docSnap.data();



html+=`

<tr class="border-b border-gray-700">


<td class="p-4">

<img
src="${data.banner_pc}"
class="w-32 h-20 object-cover rounded-xl">

</td>



<td class="p-4">

${data.grupo}

</td>



<td class="p-4">

${data.fecha}

</td>



<td class="p-4 flex gap-3">


<button

onclick="editarCartelera('${docSnap.id}')"

class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-xl">

✏️ Editar

</button>



<button

onclick="eliminarCartelera('${docSnap.id}')"

class="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-xl">

🗑 Eliminar

</button>


</td>



</tr>

`;



});



html+=`

</tbody>

</table>

`;



tabla.innerHTML=html;


}
window.eliminarCartelera = async function(id){


if(!confirm("¿Eliminar esta cartelera?"))
return;



await deleteDoc(

doc(
db,
"cartelera",
id
)

);



alert("Cartelera eliminada");


cargarTablaCartelera();


}
window.editarCartelera = async function(id){


const ref =
doc(
db,
"cartelera",
id
);


const snap =
await getDoc(ref);



const data =
snap.data();


editandoCartelera = id;


bannerPcCarteleraActual =
data.banner_pc;


bannerMovilCarteleraActual =
data.banner_movil;



document.getElementById("editGrupo").value =
data.grupo;


document.getElementById("editFechaCartelera").value =
data.fecha;



const pc =
document.getElementById("editPreviewPcCartelera");


pc.src=data.banner_pc;
pc.classList.remove("hidden");



const movil =
document.getElementById("editPreviewMovilCartelera");


movil.src=data.banner_movil;
movil.classList.remove("hidden");



document
.getElementById("modalEditarCartelera")
.classList.remove("hidden");


}
document
.getElementById("actualizarCartelera")
.addEventListener(
"click",
actualizarCartelera
);



async function actualizarCartelera(){


const grupo =
document.getElementById("editGrupo").value;


const fecha =
document.getElementById("editFechaCartelera").value;



const archivoPc =
document.getElementById("editBannerPcCartelera")
.files[0];


const archivoMovil =
document.getElementById("editBannerMovilCartelera")
.files[0];



let pc =
bannerPcCarteleraActual;


let movil =
bannerMovilCarteleraActual;



if(archivoPc){

pc =
await subirImagen(archivoPc);

}



if(archivoMovil){

movil =
await subirImagen(archivoMovil);

}




await updateDoc(

doc(
db,
"cartelera",
editandoCartelera
),

{

grupo,
fecha,
banner_pc:pc,
banner_movil:movil

}

);



alert("Cartelera actualizada");



document
.getElementById("modalEditarCartelera")
.classList.add("hidden");



cargarTablaCartelera();


}
document
.getElementById("cerrarModalCartelera")
.onclick=()=>{

document
.getElementById("modalEditarCartelera")
.classList.add("hidden");

}
function mostrarPersonal(){

contenido.innerHTML = `

<div class="bg-[#0F172A] rounded-3xl border border-slate-700 shadow-2xl p-8">

<h2 class="text-4xl font-bold text-blue-400 mb-8">
🎧 Administrar Staff
</h2>


<input
id="nombrePersonal"
placeholder="Nombre"
class="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white mb-4">


<input
id="descripcionPersonal"
placeholder="Descripción o cargo"
class="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white mb-4">


<img
id="previewPersonal"
class="hidden w-48 h-48 object-cover rounded-xl mb-4">


<input
id="fotoPersonal"
type="file"
class="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-white">


<button
id="guardarPersonal"
class="mt-6 bg-blue-700 px-8 py-4 rounded-xl text-white">

Guardar Staff

</button>

</div>


<div class="mt-10">

<h2 class="text-3xl text-blue-400 font-bold mb-6">
Staff Registrado
</h2>


<div id="tablaPersonal"></div>


</div>



<!-- MODAL -->

<div
id="modalPersonal"
class="fixed inset-0 bg-black/80 hidden z-50">


<div class="min-h-screen flex items-center justify-center p-5">


<div class="bg-[#111827] rounded-3xl p-8 w-full max-w-xl">


<button
id="cerrarModalPersonal"
class="float-right text-white text-3xl">

✕

</button>


<h2 class="text-3xl text-blue-400 font-bold mb-6">

Editar Staff

</h2>


<input
id="editNombrePersonal"
class="w-full bg-slate-900 text-white p-4 rounded-xl mb-4">


<input
id="editDescripcionPersonal"
class="w-full bg-slate-900 text-white p-4 rounded-xl mb-4">


<img
id="editPreviewPersonal"
class="w-48 h-48 object-cover rounded-xl mb-4">


<input
id="editFotoPersonal"
type="file">


<button
id="actualizarPersonal"
class="mt-6 w-full bg-blue-700 py-4 rounded-xl text-white">

Actualizar

</button>


</div>


</div>


</div>

`;



document
.getElementById("guardarPersonal")
.onclick=guardarPersonal;



document
.getElementById("actualizarPersonal")
.onclick=actualizarPersonal;



document
.getElementById("cerrarModalPersonal")
.onclick=()=>{

document
.getElementById("modalPersonal")
.classList.add("hidden");

};



document
.getElementById("fotoPersonal")
.onchange=e=>{

let archivo=e.target.files[0];

if(!archivo)return;


previewPersonal.src=
URL.createObjectURL(archivo);


previewPersonal.classList.remove("hidden");


};


cargarTablaPersonal();

}
window.editarPersonal = async function(id){


const ref =
doc(db,"personal",id);


const snap =
await getDoc(ref);


const data=snap.data();



editandoPersonal=id;

fotoPersonalActual=data.foto;



editNombrePersonal.value=data.nombre;

editDescripcionPersonal.value=data.descripcion;


editPreviewPersonal.src=data.foto;



document
.getElementById("modalPersonal")
.classList.remove("hidden");


}
async function actualizarPersonal(){


let nombre =
document.getElementById("editNombrePersonal").value;


let descripcion =
document.getElementById("editDescripcionPersonal").value;



let foto=fotoPersonalActual;


let archivo =
document.getElementById("editFotoPersonal").files[0];



if(archivo){

foto =
await subirImagen(archivo);

}



await updateDoc(

doc(db,"personal",editandoPersonal),

{

nombre,
descripcion,
foto

}

);



alert("Staff actualizado");


document
.getElementById("modalPersonal")
.classList.add("hidden");


cargarTablaPersonal();


}