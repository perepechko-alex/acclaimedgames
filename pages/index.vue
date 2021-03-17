<template>
  <p v-if="$fetchState.pending">Fetching games...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>Games</h1>
    <ul style="list-style-type: none;">
      <li v-for="game of games">{{game.rank}}. {{ game.name }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: []
    }
  },
  async fetch() {
    this.games = await fetch(
        'http://localhost:3000/api/results'
    ).then(res => res.json())
  },
  fetchOnServer: false
}
</script>
