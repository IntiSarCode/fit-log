import React from 'react';
import Link from 'next/link';

const getBooks = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
  cache: "no-store",
});

if (!res.ok) return [];

const contentType = res.headers.get("content-type");
if (!contentType || !contentType.includes("application/json")) return [];

const data = await res.json();
  return data;
};

const Books = async () => {
  const booksData = await getBooks();

  return (
    <div className="bg-black text-white min-h-screen p-6">
      
    
      <div id="workouts" className="max-w-7xl mx-auto my-1 ">
        <h1 className="text-3xl font-extrabold ">The Library</h1>
      </div>

      <div  className="  max-w-7xl mx-auto my-1">
        <p className="text-gray-400 pb-5">Twelve lifts covering every major muscle group.</p>
      </div>

     
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map((workout, index) => (
          
          /* Clickable Card Link */
          <Link 
            key={index} 
            href={`/workouts/${workout.id || index}`}
            className="bg-[#181a20] rounded-2xl overflow-hidden shadow-lg border border-gray-800 flex flex-col hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
          >
            
            {/* Top Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={workout.image || workout.img}
                alt={workout.name || workout.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Content */}
            <div className="p-5 space-y-3">
              
              {/* Category Badges */}
              <div className="flex gap-2">
                <span className="bg-[#a3e635] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {workout.category || "Chest"}
                </span>
                <span className="bg-[#a3e635] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {workout.muscle || "Arms"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-black tracking-wide uppercase text-white">
                {workout.name || workout.title}
              </h2>

              {/* Subtitle / Equipment */}
              <p className="text-gray-400 text-sm">
                {workout.equipment || "Barbell, Bench"}
              </p>

              {/* Stats Footer */}
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-300 pt-2">
                <span className="flex items-center gap-1">
                  ⏱️ {workout.duration || "25 min"}
                </span>
                <span className="flex items-center gap-1">
                  🔥 {workout.calories || "180 kcal"}
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {workout.rating || "4.8"}
                </span>
              </div>

            </div>

          </Link>

        ))}
      </div>

    </div>
  );
};




const MOCK_WORKOUTS = [
  {
    _id: "1",
    title: "BENCH PRESS",
    equipment: "Barbell",
    duration: 15,
    calories: 120,
    rating: "4.8",
    image: "/placeholder.png"
  },
  {
    _id: "2",
    title: "SQUATS",
    equipment: "Barbell",
    duration: 20,
    calories: 180,
    rating: "4.9",
    image: "/placeholder.png"
  },
  {
    _id: "3",
    title: "DEADLIFT",
    equipment: "Barbell",
    duration: 25,
    calories: 220,
    rating: "5.0",
    image: "/placeholder.png"
  }
];

// Inside your data fetching function:
async function getWorkouts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) return MOCK_WORKOUTS;

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return MOCK_WORKOUTS;
    }

    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : MOCK_WORKOUTS;
  } catch (error) {
    return MOCK_WORKOUTS;
  }
}

export default Books;