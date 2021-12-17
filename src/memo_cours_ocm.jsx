import { createStore } from "https://cdn.skypack.dev/redux@4.0.5";

// on trouve les éléments dans le document HTML
const score = document.getElementById("score");
const player1Button = document.getElementById("player-1");
const player2Button = document.getElementById("player-2");
const resetButton = document.getElementById("reset");
const pauseButton = document.getElementById("pause");

player1Button.addEventListener("click", () => {
  // Ce code s'exécute lorsque le bouton "Point Joueur 1" est cliqué
  // On envoie une action avec dispatch
  // pointScored est un action creator (une fonction qui retourne une action)
  // il faut donc exécuter la fonction pour obtenir l'action et l'envoyer au store
  store.dispatch(pointScored("player1"));
});

player2Button.addEventListener("click", () => {
  // Ce code s'exécute lorsque le bouton "Point Joueur 2" est cliqué
  store.dispatch(pointScored("player2"));
});

resetButton.addEventListener("click", () => {
  // Ce code s'exécute lorsque le bouton "Remettre à zéro" est cliqué
  store.dispatch(restartGame());
});

pauseButton.addEventListener("click", function () {
  // Ce code s'exécute lorsque le bouton "Pause / Reprendre" est cliqué
  store.dispatch(playPause());
});

/**
 * Met à jour le text qui affiche le score
 * @param {boolean} playing
 * @param {'player1' | 'player2'} winner
 * @param {number} player1Score
 * @param {number} player2Score
 * @param {'player1' | 'player2'} advantage
 */
function updateScoreText(
  playing,
  winner = null,
  player1Score = 0,
  player2Score = 0,
  advantage = null
) {
  if (winner) {
    if (winner === "player1") {
      score.innerHTML = "Joueur 1 gagne";
    } else {
      score.innerHTML = "Joueur 2 gagne";
    }
  } else if (playing === false) {
    score.innerHTML = "C'est la pause";
  } else {
    let text = "Le score est: " + player1Score + " - " + player2Score;
    if (advantage) {
      if (advantage === "player1") {
        text += " avantage joueur 1";
      } else {
        text += " avantage joueur 2";
      }
    }
    score.innerHTML = text;
  }
}

// Le state
const initialState = {
  // Le score de chacun des joueurs
  player1: 0,
  player2: 0,
  // Si il y a 40-40 quel joueur a l'avantage
  // On utilise null si pas d'avantage
  advantage: null,
  // Qui a gagné ?
  // Si la partie est en cours on utilise null
  winner: null,
  // La partie est-elle en cours ?
  playing: true
};

// Les actions creators

// mettre en pause / reprendre le jeu
const playPause = () => ({ type: "playPause" });

// redémarrer le jeu
const restartGame = () => ({ type: "restart" });

// un joueur a marqué un point
// on passe en paramètre le joueur qui a marqué
//pointScored = action creator
const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player }
});

// le reducer contient la logique
// c'est une fonction qui reçoit le state et une action  en paramètre, et qui retourne un nouveau state (il faut toujours utiliser le destructuring …).
function reducer(state, action) {
  // si l'action est de type "restart"
  if (action.type === "restart") {
    // on retourne le state initial
    return initialState;
  }
  // si l'action est de type "playPause"
  if (action.type === "playPause") {
    // on retourne un nouvel objet
    return {
      // qui est une copie du state
      ...state,
      // mais on replace la propriété playing
      playing: !state.playing
    };
  }
  // lorsqu'un joueur marque un point
  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";
    if (state.winner) {
      // le jeu est fini, on ne peut pas marquer
      // on retourne le state
      return state;
    }
    if (state.playing === false) {
      // le jeu est en pause, on ne peut pas marquer
      // on retourne le state
      return state;
    }
    const currentPlayerScore = state[player];
    if (currentPlayerScore <= 15) {
      // le joueur qui a marqué est à 0 ou 15 => on ajoute 15
      return { ...state, [player]: currentPlayerScore + 15 };
    }
    if (currentPlayerScore === 30) {
      // le joueur qui a marqué est à 30 => on passe à 40
      return { ...state, [player]: 40 };
    }
    // si le joueur est déjà à 40
    if (currentPlayerScore === 40) {
      // si l'autre joueur n'est pas à 40
      if (state[otherPlayer] !== 40) {
        // le joueur a gagné !
        return { ...state, winner: player };
      }
      // si le joueur a l'avantage
      if (state.advantage === player) {
        // le joueur a gagné !
        return { ...state, winner: player };
      }
      // si personne n'as l'avantage
      if (state.advantage === null) {
        // le joueur a maintenant l'avantage !
        return { ...state, advantage: player };
      }
      // sinon c'est l'autre joueur qui a l'avantage
      // l'autre joueur perd l'avantage
      return { ...state, advantage: null };
    }
  }
  return state;
}

// on crée le store
// Le Store de Redux, c’est un peu comme les œufs dans une tarte : c’est ce qui lie tous les ingrédients ensemble.
//Cette fonction attend deux paramètres : le reducer et le state initial que nous avons déjà créés dans les sections précédentes !
// une fois le store créé, on peut lire le state à tout moment grâce à la fonction  
const store = createStore(reducer, initialState);

// subscribe permet de suivre les changements de state
store.subscribe(() => {
  // on utilise getState pour récupérer le state
  const state = store.getState();
  updateScoreText(
    state.playing,
    state.winner,
    state.player1,
    state.player2,
    state.advantage
  );
});
