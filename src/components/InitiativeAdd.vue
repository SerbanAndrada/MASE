<template>
  <v-container class="containerStyle">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="validStep1" step="1">Add content</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Add administrative details</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">Add pool options</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">Add images</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card flat height="300px" class="mb-5">
            <v-container>
              <v-form ref="contentForm" v-model="validStep1" lazy-validation>
                <v-text-field
                  v-model="newInitiative.title"
                  :rules="[v => !!v || 'title is required']"
                  label="Title"
                  required
                ></v-text-field>

                <v-textarea
                  v-model="newInitiative.description"
                  :rules="[v => !!v || 'description is required']"
                  label="Initiative description"
                  required
                ></v-textarea>
              </v-form>
            </v-container>
          </v-card>

          <v-btn :disabled="!validStep1" color="primary" v-on:click="continueStep1">Continue</v-btn>

          <v-btn flat to="/home">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card flat height="300px" class="mb-5">
            <v-container>
              <v-form ref="detailsForm" v-model="validStep2" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md6>
                    <v-menu
                      ref="startDateMenu"
                      v-model="startDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="newInitiative.startDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="newInitiative.startDate"
                          label="Start date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newInitiative.startDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.startDateMenu.save(newInitiative.startDate)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12 sm12 md6>
                    <v-menu
                      ref="endDateMenu"
                      v-model="endDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="newInitiative.endDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="newInitiative.endDate"
                          label="End date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newInitiative.endDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.endDateMenu.save(newInitiative.endDate)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>

                <v-text-field 
                  type="number"
                  v-model="newInitiative.budget"
                  :rules="[v => !!v || 'Budget is required']"
                  label="Budget"
                  required
                  suffix="RON"
                ></v-text-field>

                <v-text-field v-model="newInitiative.location" label="Location" required></v-text-field>
              </v-form>
            </v-container>
          </v-card>

          <v-btn color="primary" v-on:click="continueStep2">Continue</v-btn>

          <v-btn flat v-on:click="e1 = 1;">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card flat height="300px" class="mb-5">
            <v-container>
              <v-switch
                color="primary"
                v-model="newInitiative.poolSwitch"
                :label="`Allow pool: ${newInitiative.poolSwitch.toString()}`"
              ></v-switch>

              <v-combobox
                v-model="newInitiative.poolOptions"
                label="Pool options"
                chips
                clearable
                multiple
                :disabled="!newInitiative.poolSwitch"
              >
                <template v-slot:selection="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="remove(data.item)"
                    color="primary"
                    dark
                    :disabled="!newInitiative.poolSwitch"
                  >
                    <strong>{{ data.item }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-container>
          </v-card>

          <v-btn color="primary" v-on:click="e1 = 4;">Continue</v-btn>

          <v-btn flat v-on:click="e1 = 2;">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card flat height="300px" class="mb-5">
            <v-container v-if="newInitiative.images.length == 0">
              <v-layout column align-center justify-center>
                <p class="addImage">Add image</p>
                <v-btn v-on:click="$refs.file.click()" fab dark color="primary">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <input
                  type="file"
                  ref="file"
                  style="display: none"
                  v-on:change="loadImages"
                  multiple
                  accept="image/*"
                >
              </v-layout>
            </v-container>

            <v-container class="containerForCarousel" v-if="newInitiative.images.length > 0">
                <v-layout column>
              <v-carousel height="250px" >
                <v-carousel-item v-for="(item, i) in newInitiative.images" :key="i" :src="item"></v-carousel-item>
              </v-carousel>
              <v-btn flat block v-on:click="deleteImages" color="grey">Delete images</v-btn>
                </v-layout>
            </v-container>
          </v-card>

          <v-btn color="primary" v-on:click="continueStep4">Add initiative</v-btn>

          <v-btn flat v-on:click="e1 = 3;">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data: () => ({
        e1: 1,
        validStep1: false,
        validStep2: false,
        validStep3: false,
        validStep4: false,
        startDateMenu: false,
        endDateMenu: false,

        newInitiative: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            budget: '',
            location: '',
            poolSwitch: true,
            poolOptions: [
                'I think this initiative is good for the town',
                "I don't think this initiative is good for the town"
            ],
            images: []
        }
    }),
    methods: {
        ...mapActions(['addInitiative']),
        remove(item) {
            this.newInitiative.poolOptions.splice(
                this.newInitiative.poolOptions.indexOf(item),
                1
            );
            this.newInitiative.poolOptions = [
                ...this.newInitiative.poolOptions
            ];
        },
        loadImages: function(event) {
            var files = event.target.files;
            var n = files.length;
            var i;
            for(i=0; i<n; i++){
              var reader = new FileReader();
                  reader.onload = e => {
                    this.newInitiative.images.push(e.target.result);
                  };
                  reader.readAsDataURL(files[i]);
                  
            }
        },
        deleteImages: function(){
            this.newInitiative.images = [];
        },
        continueStep1() {
            if (this.$refs.contentForm.validate()) {
                this.e1 = 2;
            }
        },
        continueStep2() {
            if (this.$refs.detailsForm.validate()) {
                this.e1 = 3;
            }
        },
        continueStep4() {
            if(this.newInitiative.poolSwitch == false){
                this.newInitiative.poolOptions = [];
            }
            this.addInitiative(this.newInitiative);
        }
    }
};
</script>

<style scoped>
.addImage {
    height: 30px;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 300;
    color: #2b363b;
}
.containerForCarousel {
    max-width: 600px;
}
.containerStyle {
  max-width: 900px;
}
</style>
