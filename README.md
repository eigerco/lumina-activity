# Lumina-Activity

Lumina Activity is a Node.js backend application designed to collect and process event logs from Lumina services. It allows you to measure metrics such as how many people are running Lumina, how long people run Lumina, the percentage of header sync completed, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [License](#license)

## Features

- Receive event data from Lumina services
- Store event logs in a MongoDB database
- Process and extract insights from the stored event data
- Provide endpoints to retrieve metrics

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/eigerco/lumina-activity.git
    cd lumina-activity
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up MongoDB:

    Make sure you have MongoDB installed and running. You can follow the instructions [here](https://docs.mongodb.com/manual/installation/) to install MongoDB.

4. Start the server:

    ```bash
    npm start
    ```

## Usage


### Log an Event

To log events automatically, you can use the `lumina-mock-service`. This service will periodically generate and send events to the Lumina-Activity backend.

1. Go to the `lumina-mock-service` folder:

    ```bash
    cd lumina-mock-service
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the mock service:
   
   Leave as default or update the `LUMINA_ACTIVITY_URL` in `index.js` if your Lumina-Activity server is running on a different URL or port.

4. Start the mock service:

    ```bash
    node index.js
    ```

The mock service will start generating random events and sending them to the Lumina-Activity backend every 5 seconds by default.

## API Endpoints

### POST /api/log

Logs an event from a Lumina service.

#### Request Body

- `userId` (String): The ID of the user.
- `eventType` (String): The type of event.
- `data` (Object): Additional data related to the event.


## API Endpoints

### POST /api/log

Logs an event from a Lumina service.

#### Request Body

- `userId` (String): The ID of the user.
- `eventType` (String): The type of event.
- `data` (Object): Additional data related to the event.


```bash
curl -X POST http://localhost:3000/api/log -H "Content-Type: application/json" -d '{
    "userId": "user1",
    "eventType": "startNode",
    "data": {
        "startTime": "2024-06-29T12:00:00Z"
    }
}'
```

### GET /api/metrics/total-users

Retrieves the total number of users.


```bash
curl http://localhost:3000/api/metrics/total-users
```

### GET /api/metrics/active-users

Retrieves the number of active users in the past 24 hours.


```bash
curl http://localhost:3000/api/metrics/active-users
```

### GET /api/metrics/total-events

Retrieves the total number of events.


```bash
curl http://localhost:3000/api/metrics/total-events
```

### GET /api/metrics/average-session-durations

Retrieves the average session duration for each user.


```bash
curl http://localhost:3000/api/metrics/average-session-durations
```

### GET /api/metrics/nodes-started

Retrieves the total number of nodes started.


```bash
curl http://localhost:3000/api/metrics/nodes-started
```

### GET /api/metrics/nodes-stopped

Retrieves the total number of nodes stopped.


```bash
curl http://localhost:3000/api/metrics/nodes-stopped
```

### GET /api/metrics/currently-running-nodes

Retrieves the number of nodes currently running.


```bash
curl http://localhost:3000/api/metrics/currently-running-nodes
```

### GET /api/metrics/event-type-distribution

Retrieves the distribution of event types.


```bash
curl http://localhost:3000/api/metrics/event-type-distribution
```

### GET /api/metrics/header-sync-progress

Retrieves the header synchronization progress for each user.


```bash
curl http://localhost:3000/api/metrics/header-sync-progress
```


## Database Schema

The event data is stored in a MongoDB database with the following schema:

```javascript
const eventSchema = new mongoose.Schema({
    userId: String,
    eventType: String,
    timestamp: { type: Date, default: Date.now },
    data: mongoose.Schema.Types.Mixed,
});
