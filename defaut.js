const url = 'https://raw.githubusercontent.com/Romain-Muller/Le-pendu/main/liste_francais.txt';
async function recupererPrix () {
    const requete = await fetch(url, {
        method: 'GET',
    });

    if(requete.ok) {
        let donnees = await requete.text();
        console.log(donnees)
        let listeDeMots = donnees.split('\t');
        console.log(listeDeMots);
    } else {
        alert('Un problème est survenu.');
    }
} 

recupererPrix();