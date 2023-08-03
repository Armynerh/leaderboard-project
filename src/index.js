import {
  getScores, submitScore, createGame, updateLeaderboard,
} from './modules/callApi.js';
import './style.css';

const refreshButton = document.getElementById('refreshButton');
const nameInput = document.getElementById('nameInput');
const scoreInput = document.getElementById('scoreInput');
const submitForm = document.getElementById('leaderboardForm');

const alertBanner = document.createElement('div');
alertBanner.classList.add('alert-banner');
document.body.appendChild(alertBanner);
let gameId;

const showAlert = (message, type) => {
  alertBanner.innerHTML = message;
  alertBanner.classList.add(type);
  setTimeout(() => {
    alertBanner.innerHTML = '';
    alertBanner.classList.remove(type);
  }, 3000); // Display for 3 seconds
};
const refreshScores = async () => {
  try {
    if (gameId) {
      const scores = await getScores(gameId);
      updateLeaderboard(scores.result);
    } else {
      showAlert('Game ID is not available', 'error');
    }
  } catch (error) {
    showAlert('Error refreshing scores', 'error');
  }
};

const startGamesRender = async () => {
  try {
    const ngame = await createGame('My Game');
    const val = ngame.result.split(' ');
    const [...gameIdValue] = val;
    gameId = gameIdValue;
    refreshButton.disabled = false;
    await refreshScores();
  } catch (error) {
    showAlert('Error creating game', 'error');
  }
};

startGamesRender();

// Refresh button click event
refreshButton.addEventListener('click', refreshScores);

// Form submission event
submitForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (gameId) {
    const playerName = nameInput.value;
    const score = parseInt(scoreInput.value, 10); // Ensure the score is parsed as an integer

    try {
      await submitScore(gameId, playerName, score);
      showAlert('Score submitted successfully', 'success');
      nameInput.value = '';
      scoreInput.value = '';
      refreshScores();
    } catch (error) {
      showAlert('Error submitting score', 'error');
    }
  } else {
    showAlert('Game ID is not available', 'error');
  }
});
