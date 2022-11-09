const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', async (req, res) => {
  const username = req.query.username || 'myogeshchavan97';
  console.log('username:',username);
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.send(repos);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/ip', async (req, res) => {
  const ip = req.query.ip || '';
  let url = `http://ip-api.com/json/` +ip
  console.log('url:', url);
  try {
    const result = await axios.get(url);
    const repos = result.data
    res.send(repos);
  } catch (error) {
    res.status(400).send(`Error:${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
