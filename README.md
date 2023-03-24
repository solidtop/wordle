# Wordle

Spelet väljer ut ett ord med fem bokstäver. Spelaren ska gissa vilket ord det är genom att mata in något ord. Om ordet är korrekt har spelaren vunnit. Om det är fel ord ger spelet feedback som indikerar huruvida några bokstäver i det gissade ordet finns med i det hemliga ordet, och huruvida spelaren placerat dem på rätt plats. Spelaren gissar sedan på nytt.


- Funktion som tar emot två strängar (gissning och korrekta ordet)
- Funktionalitet: Kontrollera vilka bokstäver från det ena ordet som förekommer i det andra och i så fall var

Output: En array med objekt, ett för varje bokstav i samma ordning som de förekommer i det gissade ordet, med följande attribut:

    letter (bokstaven)
    result (ett av följande värden)
        ‘incorrect’: Finns inte med i det andra ordet
        ‘misplaced’: Finns med i det andra ordet, men på annan plats
        ‘correct’: Korrekt plats i det andra ordet 
    
    array[
        {
            letter: 'h',
            result: 'incorrect'
        }
    ]


Exempel:

Orden “CYKLA” (utvalt) och “HALLÅ” (gissning) skulle ge följande tillbaka:

    H / incorrect
    A / misplaced
    L / incorrect (eftersom det redan finns ett korrekt L)
    L / correct
    Å / incorrect


## Algoritm A
1. if guess are empty, show error
2. if guess is not a word, show error
3. Create an empty list
4. split wordToGuess into letters
5. split guess into letters
6. for letter in guessLetters
    6.1 if letter at position is the same as wordToGuess at position
        6.1.1 add letter and string 'correct' to list
    6.2 else check if letter exists in whole word
        6.2.1 add letter and string 'misplaced' to list
    6.3 else 
        6.3.1 add letter and string 'incorrect' to list

