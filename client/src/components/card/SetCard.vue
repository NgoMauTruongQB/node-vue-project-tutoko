<template>
    <div 
        class="container mt-4"
        @click="getAllFlashCards"
    >
        <div class="card p-3 mb-2 ">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div class="icon" v-if="setCardProps.type === 'vocabulary'">
                        <img src="../../assets/img/icon/vocabulary.png" width="30" alt="">
                    </div>

                    <div class="icon" v-else-if="setCardProps.type === 'kanji'"> 
                        <img src="../../assets/img/icon/kanji.png" width="30" alt="">
                    </div>

                    <div class="icon" v-else> 
                        <img src="../../assets/img/icon/grammar.png" width="30" alt="">
                    </div>
                    <div class="ms-2 c-details">
                        <p class="mb-0">{{setCardProps.type}}</p> <span>{{daysAgo}} day ago</span>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <h6 class="heading">{{ setCardProps.topic}}</h6>
                
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { parseISO, differenceInDays } from 'date-fns'

export default {
    name: 'SetCard',
    props: ['setCardProps'],
    setup(props, context) {
        const createdAt = ref(props.setCardProps.createdAt)
        const currentDate = computed(() => new Date())

        const getAllFlashCards = () => {
            context.emit('cards-id', props.setCardProps._id)
        }

        const daysAgo = computed(() => {
            const createdDate = parseISO(createdAt.value)
            return differenceInDays(currentDate.value, createdDate)
        })


        return {
            getAllFlashCards,
            daysAgo
        }
        
    }
}
</script>

<style scoped>

.card {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
}

.c-details span {
    font-weight: 300;
    font-size: 13px
}

.icon {
    width: 50px;
    height: 50px;
    background-color: var(--color-gray-light);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}


</style>