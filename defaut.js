// Initialisation des variables
let vie = 7;
let mot = document.querySelector('.mot');
let touchesVirtuelles = document.querySelectorAll('.clavier span');
let select = document.querySelector('.select');
let textArea = document.querySelector('.word');
let start = document.querySelector('.start');
let boiteDialogue = document.querySelector('.dialogue')
let buttonA = document.querySelector('.A');
let buttonB = document.querySelector('.B');
let pvSalameche = document.querySelectorAll('.vieSalameche .vie');
let vieMewtwo = document.querySelector('.vieMewtwo');
let informations = document.querySelector('.informations');
let commencer = document.querySelector('.commencer');
let screen = document.querySelector('.screen');
let homeScreen = document.querySelector('.regles');
let oui = document.querySelector('.oui');
let non = document.querySelector('.non');
let recommencer = document.querySelector('.reload');
let sound = 'on';
let toucheContent, listeDeMots, motDecoupe, lettresJustes, hpMewtwo, pvMewtwo;

// Musique
const battleMusic = document.querySelector('.battleMusic');
const victoryMusic = document.querySelector('.victoryMusic');
battleMusic.loop = true;
battleMusic.volume = 0.1;
victoryMusic.volume = 0.1;


// Url de la requête.
const url = 'https://raw.githubusercontent.com/Romain-Muller/Le-pendu/main/liste_francais.txt';

// Mécanique du jeu du pendu.
async function genererMot () { //Récupérer les mots provenant d'une liste au format .txt hébergée sut github et en piocher un haut hasard.
    const requete = await fetch(url, {
        method: 'GET',
    });

    if(requete.ok) {
        let mots = await requete.text(); 
        listeDeMots = mots.split('\n'); //Créer un tableaux contenant chaque mots. On utilise \n car on prend chaque chaines de charactères séparés d'un retour à la ligne.
    } else {
        alert('Un problème est survenu.');
    }
} 

genererMot().then();

// Generation du mot au hasard.
function motAuHasard () {
    do {
        nombreAleatoire = Math.floor(Math.random()* listeDeMots.length); //Générer un nombre aléatoire tant que ce dernier nous ressort un mot beugué de la liste ou un mot avec espace ou avec un tiret.
    } while (listeDeMots[nombreAleatoire].match('�') || listeDeMots[nombreAleatoire].match(' ') || listeDeMots[nombreAleatoire].match('-'));

        
    motDecoupe = listeDeMots[nombreAleatoire].split(''); //Découper le mot lettre par lettre pour les mettres dans des span.
}

// Affichage du mot à l'écran.
function decoupeMot () {
    motDecoupe.forEach(lettre => {
        l = document.createElement('span');
        tiret = document.createElement('div');
        tiret.className = 'tiret';
        mot.appendChild(l);
        l.after(tiret);
        l.textContent = lettre.toLowerCase();   
    });
     lettresJustes = document.querySelectorAll('.mot span')
}

//Vérifier si la touche virtuelle est dans le mot.
function verifierClique () {    
    touchesVirtuelles.forEach(touche => { 
        touche.addEventListener('click', (e) =>{ 
            toucheContent = touche.innerHTML
            informations.textContent = 'Salameche choisit la lettre ' + toucheContent + ' !'
            for(let i = 0; i < motDecoupe.length; i++) {
                if(lettresJustes[i].textContent == toucheContent) {
                    juste(i);
                    touche.style.color = 'green';
                    document.querySelectorAll('.vieMewtwo .vie')[hpMewtwo].className = 'slideVieLeft';
                    victoire();
                }
                else {
                    touche.style.opacity = 0.5;
                }  
            }

            if(touche.style.color != 'green') {
                vie --;
                verificationVie();
            }

            touche.style.pointerEvents = 'none';
        })
    })
}  

