
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
    }
    else if(radios.id == "POKE")
    {
        words = pokemon;
    }
    else if(radios.id == "NHL")
    {
        words = nhl;
    }
    else if(radios.id == "NBA")
    {
        words = nba;
    }

    var rand = words[Math.floor(Math.random() * words.length)];
    var newGame: Game = new Game(rand);
}

class Game
{
    word : string;
    hiddenWord: string;
    solved: boolean = false;
    misses: number = 0;
    maxMisses : number = 3;

    constructor(public gameWord)
    {
        this.word = gameWord;
        if(this.word.length > 9)
        {
            this.maxMisses = Math.floor(this.word.length/3);
        }
        this.play();
    }
    private play() 
    {
        this.setSpaces();

        while(!this.solved && this.misses < this.maxMisses)
        {
            this.printHidden();
            this.printMisses();
            
            this.guessLetter();

            this.checkSolve();
        }
        this.printEnd();
    }
    private printEnd()
    {
        this.printHidden();
        this.printMisses();

        if(this.misses == this.maxMisses)
        {
            document.getElementById("end").innerHTML = "You Lost :(";
        }
        else if(this.solved)
        {
            document.getElementById("end").innerHTML = "You Win! :)";
        }
    }
    private checkSolve()
    {
        if(this.word.toUpperCase() == this.hiddenWord.toUpperCase()) this.solved = true;
    }
    private guessLetter()
    {
        var c = prompt("Guess a Letter:\n" + this.hiddenWord + "\n" + "Total Misses: " + this.misses + " / " + this.maxMisses);
        var found : boolean = false;

        for (var x = 0; x < this.hiddenWord.length; x++)
        {
            if(this.word.charAt(x).toUpperCase() == c.toUpperCase())
            {
                this.hiddenWord = this.hiddenWord.substr(0,x) + this.word.charAt(x) + this.hiddenWord.substr(x+1);
                found = true;
            }
        }
        if(found == false)
        {
           this.misses++;
        }
        
        return this.hiddenWord
    }
    private printHidden()
    {
        document.getElementById("word").innerHTML = this.hiddenWord;
    }
    private setSpaces()
    {
        var x = 0;
        this.hiddenWord = "";
        while (x < this.word.length)
        {
            if(this.word.charAt(x) == ' ')
            {
                this.hiddenWord+=' ';
            }
            else
            {
                this.hiddenWord+="?";
            }
            x++;
        }
    }
    private printMisses()
    {
        document.getElementById("miss").innerHTML = "Total Misses: " + this.misses + " / " + this.maxMisses;
    }
}
