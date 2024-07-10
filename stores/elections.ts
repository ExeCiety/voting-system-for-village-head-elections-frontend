import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';
import type {Responser} from "~/types/serializer/responser";
import type {FormState as SessionFormState, Session} from "~/types/model/session.type";
import type {ElectionsSerializer} from "~/types/serializer/elections";

export const useElectionSessionStore = defineStore('electionSession', {
    state: () => ({
        electionSessions: [],
        loading: true,
        id: null,
    }),
    actions: {
        async getListElectionSession() {
            const { data, error } = await useApi<Responser.MessageResponse<ElectionsSerializer.ElectionData>>('election-sessions?paginate=true&per_page=10&page=1', {
                method: 'GET',
            })

            if (!error.value) {
                this.electionSessions = data.value.data.data;
            } else {
                throw error.value.data;
            }
        },

        async createElectionSession({ name, start_date, end_date }: SessionFormState) {
            const { data, error } = await useApi<Responser.MessageResponse<ElectionsSerializer.ElectionList>>('election-sessions', {
                method: 'POST',
                body: {
                    name,
                    start_date,
                    end_date,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                default: () => ({
                    message: '',
                    data: {
                        id: '',
                        name: '',
                        start_date: '',
                        end_date: '',
                    },
                    error: null
                })
            })
            if (!error.value) {
                window.location.reload();
            } else {
                throw error.value.data;
            }
        },

        async updateElectionSession({ id, name, start_date, end_date }: SessionFormState) {
            const { data, error } = await useApi<Responser.MessageResponse<ElectionsSerializer.ElectionList>>('election-sessions/' + id, {
                method: 'PATCH',
                body: {
                    id,
                    name,
                    start_date,
                    end_date,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!error.value) {
                window.location.reload();
            } else {
                throw error.value.data;
            }
        },

        async getByIdElectionSession(id:any) {
            console.log("id",id)
            const { data, error } = await useApi<Responser.MessageResponse<any>>('election-sessions/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                onResponse(context) {
                    context.response._data.data
                },
            })

            if (!error.value) {
                return data.value.data
            } else {
                throw error.value.data;
            }
        },
        deleteElectionSession(ids:any) {
            const { data, error } = useApi<Responser.MessageResponse<ElectionsSerializer.ElectionList>>('election-sessions/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids),
                default: () => ({
                    message: '',
                    data: {
                        id: '',
                        name: '',
                        start_date: '',
                        end_date: '',
                    },
                    error: null
                })
            })

            if (!error.value) {
                window.location.reload();
            } else {
                throw error.value.data;
            }
        },
    }
})
