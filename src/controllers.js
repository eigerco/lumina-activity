const { Event } = require('./models');

const logEvent = async (req, res) => {
    try {
        const { userId, eventType, data } = req.body;
        const event = new Event({ userId, eventType, data });
        await event.save();
        res.status(201).send({ message: 'Event logged successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error logging event', error });
    }
};

// Retrieves the total number of distinct users
const getTotalUsers = async (req, res) => {
    try {
        const distinctUsers = await Event.distinct('userId');
        const totalUsers = distinctUsers.length;
        res.status(200).send({ totalUsers });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving total users', error });
    }
};

// Retrieves the number of active users in the past 24 hours
const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await Event.distinct('userId', {
            timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });
        res.status(200).send({ activeUsers: activeUsers.length });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving active users', error });
    }
};

// Retrieves the total number of events
const getTotalEvents = async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        res.status(200).send({ totalEvents });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving total events', error });
    }
};

// Retrieves the average session duration for each user
const getAverageSessionDurations = async (req, res) => {
    try {
        const sessionDurations = await Event.aggregate([
            { $match: { eventType: 'sessionEnd' } },
            {
                $group: {
                    _id: '$userId',
                    averageDuration: { $avg: { $subtract: ['$data.endTime', '$data.startTime'] } },
                },
            },
        ]);
        res.status(200).send({ sessionDurations });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving session durations', error });
    }
};

// Retrieves the total number of nodes started
const getNodesStarted = async (req, res) => {
    try {
        const nodesStarted = await Event.countDocuments({ eventType: 'startNode' });
        res.status(200).send({ nodesStarted });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving nodes started', error });
    }
};

// Retrieves the total number of nodes stopped
const getNodesStopped = async (req, res) => {
    try {
        const nodesStopped = await Event.countDocuments({ eventType: 'stopNode' });
        res.status(200).send({ nodesStopped });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving nodes stopped', error });
    }
};

// Retrieves the number of nodes currently running, currently incorrect as there is no stopNode and user might just close browser tab
const getCurrentlyRunningNodes = async (req, res) => {
    try {
        const nodesStarted = await Event.countDocuments({ eventType: 'startNode' });
        const nodesStopped = await Event.countDocuments({ eventType: 'stopNode' });
        const currentlyRunningNodes = nodesStarted - nodesStopped;
        res.status(200).send({ currentlyRunningNodes });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving currently running nodes', error });
    }
};

// Retrieves the distribution of event types
const getEventTypeDistribution = async (req, res) => {
    try {
        const eventTypeDistribution = await Event.aggregate([
            {
                $group: {
                    _id: '$eventType',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    eventType: '$_id',
                    count: 1,
                },
            },
        ]);
        res.status(200).send({ eventTypeDistribution });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving event type distribution', error });
    }
};

// Retrieves the header synchronization progress for each user
const getHeaderSyncProgress = async (req, res) => {
    try {
        const headerSyncProgress = await Event.aggregate([
            { $match: { eventType: 'syncHeader' } },
            {
                $group: {
                    _id: '$userId',
                    totalSync: { $sum: '$data.syncProgress' },
                },
            },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    totalSync: 1,
                },
            },
        ]);
        res.status(200).send({ headerSyncProgress });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving header sync progress', error });
    }
};

module.exports = {
    logEvent,
    getTotalUsers,
    getActiveUsers,
    getTotalEvents,
    getAverageSessionDurations,
    getNodesStarted,
    getNodesStopped,
    getCurrentlyRunningNodes,
    getEventTypeDistribution,
    getHeaderSyncProgress,
};
