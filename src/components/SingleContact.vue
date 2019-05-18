<template>
  <v-card class="singleCard">
    <v-layout row>
      <v-flex xs5>
        <v-layout column align-center justify-center fill-height>
          <img :src="contact.image" style="max-height:140px;" contain>
          <!-- <v-btn dark color="primary" v-on:click="contactByMail()">Contact by e-mail</v-btn> -->
          <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Contact by e-mail</v-btn>
      </template>
      <v-card>
        <v-card-title style="align-center">
          <span class="headline">Get in contact with {{contact.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
              <v-flex xs12>
                <v-text-field label="E-mail*" required v-model="userEmail"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea label="Message" type="text" required v-model="userText"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Please check your e-mail before pressing send!</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="cancel()">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click="sendEmail()">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-layout>
      </v-flex>
      <v-flex xs7>
        <v-layout column>
          <v-flex xs1>
            <p></p>
          </v-flex>
          <v-flex xs2>
            <p>
              <b>Name:</b>
              {{contact.name}}
            </p>
          </v-flex>
          <v-flex xs2>
            <p>
              <b>Function:</b>
              {{contact.function}}
            </p>
          </v-flex>
          <v-flex xs2>
            <p>
              <b>Office:</b>
              {{contact.office}}
            </p>
          </v-flex>
          <v-flex xs2>
            <p>
              <b>Phone:</b>
              {{contact.phone}}
            </p>
          </v-flex>
          <v-flex xs2>
            <p>
              <b>E-mail:</b>
              {{contact.email}}
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
    props: ['contact'],
    data: () => ({
        dialog: false,
        userEmail: undefined,
        userText: undefined
    }),
    methods: {
        sendEmail() {
            console.log(this.userEmail);
            console.log(this.userText);
        },
        cancel(){
            this.userEmail = undefined;
            this.userText = undefined;
            this.dialog = false;
        }
    }
};
</script>

<style>
.singleCard {
    margin-top: 10px;
    margin-right: 5px;
    margin-left: 5px;
}
</style>
