// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap'; 
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [summary, setSummary] = useState({ totalBookings: 0, totalRevenue: 0, activeUsers: 0 });
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summaryResponse = await axios.get('https://localhost:7257/api/dashboard/summary');
                setSummary(summaryResponse.data);

                const revenueResponse = await axios.get('https://localhost:7257/api/dashboard/revenue-by-date');
                console.log(revenueResponse)
                setRevenueData(revenueResponse.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) return <Spinner animation="border" variant="primary" />;

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container mt-4">
            <h1 className="text-center">Dashboard Summary</h1>
            <Row className="mt-4">
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Bookings</Card.Title>
                            <Card.Text>{summary.totalBookings}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.totalRevenue)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Active Users</Card.Title>
                            <Card.Text>{summary.activeUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="mt-5">Revenue by Date</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Dashboard;
