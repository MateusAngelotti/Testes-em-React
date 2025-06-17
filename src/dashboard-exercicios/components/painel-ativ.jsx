export default function StatisticsPanel({ stats }) {
  const goal = 300;
  const progress = Math.min((stats.totalMinutes / goal) * 100, 100);

  return (
    <div className="stats-grid">
      <div className="stat">
        <h3>Calorias</h3>
        <p>{stats.totalCalories} kcal</p>
      </div>
      <div className="stat">
        <h3>Tempo Total</h3>
        <p>{stats.totalMinutes} min</p>
      </div>
      <div className="stat">
        <h3>Meta</h3>
        <p>{progress.toFixed(0)}% de 300 min</p>
      </div>
    </div>
  );
}