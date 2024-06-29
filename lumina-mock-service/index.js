const axios = require('axios');

// Configuration
const LUMINA_ACTIVITY_URL = 'http://localhost:3000/api/log';
const INTERVAL_MS = 5000; // 5 seconds

// Define event types with weights
const eventTypes = [
    { type: 'startNode', weight: 0.2 },
    { type: 'stopNode', weight: 0.1 },
    { type: 'syncHeader', weight: 0.4 },
    { type: 'sampleBlock', weight: 0.3 }
];

// Function to select an event type based on weights
const selectEventType = () => {
    const totalWeight = eventTypes.reduce((sum, event) => sum + event.weight, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const event of eventTypes) {
        cumulativeWeight += event.weight;
        if (random < cumulativeWeight) {
            return event.type;
        }
    }
};

// Mock data generator
const generateEvent = () => {
    const userId = `user${Math.floor(Math.random() * 10) + 1}`;
    const eventType = selectEventType();
    const data = {
        timestamp: new Date().toISOString(),
        details: `Mock event data for ${eventType}`,
    };

    return {
        userId,
        eventType,
        data,
    };
};

// Function to post event to Lumina-Activity
const postEvent = async (event) => {
    try {
        const response = await axios.post(LUMINA_ACTIVITY_URL, event);
        console.log('Event posted:', response.data);
    } catch (error) {
        console.error('Error posting event:', error.message);
    }
};

// Main function to periodically send events
const startMockService = () => {
    setInterval(() => {
        const event = generateEvent();
        console.log('Generated event:', event);
        postEvent(event);
    }, INTERVAL_MS);
};

// Start the mock service
startMockService();
