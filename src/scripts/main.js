document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){
        evento.preventDefault();
        let numeroMax = document.getElementById('max-number').value;

        numeroMax = parseInt(numeroMax);

        let numeroAleatorio = Math.random() * numeroMax;
        numeroAleatorio = Math.floor(numeroAleatorio + 1);

        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = "block";
    })
})