const express = require('express');
const { createCommunityEvent, getCommunitySingleEvent, updateCommunityEvent, deleteCommunityEvent, getAllCoummunityEvent, joinPeople, getJoinPeople, myJoinedEvents, myCommunityEvents, allCoummunityEvents} = require('../constrollers/communityEventControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.route('/').get(protect, getAllCoummunityEvent)
router.route('/allEvents').get(allCoummunityEvents)
router.route('/create').post(protect, createCommunityEvent)
router.route('/:id').get(protect, getCommunitySingleEvent).put(protect, updateCommunityEvent).delete(protect, deleteCommunityEvent);
router.route('/join/:id').put(protect, joinPeople)
router.route('/events/my-events').get(protect, myCommunityEvents)
router.route('/joined-events/my-events').get(protect, myJoinedEvents)
router.route('/get-join-people/:id').get(protect, getJoinPeople)
module.exports = router;