export const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const leaderboardTable = document.getElementById('leaderboardTable');
export const createGame = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create a game.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};

export const getScores = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}${gameId}/scores/`);
    if (!response.ok) {
      throw new Error('Failed to retrieve scores.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving scores:', error);
    throw error;
  }
};

export const submitScore = async (gameId, playerName, score) => {
  if (playerName === '' || score === '') {
    return null;
  }
  try {
    const data = {
      user: playerName,
      score: Number(score),
    };

    const response = await fetch(`${BASE_URL}${gameId}/scores/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to submit score.');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error submitting score: ${error.message}`);
  }
};

export const updateLeaderboard = (scores) => {
  leaderboardTable.innerHTML = ''; // Clear the table content
  scores.forEach((score, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<th class="${index % 2 === 0 ? 'th1' : 'th2'}">${score.user}: ${score.score}</th>`;
    leaderboardTable.appendChild(row);
  });
};