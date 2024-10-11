var menuIcone = document.querySelector('.menu-icone');
var ul = document.querySelector(".ul");

menuIcone.addEventListener("click", () => {
    
    if (ul.classList.contains('ativo')){
        ul.classList.remove('ativo');  
        document.querySelector('.menu-icone img').src = 'img/list.svg';
    }else{
        ul.classList.add('ativo');
        document.querySelector('.menu-icone img').src = 'img/x.svg';
    }
})