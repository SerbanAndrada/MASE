<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="complaints"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg3>
          <div class="statusText">{{ props.item.title }}</div>
          <v-hover>
            <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-height="1000">
              <v-card-text>
                <p>
                  <i>Status:</i>
                  &emsp;{{ props.item.status }}
                </p>
                <p>
                  <i>Category:</i>
                  &emsp;{{ props.item.category }}
                </p>
                <p>
                  <i>Description:</i>
                </p>
                <p>{{ props.item.description }}</p>

                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                    v-on:click="viewDetails(props.item)"
                  >
                    <p class="textHover">Click for details</p>
                  </div>
                </v-expand-transition>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data: () => ({
        rowsPerPageItems: [4, 8, 12],
        pagination: {
            rowsPerPage: 4
        },
        items: [
            {
                title: 'Frozen Yogurt',
                description: '159',
                category: '6.0',
                status: 'resolved',
                date: 4.0
            },
            {
                title: 'Gunoaie in zona gradinitei',
                description:
                    'S-au strans gunoaie in zona gradinitei si nu le curata nimeni',
                category: '6.0',
                status: 'resolved',
                date: 4.0
            },
            {
                title: 'Frozen Yogurt',
                description: '159',
                category: '6.0',
                status: 'resolved',
                date: 4.0
            }
        ]
    }),
    computed: {
        ...mapState(['complaints'])
    },
    methods: {
        ...mapActions(['getAllComplaints']),
        viewDetails(selectedComplaint) {
            console.log(selectedComplaint);
        }
    },
    created() {
        this.getAllComplaints();
    }
};
</script>

<style>
.statusText {
    padding: 15px;
    color: white;
    background-color: rgb(23, 123, 238);
    text-align: center;
}
.theme--light.v-data-iterator .v-data-iterator__actions {
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
}
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
    margin-left: -16px;
}
.textHover {
    font-size: 0.4em;
    text-align: center;
}
</style>
