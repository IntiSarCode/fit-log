'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [planItems, setPlanItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    try {
      const savedPlan = JSON.parse(localStorage.getItem('my_plan') || '[]');
      const savedForLater = JSON.parse(localStorage.getItem('saved_workouts') || '[]');
      setPlanItems(Array.isArray(savedPlan) ? savedPlan : []);
      setSavedItems(Array.isArray(savedForLater) ? savedForLater : []);
    } catch {
      setPlanItems([]);
      setSavedItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getWorkoutId = (item) => String(item?._id || item?.id || item?.title || item?.name || '');

  const addToPlan = (workout) => {
    if (!workout) return;
    const targetId = getWorkoutId(workout);

    const exists = planItems.some((item) => getWorkoutId(item) === targetId);
    if (exists) {
      showToast('Workout is already in Today\'s Plan!', 'warning');
      return;
    }

    const updated = [...planItems, workout];
    setPlanItems(updated);
    localStorage.setItem('my_plan', JSON.stringify(updated));
    showToast('Added to Today\'s Plan!', 'success');
  };

  const saveForLater = (workout) => {
    if (!workout) return;
    const targetId = getWorkoutId(workout);

    const exists = savedItems.some((item) => getWorkoutId(item) === targetId);
    if (exists) {
      showToast('Workout is already saved!', 'warning');
      return;
    }

    const updated = [...savedItems, workout];
    setSavedItems(updated);
    localStorage.setItem('saved_workouts', JSON.stringify(updated));
    showToast('Saved for later!', 'success');
  };

  const removeFromPlan = (indexToRemove) => {
    const updated = planItems.filter((_, idx) => idx !== indexToRemove);
    setPlanItems(updated);
    localStorage.setItem('my_plan', JSON.stringify(updated));
    showToast('Removed from plan', 'success');
  };

  const removeFromSaved = (indexToRemove) => {
    const updated = savedItems.filter((_, idx) => idx !== indexToRemove);
    setSavedItems(updated);
    localStorage.setItem('saved_workouts', JSON.stringify(updated));
    showToast('Removed from saved', 'success');
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        planCount: planItems.length,
        savedCount: savedItems.length,
        loading,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}

      {/* Toast Notification Top Right */}
      {toast && (
        <div className="toast toast-top toast-end z-50 mt-14">
          <div
            className={`alert ${
              toast.type === 'warning' ? 'alert-warning' : 'alert-success'
            } text-black font-semibold text-sm py-2 px-4 shadow-lg flex items-center gap-2 rounded-lg`}
          >
            <span>✓ {toast.message}</span>
          </div>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);