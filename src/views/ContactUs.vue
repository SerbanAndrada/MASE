<template>
  <div class="background-image">
    <v-card class="informationCard">
      <div class="title">
        <p>For any aditional information or problems don't hesitate to contact us!</p>
      </div>
      <div class="hours">
        <p>
          Please keep in mind that office hours are:
          <br>
          &emsp;&emsp;<b>Monday-Friday</b> - 8:00-12:00 13:00-18:00 *
        </p>
        <small>* Execpt legal holidays.</small>
      </div>
    </v-card>
    <v-layout>
      <v-flex xs6 md6>
        <template v-for="item in leftSideContacts">
          <singleContact v-bind:contact="item" v-bind:key="item.name"/>
        </template>
      </v-flex>
      <v-flex xs6 md6>
        <template v-for="item in rightSideContacts">
          <singleContact v-bind:contact="item" v-bind:key="item.name"/>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SingleContact from '@/components/SingleContact.vue';
export default {
    components: {
        SingleContact
    },
    data: () => ({
        leftSideContacts: [
            {
                name: 'Popescu Ioana',
                function: 'Town administrator',
                office: 'Str: Cuze-voda, nr: 113, etaj: 12, door: B309',
                phone: '0722686805',
                email: 'popescu.ioana@gmail.com',
                image:
                    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            },
            {
                name: 'Andrei Irimia',
                function: 'Cop',
                office: 'Str: Belvedere, nr: 113, etaj: 12, door: B309',
                phone: '0728684592',
                email: 'irimia.andrei@gmail.com',
                image:
                    'https://static.bhphotovideo.com/explora/sites/default/files/styles/960/public/briancolor.jpg?itok=ZVR85Ekm'
            },
            {
                name: 'Mihaela Voiculescu',
                function: 'Cat lady',
                office: 'Str: Belvedere, nr: 113, etaj: 12, door: B309',
                phone: '0788669955',
                email: 'voiculescu.mihaela@gmail.com',
                image:
                    'https://image.freepik.com/free-photo/headshot-portrait-beautiful-attractive-african-american-woman-posting-crossed-arms-with-happy-smiling-yellow-studio-background-copy-space_1258-956.jpg'
            }
        ],
        rightSideContacts: [
            {
                name: 'Ionescu Manuela',
                function: 'Town administrator',
                office: 'Str: Cuze-voda, nr: 113, etaj: 12, door: B309',
                phone: '0722686805',
                email: 'Ionescu.manuela@gmail.com',
                image:
                    'https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            },
            {
                name: 'Mihai Barbu',
                function: 'Cop',
                office: 'Str: Belvedere, nr: 113, etaj: 12, door: B309',
                phone: '0728684592',
                email: 'barbu.mihai@gmail.com',
                image:
                    'https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
        ]
    })
};
</script>

<style scoped>
.informationCard {
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    padding-bottom: 5px;
}
.title {
    text-align: center;
    padding-top: 5px;
}
.hours {
    padding-left: 40px;
}
</style>
