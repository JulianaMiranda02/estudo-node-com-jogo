const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

function sortearConfronto() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.5:
            result = "CASCO"; //CASCO
            console.log("CASCO! 🐢");
            break;
        case random > 0.5:
            result = "BOMBA"; //BOMBA
            console.log("BOMBA! 💥");
            break;
    }
    return result;

}

function logRollResult(characterName, habilidade, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${habilidade} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

function iniciar(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = getRandomBlock()
        console.log(`Bloco sorteado: ${block}`);

        // rolar os dados 
        let diceResult1 = rollDice();
        let diceResult2 = rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE

            logRollResult(
                character1.NOME,
                "VELOCIDADE",
                diceResult1,
                character1.VELOCIDADE
            );

            logRollResult(
                character2.NOME,
                "VELOCIDADE",
                diceResult2,
                character2.VELOCIDADE
            );


        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            logRollResult(
                character1.NOME,
                "MANOBRABILIDADE",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            logRollResult(
                character2.NOME,
                "MANOBRABILIDADE",
                diceResult2,
                character2.MANOBRABILIDADE
            );

        }
        if (block === "CONFRONTO") {
            totalTestSkill1 = diceResult1 + character1.PODER
            totalTestSkill2 = diceResult2 + character2.PODER


            logRollResult(
                character1.NOME,
                "PODER",
                diceResult1,
                character1.PODER
            );

            logRollResult(
                character2.NOME,
                "PODER",
                diceResult2,
                character2.PODER
            );

            const confrontoResult = sortearConfronto();

            // CASO QUE O JOGADOR 1 GANHOU DO 2
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} venceu o confronto!`);

                const resultadoDado = rollDice();
                if (resultadoDado == 6) {
                    character1.PONTOS++;
                    console.log(`jogador ${character1.NOME} ganhou mais 1 ponto turbo 💪`)
                }


                if (character2.PONTOS > 0) {
                    if (confrontoResult === "CASCO") {
                        character2.PONTOS--;
                        console.log(`${character2.NOME} perdeu 1 ponto! 🐢`);
                    }
                }

                if (character2.PONTOS > 1) {
                    if (confrontoResult === "BOMBA") {
                        character2.PONTOS -= 2;
                        console.log(`${character2.NOME} perdeu 2 pontos! 💣`);
                    }
                }

            }
            // CASO QUE O JOGADOR 2 GANHOU DO 1
            else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} venceu o confronto!`);

                const resultadoDado = rollDice();
                if (resultadoDado == 6) {
                    character2.PONTOS++;
                    console.log(`jogador ${character2.NOME} ganhou mais 1 ponto turbo 💪`)
                }


                if (character1.PONTOS > 0) {
                    if (confrontoResult === "CASCO") {
                        character1.PONTOS--;
                        console.log(`${character1.NOME} perdeu 1 ponto! 🐢`);
                    }

                }

                if (character1.PONTOS > 1) {
                    if (confrontoResult === "BOMBA") {
                        character1.PONTOS -= 2;
                        console.log(`${character1.NOME} perdeu 2 pontos! 💣`);
                    }
                }


            } else {
                console.log(`Empate no confronto! Ninguém perde pontos! 🤝`);
            }


        }


        // verificando o vencedor

        if (block !== "CONFRONTO") {
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;

            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            }

        }

        console.log("--------------------------------------------");

    } // fim do loop
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`🏆 ${character1.NOME} venceu a corrida!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🏆 ${character2.NOME} venceu a corrida!`);
    } else {
        console.log("🤝 A corrida terminou em empate!");
    }

}



console.log(`🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

iniciar(player1, player2);