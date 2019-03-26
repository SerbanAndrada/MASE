<template>
  <v-container fluid>
    <v-layout align-center justify-center wrap>
      <v-flex sm12 md10 lg8>
        <v-card>
          <v-container fluid>
            <v-layout row align-center fill-height>
              <v-flex>
                <v-container class="imagePlaceholder" v-if="newComplaint.image.length < 1">
                  <v-layout column align-center justify-center fill-height>
                    <v-spacer/>
                    <v-flex xs3 class="addImage">
                      <p>Add image</p>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn v-on:click="$refs.file.click()" fab dark color="blue darken-1">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                      <input
                        type="file"
                        ref="file"
                        style="display: none"
                        v-on:change="loadImage"
                        accept="image/*"
                      >
                    </v-flex>
                    <v-flex></v-flex>
                  </v-layout>
                </v-container>

                <v-container v-if="newComplaint.image.length > 0">
                  <img class="imageSize" :src="newComplaint.image">
                  <v-btn icon class="close-btn">
                    <v-icon light class="icon" v-on:click="deleteImage">close</v-icon>
                  </v-btn>
                </v-container>
              </v-flex>

              <v-flex sm6 md8 lg6>
                <v-container>
                  <v-layout column justify-center fill-height>
                    <v-flex>
                      <h1>Add Complaint</h1>
                    </v-flex>
                    <v-spacer/>
                    <v-flex>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                          v-model="newComplaint.title"
                          :rules="[v =>!!v ||'title is required']"
                          :counter="30"
                          label="Title"
                          required
                        ></v-text-field>
                        <v-textarea
                          v-model="newComplaint.description"
                          :rules="[v =>!!v ||'Description is required']"
                          label="Description"
                          required
                        ></v-textarea>
                        <v-select
                          v-model="newComplaint.category"
                          :items="categories"
                          :rules="[v =>!!v ||'Please select a category']"
                          label="Category"
                          required
                        ></v-select>

                        <v-btn :disabled="!valid" color="primary" v-on:click="submitForm()">submit</v-btn>
                        <v-btn flat to="/home">cancel</v-btn>
                      </v-form>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ComplaintsAdd',
    data: () => ({
        valid: false,
        newComplaint: {
            image: '',
            title: '',
            description: '',
            category: '',
            userId: '',
            status: 'Submited',
            date: ''
        }
    }),
    computed: {
        ...mapState(['user', 'categories'])
    },
    methods: {
        ...mapActions(['addComplaint']),
        loadImage: function(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = e => {
                    this.newComplaint.image = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        deleteImage() {
            this.newComplaint.image = '';
        },
        submitForm() {
            this.newComplaint.date = new Date().toLocaleDateString();
            this.addComplaint(this.newComplaint);
        }
    }
};
</script>

<style scoped>
.imagePlaceholder {
    width: 350px;
    height: 350px;
    border: dotted 1px #e0e0e1;
    background-image: url('../svg-icons/upload.svg');
    background-size: 75%;
    background-position: center;
}
.imageSize {
    width: 350px;
    height: 350px;
    border: dotted 1px #b5b5b6;
    padding: 20px;
}
.addImage {
    height: 19px;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 300;
    color: #2b363b;
}
.close-btn {
    width: 40px;
    height: 40px;
    background-color: #fbfbfb;
    position: absolute;
    margin-top: -20px;
    margin-left: -20px;
    border: solid 1px #b5b5b6;
}
</style>
