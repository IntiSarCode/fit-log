"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";

const getWorkoutDetails = async (id) => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const list = await res.json();
  return list.find((item) => String(item._id || item.id) === String(id));
};

export default function WorkoutDetailsPage({ params }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

 
  const { addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      const data = await getWorkoutDetails(resolvedParams.id);
      setWorkout(data);
      setLoading(false);
    }
    loadData();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto p-10 text-center text-white">
        <p>Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="container mx-auto p-10 text-center text-white">
        <h2 className="text-2xl font-bold">Workout Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="card lg:card-side bg-base-100 shadow-xl gap-6 items-start p-6">
     
        

        <figure className="lg:w-1/2 w-full">
          <Image
            src={workout.image || workout.img}
            alt={workout.name || workout.title}
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </figure>

        
        <div className="lg:w-1/2 w-full flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-bold uppercase text-white">
              {workout.name || workout.title}
            </h2>
            <p className="text-gray-400 mt-1 text-sm leading-relaxed">
              {workout.description}
            </p>
          </div>

         
          <div className="bg-base-200 p-4 rounded-xl space-y-2 text-sm">
            {workout.equipment && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Equipment
                </span>
                <span className="text-white">{workout.equipment}</span>
              </div>
            )}
            {workout.difficulty && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Difficulty
                </span>
                <span className="text-white">{workout.difficulty}</span>
              </div>
            )}
            {workout.sets && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Sets
                </span>
                <span className="text-white">{workout.sets}</span>
              </div>
            )}
            {workout.reps && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Reps
                </span>
                <span className="text-white">{workout.reps}</span>
              </div>
            )}
            {workout.duration && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Duration
                </span>
                <span className="text-white">{workout.duration} min</span>
              </div>
            )}
            {workout.calories && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Calories
                </span>
                <span className="text-white">{workout.calories} kcal</span>
              </div>
            )}
            {workout.rating && (
              <div className="flex justify-between">
                <span className="font-semibold uppercase text-gray-400">
                  Rating
                </span>
                <span className="text-white">{workout.rating}</span>
              </div>
            )}
          </div>

         
          {workout.instructions && (
            <div>
              <h3 className="font-bold uppercase text-base text-white mb-2">
                Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                {Array.isArray(workout.instructions) ? (
                  workout.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))
                ) : (
                  <li>{workout.instructions}</li>
                )}
              </ol>
            </div>
          )}

          
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              className="btn bg-lime-400 hover:bg-lime-500 text-black border-none font-semibold"
            >
              Add to today's plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="btn btn-outline border-gray-700 text-white hover:bg-gray-800"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





// import Image from 'next/image';


// const getWorkoutDetails = async (id) => {
//   const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
//   const list = await res.json();
//   return list.find((item) => String(item._id || item.id) === String(id));
// };

// export default async function WorkoutDetailsPage({ params }) {
//   const { id } = await params;
//   const workout = await getWorkoutDetails(id);

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
//         {/* Left Side: Image */}
//         <figure className="lg:w-1/2 w-full">
//           <Image
//             src={workout.image || workout.img}
//             alt={workout.name || workout.title}
//             width={600}
//             height={600}
//             className="w-full h-auto object-cover rounded-2xl"
//           />
//         </figure>

//         {/* Right Side: Details & Actions */}
//         <div className="lg:w-1/2 w-full flex flex-col gap-4">
//           {/* Title & Description Grouped Together */}
//           <div>
//             <h2 className="text-3xl font-bold uppercase text-white">
//               {workout.name || workout.title}
//             </h2>
//             <p className="text-gray-400 mt-1 text-sm leading-relaxed">
//               {workout.description}
//             </p>
//           </div>

//           {/* Stats Box */}
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
//             {workout.sets && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Sets</span>
//                 <span className="text-white">{workout.sets}</span>
//               </div>
//             )}
//             {workout.reps && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Reps</span>
//                 <span className="text-white">{workout.reps}</span>
//               </div>
//             )}
//             {workout.duration && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Duration</span>
//                 <span className="text-white">{workout.duration}</span>
//               </div>
//             )}
//             {workout.calories && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Calories</span>
//                 <span className="text-white">{workout.calories} kcal</span>
//               </div>
//             )}
//             {workout.rating && (
//               <div className="flex justify-between">
//                 <span className="font-semibold uppercase text-gray-400">Rating</span>
//                 <span className="text-white">{workout.rating}</span>
//               </div>
//             )}
//           </div>

//           {/* Instructions */}
//           {workout.instructions && (
//             <div>
//               <h3 className="font-bold uppercase text-base text-white mb-2">
//                 Instructions
//               </h3>
//               <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
//                 {Array.isArray(workout.instructions) ? (
//                   workout.instructions.map((step, idx) => (
//                     <li key={idx}>{step}</li>
//                   ))
//                 ) : (
//                   <li>{workout.instructions}</li>
//                 )}
//               </ol>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button className="btn bg-lime-400 hover:bg-lime-500 text-black border-none font-semibold">
//               Add to today's plan
//             </button>
//             <button className="btn btn-outline border-gray-700 text-white hover:bg-gray-800">
//               Save for later
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



