import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ChartComponent from './components/ChartComponent';
import Login from './components/Login';

function App() {
    const [player, setPlayer] = useState({
        name: '',
        twoPScored: '',
        twoPShot: '',
        threePScored: '',
        threePShot: '',
        ftScored: '',
        ftShot: ''
    });

    const [showForm, setShowForm] = useState(false);
    const [players, setPlayers] = useState([]);
    const [user, setUser] = useState(null); // user's condition

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    // check if scored values > shot values
    if (parseInt(player.twoPScored) > parseInt(player.twoPShot) ||
        parseInt(player.threePScored) > parseInt(player.threePShot) ||
        parseInt(player.ftScored) > parseInt(player.ftShot)) {
        alert('Scored values cannot be greater than Shot values');
        return;
    }

    if (players.length >= 7) {
        alert('You can only add up to 7 players.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/players/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });
        if (response.ok) {
            alert('Player saved successfully');
            fetchPlayers();
            setPlayer({
                name: '',
                twoPScored: '',
                twoPShot: '',
                threePScored: '',
                threePShot: '',
                ftScored: '',
                ftShot: ''
            });
            setShowForm(false);
        } else {
            alert('Failed to save player');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving player');
    }
};



    const handleNewStatsClick = () => {
        setShowForm(true);
    };

    const handleDelete = async (playerName) => {
        try {
            const response = await fetch(`http://localhost:8080/players/deleteByName/${playerName}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('All entries for player deleted successfully');
                fetchPlayers();
            } else {
                alert('Failed to delete player');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting player');
        }
    };

    const fetchPlayers = async () => {
        try {
            const response = await fetch('http://localhost:8080/players/all');
            if (response.ok) {
                const data = await response.json();
                const updatedPlayers = data.reduce((acc, currentPlayer) => {
                    const existingPlayer = acc.find(p => p.name === currentPlayer.name);
                    if (existingPlayer) {
                        existingPlayer.twoPScored += currentPlayer.twoPScored;
                        existingPlayer.twoPShot += currentPlayer.twoPShot;
                        existingPlayer.threePScored += currentPlayer.threePScored;
                        existingPlayer.threePShot += currentPlayer.threePShot;
                        existingPlayer.ftScored += currentPlayer.ftScored;
                        existingPlayer.ftShot += currentPlayer.ftShot;
                        existingPlayer.points += currentPlayer.points;
                        existingPlayer.gameCount = (existingPlayer.gameCount || 0) + 1;
                    } else {
                        currentPlayer.gameCount = 1;
                        acc.push(currentPlayer);
                    }
                    return acc;
                }, []);

                setPlayers(updatedPlayers.map(p => {
                    const totalScored = p.twoPScored + p.threePScored + p.ftScored;
                    const totalShot = p.twoPShot + p.threePShot + p.ftShot;
                    const generalAccuracy = totalShot > 0 ? (totalScored / totalShot * 100).toFixed(2) : 0;

                    return {
                        ...p,
                        twoPPercent: ((p.twoPScored / p.twoPShot) * 100).toFixed(2) || 0,
                        threePPercent: ((p.threePScored / p.threePShot) * 100).toFixed(2) || 0,
                        ftPercent: ((p.ftScored / p.ftShot) * 100).toFixed(2) || 0,
                        ppg: (p.points / (p.gameCount || 1)).toFixed(2),
                        generalAccuracy
                    };
                }));
            } else {
                alert('Failed to fetch players');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching players');
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleLogin = (role) => {
        setUser({ username: role === 'coach' ? 'Coach' : 'Player', role }); // save user's data
    };

    const handleLogout = () => {
        setUser(null); // set it to null again
    };

    return (
        <div className="App">
            {!user ? (
                <Login onLogin={handleLogin} /> // appearing Login if user isnt connected
            ) : (
                <>
                    <h1>Welcome, {user.username}!</h1>
                    <div className="button-container">
                        <button className="new-stats-button" onClick={handleNewStatsClick}>New Stats</button>

                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>

                    {showForm && (
                    <form name="playerStatsForm" onSubmit={handleSubmit}>
                        <div className="fields-container">
                            <div className="field-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={player.name}
                                    onChange={handleChange}
                                    className="field full-width"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="field-group">
                                <input
                                    type="text"
                                    name="twoPScored"
                                    value={player.twoPScored}
                                    onChange={handleChange}
                                    className="field half-width"
                                    placeholder="2P Scored"
                                />
                                <span className="separator">/</span> {}
                                <input
                                    type="text"
                                    name="twoPShot"
                                    value={player.twoPShot}
                                    onChange={handleChange}
                                    className="field half-width"
                                    placeholder="2P Shot"
                                />
                            </div>
                            <div className="field-group">
                                <input
                                    type="text"
                                    name="threePScored"
                                    value={player.threePScored}
                                    onChange={handleChange}
                                    className="field half-width"
                                    placeholder="3P Scored"
                                />
                                <span className="separator">/</span> {}
                                <input
                                    type="text"
                                    name="threePShot"
                                    value={player.threePShot}
                                    onChange={handleChange}
                                    className="field half-width"
                                    placeholder="3P Shot"
                                />
                            </div>
                            <div className="field-group">
                                <input
                                    type="text"
                                    name="ftScored"
                                    value={player.ftScored}
                                    onChange={handleChange}
                                    className="field half-width"
                                    placeholder="FT Scored"
                                />
                                <span className="separator">/</span> {}
                                <input
                                    type="text"
                                    name="ftShot"
                                    value={player.ftShot}
                                    onChange={handleChange}
                                    className="field half-width"
                                    placeholder="FT Shot"
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>



                    )}

                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>2P Scored</th>
                                <th>2P Shot</th>
                                <th>2P%</th>
                                <th>3P Scored</th>
                                <th>3P Shot</th>
                                <th>3P%</th>
                                <th>FT Scored</th>
                                <th>FT Shot</th>
                                <th>FT%</th>
                                <th>Points</th>
                                <th>PPG</th>
                                <th>General Accuracy%</th> {}
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.name}>
                                    <td>
                                        {user.role === 'coach' && (
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                onClick={() => handleDelete(player.name)}
                                                style={{ cursor: 'pointer', color: 'red' }}
                                            />
                                        )}
                                    </td>
                                    <td>{player.name}</td>
                                    <td>{player.twoPScored}</td>
                                    <td>{player.twoPShot}</td>
                                    <td>{player.twoPPercent}</td>
                                    <td>{player.threePScored}</td>
                                    <td>{player.threePShot}</td>
                                    <td>{player.threePPercent}</td>
                                    <td>{player.ftScored}</td>
                                    <td>{player.ftShot}</td>
                                    <td>{player.ftPercent}</td>
                                    <td>{player.points}</td>
                                    <td>{player.ppg}</td>
                                    <td>{player.generalAccuracy}</td> {}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {players.length > 0 && (
                        <ChartComponent
                            data={{
                                labels: players.map(player => player.name),
                                values: players.map(player => player.ppg), // points
                                accuracyValues: players.map(player => player.generalAccuracy) // general accuracy
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
