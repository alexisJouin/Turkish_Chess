/**
 * Created by mhabinka on 14/12/2016.
 */
$( document ).ready(function() {

/* calcule la probabilité de victoire du joueur 1 sur le joueur 2
en fonction de leur ELO
 */
function probaWin(elo1,elo2){
    var diff = elo1 - elo2;
    if(diff>400) {
        diff = 400;
    }
    return (1/(1+Math.pow(10,-(diff)/400)));
};

/* détermine le coefficient de développement K
amplifiant ou non les montées et descente en ELO
 */
function devConst(eloJoueur,numberGames){
    var K;
    if (numberGames<30) {
        K = 40;
    }
    else if(numberGames>=30 &&  eloJoueur<2400) {
        K = 20;
    }
    else if(numberGames>=30 &&  eloJoueur>=2400) {
        K = 10;
    }
    return K;
};

/* calcule le nouvel ELO du joueur 1 en fonction de l'ELO adverse
 W = 0 si défaite, W= 1 si nul, W = 2 si victoire
*/
function newElo(eloJoueur,eloAdverse,numberGames,W){
    W = W/2;
    var K = devConst(eloJoueur,numberGames);
    return  (Math.round(eloJoueur + K * (W - probaWin(eloJoueur,eloAdverse))));
};
    

});