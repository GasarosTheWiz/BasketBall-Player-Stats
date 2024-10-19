// PlayerStatsChart.js
import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

const PlayerStatsChart = ({ playerStats }) => {
    useEffect(() => {
        const ctx = document.getElementById('playerStatsChart').getContext('2d');

        const labels = playerStats.map(player => player.name);
        const twoPPercentages = playerStats.map(player => player.twoPPercent);
        const threePPercentages = playerStats.map(player => player.threePPercent);
        const ftPercentages = playerStats.map(player => player.ftPercent);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '2P%',
                        data: twoPPercentages,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: '3P%',
                        data: threePPercentages,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    },
                    {
                        label: 'FT%',
                        data: ftPercentages,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                    },
                },
            },
        });
    }, [playerStats]);

    return (
        <div>
            <h2>Player Stats Chart</h2>
            <canvas id="playerStatsChart" width="600" height="200"></canvas>
        </div>
    );
};

export default PlayerStatsChart;