//Vérification des touches saisis au clavié. 
function verifierFrappe() {    
        document.addEventListener('keydown', (event) => {
                for(let j = 0; j < motDecoupe.length; j++) {
                    if(lettresJustes[j].textContent == event.key) {
                        juste(j);
                        for(let k = 0; k < touchesVirtuelles.length; k++) {
                            if(event.key == touchesVirtuelles[k].textContent) { 
                                touchesVirtuelles[k].style.color = 'green';
                                victoire();  
                            }
                        }
                        document.querySelectorAll('.vieMewtwo .vie')[hpMewtwo].className = 'slideVieLeft';
                    }
                    else {
                        //Correspondance touche de saisie = touche au clavier.
                        for(let k = 0; k < touchesVirtuelles.length; k++) { 
                            if(event.key == touchesVirtuelles[k].textContent) { 
                                touchesVirtuelles[k].style.opacity = 0.5;
                            }
                        }
                    }
                }

                for(let k = 0; k < touchesVirtuelles.length; k++) {
                    if(event.key == touchesVirtuelles[k].textContent && touchesVirtuelles[k].style.color != 'green') { 
                        vie --;
                        verificationVie();
                    }
                }
                
                for(let k = 0; k < touchesVirtuelles.length; k++) {
                    if(event.key == touchesVirtuelles[k].textContent && touchesVirtuelles[k].style.color != 'green') { 
                        touchesVirtuelles[k].style.pointerEvents = 'none';
                    }
                }
                
        })
    }

// Valider le mot proposé.
function validationA () {
    if(textArea.value == motDecoupe.join('')) {
        textArea.value = '';
        for(let i = 0; i < motDecoupe.length; i++) {
                juste(i);
        }
        buttonA.removeEventListener('click', validationA);
        victoire();
    }
    else {
        vie --;
        verificationVie();
        textArea.value = '';
        buttonA.removeEventListener('click', validationA);
    }
}

//Surveiller le nombre de coups restants et tenir le joueur informé.
function verificationVie () {
    switch (vie) {
        case 6:
            pvSalameche[6].className = 'slideVieLeft';
            pvSalameche[6].style.borderRadius = '0 50px 50px 0';
            setTimeout(() => {
                informations.textContent = 'Aïe ! Salameche perd 1 pv.'
            }, 850);
            break;
        case 5:
            pvSalameche[5].className = 'slideVieLeft';
            setTimeout(() => {
                informations.textContent = 'Aïe ! Salameche perd 1 pv.'
            }, 850);
            break;
        case 4:
            pvSalameche[4].className = 'slideVieLeft';
            setTimeout(() => {
                informations.textContent = 'Attention Salameche n\'a plus que ' + vie + ' pv !'
            }, 850);
            break;
        case 3:
            pvSalameche[3].className = 'slideVieLeft';
            setTimeout(() => {
                informations.textContent = 'Attention Salameche n\'a plus que ' + vie + ' pv !'
            }, 850);
            break;
        case 2:
            pvSalameche[2].className = 'slideVieLeft';
            setTimeout(() => {
                informations.textContent = 'Ça devient dangereux pour toi !'
            }, 850);
            break;
        case 1:
            pvSalameche[1].className = 'slideVieLeft';
            setTimeout(() => {
                informations.textContent = 'Mewtwo va t\'avoir ! \n\n Fais quelque chose !'
            }, 850);
            break;
        case 0:
            pvSalameche[0].className = 'slideVieLeft';
            setTimeout(() => {
                informations.textContent = 'Salameche est KO.'
            }, 850);
            stopGame();
            break;
        default:
            break;
    }
}

// Fonctions annexes du jeux du pendu.
function initialiserVieMewtwo () {
    vieMewtwo.innerHTML = '';
    hpMewtwo = motDecoupe.length;
    vieMewtwo.style.gridTemplateColumns = 'repeat(' + motDecoupe.length + ', 1fr)';

    motDecoupe.forEach(() => {
        pvMewtwo = document.createElement('div');
        pvMewtwo.className = 'vie';
        vieMewtwo.append(pvMewtwo);
    })
}

