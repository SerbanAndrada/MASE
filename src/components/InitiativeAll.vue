<template>
    <v-container fluid>
        <v-layout align-center justify-center wrap>
            <v-flex sm12 md10 lg8>
                <v-card>
                    <v-container fluid>
                        <v-layout row align-center fill-height>
                            <v-flex>
                                <v-container
                                    class="imagePlaceholder"
                                    v-if="image.length < 1"
                                >
                                    <v-layout
                                        column
                                        align-center
                                        justify-center
                                        fill-height
                                    >
                                        <v-spacer />
                                        <v-flex xs3 class="addImage">
                                            <p>Add image</p>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-btn
                                                v-on:click="$refs.file.click()"
                                                fab
                                                dark
                                                color="blue darken-1"
                                            >
                                                <v-icon dark>add</v-icon>
                                            </v-btn>
                                            <input
                                                type="file"
                                                ref="file"
                                                style="display: none"
                                                v-on:change="loadImage"
                                                accept="image/*"
                                            />
                                        </v-flex>
                                        <v-flex></v-flex>
                                    </v-layout>
                                </v-container>

                                <v-container v-if="image.length > 0">
                                    <img class="imageSize" :src="image" />
                                    <v-btn icon class="close-btn">
                                        <v-icon
                                            light
                                            class="icon"
                                            v-on:click="deleteImage"
                                            >close</v-icon
                                        >
                                    </v-btn>
                                </v-container>
                            </v-flex>

                            <v-flex sm6 md8 lg6>
                                <v-container>
                                    <v-layout column justify-center fill-height>
                                        <v-flex>
                                            <h1>Add Initiative</h1>
                                        </v-flex>
                                        <v-spacer />

                                        <v-flex>
                                            <v-form
                                                ref="form"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <v-text-field
                                                    v-model="title"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'title is required'
                                                    ]"
                                                    :counter="30"
                                                    label="Title"
                                                    required
                                                ></v-text-field>

                                                <v-layout row wrap>
                                                    <v-flex xs12 sm12 md6>
                                                        <v-menu
                                                            ref="startDateMenu"
                                                            v-model="
                                                                startDateMenu
                                                            "
                                                            :close-on-content-click="
                                                                false
                                                            "
                                                            :nudge-right="40"
                                                            :return-value.sync="
                                                                startDate
                                                            "
                                                            lazy
                                                            transition="scale-transition"
                                                            offset-y
                                                            full-width
                                                            min-width="290px"
                                                        >
                                                            <template
                                                                v-slot:activator="{
                                                                    on
                                                                }"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        startDate
                                                                    "
                                                                    label="Start date"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    v-on="on"
                                                                ></v-text-field>
                                                            </template>
                                                            <v-date-picker
                                                                v-model="
                                                                    startDate
                                                                "
                                                                no-title
                                                                scrollable
                                                            >
                                                                <v-spacer></v-spacer>
                                                                <v-btn
                                                                    flat
                                                                    color="primary"
                                                                    @click="
                                                                        startDateMenu = false
                                                                    "
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
                                                            v-model="
                                                                endDateMenu
                                                            "
                                                            :close-on-content-click="
                                                                false
                                                            "
                                                            :nudge-right="40"
                                                            :return-value.sync="
                                                                endDate
                                                            "
                                                            lazy
                                                            transition="scale-transition"
                                                            offset-y
                                                            full-width
                                                            min-width="290px"
                                                        >
                                                            <template
                                                                v-slot:activator="{
                                                                    on
                                                                }"
                                                            >
                                                                <v-text-field
                                                                    v-model="
                                                                        endDate
                                                                    "
                                                                    label="End date"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    v-on="on"
                                                                ></v-text-field>
                                                            </template>
                                                            <v-date-picker
                                                                v-model="
                                                                    endDate
                                                                "
                                                                no-title
                                                                scrollable
                                                            >
                                                                <v-spacer></v-spacer>
                                                                <v-btn
                                                                    flat
                                                                    color="primary"
                                                                    @click="
                                                                        endDateMenu = false
                                                                    "
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
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Budget is required'
                                                    ]"
                                                    label="Budget"
                                                    required
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="location"
                                                    label="Location"
                                                    required
                                                ></v-text-field>

                                                <v-textarea
                                                    v-model="description"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'description is required'
                                                    ]"
                                                    label="Initiative description"
                                                    required
                                                ></v-textarea>

                                                <v-btn
                                                    :disabled="!valid"
                                                    color="primary"
                                                    v-on:click="submitForm()"
                                                    >Add</v-btn
                                                >
                                                <v-btn
                                                    flat
                                                    v-on:click="cancelForm()"
                                                    >cancel</v-btn
                                                >
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
export default {
    name: 'InitiativeAdd',
    data: () => ({
        valid: false,
        image: '',
        title: '',
        startDateMenu: false,
        startDate: '',
        endDateMenu: false,
        endDate: '',
        budget: '',
        location: '',
        poolOptions: [],
        personsResponsable: [],
        description: ''
    }),
    methods: {
        loadImage: function(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = e => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        deleteImage() {
            this.image = '';
        },
        cancelForm() {
            console.log(this.title);
            console.log(this.startDate);
            console.log(this.endDate);
        },
        submitForm() {}
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
