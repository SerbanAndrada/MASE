/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        categories: ['Public saftey', 'Violation of the law ', 'Other'],
        complaints: [],
        initiatives: []
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        getComplaints(state, complaint) {
            state.complaints.push(complaint);
        },
        clearComplaints(state) {
            state.complaints = [];
        }
    },

    actions: {
        userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/home');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userRegister({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/home');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        getAllComplaints({ commit }) {
            commit('clearComplaints');
            firebase
                .firestore()
                .collection('complaints')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        var completeComplaint = doc.data();
                        completeComplaint.complaintId = doc.id;
                        commit('getComplaints', completeComplaint);
                    });
                });
        },
        addComplaint({ dispatch }, newComplaint) {
            firebase
                .firestore()
                .collection('complaints')
                .add({
                    title: newComplaint.title,
                    description: newComplaint.description,
                    category: newComplaint.category,
                    image: newComplaint.image,
                    status: newComplaint.status,
                    userId: newComplaint.userId,
                    date: newComplaint.date
                })
                .then(function(docRef) {
                    console.log('document written with ID: ', docRef.id);
                })
                .catch(function(error) {
                    console.error('Erroradding document: ', error);
                    dispatch('setUser', null);
                });
        },
        addInitiative({ dispatch }, newInitiative) {
            var initiativeId = '';

            firebase
                .firestore()
                .collection('initiatives')
                .add({
                    title: newInitiative.title,
                    description: newInitiative.description,
                    startDate: newInitiative.startDate,
                    endDate: newInitiative.endDate,
                    budget: newInitiative.budget,
                    location: newInitiative.location,
                    poolSwitch: newInitiative.poolSwitch,
                    poolOptions: newInitiative.poolOptions,
                    images: newInitiative.images
                })
                .then(function(docRef) {
                    initiativeId = docRef.id;
                    console.log('document written with ID: ', docRef.id);
                })
                .catch(function(error) {
                    console.error('Erroradding document: ', error);
                    dispatch('setUser', null);
                });

            if (newInitiative.poolSwitch == true) {
                firebase
                    .firestore()
                    .collection('pools')
                    .doc(initiativeId)
                    .set({});
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    }
});
