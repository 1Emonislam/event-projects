const asyncHandler = require('express-async-handler');
const CommunityEvent = require('../models/communityEventModel');
const User = require('../models/userModel');

const createCommunityEvent = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    const { event_image, list_of_communities, hosted_by, event_link, event_name, is_event_virtual, event_date, list_of_interest, event_description, join_people, notify_members, preset } = req.body;
    const event = new CommunityEvent({ event_image, list_of_communities, hosted_by, event_link, event_name, is_event_virtual, event_date, list_of_interest, event_description, join_people, notify_members, preset, user: req.user._id });
    const user = await User.findOne({ user: req.user._id })
    if (user) {
        const createdEvent = await event.save();
        res.status(200).json({ "message": "community event successfully added", "communitiesEvent": createdEvent });
    } else {
        res.status(401).json({ "error": "community event create permission denied" });
    }
});

const getCommunitySingleEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const coumunityEvent = await CommunityEvent.findById(id);
    if (coumunityEvent) {
        res.json({ "communitiesEvent": coumunityEvent })
    } else {
        res.status(404).json({ "error": "Community event not found" })
    }
})


const updateCommunityEvent = asyncHandler(async (req, res) => {
    const { event_image, event_name, hosted_by, event_link, is_event_virtual, event_date, list_of_communities, list_of_interest, event_description, join_people, notify_members, preset } = req.body;
    const communityEvent = await CommunityEvent.findOne({ _id: req.params.id });
    if (communityEvent.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ "error": "You can't perform this action" });
    } else if (communityEvent) {
        communityEvent.event_image = event_image || communityEvent.event_image;
        communityEvent.list_of_communities = list_of_communities || communityEvent.list_of_communities;
        communityEvent.hosted_by = hosted_by || communityEvent.hosted_by;
        communityEvent.event_link = event_link || communityEvent.event_link;
        communityEvent.event_name = event_name || communityEvent.event_name;
        communityEvent.is_event_virtual = is_event_virtual || communityEvent.is_event_virtual;
        communityEvent.event_date = event_date || communityEvent.event_date;
        communityEvent.list_of_interest = list_of_interest || communityEvent.list_of_interest;
        communityEvent.event_description = event_description || communityEvent.event_description;
        communityEvent.notify_members = notify_members || communityEvent.notify_members;
        communityEvent.preset = preset || communityEvent.preset;
        communityEvent.join_people = join_people || communityEvent.join_people;
        const updatedCommunityEvent = await communityEvent.save();
        res.status(200).json({ "message": "community event update successfully", "communitiesEvent": updatedCommunityEvent })
    } else {
        return res.status(401).json({ "error": "user permission denied" });
    }
})


const deleteCommunityEvent = asyncHandler(async (req, res) => {
    const communityEvents = await CommunityEvent.findById(req.params.id);
    CommunityEvent.findByIdAndRemove(req.params.id, (err, del) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ "message": "community event has been successfully delete!", "communityEvent": communityEvents });
    });
})

const getAllCoummunityEvent = asyncHandler(async (req, res) => {
    try {
        const { search } = req.query;
        const KeyWordRegExp = new RegExp(search, "i");

        const result = await CommunityEvent.find({
            $or: [{ event_description: KeyWordRegExp }, { event_name: KeyWordRegExp }],
        }).populate({ path: 'join_people', select: '_id pic' });

        const community = result.reduce((acc, curr) => {
            acc.push({
                ...curr._doc,
                join_people: {
                    totalMember: curr?._doc?.join_people?.length,
                    amIjoined: curr?._doc?.join_people?.some(member => member._id.toString() === req.user._id.toString()),
                    topMembers: curr?._doc?.join_people?.slice(0, 5)
                }
            });
            return acc;
        }, [])

        res.json({ "communityEvent": community })
    } catch (error) {
        return res.status(400).json({ "error": error.message })
    }
})

const joinPeople = asyncHandler(async (req, res) => {
    const permissionAccept = CommunityEvent.findById(req.user._id);
    const { id } = req.params;
    const joinPeopleItem = await CommunityEvent.findById(id);
    // console.log(joinPeopleItem)
    if (!permissionAccept) {
        return res.status(401).json({ "error": "joined people none!" });
    } else {
        if (!joinPeopleItem) {
            return res.status(404).json({ "error": "Denied permission Can not join it!" });
        } if (joinPeopleItem) {
            const checkJoinPeople = joinPeopleItem?.join_people?.find(p => p?.toString() === req?.user?._id?.toString());
            if (checkJoinPeople) {
                return res.status(302).json({ "error": "user already joined" });
            } else {
                const joinPeople = joinPeopleItem.join_people;
                const allJoinPeople = [...joinPeople, req.user._id];
                joinPeopleItem.join_people = allJoinPeople;
                const newJoinPeopleAdded = await joinPeopleItem.save();
                if (newJoinPeopleAdded) return res.status(200).json({ "message": "you have successfully joined!", joinedEvents: newJoinPeopleAdded })
            }
        }
    }
})

const getJoinPeople = asyncHandler(async (req, res) => {
    const permissionAccept = CommunityEvent.findById(req.user._id);
    const { id } = req.params;
    const getJoinItem = await CommunityEvent.findById(id);
    if (!permissionAccept) {
        return res.status(400).json({ "error": "permission denied!" })
    } else {
        if (!getJoinItem) {
            return res.status(400).json({ "error": "bad request! please try again!" })
        }
        if (getJoinItem) {
            CommunityEvent.findById(id).populate("join_people").exec((error, docs) => {
                if (error) {
                    return res.status(400).json({ "error": error.message })
                }
                const totalJoin = docs?.join_people?.length;
                const peopleItem = docs?.join_people?.slice(0, 5);
                return res.status(200).json({ totalJoined: totalJoin, people: peopleItem })
            })
        }
    }
})

const myCommunityEvents = asyncHandler(async (req, res) => {
    const myEvents = await CommunityEvent.find({ user: req.user._id });
    if (!myEvents) {
        return res.status(404).json({ "error": "my community joined event emty!" })
    } if (myEvents) {
        const myEventCounter = myEvents?.length;
        return res.status(200).json({ "myCommunityEventCount": myEventCounter, "myCommunityEvents": myEvents })
    }
})

const myJoinedEvents = asyncHandler(async (req, res) => {
    // const findEvents = await CommunityEvent.findById(req.user._id);
    // if(findEvents.length){
    //   return res.status(404).json({"message":"No events found!"});
    // }
    try {
        // mongodb search function

        const result = await CommunityEvent.find({ "join_people": req.user._id }).populate({ path: 'join_people', select: '_id pic' });
        const community = result.reduce((acc, curr) => {
            acc.push({
                ...curr._doc,
                join_people: {
                    totalMember: curr?._doc?.join_people?.length,
                    amIjoined: curr?._doc?.join_people?.some(member => member._id.toString() === req.user._id.toString()),
                    topMembers: curr?._doc?.join_people?.slice(0, 5)
                }
            });
            return acc;
        }, [])

        res.json({ "communityEvent": community })
    } catch (error) {
        return res.status(400).json({ "error": error.message })
    }
})

module.exports = { createCommunityEvent, getCommunitySingleEvent, updateCommunityEvent, deleteCommunityEvent, getAllCoummunityEvent, joinPeople, getJoinPeople, myCommunityEvents, myJoinedEvents };