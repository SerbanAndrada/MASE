<template>
  <div class="footer textColor">
    <h2 class="firstTitle">For problems or sugestions about the site get in touch with us!</h2>
    <v-divider color="white"></v-divider>
    <v-layout row>
      <v-flex xs1>
        <p></p>
      </v-flex>
      <v-flex xs8>
        <h3>Contact:</h3>
        <p>
          &emsp;&emsp;
          <b>E-mail:</b> serban.andrada95@gmail.com
          <br>&emsp;&emsp;
          <b>Phone:</b> 0722686805
          <br>&emsp;&emsp;
          <b>Program:</b> Monday-Friday 9:00 - 18:00*
          <br>&emsp;&emsp;&emsp;&emsp;
          <small>*Except legal holidays!</small>
        </p>
      </v-flex>
      <v-flex xs3>
        <v-layout align-center="true" column>
          <v-flex>
            <h3>Social Media:</h3>
          </v-flex>
          <v-flex>
            <a href="https://github.com">
            <v-btn color="indigo darken-2" class="white--text" fab small>
              <svgicon icon="facebook-f-brands" width="22" height="18" color="#fff"></svgicon>
            </v-btn>
            </a>
             <v-btn color="pink darken-2" class="white--text" fab small>
              <svgicon icon="instagram-brands" width="22" height="18" color="#fff"></svgicon>
            </v-btn>
             
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import '@/compiled-icons/instagram-brands';
import '@/compiled-icons/facebook-f-brands';
export default {
    name: 'AppFooter',
    data: () => ({})
};
</script>

<style scoped>
.footer {
    background-color: #1d89e4;
    padding-top: 30px;
}
.textColor {
    color: white;
}
.firstTitle {
    text-align: center;
}
</style>
