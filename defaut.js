const url = 'https://raw.githubusercontent.com/Romain-Muller/Le-pendu/main/liste_francais.txt';

async function recupererMots () { //Récupérer les mots provenant d'une liste au format .txt hébergée sut github.
    const requete = await fetch(url, {
        method: 'GET',
    });

    if(requete.ok) {
        let mots = await requete.text(); 
        console.log(mots)
        let listeDeMots = mots.split('\n'); //Créer un tableaux contenant chaque mots. On utilise \n car on prend chaque chaines de charactères séparés d'un retour à la ligne.
        document.body.innerHTML = '<p>' + listeDeMots[2] + '</p>';
        listeDeMots.forEach((element) => { 
            if(element.match('�')) { //Ici, on vérifie si un mot contient le charactère �. Le but étant de ne pas afficher le mot si il contient ce charactère.
                console.log(element.match('�'));
            }
        });
    } else {
        alert('Un problème est survenu.');
    }
} 

recupererMots();