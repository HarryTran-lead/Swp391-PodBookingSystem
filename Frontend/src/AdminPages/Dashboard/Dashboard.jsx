// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Dashboard.css'; // Import custom CSS file

const Dashboard = () => {
    const [summary, setSummary] = useState({ totalBookings: 0, totalRevenue: 0, activeUsers: 0 });
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("daily");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summaryResponse = await axios.get('https://localhost:7257/api/dashboard/summary');
                setSummary(summaryResponse.data);

                await fetchRevenueData();
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [filter]);

    const fetchRevenueData = async () => {
        try {
            setLoading(true);
            let url = 'https://localhost:7257/api/dashboard/revenue-by-date';
            if (filter === "monthly") url += '?filter=monthly';
            else if (filter === "yearly") url += '?filter=yearly';

            const revenueResponse = await axios.get(url);
            setRevenueData(revenueResponse.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Failed to fetch revenue data');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    if (loading) return <Spinner animation="border" variant="primary" />;

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container mt-4 dashboard-container">
            <h1 className="text-center dashboard-title">Dashboard Summary</h1>
            <Row className="mt-4">
                <Col md={4}>
                    <Card className="dashboard-card total-bookings-card text-center">
                        <Card.Body>
                            <Card.Title>Total Bookings</Card.Title>
                            <Card.Text>{summary.totalBookings}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="dashboard-card total-revenue-card text-center">
                        <Card.Body>
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(summary.totalRevenue)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="dashboard-card active-users-card text-center">
                        <Card.Body>
                            <Card.Title>Active Users</Card.Title>
                            <Card.Text>{summary.activeUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="mt-5">Revenue by Date</h2>

            {/* Filter Selection */}
            <Form.Group as={Row} className="mb-3" controlId="filterSelect">
                <Form.Label column sm="2">Filter by:</Form.Label>
                <Col sm="4">
                    <Form.Select className="dashboard-filter" value={filter} onChange={handleFilterChange}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Dashboard;