function juste(x) {
    lettresJustes[x].style.opacity = 1;
    hpMewtwo --;
}

function restart() {
    start.addEventListener('click', () => {
        screen.classList.toggle('screenOn');
        document.querySelector('.reload').classList.toggle('reloadOn');
    }) 

    oui.addEventListener('click', () => {
        reload();
    })
    non.addEventListener('click', () => {
        battleMusic.pause();
        if(confirm('Êtes-vous sûr de vouloir quitter ?') == true) {
            window.close();
        }
        
    })
}

// Gestion de la musique.
buttonB.addEventListener('click', () => {
    if(sound == 'on') {
        battleMusic.pause();
        sound = 'off';
    }
    else if(sound == 'off') {
        battleMusic.play();
        sound = 'on';
    }
})

// Proposer un mot en appuyant sur select.
function proposerMot () {
    select.addEventListener('click', () => { 
        textArea.classList.toggle('show');
        textArea.focus();
        informations.textContent = '';
        textArea.addEventListener('keydown', (event) => { 
            event.stopPropagation();
        })
        
        buttonA.addEventListener('click', validationA);
    })
}

// Arrêt du jeu.
function stopGame () {
    touchesVirtuelles.forEach(touche => {
        touche.style.opacity = 0.5;
        touche.style.pointerEvents = 'none';
    })

    setTimeout(() => {
        screen.classList.toggle('screenOn');
        recommencer.classList.toggle('reloadOn');
        }, 4000);
    
}

// Lettre/mot trouvé.
function victoire () {
    let count = 0;

    lettresJustes.forEach(lettres => {
        if(lettres.style.opacity == 1) {
            count ++;
            setTimeout(() => {
                informations.textContent = 'Super ! \n\n Continu comme ça !'
            }, 850);
        }
    }) 

    if(count == motDecoupe.length) {
        setTimeout(() => {
            informations.textContent = 'Incroyable tu as battu mewtwo !'
        }, 850);
        stopGame();
        battleMusic.pause();
        victoryMusic.play();
    }
}

// Cacher la proposition si de mot si l'utilisateur clique en dehors du textArea.
function hideTextArea() {
    window.addEventListener('click', (event) => {
        if(event.target != select) {
            textArea.classList.add('show');
        }
    })
}

//Fonctions de réinitialisation.
function reinitialiserClavier() {
    touchesVirtuelles.forEach(touche => {
            touche.style.opacity = 1;
            touche.style.pointerEvents = 'initial';
            touche.style.color = 'white';
        })
}
function reinitialiserVieSalameche () {
    vie = 7;
    pvSalameche[6].className = '';
    pvSalameche[5].className = '';
    pvSalameche[4].className = '';
    pvSalameche[3].className = '';
    pvSalameche[2].className = '';
    pvSalameche[1].className = '';
    pvSalameche[0].className = '';
}

function reload () {
    screen.classList.add('screenOn');
    recommencer.classList.remove('reloadOn');
    informations.innerHTML = 'Vas-y Salameche ! <br/> Go !';
    mot.innerHTML = '';
    battleMusic.play();
    reinitialiserClavier();
    reinitialiserVieSalameche();
    genererMot();
    motAuHasard();
    decoupeMot ();
    initialiserVieMewtwo ();
}

// Lancement de la partie.
function lancerPartie () {
    commencer.addEventListener('click', () => {
        document.querySelector('.regles').classList.add('musique');
        window.scrollTo(top);
        setTimeout(() => {
            screen.classList.add('screenOn');
            homeScreen.style.display = 'none';
        }, 2000);
        battleMusic.play();
        genererMot();
        motAuHasard();
        decoupeMot ();
        initialiserVieMewtwo ();
        verifierClique ();
        verifierFrappe ();
        hideTextArea ();
        restart ();
        proposerMot ();
    })
}

lancerPartie();