//////////////////// Div a récuperer /////////////////////
const commencer = document.querySelector('.commencer');
const recommencer = document.querySelector('.recommencer');
const re_commencer = document.querySelector('.re_commencer');
const motCache = document.querySelector('.bonne');
const mauvaiseLettre = document.querySelector('.mauvaise');
const mauvaisMots = document.querySelector('.mauvaismot');
const fenetreGagne = document.querySelector('.gagne');
const fenetrePerdu = document.querySelector('.perdu');
const motTrouve = document.querySelector('.mottrouve');
const motPerdu = document.querySelector('.motperdu');
const info = document.querySelector('.infos');
const imagePendu = document.querySelector('.image_pendu');
const notif = document.querySelector('.afficher');
const figurePartie = document.querySelectorAll('.figure-partie');

const input = document.querySelector('#mot')
const valider = document.querySelector('.valider');
////////////////////// Mots du jeu a choisir aléatoirement //////////////////////
const mots = ['javascript', 'manger', 'boire', 'developpeur', 'courrir', 'sauter', 'nager', 'zebre', 'baleine', 'chien', 'chat', 'elephant', 'souris', 'clavier', 'php', 'believemy', 'rocket', 'frontend', 'backend', 'fullstack', 'freelance'];

////////////////////// Variable necessaire au fonctionnement //////////////////////
let motAleatoire;
let bonneLettreArr = [];
let mauvaiseLettreArr = [];
let mauvaisMotArr = [];

////////////////////// Remise a zero // nouvelle partie //////////////////////
commencer.addEventListener("click", () => {
    commencer.textContent = "Partie en cour . . .";
    commencer.style.pointerEvents = "none";
    motAleatoire = mots[Math.floor(Math.random() * mots.length)];
    afficherMot();
    /* console.log(motAleatoire); */
})
recommencer.addEventListener('click', () => {
    location.reload(); // Rafraichi la page 
})
re_commencer.addEventListener('click', () => {
    location.reload(); // Rafraichi la page 
})

//////////////////////  Fonctions  //////////////////////
// Affichage du mot Caché 
function afficherMot() {
    motCache.innerHTML = ` 
        ${motAleatoire
            .split('')
            .map(
                lettre => ` 
                    <span class="bonneLettre">
                    ${bonneLettreArr.includes(lettre) ? lettre :
                        ''}
                    </span>
                `
            )
            .join('')
        }
    `;
    const motInterne = motCache.innerText.replace(/\n/g, '');
    /* console.log(motCache.innerText, motInterne); */
    if (motInterne === motAleatoire) {
        fenetreGagne.style.display = 'flex';
        motTrouve.textContent = motAleatoire;
        mauvaiseLettre.innerText = "";
        motCache.innerText = "";
    }
}
// Affichage du pendu par etape
function afficherImage() {
    figurePartie.forEach((partie, index) => {
        const erreurs = mauvaiseLettreArr.length;
        if (index < erreurs) {
            partie.style.display = 'block';
        } else {
            partie.style.display = 'none';
        }
    });
}
function mauvaisMot() {
    // Afficher le mauvais mot
    mauvaisMots.innerHTML = `
        ${mauvaisMotArr.map(lettre => `<span> ${lettre} </span> `)}
    `
    // Afficher le bonhomme
    afficherImage();
    // Verifier si on a perdu
    if (mauvaiseLettreArr.length >= 6) {
        fenetrePerdu.style.display = "flex";
        motPerdu.textContent = 'Le mot à trouver etait : ' + motAleatoire;
        mauvaiseLettre.innerText = "";
        motCache.innerText = "";
    }
}
function afficherMauvaiseLettre() {
    // Afficher les mauvaises lettres
    mauvaiseLettre.innerHTML = `
        ${mauvaiseLettreArr.map(lettre => `<span> ${lettre} </span> `)}
    `
    // Afficher le bonhomme
    afficherImage();
    // Verifier si on a perdu
    if (mauvaiseLettreArr.length >= 6) {
        fenetrePerdu.style.display = "flex";
        motPerdu.textContent = 'Le mot à trouver etait : ' + motAleatoire;
        mauvaiseLettre.innerText = "";
        motCache.innerText = "";
    }
}
// Notification d'un mot ou d'une lettre deja choisi + un timeout de 2 seconde
function afficherNotif() {
    notif.style.display = 'flex';
    setTimeout(() => {
        notif.style.display = 'none';
    }, 2000)
}
///////////////////////////// Action de l'input ///////////////////////
valider.addEventListener('click', (e) => {
    e.preventDefault();
    reponse = input.value;
    if (reponse.length > 1) {   // Superieur a une lettre on verifie le mot complet
        if (reponse == motAleatoire) {
            fenetreGagne.style.display = 'flex';
            motTrouve.textContent = motAleatoire;
            mauvaiseLettre.innerText = "";
            motCache.innerText = "";
        } else {
            if (!mauvaisMotArr.includes(reponse)) { // On verifie que le mot n'a pas deja ete essayé
                mauvaiseLettreArr.push(reponse);
                mauvaisMotArr.push(reponse);
                afficherMauvaiseLettre();
            } else {
                afficherNotif();
            }
        }
        input.value = ""; // On remet la valeur de l'input a zero
    } else if (reponse.length == 1) {  // Egale a une lettre on cherche si une lettre correspond au mot
        const lettre = input.value;
        //console.log(lettre); 
        if (motAleatoire.includes(lettre)) { // Si la lettre est dans le mot
            // console.log(lettre); 
            if (!bonneLettreArr.includes(lettre)) { // Si on a pas deja selectionné la lettre
                bonneLettreArr.push(lettre);
                afficherMot();
            } else {
                afficherNotif();
            }
        } else {
            if (!mauvaiseLettreArr.includes(lettre)) { // Si on a pas deja selectionné la lettre
                mauvaiseLettreArr.push(lettre);
                afficherMauvaiseLettre();
            } else {
                afficherNotif();
            }
        }
    } else {
        // fenetre mot valide (div)
    }


});

/* Création du curseur */
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute('style', 'top:' + (e.pageY - 20) + 'px; left:' + (e.pageX - 20) + 'px;')
})


