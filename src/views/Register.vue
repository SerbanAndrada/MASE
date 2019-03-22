<template >
    <v-container fluid fill-height class="beach-background" >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md3>
                <v-card class="elevation-12" >
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="register-form">
                        <v-form ref="form" v-model="valid" lazy-validation >
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model="email" :rules="emailRules" data-cy="registerEmailField" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password"
                                          type="password" required v-model="password" :rules="passwordRules"
                                          data-cy="registerPasswordField">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions >
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click="submit" data-cy="registerSubmitBtn">register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userRegister', {
                    email: this.email,
                    password: this.password
                });
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
