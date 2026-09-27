
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

 
  const parseNumber = (val) => {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    const match = String(val).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };


  const totalExercises = rawList.length;
  const totalMinutes = rawList.reduce(
    (sum, item) => sum + parseNumber(item.duration || item.time || item.minutes),
    0
  );
  const totalCalories = rawList.reduce(
    (sum, item) => sum + parseNumber(item.calories || item.kcal),
    0
  );

 
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
    
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

   
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

     
      <div className="flex justify-between items-center mb-6">
      
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

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Loading workouts...</p>
        </div>
      ) : currentList.length === 0 ? (
        

        
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
