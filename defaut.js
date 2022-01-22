const url = 'https://raw.githubusercontent.com/Romain-Muller/Le-pendu/main/liste_francais.txt';
let mot = document.querySelector('.mot');
let lettresJustes;

async function genererMot () { //Récupérer les mots provenant d'une liste au format .txt hébergée sut github et en piocher un haut hasard.
    const requete = await fetch(url, {
        method: 'GET',
    });

    if(requete.ok) {
        let mots = await requete.text(); 
        var listeDeMots = mots.split('\n'); //Créer un tableaux contenant chaque mots. On utilise \n car on prend chaque chaines de charactères séparés d'un retour à la ligne.
    } else {
        alert('Un problème est survenu.');
    }
            do {
            nombreAleatoire = Math.floor(Math.random()* listeDeMots.length); //Générer un nombre aléatoire tant que ce dernier nous ressort un mot beugué de la liste ou un mot avec espace.
        } while (listeDeMots[nombreAleatoire].match('�') || listeDeMots[nombreAleatoire].match(' ') || listeDeMots[nombreAleatoire].match('-'));
        
        var motDecoupe = listeDeMots[nombreAleatoire].split('');
        motDecoupe.forEach(lettre => {
            l = document.createElement('span');
            tiret = document.createElement('div');
            tiret.className = 'tiret';
            mot.appendChild(l);
            l.after(tiret);
            l.textContent = lettre
            lettresJustes = document.querySelectorAll('.mot span')
        });
        
        let touchesVirtuelles = document.querySelectorAll('.clavier span');
        let toucheContent;
        

        touchesVirtuelles.forEach(touche => {
            touche.addEventListener('click', () =>{
                toucheContent = touche.innerHTML
                let green;

                for(let i = 0; i < motDecoupe.length; i++) {
                        if(lettresJustes[i].textContent == toucheContent) {
                        console.log(touche);
                        lettresJustes[i].style.opacity = 1;
                        green = touche;
                    }
                    else {
                        
                        touche.style.opacity = 0.5;
                    }
            }
    })
})

        
        // return motDecoupe;
} 

// let motGenere = genererMot();
genererMot();

// console.log(motGenere.then((v) => { //Utiliser le résultat de la promesse.
//     console.log(v);  //Affiche la première lettre du mot.
//   }));

//   Récupération des touches du clavier virtuel.
// let touchesVirtuelles = document.querySelectorAll('.clavier span');
// let toucheContent;

// touchesVirtuelles.forEach(touche => {
//     touche.addEventListener('click', () =>{
//         toucheContent = touche.innerHTML
//         motGenere.then((lettre => {
//             for(let i = 0; i < lettre.length; i++) {
//                 if(lettre[i].includes(toucheContent)) {
                    
//                 }
//                 else {
//                     touche.style.opacity = 0.5;
//                 }
//             }
//     }))
//     })
// })