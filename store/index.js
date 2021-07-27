export const state = () => ({
    photoUrl: 'http://localhost:3000/images',
    categories : [],
    tags : [],
})

export const actions = {
    // get full list from server
    async getCategories({commit,state},force = false) {
        if(state.categories.length === 0 || force) {
            this.$axios.get('category').then((data) => {
                if (data.status === 200) {
                    commit('setCategories', data.data)
                }
            })
        }
    },
    async getTags({commit,state},force = false) {
        if(state.categories.length === 0 || force) {
            this.$axios.get('tags').then((data) => {
                if (data.status === 200) {
                    commit('setTags', data.data)
                }
            })
        }
    }
}

export const mutations = {
    // adding single Item on end of list
    setCategories(state, item) {
        state.categories = item;
    },
    setTags(state, item) {
        state.tags = item
    }
}
