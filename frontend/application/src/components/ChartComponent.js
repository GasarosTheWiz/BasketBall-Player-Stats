import React from 'react';
import { Chart, registerables } from 'chart.js';

// register all to Chart.js
Chart.register(...registerables);

const ChartComponent = ({ data }) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        // checking if data exists
        if (!data || !data.labels || !data.values || !data.accuracyValues) {
            console.warn('Missing data for the chart');
            return;
        }

        const ctx = canvasRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Points Per Game',
                        data: data.values,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'General Accuracy (%)',
                        data: data.accuracyValues,
                        backgroundColor: 'rgba(255,99,132,0.4)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Points Per Game',
                            color: 'white',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: 'white'
                        }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'General Accuracy (%)',
                            color: 'white',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            drawOnChartArea: false //it isnt needed for the second one
                        },
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });

        return () => {
            myChart.destroy(); // destroy chart
        };
    }, [data]);

    // fuction to export chart
    const exportChart = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // transform canvas to PNG
        link.download = 'chart.png'; // name of file
        link.click(); // simulation of click so as download starts
    };

    return (
        <div className="chart-container">
            <button className="export-button" onClick={exportChart}>Export Chart</button>
            <canvas ref={canvasRef} className="chart-canvas" />
        </div>
    );
};

export default ChartComponent;
