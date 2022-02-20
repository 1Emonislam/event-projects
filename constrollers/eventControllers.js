const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const Event = require('../models/eventModel');
//creating Event
const createEvent = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    const { event_image, list_of_communities, hosted_by, event_link, event_name, is_event_virtual, event_date, list_of_interest, event_description, join_people,industry,location, notify_members, preset } = req.body;
    const event = new Event({ event_image, list_of_communities, event_name, is_event_virtual, hosted_by, event_link, event_date, list_of_interest, event_description,industry,location, join_people, notify_members, preset, user: req.user._id });
    const user = await User.findOne({ user: req.user._id })
    if (user) {
        const createdEvent = await event.save();
        return res.status(200).json({ "event": createdEvent });
    } else {
        return res.status(401).json({ "error": "event created permission denied" });
    }

});

//geting current user all Events 
const getByUser = asyncHandler(async (req, res) => {
    const event = await Event.find({ user: req.params.id });
    if (event) {
        return res.json({ "event": event })
    } else {
        return res.status(404).json({ "error": "event not found" });
    }
})

//update current user Events 
const updateEvent = asyncHandler(async (req, res) => {
    const { event_image, list_of_communities, hosted_by, event_link, event_name, is_event_virtual, event_date, list_of_interest, event_description, join_people, notify_members,industry,location, preset } = req.body;
    const event = await Event.findOne({ _id: req.params.id });
    if (event.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ "error": "You can't perform this action" });
    } if (!event) {
        return res.status(401).json({ "error": "user permission denied" });
    } else {
        event.event_image = event_image || event.event_image;
        event.list_of_communities = list_of_communities || event.list_of_communities;
        event.event_name = event_name || event.event_name;
        event.is_event_virtual = is_event_virtual || event.is_event_virtual;
        event.hosted_by = hosted_by || event.hosted_by;
        event.location = location || event.location;
        event.industry = industry || event.industry;
        event.event_link = event_link || event.event_link;
        event.event_date = event_date || event.event_date;
        event.list_of_interest = list_of_interest || event.list_of_interest;
        event.event_description = event_description || event.event_description;
        event.join_people = join_people || event.join_people;
        event.notify_members = notify_members || event.notify_members;
        event.preset = preset || event.preset;
        const updatedEvent = await event.save();
        return res.json({ "event": updatedEvent })
    }
})

//delte current user Events 
const deleteEvent = asyncHandler(async (req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, del) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ "message": "community event has been successfully delete!" });
    });
})

const getAllEvents = asyncHandler(async (req, res) => {
    try {
        const { search } = req.query;
        const KeyWordRegExp = new RegExp(search, "i");

        const result = await Event.find({
			$or: [{ event_description: KeyWordRegExp }, { event_name: KeyWordRegExp }],
		});
        const events = result.reduce((acc, curr) => {
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
        res.status(200).json({ "event": events })
    } catch (error) {
        return res.status(400).json({ "error": error.message })
    }
}
)

const joinPeople = asyncHandler(async (req, res) => {
    const permissionAccept = Event.findById(req.user._id);
    const { id } = req.params;
    const joinPeopleItem = await Event.findById(id);

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
    const permissionAccept = Event.findById(req.user._id);
    const { id } = req.params;
    const getJoinItem = await Event.findById(id);
    if (!permissionAccept) {
        return res.status(400).json({ "error": "permission denied!" })
    } else {
        if (!getJoinItem) {
            return res.status(400).json({ "error": "bad request! please try again!" })
        }
        if (getJoinItem) {
            Event.findById(id).populate("join_people").exec((error, docs) => {
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

const myJoinedEvents = asyncHandler(async (req, res) => {
    try {
        const result = await Event.find({ "join_people" : req.user._id }).populate({ path: 'join_people', select: '_id pic' });
        const event = result.reduce((acc, curr) => {
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

        res.json({ "event": event })
    } catch (error) {
        return res.status(400).json({ "error": error.message })
    }
})
const allEvents = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, search } = req.query;
    // console.log(search)
    search = search?.trim();
    // console.log(search)
    const KeyWordRegExp = new RegExp(search, "i");
    const events = await Event.find({$or:[{hosted_by: KeyWordRegExp},{event_name: KeyWordRegExp},{location: KeyWordRegExp},{industry: KeyWordRegExp},{"user.first_name": KeyWordRegExp},{"user.last_name": KeyWordRegExp},{"user.gender": KeyWordRegExp},{"user.industry": KeyWordRegExp}]}).sort({createdAt:1,_id:-1}).populate({
        path: "user",
    }).sort({createdAt:1,_id:-1}).limit(limit * 1).skip((page - 1) * limit);
    const totalEvents = await Event.find({}).count();
    const count = await Event.find({$or:[{hosted_by: KeyWordRegExp},{event_name: KeyWordRegExp},{location: KeyWordRegExp},{industry: KeyWordRegExp},{"user.first_name": KeyWordRegExp},{"user.last_name": KeyWordRegExp},{"user.gender": KeyWordRegExp},{"user.industry": KeyWordRegExp}]}).populate({
        path: "user",
    }).sort({createdAt:1,_id:-1}).count();
    // console.log(communityEvent)
    res.json({totalEvents,count, "events": events })
})
module.exports = { createEvent, getByUser, updateEvent, getJoinPeople, deleteEvent, getAllEvents, allEvents,joinPeople, myJoinedEvents };