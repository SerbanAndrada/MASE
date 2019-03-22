<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
    <v-layout row>
      <v-container>
        <v-layout column>
          <v-flex>
            <p class="display-4 font-weight-black text-xs">SANTORINI</p>
          </v-flex>
          <v-flex>
            <p
              class="display-1 font-weight-bold mb-6"
            >“It takes a lifetime for someone to discover Greece, but it only takes an instant to fall in love with her.” -Henry Miller</p>
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center column pa-5>
          <v-flex>
            <v-layout class="buton_enervant">
              <v-btn fab class="mt-5 blue darken-3">
                <v-icon large color="white">expand_more</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    name: 'HomeIntroduction'
};
</script>

<style scoped>
.home-hero {
    background: url('https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
    background-size: cover;
    width: 100%;
    height: 100%;
}
p {
    color: #1559c6;
}

.buton_enervant {
    padding-top: 100px;
}
</style>
