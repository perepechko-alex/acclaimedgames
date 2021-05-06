<template>
  <p v-if="$fetchState.pending">Fetching games...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>Games</h1>
    <vue-good-table
        :columns="headers"
        :rows="games"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 100,
        }">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'name'">
          <NuxtLink :to="'/game/' + props.row[props.column.field]">
            {{props.row[props.column.field]}}
          </NuxtLink>
        </span>
      </template>
    </vue-good-table>
    <button @click="$fetch">Refresh</button>
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
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Total Score',
          field: 'totalscore',
          type: 'decimal',
          filterable: true,
        },
        {
          label: 'Release Date',
          field: 'releasedate',
          filterable: true,
        },
        {
          label: 'Developers',
          field: 'developers',
          filterable: true,
        },
        {
          label: 'Platforms',
          field: 'platforms',
          filterable: true,
        }
      ],
      games: []
    }
  },
  async fetch() {
    this.games = await fetch(`/api/results`).then(res => res.json())
  },
  fetchOnServer: false
}
</script>
