type Gender = "male" | "female" | "other";
type Activity = "sedentary" | "light" | "moderate" | "high";
type Climate = "normal" | "hot" | "very_hot";
type WeightUnit = "kg" | "lbs" | "pound";
type HeightUnit = "cm" | "m" | "ft_in";

interface WaterInput {
  weight: number;
  unit: WeightUnit;
  height: number;
  heightUnit: HeightUnit;
  age: number;
  gender: Gender;
  activity: Activity;
  climate: Climate;
  name?: string;
}

export function calculateWaterIntake({
  weight,
  unit,
  height,
  heightUnit,
  age,
  gender,
  activity,
  climate,
}: WaterInput): number {
  // Convert weight to kg if needed
  let weightKg = weight;
  if (unit === "lbs" || unit === "pound") {
    weightKg = weight * 0.453592;
  }

  // Convert height to cm (if needed in future for BMI, currently unused)
  let heightCm = height;
  if (heightUnit === "m") heightCm = height * 100;
  if (heightUnit === "ft_in") heightCm = height * 30.48; // rough avg

  // Base water intake (ml): 30ml per kg
  let waterMl = weightKg * 30;

  // Gender adjustment
  if (gender === "male") waterMl *= 1.05;

  // Age adjustment
  if (age < 12) {
    waterMl *= 0.9;
  } else if (age > 60) {
    waterMl *= 0.95;
  }

  // Activity adjustment (ml)
  const activityAdditions: Record<Activity, number> = {
    sedentary: 0,
    light: 250,
    moderate: 400,
    high: 600,
  };
  waterMl += activityAdditions[activity];

  // Climate adjustment (ml)
  const climateAdditions: Record<Climate, number> = {
    normal: 0,
    hot: 250,
    very_hot: 500,
  };
  waterMl += climateAdditions[climate];

  // Final conversion to liters and round to 1 decimal
  const waterLiters = Math.round((waterMl / 1000) * 10) / 10;
  return waterLiters;
}
