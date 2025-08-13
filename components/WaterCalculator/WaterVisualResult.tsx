import { GlassWater, BottleWine } from "lucide-react";

export default function WaterVisualResult({ liters }: { liters: number }) {
  const glassVolume = 0.25; // 250ml
  const bottleVolume = 1; // 1L

  const glasses = Math.round(liters / glassVolume);
  const bottles = Math.floor(liters / bottleVolume);
  const remainingLiters = +(liters % bottleVolume).toFixed(1);
  const totalGlasses = Math.min(glasses, 12);
  const fullRows = Math.floor(totalGlasses / 4) * 4;
  const remaining = totalGlasses % 4;


  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-0 to-blue-200 border border-blue-200 shadow-md">
      {/* <h3 className="text-xl font-bold text-blue-900 mb-2">💧 Your Personalized Hydration Goal</h3> */}
      <p className="text-base text-blue-700">
        You need <span className="font-semibold">{liters} liters</span> of water per day.
      
        That’s approximately <span className="font-semibold">{glasses} glasses</span> (250ml each) or <span className="font-semibold">{bottles} bottles</span> (1L) + {remainingLiters}L extra.
      </p>

      {/* Visual Comparison */}
      <div className="flex items-center justify-center gap-6 mt-8">
        {/* Glasses */}
        <div className="flex flex-col gap-2">
        {/* Full rows: 4 items per row */}
        <div className="grid grid-cols-4 gap-2 justify-items-center">
          {[...Array(fullRows)].map((_, i) => (
            <GlassWater key={i} className="w-8 h-8 text-blue-500" />
          ))}
        </div>

        {/* Last row: center remaining icons */}
        {remaining > 0 && (
          <div className="flex justify-center gap-2">
            {[...Array(remaining)].map((_, i) => (
              <GlassWater key={`last-${i}`} className="w-8 h-8 text-blue-500" />
            ))}
          </div>
        )}
        {glasses > 12 && (
          <p className="text-sm flex mt-1 justify-center gap-1 col-span-4">
            +{glasses - 12} more
            <GlassWater className="w-5 h-5 text-blue-500" />
          </p>
        )}

      </div>


        {/* Equal sign */}
        <span className="text-3xl font-bold text-blue-600">=</span>

        {/* Bottles */}
        <div className="flex gap-2 items-end flex-wrap justify-center">
          {[...Array(bottles)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <BottleWine className="w-10 h-10 text-blue-700" />
              <span className="text-xs text-blue-600">1L</span>
            </div>
          ))}
          {remainingLiters > 0 && (
            <div className="flex flex-col items-center">
              <BottleWine className="w-10 h-10 text-blue-400" />
              <span className="text-xs text-blue-500">{remainingLiters}L</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
