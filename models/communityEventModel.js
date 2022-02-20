const mongoose = require('mongoose');
const CommunityEventSchema = mongoose.Schema({
    hosted_by:{
        type: String,
    },
    event_image: {
        type: String,
        required: [true, "Event Image is required"],
    },
    event_name: {
        type: String,
        required: [true, "Event Name is required"]
    },
    location:{
        type:String,
    },
    event_link:{
        type:String,
    },
    is_event_virtual: {
        type: Boolean,
        default: false,
        required: true
    },
    event_date: {
        type: Date,
        required: [true, "Event date is required"],
    },
    start_date_time: {
        type: Date
    },
    end_date_time: {
        type: Date
    },
    list_of_communities: [],
    list_of_interest: [],
    event_description: {
        type: String,
        required:[true,"Event Description is required"]
    },
    notify_members: {
        type: Boolean,
        required: true,
        default: false
    },
    preset: {
        type: String,
    },
    industry: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    join_people:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
},
    {
        timestamps: true,
    }
)

const CommunityEvent = mongoose.model('CommunityEvent', CommunityEventSchema);
module.exports = CommunityEvent;