# Lumina-Mock-Service

Lumina-Mock-Service is a mock service designed to simulate the Lumina nodes. It periodically generates and sends events to the Lumina-Activity backend for testing and development purposes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Features

- Periodically generates random events
- Sends events to Lumina-Activity backend
- Configurable event generation interval

## Installation

1. Come to this folder:

    ```bash
    cd lumina-mock-service
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the mock service:

    ```bash
    node index.js
    ```

The mock service will start generating random events and sending them to the Lumina-Activity backend every 5 seconds by default.

## Configuration

The configuration for the mock service can be adjusted by editing the `index.js` file.

- `LUMINA_ACTIVITY_URL`: The URL of the Lumina-Activity backend. Default is `http://localhost:3000/api/log`.
- `INTERVAL_MS`: The interval in milliseconds between event generations. Default is `5000` (5 seconds).

Example configuration in `index.js`:

```javascript
// Configuration
const LUMINA_ACTIVITY_URL = 'http://localhost:3000/api/log';
const INTERVAL_MS = 5000; // 5 seconds
