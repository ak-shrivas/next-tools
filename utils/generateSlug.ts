// utils/generateSlug.ts
export function generateSlug({
    liters,
    weight,
    gender,
    activity,
  }: {
    liters: number;
    weight: number;
    gender: string;
    activity?: string;
  }) {
    const literStr = `${liters}`.replace(".", "-");
    let slug = `${literStr}-liters-daily-for-${weight}kg-${gender}`;
  
    if (activity && activity !== "moderate") {
      slug += `-${activity}`;
    }
  
    return slug;
  }
  