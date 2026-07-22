const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");
const bar = document.getElementById("active-bar");
const btnMenu = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

    console.log("App cargado");
    (function() {
      const slides = document.querySelectorAll('#slider-bg .slide-img');
      console.log(slides);
console.log(slides.length);
      let current = 0;
      const total = slides.length;

      setInterval(() => {
        const next = (current + 1) % total;

        // 1. Ocultar la imagen actual deslizándola hacia arriba
        slides[current].classList.remove('opacity-100', 'translate-y-0');
        slides[current].classList.add('opacity-0', '-translate-y-full');

        // 2. Traer la siguiente imagen desde abajo hacia el centro
        slides[next].classList.remove('opacity-0', 'translate-y-full');
        slides[next].classList.add('opacity-100', 'translate-y-0');

        // 3. Resetear la posición de la imagen que salió (en segundo plano)
        const previous = current;
        setTimeout(() => {
          slides[previous].classList.remove('-translate-y-full');
          slides[previous].classList.add('translate-y-full');
        }, 1000); // 1000ms coincide con 'duration-1000' de Tailwind

        current = next;
      }, 4000); // Cambia cada 4 segundos
    })();
    window.addEventListener("load", () => {

    const navbar = document.getElementById("navbar");

    setTimeout(() => {
        navbar.classList.remove(
            "opacity-0",
            "-translate-y-10"
        );

        navbar.classList.add(
            "opacity-100",
            "translate-y-0"
        );

    },300);

}); 


function moveBar(link){

    bar.style.width = link.offsetWidth + "px";
    bar.style.left = link.offsetLeft + "px";

}


window.addEventListener("load",()=>{

    moveBar(links[0]);

});


window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top = section.offsetTop - 150;

        if(scrollY >= top){
            current = section.id;
        }

    });


    links.forEach(link=>{

        if(link.getAttribute("href") === "#"+current){

            links.forEach(l=>{
                l.classList.remove("text-white");
            });

            link.classList.add("text-white");

            moveBar(link);

        }

    });

});


let menuOpen = false;


function updateIcon(){

const icon = menuOpen ? "x" : "menu";

document.getElementById("menu-icon")
.setAttribute("data-lucide",icon);

lucide.createIcons();

}



btnMenu.addEventListener("click",()=>{

menuOpen = !menuOpen;

mobileMenu.classList.toggle("hidden");

updateIcon();

});



document.querySelectorAll(".mobile-link")
.forEach(link=>{


link.addEventListener("click",()=>{


mobileMenu.classList.add("hidden");


menuOpen=false;


updateIcon();


});


});
let clicksCopyright = 0;
let timerCopyright;


document
.getElementById("copyrightAdmin")
.addEventListener("click",()=>{

    clicksCopyright++;

    clearTimeout(timerCopyright);


    timerCopyright = setTimeout(()=>{

        clicksCopyright = 0;

    },1500);



    if(clicksCopyright === 3){

        window.location.href =
        "administracion/login.html";

        clicksCopyright = 0;

    }

});