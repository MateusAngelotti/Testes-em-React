import React, { useState } from 'react';

const BuscaCidade=({onSearch})=>{
    const[value,setValue] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(value.trim()){
            onSearch(value.trim());
            setValue('');
        }
    };

      return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Digite o nome da cidade..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Buscar</button>
    </form>
  );
};

const styles = {
  form: { display: 'flex', gap: '10px', margin: '14px 0', justifyContent: 'center' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '200px' },
  button: { padding: '10px 14px', borderRadius: '8px', background: '#0077ff', color: '#fff', border: 'none' }
};

export default BuscaCidade;