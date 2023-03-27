# Wordle-clone

## Generellt

    Spelet ska byggas i form av en fullstack-applikation med tre sidor (routes/URL:er): En startsida där man kan spela spelet, en statisk informationssida om projektet, och en server-side renderad highscore-lista
    Serva hela siren med hjälp av node på port 5080, exempelvis med hjälp av express

## Spelet

    Spelet ska utvecklas fullstack, med GUI utvecklat i React, och delar av spellogiken på backend via ett API.
    Spelets regler definieras av de algoritmer som beskrevs i kursens första uppgift
        Spelet väljer ut ett slumpmässigt ord varje gång spelet startar – användaren kan bestämma hur många bokstäver ordet ska ha och om det får innehålla bokstäver som upprepas
        Användaren gissar vad ordet är och spelet ger feedback enligt feedback-algoritmen
        När användaren gissar rätt ord är spelet över
    Det slumpmässiga urvalet av ord ska ske på servern via ett API-anrop. En datakälla kan vara den datafil som finns på https://github.com/dwyl/english-words
    Efter att användaren klarat spelet ska hen få möjlighet att ange sitt namn och skicka in resultatet till en highscore-lista. Den data som skickas in ska inkludera namnet, tiden från att spelet startade till att det slutade, gissningarna, samt inställningarna avseende ordets längd och unika bokstäver

## Highscore-lista

    På en separat sida/route ska en highscore-lista visas
    Listan ska server-siderenderas

## Informationssida

    En statisk sida där ni beskriver projektet

## Game Loop
1. Player chooses amount of letters and if the it can contain repeated letters for the game t 
2. Game chooses random word on page load
3. Player enters a guess
4. Player gets feedback if guess is incorrect
5. If guess is correct the game is over


# API Documentation

### Error Handling
    400 Bad Request, 500 Internal Server Error
    {
        "error": "Invalid guess format"
    }    

### /api/secret-word
* ```GET``` returns a randomly generated word.

##### Query Parameters
* length=5 (optional): the length of the secret word. Must be an integer between 3 and 10 (inclusive). Defaults to 5 if not specified.
* allowRepeats (optional): if the secret word allows repeated or unique letters.

### /api/guess
* ```POST``` submits a guess for the secret word.

    ##### Request
        {
            "guess": "word"
        }    
    ##### Response
        200 OK
        {
            "isCorrect": false,
            "results": [
                { 
                    "letter: "s", 
                    "result": "incorrect",
                }
            ]
        }    

### /api/highscores
* ```GET``` retrieves a list of all highscores
* ```POST``` creates a new highscore


### /api/highscores/{id}
* ```GET``` 
* ```PUT``` 
* ```DELETE``` 

    ##### Query Parameters
    * sort=asc
    * limit=10
    * filter[length]=5
    * filter[hasRepeats]=false

