let MAX_HOR = 4;
let MAX_VER = 4;
let SIZE = 150;
let MAX_ELEMENTS;

let levelButtons = document.querySelectorAll(".buttons button");
let image = document.getElementById("level-image");
let checkButton = document.getElementById("check");

let buttons;
let clickedButtons = [];
let images = [];

let visibleElements;
let clickCounter=0;

function generatePlayGround(){
    
    const playGround = document.getElementById("playGround");

    playGround.style.gridTemplate = `repeat(${MAX_VER},${SIZE}px) / repeat(${MAX_HOR},${SIZE}px)`;

    for(let i=0;i<MAX_VER;i++)
    {
        for(let j=0;j<MAX_HOR;j++)
        {
            let gridButton = document.createElement('button');
            playGround.appendChild(gridButton);
        }
    }
}

function randomImage(){
    const stack = [];
    buttons = document.querySelectorAll("#page_2 button");
    for(let i=0;i<MAX_ELEMENTS;i++)
    {
        let number = Math.floor(Math.random()*MAX_ELEMENTS);

        while(stack.includes(number)){
            number=(number+7)%MAX_ELEMENTS;
        }

        stack.push(number);

        if(number>=MAX_ELEMENTS/2){
            images[number]=`url(img/pokemons/names/${number%(MAX_ELEMENTS/2)+1}.png)`;
        } else {
            images[number]=`url(img/pokemons/images/${number+1}.png)`;
        }
        buttons[i].style.backgroundImage = "url(img/pokemons/back.png)";
        buttons[i].id=number;
    }
}

levelButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        levelButtons.forEach(btn2=>{
            btn2.className ="";
        });
        image.src = `img/homepage/${btn.id}.png`;
        btn.className = "clicked";
    });
});



checkButton.addEventListener('click',()=>{
    let level = document.querySelector(".clicked").id;

    switch(level){
        case "easy": break;
        case "medium":
            MAX_HOR=6;
            break;
        case "hard":
            MAX_HOR=8;
            break;
        case "legendary":
            MAX_HOR=12;
            MAX_VER=6;
            SIZE=100;
    }

    document.getElementById("page_2").style.display="flex";
    document.getElementById("page_1").style.display="none";
    document.body.style.backgroundImage = "url(img/tlo/page_2.png)";

    MAX_ELEMENTS = MAX_HOR*MAX_VER;
    visibleElements=MAX_ELEMENTS;
    generatePlayGround();
    randomImage();

    buttons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            clickedButtons.push(btn);
            clickCounter++;

            btn.style.borderWidth="4px";
            btn.style.borderColor="red";
            btn.style.backgroundImage = images[btn.id];
    
            if(clickedButtons.length%2==0){
    
                setTimeout(function() {
                    if(clickedButtons[0]!==clickedButtons[1] && (clickedButtons[0].id)%(MAX_ELEMENTS/2)==(clickedButtons[1].id)%(MAX_ELEMENTS/2)) {
                    clickedButtons[0].style.visibility="hidden";
                    clickedButtons[1].style.visibility="hidden";

                    visibleElements-=2;

                    if(visibleElements==0){
                        document.getElementById("page_2").style.display="none";
                        document.getElementById("page_3").style.display="grid";
                        document.body.style.backgroundImage = "url(img/tlo/page_3.png)";

                        document.getElementById("count").textContent = clickCounter;
                    }
                }
    
                clickedButtons[0].style.border="";
                clickedButtons[1].style.border="";
                clickedButtons[0].style.backgroundImage= "url(img/pokemons/back.png)";
                clickedButtons[1].style.backgroundImage= "url(img/pokemons/back.png)";
                clickedButtons.shift();
                clickedButtons.shift();
                },1000);
    
                
            }
        })
    })
})





