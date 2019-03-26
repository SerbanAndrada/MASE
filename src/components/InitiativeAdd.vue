<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="validStep1" step="1"
                    >Add content</v-stepper-step
                >

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2"
                    >Add administrative details</v-stepper-step
                >

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3"
                    >Add pool options</v-stepper-step
                >

                <v-divider></v-divider>

                <v-stepper-step step="4">Add images</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card flat height="250px" class="mb-3">
                        <v-form
                            ref="contentForm"
                            v-model="validStep1"
                            lazy-validation
                        >
                            <v-text-field
                                v-model="title"
                                :rules="[v => !!v || 'title is required']"
                                label="Title"
                                required
                            ></v-text-field>

                            <v-textarea
                                v-model="description"
                                :rules="[v => !!v || 'description is required']"
                                label="Initiative description"
                                required
                                background-color="grey lighten-4"
                            ></v-textarea>
                        </v-form>
                    </v-card>

                    <v-btn
                        :disabled="!validStep1"
                        color="primary"
                        v-on:click="continueStep1"
                        >Continue</v-btn
                    >

                    <v-btn flat v-on:click="clearStep1">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card class="mb-3" flat height="250px">
                        <v-form
                            ref="detailsForm"
                            v-model="validStep2"
                            lazy-validation
                        >
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md6>
                                    <v-menu
                                        ref="startDateMenu"
                                        v-model="startDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="startDate"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="startDate"
                                                label="Start date"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="startDate"
                                            no-title
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="startDateMenu = false"
                                                >Cancel</v-btn
                                            >
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="
                                                    $refs.startDateMenu.save(
                                                        startDate
                                                    )
                                                "
                                                >OK</v-btn
                                            >
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>

                                <v-flex xs12 sm12 md6>
                                    <v-menu
                                        ref="endDateMenu"
                                        v-model="endDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="endDate"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="endDate"
                                                label="End date"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="endDate"
                                            no-title
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="endDateMenu = false"
                                                >Cancel</v-btn
                                            >
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="
                                                    $refs.endDateMenu.save(
                                                        endDate
                                                    )
                                                "
                                                >OK</v-btn
                                            >
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>

                            <v-text-field
                                v-model="budget"
                                :rules="[v => !!v || 'Budget is required']"
                                label="Budget"
                                required
                                suffix="RON"
                            ></v-text-field>

                            <v-text-field
                                v-model="location"
                                label="Location"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card>

                    <v-btn color="primary" v-on:click="continueStep2"
                        >Continue</v-btn
                    >

                    <v-btn flat v-on:click="clearStep2">Back</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-5" flat height="250px">
                        <v-switch
                            color="primary"
                            v-model="poolSwitch"
                            :label="`Allow pool: ${poolSwitch.toString()}`"
                            style="padding-left:20px"
                        ></v-switch>

                        <v-combobox
                            v-model="poolOptions"
                            label="Pool options"
                            chips
                            clearable
                            multiple
                            :disabled="!poolSwitch"
                        >
                            <template v-slot:selection="data">
                                <v-chip
                                    :selected="data.selected"
                                    close
                                    @input="remove(data.item)"
                                    color="primary"
                                    dark
                                    :disabled="!poolSwitch"
                                >
                                    <strong>{{ data.item }}</strong>
                                </v-chip>
                            </template>
                        </v-combobox>
                    </v-card>

                    <v-btn color="primary" v-on:click="continueStep3"
                        >Continue</v-btn
                    >

                    <v-btn flat v-on:click="clearStep3">Back</v-btn>
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-card class="mb-5" flat height="250px">
                        <v-container v-if="images.length == 0">
                            <v-layout column align-center justify-center>
                                <p class="addImage">Add image</p>
                                <v-btn
                                    v-on:click="$refs.file.click()"
                                    fab
                                    dark
                                    color="primary"
                                >
                                    <v-icon dark>add</v-icon>
                                </v-btn>
                                <input
                                    type="file"
                                    ref="file"
                                    style="display: none"
                                    v-on:change="loadImages"
                                    multiple
                                    accept="image/*"
                                />
                            </v-layout>
                        </v-container>

                        <v-container class="containerForCarousel">
                            <v-carousel height="250px" v-if="images.length > 0">
                                <v-carousel-item
                                    v-for="(item, i) in images"
                                    :key="i"
                                    :src="item"
                                ></v-carousel-item>
                            </v-carousel>
                        </v-container>
                    </v-card>

                    <v-btn color="primary" v-on:click="continueStep4"
                        >Add initiative</v-btn
                    >

                    <v-btn flat v-on:click="clearStep4">Back</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        e1: 4,
        validStep1: false,
        validStep2: false,
        validStep3: false,
        validStep4: false,

        title: 'title',
        description: 'description',

        startDateMenu: false,
        startDate: '',
        endDateMenu: false,
        endDate: '',
        budget: 'buget',
        location: '',

        poolSwitch: true,
        poolOptions: [
            'I think this initiative is good for the town',
            "I don't think this initiative is good for the town"
        ],

        images: [
            // 'data:image/jpeg;base64,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',
            // 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            // 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            // 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        ]
    }),
    methods: {
        remove(item) {
            this.poolOptions.splice(this.poolOptions.indexOf(item), 1);
            this.poolOptions = [...this.poolOptions];
        },
        loadImages: function(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = e => {
                    this.images.push(e.target.result);
                    console.log(this.images);
                    console.log(e.target);
                    console.log(input.files);
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        continueStep1() {
            if (this.$refs.contentForm.validate()) {
                this.e1 = 2;
            }
        },
        clearStep1() {
            this.title = '';
            this.description = '';
        },
        continueStep2() {
            if (this.$refs.detailsForm.validate()) {
                this.e1 = 3;
            }
        },
        clearStep2() {
            this.e1 = 1;
        },
        continueStep3() {
            this.e1 = 4;
        },
        clearStep3() {
            this.e1 = 2;
        },
        continueStep4() {
            this.e1 = 1;
            console.log(this.title);
            console.log(this.description);
            console.log(this.startDate);
            console.log(this.endDate);
            console.log(this.budget);
            console.log(this.location);
        },
        clearStep4() {
            this.e1 = 3;
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
</style>
