# Wordle

## Client
To install all dependencies for the client, run the following command in the client directory:

```
npm install
```
Run all client related tests with following command:
```
npm test
```

## Server
To install all dependencies for the server, run the following command in the server directory:

```
npm install
```
Start the server on port 5080 with following command:
```
npm start
```

Run all server related tests with following command:
```
npm test
```


# API Documentation

### Error Handling
    {
        "error": "Invalid guess format"
    }    

### /api/secret-word
* ```POST``` Starts the game session and generates a random word.

##### Query Parameters
* wordLength=5 (optional): the length of the secret word. Must be an integer between 5 and 10. Defaults to 5 if not specified.
* uniqueLetters=true (optional): if the secret word should contain unique letters or not.

    ##### Response
        200 OK 
        {
            "gameHasStarted": true,
            "guessesRemaining": 5,
            "currentGuess": 0,
            "gameTime": 0,
            "results": []
        }

### /api/guess
* ```POST``` submits a guess for the secret word.

    ##### Request
        {
            "guess": "word"
        }    
    ##### Response
        200 OK 
        {
            "gameIsFinished": true,
            "playerHasWon": false,
            "results": []
        }    
        Game is finished
        {
            "gameIsFinished": true, 
            "playerHasWon": true, 
            "secretWord": "HELLO",
            "score": 0,
            "gameTime": 1000,
            "results": [],
        }

### /api/highscores 
* ```GET``` retrieves a list of all highscores (Not neccessary)

* ```POST``` creates a new highscore

    ##### Request
        {
            "name": "string",
            "gameDuration": 0,
            "numGuesses": 0,
            "score": 0,
            "settings": {
                "wordLength": 0,
                "allowRepeats": false
            }
        }
    
    ##### Response
        200 OK
        {
            "message": "Highscore posted!"
        }


### /api/highscores/{id} (Not Neccessary)
* ```GET``` 
* ```PUT``` 
* ```DELETE``` 


