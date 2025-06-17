import { format, isThisWeek, parseISO } from 'date-fns';

export function getCurrentWeekActivities(activities) {
  return activities.filter((a) => isThisWeek(parseISO(a.date), { weekStartsOn: 1 }));
}

export function getDailyMinutes(activities) {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const result = Array(7).fill(0).map((_, i) => ({ day: days[i], minutes: 0 }));

  activities.forEach((a) => {
    const date = parseISO(a.date);
    const dayIndex = (date.getDay() + 6) % 7;
    result[dayIndex].minutes += a.duration;
  });

  return result;
}

export function getStats(activities) {
  return {
    totalCalories: activities.reduce((sum, a) => sum + a.calories, 0),
    totalMinutes: activities.reduce((sum, a) => sum + a.duration, 0),
  };
}

