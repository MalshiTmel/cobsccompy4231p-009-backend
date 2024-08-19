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

const calculateCurrentLocation = (startTime, duration, currentTime, stops) => {
  const elapsedMilliseconds = currentTime - startTime;
  const totalDurationMilliseconds = duration * 60 * 1000; // Convert duration to milliseconds
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60)); // Elapsed time in minutes

  const stopCount = stops.length;
  const stopDuration = Math.floor(duration / stopCount); // Duration per stop in minutes

  const currentIndex = Math.floor(elapsedMinutes / stopDuration);
  const nextIndex = currentIndex + 1;

  const currentStation = stops[currentIndex] || 'End of Route';
  const nextStation = stops[nextIndex] || 'End of Route';

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

    const isUpward = trainWithEngine.direction === 'Upward';
    if (!isUpward) {
      // Reverse the stops array for downward direction
      Stops = Stops.slice().reverse();
    }

    const totalDuration = 700; // Total trip duration in minutes

    // Generate a random start time within the last 24 hours
    const startTime = generateRandomStartTime();
    const endTime = new Date(startTime.getTime() + totalDuration * 60 * 1000); // End time 700 minutes later

    // Get current time in Sri Lanka time zone
    const sriLankaTimeOffset = 5.5 * 60 * 60 * 1000; // Sri Lanka is UTC+5:30
    const currentTime = new Date(Date.now() + sriLankaTimeOffset); // Adjust current time to Sri Lankan time

    const { currentStation, nextStation } = calculateCurrentLocation(startTime, totalDuration, currentTime, Stops);

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    // Simulate the updates every minute with a change every 30 minutes
    const updateInterval = Math.floor(Math.random() * (30 - 15 + 1) + 15) * 60 * 1000; // 15-30 minutes
    const lastUpdate = new Date(startTime.getTime() + updateInterval);

    // Create a new OldRecords entry
    const oldRecord = new OldRecords({
      EID: engineId,
      currentIndex: Stops.indexOf(currentStation),
      direction: trainWithEngine.direction,
      startTime: startTime,
      lastStationUpdate: lastUpdate
    });

    // Save the OldRecords entry
    await oldRecord.save();

    return {
      direction: trainWithEngine.direction,
      startStation: Stops[0],
      endStation: Stops[Stops.length - 1],
      startTime: formattedStartTime,
      estimatedEndTime: formattedEndTime,
      currentStation,
      nextStation,
      lastUpdate
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = generateRealTimeData;
