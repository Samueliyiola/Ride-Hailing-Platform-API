const estimateFare = (distanceKm, durationMin) => {
    const baseFare = 1000; // base fare in NGN
    const costPerKm = 100;
    const costPerMin = 20;
  
    const total = baseFare + (costPerKm * distanceKm) + (costPerMin * durationMin);
    return parseFloat(total.toFixed(2));
};

export default estimateFare;