// title 
let title = document.getElementById("title");

// skor 1-2
let skorXstr = document.getElementById("skorX");
let skorYstr = document.getElementById("skorY");

skorX = parseInt(skorXstr.textContent);
skorY = parseInt(skorYstr.textContent);

// user 1 - 2 
let userA = document.getElementById("A");
let userB = document.getElementById("B");

let oynayanOyuncu = userA;

// --- sıradaki harf ---
let next = document.querySelector("#next");
next.innerHTML = "X";

// --- butonlar ---
let buttonlarNode = document.querySelectorAll(".button");
var buttonlarDizi = [...buttonlarNode];
console.log(buttonlarDizi);


// 9 BUTTONS
let counter=0;
buttonlarDizi.forEach(function(button, index) {
    button.addEventListener('click', function() {
        counter++;

        buttonlarDizi[index].innerHTML = next.innerHTML;
        button.disabled=true;
        button.classList.add('buttonaBasildi');
        
        if(next.innerHTML=="X"){
            next.innerHTML="O";
        }
        else{ 
            next.innerHTML ="X";
        }

        if(counter >= 3){
            if(kazananKombinasyonlar(buttonlarDizi))
            {
                title.innerHTML="KAZANDINIZ";
                buttonlarDizi.forEach(function(button) {
                    button.disabled = true; 
                    if (!button.classList.contains('kazananDugmeler')) {
                        button.classList.add('kazananlarExcept');
                    }
                });
                if(oynayanOyuncu==userA){
                    skorX+=1;
                    skorXstr.textContent=skorX;
                }
                else{
                    skorY+=1;
                    skorYstr.textContent=skorY;
                }
            }
            else if(counter==9){
                title.innerHTML="BERABERE";
            }
            else{}
        }
    });
});

// KAZANMA DURUMLARI VE KAZANAN DUGMELER
function kazananKombinasyonlar(dugmeler) {
    const kazananKombinasyonları = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay kombinasyonlar
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey kombinasyonlar
        [0, 4, 8], [2, 4, 6]             // Çapraz kombinasyonlar
    ];
    for (let i = 0; i < kazananKombinasyonları.length; i++) {
        const [a, b, c] = kazananKombinasyonları[i];
        if ((dugmeler[a].textContent == "X" && dugmeler[b].textContent == "X" && dugmeler[c].textContent == "X")
         || 
        (dugmeler[a].textContent == "O" && dugmeler[b].textContent == "O" && dugmeler[c].textContent == "O")) {
            // dugmeler[a].style.backgroundColor="green"; 
            dugmeler[a].classList.add("kazananDugmeler");
            dugmeler[b].classList.add("kazananDugmeler");
            dugmeler[c].classList.add("kazananDugmeler");
            return true; // Kazanan bulundu
        }
    }
    return false; // Kazanan yok
}

// --- RESTART button --- 
let restart = document.getElementById("restart");
restart.addEventListener('click', function() {
    title.innerHTML="Tic Tac Toe";

    buttonlarDizi.forEach(function(button,index){
        buttonlarDizi[index].innerHTML = ""; 
        button.disabled = false;
        button.classList.remove("kazananDugmeler");
        button.classList.remove("kazananlarExcept");
        button.classList.remove("buttonaBasildi");
    });

    if(counter!=0){
        if(oynayanOyuncu==userA){
            oynayanOyuncu.classList.toggle("oynayanOyuncu");
            oynayanOyuncu=userB;
            oynayanOyuncu.classList.toggle("oynayanOyuncu");
        }
        else{
            oynayanOyuncu.classList.toggle("oynayanOyuncu");
            oynayanOyuncu=userA;
            oynayanOyuncu.classList.toggle("oynayanOyuncu");
        }
    }   
    counter=0;
    next.innerHTML = "X";
});


