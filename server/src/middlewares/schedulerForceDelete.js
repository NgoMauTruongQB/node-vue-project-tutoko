const cron = require('node-cron')
const ListsFlashCards = require('../models/ListsFlashCards')
const Flashcards = require('../models/FlashCards')

cron.schedule('0 0 * * *', async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    await ListsFlashCards.deleteMany({ deleted: true, deletedAt: { $lt: thirtyDaysAgo } })
    await Flashcards.deleteMany({ deleted: true, deletedAt: { $lt: thirtyDaysAgo } })
})
