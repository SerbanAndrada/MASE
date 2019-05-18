<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="blue lighten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-tile-content>
              {{
              item.title
              }}
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="blue darken-1" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>

      <v-toolbar-title data-cy="titleBtn">{{ appTitle }}</v-toolbar-title>

      <v-btn flat class="hidden-sm-and-down nav-menu" to="/home" data-cy="homeBtn">Home</v-btn>

      <v-btn
        flat
        class="hidden-sm-and-down nav-menu"
        to="/initiatives"
        data-cy="initiativesBtn"
      >Initiatives</v-btn>

      <v-menu open-on-hover top offset-y class="hidden-sm-and-down nav-menu">
        <template v-slot:activator="{ on }">
          <v-btn flat dark v-on="on">
            <span>Complaints</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile v-for="item in complaintsPages" :key="item.index">
            <router-link :to="{ path: item.route }">
              <v-list-tile-title>
                {{
                item.title
                }}
              </v-list-tile-title>
            </router-link>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn
        flat
        class="hidden-sm-and-down nav-menu"
        to="/contact-us"
        data-cy="contactUsBtn"
      >Contact us</v-btn>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/register" data-cy="registerBtn ">Register</v-btn>
        <v-btn color="blue lighten-2" to="/login" class="nav-join" data-cy="loginBtn">login</v-btn>
      </div>
      <div v-else>
        <v-btn flat to="/about">Account</v-btn>
        <v-btn outline color="white" @click="logout" data-cy="logout">Logout</v-btn>
      </div>
    </v-toolbar>
  </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'City Administration',
            drawer: false,
            items: [
                { title: 'Menu' },
                { title: 'Profile' },
                { title: 'Sign In' },
                { title: 'Join' }
            ],
            complaintsPages: [
                { title: 'All complaints', route: '/complaints/all' },
                { title: 'My complaints', route: '/complaints/mine' },
                { title: 'Add compaint', route: '/complaints/add' }
            ]
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('userSignOut');
        }
    }
};
</script>

<style scoped>
a {
    color: black;
    text-decoration: none;
}
</style>
