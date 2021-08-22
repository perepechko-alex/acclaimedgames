<template>
  <div>
    <last-updated />
    <NuxtLink to="/">Home page</NuxtLink>
    <h1 v-if="gameName">{{ gameName }}</h1>
    <vue-good-table
      :columns="headers"
      :rows="gameResults"
      :pagination-options="{
        enabled: false,
        mode: 'records'
      }"
      :sort-options="{
        enabled: false
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'rank'">
          <span v-if="props.row.rank == null"> Unranked </span>
          <span v-else>
            {{ props.row[props.column.field] }}
          </span>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import LastUpdated from "../../components/lastUpdated";
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
          label: "Weighted Points",
          field: "weightedpoints",
          type: "decimal",
          filterable: true,
        },
        {
          label: "Publication",
          field: "publication",
          filterable: true,
        },
        {
          label: "List Year",
          field: "listyear",
          filterable: true,
        },
        {
          label: "List Type",
          field: "listtype",
          filterable: true,
        },
      ],
      gameResults: [],
    };
  },
  async asyncData({ params, $http }) {
    const gameName = params.game; // When calling /abc the game name will be "abc"
    const gameResults = await $http.$get(
      `/api/${encodeURIComponent(gameName.replace(/'/g, "''"))}`
    );
    return { gameResults, gameName };
  },
};
</script>
