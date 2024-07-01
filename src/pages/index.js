// pages/index.js
import React from 'react';
import PredictionsTable from '@/app/components/PredictionTable';
function HomePage({ predictions }) {
    return (
        <div>
          
            <PredictionsTable predictions={predictions} />
        </div>
    );
}

export async function getStaticProps() {
    try {
        const res = await fetch('https://predictionengine.onrender.com/api/predictionEngine');
        const data = await res.json();

        return {
            props: {
                predictions: data.data || [], // Ensure data is properly handled
            },
        };
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return {
            props: {
                predictions: [],
            },
        };
    }
}

export default HomePage;
