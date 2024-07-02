// components/PredictionsTable.js
import React from 'react';
import { format } from 'date-fns';
import styles from './PredictionsTable.module.css'; // Import CSS module for styling
 
function PredictionsTable({ predictions }) {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format


 
 console.log("Todays Date",today);

 
 return (
        <div className={styles.container}>
            <h2> Todays Predictions</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Prediction</th>
                            <th>Start Date</th>
                            <th>Status</th>
                            <th>Result</th>
                            <th>Odds (1/X/2)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map(prediction => (
                            <tr key={prediction.id}>
                                <td>{prediction.home_team}</td>
                                <td>{prediction.away_team}</td>
                                <td>{prediction.prediction}</td>
                                <td>{format(new Date(prediction.start_date), 'dd/MM/yyyy, HH:mm:ss')}</td>
                                <td>{prediction.status}</td>
                                <td>{prediction.result}</td>
                                <td>
                                    <ul>
                                        <li>1: {prediction.odds['1']}</li>
                                        <li>X: {prediction.odds['X']}</li>
                                        <li>2: {prediction.odds['2']}</li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PredictionsTable;
