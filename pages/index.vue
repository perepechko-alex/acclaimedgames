<template>
  <!--      mode="remote"-->
  <!--      @on-page-change="onPageChange"-->
  <!--      @on-sort-change="onSortChange"-->
  <!--      @on-column-filter="onColumnFilter"-->
  <!--  :totalRows="totalRecords"-->
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
        perPageDropdownEnabled: false,
        perPage: 100,
      }"
      compactMode
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'name'">
          <a v-bind:href="`/game/${props.row[props.column.field]}`">
            {{ props.row[props.column.field] }}
          </a>
<!--          <NuxtLink :to="`/game/${props.row[props.column.field]}`">-->
<!--            {{ props.row[props.column.field] }}-->
<!--          </NuxtLink>-->
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import LastUpdated from "../components/lastUpdated";
export default {
  components: { LastUpdated },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },

    onSortChange(params) {
      for (let column of this.headers) {
        if (column.field === params[0].field) {
          this.updateParams({
            sort: [{
              type: params.sortType,
              field: column.field,
            }],
          });
        }
      }
      this.loadItems();
    },

    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    },

    // load items is what brings back the rows from server
    loadItems() {
      let startingGameIndex = 0;
      startingGameIndex = (this.serverParams.page - 1) * this.serverParams.perPage
      this.games = this.allGames.slice(startingGameIndex, this.serverParams.perPage * this.serverParams.page).map((game) => game);
    }
  },
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
      // totalRecords: 101,
      // serverParams: {
      //   columnFilters: {
      //   },
      //   sort: {
      //     field: '',
      //     type: '',
      //   },
      //   page: 1,
      //   perPage: 100
      // }
    };
  },
  async asyncData({ $http }) {
    const games = await $http.$get(`/api/results`);
    const allGames = games;
    return {games, allGames};
  },
};
</script>
