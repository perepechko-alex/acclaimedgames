<template>
<!--  <p v-if="$fetchState.pending">Fetching games...</p>-->
<!--  <p v-else-if="$fetchState.error">An error occurred :(</p>-->
  <div>
    <NuxtLink to="/">Home page</NuxtLink>
    <h1>{{ gameResults[0].name }}</h1>
    <vue-good-table
        :columns="headers"
        :rows="gameResults"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'rank', type: 'asc'},
        }"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
        }"
        :pagination-options="{
          enabled: true,
          mode: 'pages',
          perPage: 100,
        }">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'rank'">
          <span v-if="props.row.rank == null">
            Unranked
          </span>
          <span v-else>
            {{props.row[props.column.field]}}
          </span>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          label: 'Rank',
          field: 'rank',
          type: 'number',
          html: false,
          filterable: true,
        },
        {
          label: 'Weighted Points',
          field: 'weightedpoints',
          type: 'decimal',
          filterable: true,
        },
        {
          label: 'Publication',
          field: 'filename', // TODO: Change to publication later
        },
        {
          label: 'List Year',
          field: 'listyear',
          filterable: true,
        },
      ],
      gameResults: []
    }
  },
  async asyncData({ params, $http }) {
    const gameName = params.game // When calling /abc the game name will be "abc"
    const gameResults = await $http.$get(`/api/${encodeURIComponent(gameName.replace(/'/g, '\'\''))}`)
    return { gameResults }
  },
}
</script>
