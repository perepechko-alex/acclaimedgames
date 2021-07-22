<template>
  <div>
    <last-updated />
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
        mode: 'pages',
        perPage: 100,
      }"
      compactMode
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'name'">
          <NuxtLink :to="`/game/${props.row[props.column.field]}`">
            {{ props.row[props.column.field] }}
          </NuxtLink>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import LastUpdated from "../components/lastUpdated";

export default {
  components: { LastUpdated },
  data() {
    return {
      headers: [
        {
          label: "Rank",
          field: "rank",
          type: "number",
          html: false,
          filterable: true,
        },
        {
          label: "Name",
          field: "name",
          filterable: true,
        },
        {
          label: "Total Score",
          field: "totalscore",
          type: "decimal",
          filterable: true,
        },
        {
          label: "Number of Lists",
          field: "numoflists",
          type: "number",
          filterable: true,
        },
        {
          label: "Release Date",
          field: "releasedate",
          filterable: true,
        },
        {
          label: "Developers",
          field: "developers",
          filterable: true,
        },
        {
          label: "Platforms",
          field: "platforms",
          filterable: true,
        },
      ],
      games: [],
    };
  },
  async asyncData({ $http }) {
    const games = await $http.$get(`/api/results`);
    return {games};
  },
};
</script>
