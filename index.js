const express = require('express');
const app = express();
app.use(express.json());

// Data structure to store recommendations
const recommendations = [
  { id: 1, name: 'Destination 1', rating: 4.5 },
  { id: 2, name: 'Destination 2', rating: 4.2 },
  { id: 3, name: 'Destination 3', rating: 4.0 }
];

// Data structure to store wishlist
const wishlist = [];

// Endpoint for finding a place
app.get('/find-place', (req, res) => {
  res.send('<html><body><h1>Welcome to Find Place Page</h1><button onclick="window.location.href=\'/questionnaire\'">Find Place</button></body></html>');
});

// Endpoint for the questionnaire
app.get('/questionnaire', (req, res) => {
  res.send('<html><body><h1>Questionnaire</h1><form action="/recommendations" method="post"><p>Question 1: Do you like beaches?</p><input type="radio" name="answer1" value="yes"> Yes <input type="radio" name="answer1" value="no"> No<br><p>Question 2: Do you enjoy outdoor activities?</p><input type="radio" name="answer2" value="yes"> Yes <input type="radio" name="answer2" value="no"> No<br><p>Question 3: Are you interested in historical sites?</p><input type="radio" name="answer3" value="yes"> Yes <input type="radio" name="answer3" value="no"> No<br><p>Question 4: Do you like hiking?</p><input type="radio" name="answer4" value="yes"> Yes <input type="radio" name="answer4" value="no"> No<br><p>Question 5: Are you a fan of local cuisine?</p><input type="radio" name="answer5" value="yes"> Yes <input type="radio" name="answer5" value="no"> No<br><br><input type="submit" value="Submit"></form></body></html>');
});

// Endpoint to receive questionnaire answers and generate recommendations
app.post('/recommendations', (req, res) => {
  const { answer1, answer2, answer3, answer4, answer5 } = req.body;

  // Generate recommendations based on user answers
  const filteredRecommendations = recommendations.filter(recommendation => {
    return (
      (answer1 === 'yes' && recommendation.name === 'Destination 1') ||
      (answer2 === 'yes' && recommendation.name === 'Destination 2') ||
      (answer3 === 'yes' && recommendation.name === 'Destination 3') ||
      (answer4 === 'yes' && recommendation.name === 'Destination 4') ||
      (answer5 === 'yes' && recommendation.name === 'Destination 5')
    );
  });

  // Return the recommendations as a JSON response
  res.json(filteredRecommendations);
});

// Endpoint to add a recommendation to the wishlist
app.post('/wishlist', (req, res) => {
  const { id } = req.body;

  // Find the recommendation with the specified ID
  const recommendation = recommendations.find(rec => rec.id === id);

  // Check if the recommendation exists and is not already in the wishlist
  if (recommendation && !wishlist.includes(recommendation)) {
    wishlist.push(recommendation);
    res.json({ success: true, message: 'Added to wishlist' });
  } else {
    res.json({ success: false, message: 'Failed to add to wishlist' });
  }
});

// Endpoint to get the wishlist
app.get('/wishlist', (req, res) => {
  res.json(wishlist);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
