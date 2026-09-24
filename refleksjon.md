# Refleksjonsnotat

I dette arbeidskravet har jeg forsøkt å løse oppgaven så godt jeg kunne innenfor den korte tidsfristen. Jeg har laget en video poker app med React, TypeScript, React Router og Zustand. Den har en spilleside, spillerside og regelside. Spilleren oppretter eller velger en spimller, velger innsats, får utdelt kort, mulighet til å holde kort og trekke nyne kort. Appen sjekker pokerhånden og gir gevinst ut fra innsatsen.

ReactRouter brukes for å navigere mellom sidene. Zustand brukes for å lagre spilltilstanden, bklant annet playerdata, kortstokk, hånd, innsnats, holdte kort og resultat. Tilstanden persists i localStorage slik at den aktive spilleren og den aktive runden beholdes ved reload eller ved navigering.

Det var mye i oppgaven som var vanskellig å forstå i starten, men det fantes mye gode ressurser på nettet. Jeg bruket blant annet fisher-yates for å stokke kortstokken. Det var mye som man måtte holde styr på, som kortstokk, hånd, hvilke kort som hodles, hvilke kort som kastes, innsats og utbetaling. evaluateHand var utfordrende, siden den må vurdere flere forskjellige hands. 

Jeg startet med å ha mye av innholdet samlet i GamePage, og det var føærst mot slutten at jeg ble oppmerksom på at oppgagven krevde gjenbruukbare komponenter. Jeg flyttet derfor deler av GamePage ut til blant annet Game, Card, TotalCoins, CurrentBet og CurrentHand. Det fungerte fint, men mistet noe tid på dette og kunne spart meg dette dersom jeg hadde lest oppgaven noe nøyere.

Jeg lagde forside og bakside for card-komponente, så den har blant annet propen "isFaceDown. Baksiden brukes ikke i selve UI eller spillflyten, så jeg opplevde at dette var lite relevant for kravet, siden kortene vises alltid i denne versjonen. Jeg la det likevel inn.

Jeg synes oppgaven var krevende å gjennnomføre på kort tid. Det var mange krav, og det gjorde at jeg måtte prioritere å få ned minimumskravene fremfor å bruk tid på forståelse, testing, design osv. Jeg tror og mener jeg ville lært mer dersom oppgavetekst og pensum var publisert tidligere, slik at det var mulig å jobbe mer gradvis. Det hadde også vært bedre om relevant pensum var publisert før oppgagveteksten ble gitt.

Jeg forstår at dette er et heltidsstudie, og at det forventes at man bruker mye tid på skolearbeidet. Men jeg mener likevel at en oppgave med så mange tekniske og detaljerte krav over så kort tid ikke er en særlig god eller fornuftig ramme for læring. Det førte til at jeg måtte prioritere å bli ferdig fremfor å jobbe grundig og forstå alle delene. Det skaper også et konstant stressmoment, noe som gjør situasjjonen vanskeligere for studenter som forsøker å kombinere studiet med fulltidsjobb eller andre forpliktelser. Fokuset burde være å få nok rom for å prøve, feile, forstå og lære, fremfor at man hele tiden fokuserer på å rekke fristen

Hvis jeg hadde hatt mer tid, ville jeg brukt mer tid på responsivitet, universell utforming og designet generelt, men også lagt inn flere funksjonaliteter, som for eksempel historikk.