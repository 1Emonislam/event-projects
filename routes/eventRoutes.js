const express = require('express');
const {createEvent, updateEvent, deleteEvent, getByUser, getAllEvents, joinPeople, getJoinPeople, myJoinedEvents, getEvents } = require('../constrollers/eventControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.route('/').get(protect,getAllEvents)
router.route('/getEvents').get(protect,getEvents)
router.route('/:id').get(protect,getByUser);
router.route('/create').post(protect,createEvent);
router.route('/update/:id').put(protect,updateEvent);
router.route('/delete/:id').delete(protect,deleteEvent);
router.route('/join/:id').put(protect,joinPeople)
router.route('/get-join-people/:id').get(protect,getJoinPeople)
router.route('/joined-events/my-events').get(protect, myJoinedEvents)
module.exports = router;


