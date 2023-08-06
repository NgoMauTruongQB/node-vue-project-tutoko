import { defineStore } from 'pinia'

export const useCardStore = defineStore('cardState', {
    state: () => ({
        cards: JSON.parse(localStorage.getItem('Tmp-list-cards')) || [],
    }),
    getters: {
        totalCard: (state) => state.cards.length,
        indexCardNext: (state) => state.cards.length + 1
    },
    actions: {
        addCard(reverse_side, face_side) {
            const card = {
                id: Math.floor(Math.random() * 10000),
                reverse_side,
                face_side,
            }
            this.cards = [...this.cards, card]
            localStorage.setItem('Tmp-list-cards', JSON.stringify(this.cards))
        },
        deleteCard(id) {
            var item = this.cards.find(card => {
                return card.id === id
            })
            if(item) {
                this.cards.splice(this.cards.indexOf(item), 1)
                localStorage.setItem('Tmp-list-cards', JSON.stringify(this.cards))
            }
        },
        updateCard(data) {
            var item = this.cards.find(card => {
                return card.id === data.id
            })
            if(item) {
                item.reverse_side = data.reverse_side,
                item.face_side = data.face_side
                this.cards[this.cards.indexOf(item)] = item
                localStorage.setItem('Tmp-list-cards', JSON.stringify(this.cards))
            }
        }
    }
})

