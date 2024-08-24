const TrainWithEngine = require('../models/TrainWithEngineModel');
const TrainWithoutEngine = require('../models/TrainWithoutEngineModel');
const OldRecords = require('../models/OldRecords'); // Import the OldRecords model

const formatTime = (date) => {
  // Formats a Date object to a 24-hour time string (HH:mm:ss)
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const getRandomIndex = (length) => Math.floor(Math.random() * length);

const calculateNextStation = (currentIndex, stops) => {
  const nextIndex = currentIndex + 1;
  return nextIndex < stops.length ? stops[nextIndex] : 'End of Route';
};

const calculateCurrentLocation = (startTime, duration, currentTime, stops, direction) => {
  const elapsedMilliseconds = currentTime - startTime;
  const totalDurationMilliseconds = duration * 60 * 1000; // Convert duration to milliseconds
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60)); // Elapsed time in minutes

  const stopCount = stops.length;
  const stopDuration = Math.floor(duration / stopCount); // Duration per stop in minutes

  const currentIndex = Math.floor(elapsedMinutes / stopDuration);
  const adjustedStops = direction === 'Downward' ? stops.slice().reverse() : stops;

  const validCurrentIndex = Math.min(Math.max(currentIndex, 0), adjustedStops.length - 1);
  const validNextIndex = Math.min(Math.max(validCurrentIndex + 1, 0), adjustedStops.length - 1);

  const currentStation = adjustedStops[validCurrentIndex] || 'End of Route';
  const nextStation = adjustedStops[validNextIndex] || 'End of Route';

  return { currentStation, nextStation };
};

const generateRandomStartTime = () => {
  const now = new Date();
  const randomOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // Random offset within 24 hours
  return new Date(now.getTime() - randomOffset); // Subtract offset to get a start time in the past
};

const generateRealTimeData = async (engineId) => {
  try {
    const trainWithEngine = await TrainWithEngine.findOne({ EID: engineId });
    if (!trainWithEngine) {
      throw new Error('TrainWithEngine not found');
    }

    const trainWithoutEngine = await TrainWithoutEngine.findOne({ TID: trainWithEngine.TID });
    if (!trainWithoutEngine) {
      throw new Error('Train without engine not found');
    }

    let { Stops } = trainWithoutEngine;

    // Set train direction if not already set
    if (!trainWithEngine.direction) {
      const isUpward = Math.random() > 0.5;
      trainWithEngine.direction = isUpward ? 'Upward' : 'Downward';
      await trainWithEngine.save(); // Save the direction
    }

    const direction = trainWithEngine.direction;
    const isUpward = direction === 'Upward';
    const adjustedStops = direction === 'Downward' ? Stops.slice().reverse() : Stops;

    // Generate a random start time within the last 24 hours
    const startTime = generateRandomStartTime();
    const endTime = new Date(startTime.getTime() + 700 * 60 * 1000); // End time 700 minutes later

    // Get current time in Sri Lanka time zone
    const sriLankaTimeOffset = 5.5 * 60 * 60 * 1000; // Sri Lanka is UTC+5:30
    const currentTime = new Date(Date.now() + sriLankaTimeOffset); // Adjust current time to Sri Lankan time

    // Determine if this is the first load or subsequent update
    const isFirstLoad = Math.abs(currentTime - startTime) < 60 * 1000; // Within 1 minute of start time

    // Randomly select current station and determine next station
    let currentStation, nextStation;
    if (isFirstLoad) {
      const startIndex = direction === 'Upward' ? 0 : adjustedStops.length - 1;
      currentStation = adjustedStops[startIndex];
      nextStation = calculateNextStation(startIndex, adjustedStops);
    } else {
      const randomIndex = getRandomIndex(adjustedStops.length);
      currentStation = adjustedStops[randomIndex];
      nextStation = calculateNextStation(randomIndex, adjustedStops);
    }

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    // Simulate the updates every 30 seconds
    const updateInterval = 30 * 1000; // 30 seconds
    const lastUpdate = new Date(currentTime.getTime() + updateInterval);

    // Create a new OldRecords entry
    const oldRecord = new OldRecords({
      EID: engineId,
      currentIndex: adjustedStops.indexOf(currentStation),
      direction,
      startTime: startTime,
      lastStationUpdate: lastUpdate
    });

    // Save the OldRecords entry
    await oldRecord.save();

    return {
      direction,
      startStation: adjustedStops[0],
      endStation: adjustedStops[adjustedStops.length - 1],
      startTime: formattedStartTime,
      estimatedEndTime: formattedEndTime,
      currentStation, // Ensure the correct currentStation is used
      nextStation,
      lastUpdate
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = generateRealTimeData;
