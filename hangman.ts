var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                'q', 'r', 's','t', 'u', 'v', 'w', 'x',
                'y', 'z'];

var word : string[];
var hiddenWord: string[];
var solved: boolean = false;
var misses: number = 0;
var maxMisses : number = 7;
var myButtons;
var letters;
var list;
var guesses : string[];
var wordHolder;
var correct;
var guess;
var spaces : number = 0;
var cat : string;

function startGame()
{   
    var words : string[];
    var marvel = ['Captain America','Iron Man','Thor','Spiderman','Hawkeye','Deadpool','Black Widow','Scarlet Witch','Hulk','Captain Marvel','Ant Man','Wasp',
                 'Winter Soldier','Black Panther','Doctor Strange','Starlord','Drax','Nebula','Gamora','Rocket Racoon','Groot','War Machine', 'Falcon'];
    var pokemon = ['Bulbasaur','Squirtle','Charmander','Chikorita','Totodile','Cyndaquil','Treecko','Mudkip','Torchic','Turtwig','Charmander','Piplup',
                  'Snivy','Tepig','Oshawott'];
    var nhl = ['Bruins','Sabres','Red Wings','Panthers','Canadiens','Senators','Lightning','Maple Leafs','Hurricanes','Blue Jackets','Devils','Islanders','Rangers',
               'Flyers','Penguins','Capitals','Blackhawks','Avalanche','Stars','Wild','Predators','Blues','Jets','Ducks','Coyotes','Flames','Oilers','Kings','Sharks',
               'Canucks','Golden Knights'];
    var nba = ['Celtics','Nets','Knicks','Seventy Sixers','Raptors','Bulls','Cavaliers','Pistons','Pacers','Bucks','Hawks','Hornets','Heat','Magic','Wizards','Nuggets',
               'Timberwolves','Thunder','Trail Blazers','Jazz','Warriors','Clippers','Lakers','Suns','Kings','Mavericks','Rockets','Grizzlies','Pelicans','Spurs'];

    var radios = document.querySelector('input[name="cat"]:checked');
    
    if(radios.id == "MARVEL")
    {
        words = marvel;
        cat = "Marvel Character"
    }
    else if(radios.id == "POKE")
    {
        words = pokemon;
        cat = "Pokemon Starter";
    }
    else if(radios.id == "NHL")
    {
        words = nhl;
        cat = "NHL Team";
    }
    else if(radios.id == "NBA")
    {
        words = nba;
        cat = "NBA Team";
    }

    var rand = words[Math.floor(Math.random() * words.length)];
    var newGame: Game = new Game(rand);
}
function endGame()
{
    var gameAlpha = document.getElementById("alphabet");
    gameAlpha.style.display = 'none';

    var strFinal = hiddenWord.join(" ");
    var answer = word.join("");

    if(misses == maxMisses)
    {
        document.getElementById("word").innerHTML = "Answer: " + answer + "</br>Your Result: " + strFinal;
        document.getElementById("end").innerHTML = "You Lost :(";
    }
    else if(solved)
    {
        document.getElementById("word").innerHTML = "Answer: " + answer;
        document.getElementById("end").innerHTML = "You Win! :)";
    }
    document.getElementById("miss").innerHTML = "Total Misses: " + this.misses + " / " + this.maxMisses;
}
class Game
{
    constructor(public gameWord)
    {
        word = gameWord.split("");
        this.setSpaces();
        var startMenu = document.getElementById("menu");
        startMenu.style.display = 'none';
        this.ogDisplay();
        this.setButtons();
    }
    private ogDisplay()
    {
        document.getElementById("header").innerHTML = "Hint: " + cat;
        document.getElementById("word").innerHTML = hiddenWord.join(" ");
        document.getElementById("miss").innerHTML = "Total Misses: " + misses + " / " + maxMisses;
    }
    private setButtons()
    {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');
        letters.id = 'alphabet';
        letters.class = 'alphabet';

        for(var x = 0; x < alphabet.length; x++)
        {
            list = document.createElement('button');
            list.id = alphabet[x];
            list.classList.add('letters');
            list.innerHTML = alphabet[x];
            this.onClick();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }
    private onClick()
    {
        list.onclick = function()
        {
            var guess = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            var m : number = 0;
            for(var x = 0; x < word.length; x++)
            {
                if(word[x].toLowerCase() == guess)
                {
                    hiddenWord[x] = word[x];
                }
                else
                {
                    m++;
                }
            }
            if(m == word.length) { misses++; }
            var count : number = 0;
            for(var x = 0; x < word.length; x++)
            {
                if(word[x] == hiddenWord[x])
                {
                    count++;
                }
                if(count == word.length)
                {
                    solved = true;
                }
            }
            document.getElementById(guess).style.display = 'none';
            document.getElementById("word").innerHTML = hiddenWord.join(" ");;
            document.getElementById("miss").innerHTML = "Total Misses: " + misses + " / " + maxMisses;
            if(solved == true || misses >= maxMisses)
            {
                endGame();
            } 
        }
    }
    private setSpaces()
    {
        var x = 0;
        hiddenWord = word.slice();

        while (x < word.length)
        {
            if(word[x] != ' ')
            {
                hiddenWord[x] = "_";
            }
            x++;
        }
    }
}
