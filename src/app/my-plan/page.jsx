
// import Image from 'next/image';

// const getWorkoutDetails = async (id) => {
//   try {
//     const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       console.error('API Error:', res.status);
//       return null;
//     }

//     const contentType = res.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       console.error('API did not return valid JSON');
//       return null;
//     }

//     const list = await res.json();
//     return list.find((item) => String(item._id || item.id) === String(id));
//   } catch (err) {
//     console.error('Fetch failed:', err);
//     return null;
//   }
// };

// export default async function WorkoutDetailsPage({ params }) {
//   const resolvedParams = await params;
//   const workout = await getWorkoutDetails(resolvedParams?.id);

//   if (!workout) {
//     return (
//       <div className="container mx-auto p-10 text-center text-white">
//         <h2 className="text-2xl font-bold">Workout Not Found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <div className="card lg:card-side bg-base-100 shadow-xl gap-6 items-start p-6">
//         <figure className="lg:w-1/2 w-full">
//           <Image
//             src={workout.image || workout.img || '/placeholder.png'}
//             alt={workout.name || workout.title || 'Workout'}
//             width={600}
//             height={600}
//             className="w-full h-auto object-cover rounded-2xl"
//           />
//         </figure>

//         <div className="lg:w-1/2 w-full flex flex-col gap-4">
//           <div>
//             <h2 className="text-3xl font-bold uppercase text-white">
//               {workout.name || workout.title}
//             </h2>
//             <p className="text-gray-400 mt-1 text-sm leading-relaxed">
//               {workout.description}
//             </p>
//           </div>

//           <div className="bg-base-200 p-4 rounded-xl space-y-2 text-sm">
//             {workout.equipment && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Equipment</span>
//                 <span className="text-white">{workout.equipment}</span>
//               </div>
//             )}
//             {workout.difficulty && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Difficulty</span>
//                 <span className="text-white">{workout.difficulty}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanPage() {
  const { planItems, savedItems, loading, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'saved'
  const [sortBy, setSortBy] = useState('Calories');

  const rawList = activeTab === 'today' ? planItems : savedItems;

  // Extract clean number from string (e.g. "15 min" -> 15, "120 kcal" -> 120)
  const parseNumber = (val) => {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    const match = String(val).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Stat calculations
  const totalExercises = rawList.length;
  const totalMinutes = rawList.reduce(
    (sum, item) => sum + parseNumber(item.duration || item.time || item.minutes),
    0
  );
  const totalCalories = rawList.reduce(
    (sum, item) => sum + parseNumber(item.calories || item.kcal),
    0
  );

  // Sorting logic
  const currentList = [...rawList].sort((a, b) => {
    if (sortBy === 'Duration') {
      return (
        parseNumber(b.duration || b.time) - parseNumber(a.duration || a.time)
      );
    }
    return (
      parseNumber(b.calories || b.kcal) - parseNumber(a.calories || a.kcal)
    );
  });

  return (
    <div className="container mx-auto p-6 max-w-5xl text-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Stat Cards) */}
      <div className="bg-[#121418] border border-gray-800 rounded-2xl p-6 mb-8 grid grid-cols-3 text-left">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase">
            Exercises
          </p>
          <p className="text-4xl font-bold text-lime-400 mt-2">
            {totalExercises}
          </p>
        </div>
        <div className="border-x border-gray-800/80 px-6">
          <p className="text-gray-400 text-xs font-semibold uppercase">
            Minutes
          </p>
          <p className="text-4xl font-bold mt-2">{totalMinutes}</p>
        </div>
        <div className="px-6">
          <p className="text-gray-400 text-xs font-semibold uppercase">
            Calories
          </p>
          <p className="text-4xl font-bold mt-2">{totalCalories}</p>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex justify-between items-center mb-6">
        {/* Tabs */}
        <div className="bg-[#121418] p-1 rounded-xl flex gap-1 border border-gray-800">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-lime-400 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-lime-400 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-semibold uppercase">
            Sort By
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121418] border border-gray-800 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="Calories">Calories</option>
            <option value="Duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Loading workouts...</p>
        </div>
      ) : currentList.length === 0 ? (
        /* Empty State */
        <div className="bg-[#121418]/60 border border-gray-800 rounded-2xl py-20 text-center space-y-3">
          <h2 className="text-2xl font-black uppercase tracking-wide">
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="btn bg-lime-400 hover:bg-lime-500 text-black border-none font-bold px-6 mt-4 inline-block rounded-xl"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        /* Workout Cards List (Horizontal Row Format matching live site) */
        <div className="flex flex-col gap-4">
          {currentList.map((workout, index) => {
            const workoutId = workout._id || workout.id || index;
            const title = (workout.title || workout.name || 'WORKOUT').toUpperCase();
            const equipment = workout.equipment || workout.category || 'Bodyweight';
            const duration = workout.duration || workout.time || 0;
            const calories = workout.calories || workout.kcal || 0;
            const rating = workout.rating || '4.5';

            return (
              <div
                key={`${workoutId}-${index}`}
                className="bg-[#121418] border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800">
                    <Image
                      src={workout.image || workout.img || '/placeholder.png'}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold tracking-wide uppercase text-white">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-400">{equipment}</p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 text-xs text-gray-300 pt-1">
                      <span className="flex items-center gap-1">
                        ⏱ {parseNumber(duration)} min
                      </span>
                      <span className="flex items-center gap-1">
                        🔥 {parseNumber(calories)} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/workouts/${workoutId}`}
                    className="border border-gray-700 hover:bg-gray-800 text-xs text-white px-4 py-2 rounded-full font-medium transition"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      activeTab === 'today'
                        ? removeFromPlan(index)
                        : removeFromSaved(index)
                    }
                    className="text-gray-400 hover:text-white text-lg px-2 transition"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
