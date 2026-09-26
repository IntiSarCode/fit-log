import React from 'react';
import Image from 'next/image';


const Home = () => {
    return (
       <section className="bg-black text-white py-20 px-4 flex justify-center items-center">
        <div className="bg-[#181a20] rounded-3xl p-8 md:p-12 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
         <div className="space-y-6">
          <p className="text-lime-400 font-bold text-xs uppercase">
            Workout Library
          </p>
          
          <h2 className="text-3xl md:text-4xl font-extrabold">
            TRAIN WITH INTENT.<br />LOG EVERY SET.
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,<br/> lock it into today's plan, and watch the week's work add<br /> up.
          </p>
          
          <button className="bg-lime-400 hover:bg-lime-500 text-black font-bold px-6 py-3 rounded-full text-sm ">
            Browse Workouts
          </button>
        </div>

        
        <div className="flex justify-center">
          <Image
            src="/assets/banner.png"
            width={400}
            height={400}
            alt="Fitman lifting weights"
            
          />
        </div>

      </div>

    </section>



    // <section className=" py-20">
    //     <div className="container mx-auto grid grid-cols-2 gap-4 items-center bg-base-200 rounded-4xl p-4">
    //         <div className="space-y-4">
    //                 <h2 className="text-5xl font-bold">
    //                     TRAIN WITH INTENT. LOG EVERY SET.</h2>
    //         </div>
    //         <p>FitLog is a dark, no-nonsense gym companion: pick a lift,<br /> lock it into today's plan, and watch the week's work add<br /> up.</p>
    //         <button className="btn btn-success">Browse Workouts</button>
    //         <Image
    //             src="/assets/banner.png"
    //             width={400}
    //             height={400}
    //             alt="Fitman lifting weights"
    //         />
    //     </div>
    // </section>       
    );
};

export default Home;