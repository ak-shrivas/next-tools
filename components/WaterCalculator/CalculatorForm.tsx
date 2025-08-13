"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RangeInputField } from "@/components/fields/RangeInputField";
import { calculateWaterIntake } from "@/utils/calculateWater";

const GENDER_OPTIONS = ["male", "female", "other"] as const;
type Gender = (typeof GENDER_OPTIONS)[number];

const HEIGHT_UNITS = ["cm", "m", "ft_in"] as const;
type HeightUnit = (typeof HEIGHT_UNITS)[number];

const WEIGHT_UNITS = ["kg", "lbs", "pound"] as const;
type WeightUnit = (typeof WEIGHT_UNITS)[number];

const ACTIVITY_LEVELS = ["sedentary", "light", "moderate", "high"] as const;
type Activity = (typeof ACTIVITY_LEVELS)[number];

const CLIMATES = ["normal", "hot", "very_hot"] as const;
type Climate = (typeof CLIMATES)[number];

export default function CalculatorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weight, setWeight] = useState(65);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [climate, setClimate] = useState<Climate>("normal");

  // Optional: prefill from query
  useEffect(() => {
    const get = (key: string) => searchParams.get(key) || "";

    setName(get("name"));
    if (searchParams.get("age")) setAge(+get("age"));
    if (searchParams.get("weight")) setWeight(+get("weight"));
    if (searchParams.get("height")) setHeight(+get("height"));

    const g = get("gender");
    if (GENDER_OPTIONS.includes(g as Gender)) setGender(g as Gender);

    const wu = get("weightUnit");
    if (WEIGHT_UNITS.includes(wu as WeightUnit)) setWeightUnit(wu as WeightUnit);

    const hu = get("heightUnit");
    if (HEIGHT_UNITS.includes(hu as HeightUnit)) setHeightUnit(hu as HeightUnit);

    const act = get("activity");
    if (ACTIVITY_LEVELS.includes(act as Activity)) setActivity(act as Activity);

    const cl = get("climate");
    if (CLIMATES.includes(cl as Climate)) setClimate(cl as Climate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultLiters = calculateWaterIntake({
      weight,
      height,
      gender,
      activity,
      age,
      unit: weightUnit,
      climate,
      heightUnit,
    });

    const query = new URLSearchParams({
      name,
      age: age.toString(),
      weight: weight.toString(),
      height: height.toString(),
      gender,
      weightUnit,
      heightUnit,
      activity,
      climate,
      liters: resultLiters.toFixed(1),
      shared: "false",
    });

    router.push(`/health/water-intake-calculator/result?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input w-full"
          placeholder="e.g. John Doe"
          required
        />
      </div>

      {/* Age */}
      <RangeInputField
        label="Age"
        value={age}
        onChange={setAge}
        min={5}
        max={100}
        unit="years"
        tooltip="Hydration needs vary with age."
      />

      {/* Gender */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="input w-full">
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>{option[0].toUpperCase() + option.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Height */}
      <RangeInputField
        label="Height"
        value={height}
        onChange={setHeight}
        min={80}
        max={220}
        unit={
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value as HeightUnit)}
            className="text-sm bg-transparent text-gray-600"
          >
            {HEIGHT_UNITS.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        }
        tooltip="Height helps refine your hydration needs."
      />

      {/* Weight */}
      <RangeInputField
        label="Weight"
        value={weight}
        onChange={setWeight}
        min={20}
        max={200}
        unit={
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
            className="text-sm bg-transparent text-gray-600"
          >
            {WEIGHT_UNITS.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        }
        tooltip="Weight plays a major role in daily water needs."
      />

      {/* Activity */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value as Activity)} className="input w-full">
          {ACTIVITY_LEVELS.map((level) => (
            <option key={level} value={level}>{level[0].toUpperCase() + level.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Climate */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Climate</label>
        <select value={climate} onChange={(e) => setClimate(e.target.value as Climate)} className="input w-full">
          {CLIMATES.map((c) => (
            <option key={c} value={c}>{c.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Calculate Water Intake
      </button>
    </form>
  );
}
