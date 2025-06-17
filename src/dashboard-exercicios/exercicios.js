import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentWeekActivities, getDailyMinutes, getStats } from './data/activityData';
import StatisticsPanel from './components/painel-ativ'
import AddActivity from './components/novoexerc';
import ActivityChart from './components/grafico-ativ';
import './atividades.css'

function AppAtividades() {
  const [activities, setActivities] = useState([]);

  const handleAddActivity = (activity) => {
    const newActivity = { ...activity, id: uuidv4() };
    setActivities([...activities, newActivity]);
  };

  const weeklyActivities = getCurrentWeekActivities(activities);
  const dailyMinutes = getDailyMinutes(weeklyActivities);
  const stats = getStats(weeklyActivities);

  return (
    <div className="container">
      <h1 className="title">Dashboard de Atividades Físicas</h1>
      <AddActivity onAdd={handleAddActivity} />
      <ActivityChart data={dailyMinutes} />
      <StatisticsPanel stats={stats} />
    </div>
  );

}

export default AppAtividades;