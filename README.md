## Sistemos paleidimas
`yarn dev`

## Sistemos testavimas
`yarn test`

## Sistemos aprašymas
Sistema nuskaito įvesties "input.json" duomenis, kurie yra nurodomi package.json parametre "scripts.dev", paskaičiuoja operacijos komisinius, ir pateikia į stdout.

### utils.js
Funkcija priima bylos nuorodą kaip argumentą ir nuskaitos duomenis naudodama "fs" modulį.

### processData.js
Funckija priima du argumentus: operaciją ir konfiguracijų rinkinį. Pagal operacijos tipą, pasirenka reikiamą konfiguraciją. Jeigu operacija yra fizinio asmens, jos istorija yra išsaugojama įrašant sumą ir savaitės numerį, taip apskaičiuojant nemokamą savaitės limitą išgryninant pinigus.

### app.js
Funkcija priima vieną argumentą: įvesties bylą. Pasiima konfiguracijas iškviečiant 'axios' modulį ir išsaugo kaip objektą. Nuskaito operacijos duomenis iškviečiant utils.js modulį, ir apdoroja kiekvieną operaciją atskirai iškviečiant processData.js modulį.

### index.js
Iškviečia app.js modulį ir pateikia rezultatą į stdout.

