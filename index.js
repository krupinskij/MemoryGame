let MAX_HOR = 4;
let MAX_VER = 4;
let SIZE = 150;
let MAX_ELEMENTS;

let buttons;
let clickedButtons = [];
let images = [];

let visibleElements;
let clickCounter=0;

function generatePlayGround(){

    $("#playGround").css("gridTemplate", `repeat(${MAX_VER},${SIZE}px) / repeat(${MAX_HOR},${SIZE}px)`);

    for(let i=0;i<MAX_VER;i++)
    {
        for(let j=0;j<MAX_HOR;j++)
        {
            $("#playGround").append("<button></button>");
        }
    }
}

function randomImage(){
    const stack = [];
    buttons = $("#page_2 button");
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
        $(buttons[i]).css("backgroundImage", "url(img/pokemons/back.png)");
        $(buttons[i]).attr("id",number);
    }
}


$(".buttons button").on("click", function() {
  $(".buttons button").removeClass("clicked");
  $(this).addClass("clicked");
  $("#level-image").attr("src", `img/homepage/${$(this).attr("id")}.png`);
});



$("#check").on('click', function() {

    switch($(".clicked").attr("id")){
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

    $("#page_1").css("display", "none").next().css("display", "flex");
    $(document).css("backgroundImage", "url(img/tlo/page_2.png)");

    MAX_ELEMENTS = MAX_HOR*MAX_VER;
    visibleElements=MAX_ELEMENTS;
    generatePlayGround();
    randomImage();

    $("#page_2 button").on('click',function() {
            clickedButtons.push(this);
            clickCounter++;

            $(this).css({
              borderWidth: "4px",
              borderColor: "red",
              backgroundImage: images[$(this).attr("id")]
            });

            if(clickedButtons.length%2==0){

                setTimeout(function() {
                    if(clickedButtons[0]!==clickedButtons[1] &&
                        $(clickedButtons[0]).attr("id")%(MAX_ELEMENTS/2)==$(clickedButtons[1]).attr("id")%(MAX_ELEMENTS/2)) {

                    $(clickedButtons[0]).css("visibility", "hidden");
                    $(clickedButtons[1]).css("visibility", "hidden");

                    visibleElements-=2;

                    if(visibleElements==0){

                        $("#page_2").css("display", "none").next().css("display", "grid");
                        $(document).css("backgroundImage", "url(img/tlo/page_3.png)");
                        $("#count").text(clickCounter);
                    }
                }

                $(clickedButtons[0]).css({
                  border: "",
                  backgroundImage: "url(img/pokemons/back.png)"
                });

                $(clickedButtons[1]).css({
                  border: "",
                  backgroundImage: "url(img/pokemons/back.png)"
                });

                clickedButtons.shift();
                clickedButtons.shift();

                },1000);


            }
    })
})
