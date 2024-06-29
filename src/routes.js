const express = require('express');
const {
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
} = require('./controllers');

const router = express.Router();

router.post('/log', logEvent);
router.get('/metrics/total-users', getTotalUsers);
router.get('/metrics/active-users', getActiveUsers);
router.get('/metrics/total-events', getTotalEvents);
router.get('/metrics/average-session-durations', getAverageSessionDurations);
router.get('/metrics/nodes-started', getNodesStarted);
router.get('/metrics/nodes-stopped', getNodesStopped);
router.get('/metrics/currently-running-nodes', getCurrentlyRunningNodes);
router.get('/metrics/event-type-distribution', getEventTypeDistribution);
router.get('/metrics/header-sync-progress', getHeaderSyncProgress);

module.exports = router;
