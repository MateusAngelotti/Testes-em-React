import { useState } from 'react';

const defaultActivity = {
  type: 'corrida',
  duration: '',
  date: '',
};

export default function AddActivity({onAdd}){
    const[activity,setActivity] = useState(defaultActivity);

    const handleChange = (e)=>{
        setActivity({ ...activity, [e.target.name]: e.target.value });
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!activity.duration || !activity.date) return;
        const calories = activity.duration * (activity.type === 'corrida' ? 10 : activity.type === 'caminhada' ? 5 : 7);
        onAdd({...activity,duration: +activity.duration, calories});
        setActivity(defaultActivity)
    }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <select name="type" value={activity.type} onChange={handleChange} className="select">
        <option value="corrida">Corrida</option>
        <option value="caminhada">Caminhada</option>
        <option value="academia">Academia</option>
      </select>
      <input
        type="number"
        name="duration"
        placeholder="Minutos"
        value={activity.duration}
        onChange={handleChange}
        className="input"
      />
      <input
        type="date"
        name="date"
        value={activity.date}
        onChange={handleChange}
        className="input"
      />
      <button type="submit" className="button">Adicionar</button>
    </form>
  );
}