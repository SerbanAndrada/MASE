<template>
  <v-container fluid fill-height class="beach-background">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="mail"
                name="email"
                label="Email"
                type="email"
                v-model="newUser.email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="person"
                name="Name"
                label="Name"
                type="text"
                v-model="newUser.name"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                required
                v-model="newUser.password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="home"
                name="Address"
                label="Address"
                type="text"
                v-model="newUser.address"
                :rules="addressRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submit"
              data-cy="registerSubmitBtn"
            >register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'register',
    data: () => ({
        valid: false,
        newUser: {
            email: '',
            name: '',
            password: '',
            address: '',
            image: 'not set'
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 6 || 'Password must be greater than 6 characters'
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length >= 3 || 'Name must be greater than 6 characters'
        ],
        addressRules: [
            v => !!v || 'Address is required',
            v => v.length >= 3 || 'Address must be greater than 10 characters'
        ]
    }),
    methods: {
        ...mapActions(['userRegister']),
        submit() {
            if (this.$refs.form.validate()) {
                this.userRegister(this.newUser);
            }
        }
    }
};
</script>

<style scoped>
.beach-background {
    background: url('https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
