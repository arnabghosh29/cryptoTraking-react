import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { Box, CircularProgress, Button, Stack } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CoinInfo = ({ coinId, currency }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(1);

    const fetchChartData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(HistoricalChart(coinId, days, currency));
            setChartData(data.prices);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!coinId) return;
        fetchChartData();
    }, [coinId, days, currency]);

    // Determine line color based on price trend
    const lineColor =
        chartData.length > 1 && chartData[chartData.length - 1][1] >= chartData[0][1]
            ? "#0ECB81" // green if price increased
            : "#FF5733"; // red if price decreased

    const lineChart = {
        labels: chartData.map((coin) => {
            const date = new Date(coin[0]);
            return days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
        }),
        datasets: [
            {
                data: chartData.map((coin) => coin[1]),
                label: `Price (Past ${days} ${days === 1 ? "Day" : "Days"}) in ${currency}`,
                borderColor: lineColor,
                fill: true,
                backgroundColor: lineColor + "33", // semi-transparent
            },
        ],
    };

    const timeframes = [
        { label: "24h", value: 1 },
        { label: "30d", value: 30 },
        { label: "3m", value: 90 },
        { label: "1y", value: 365 },
    ];

    return (
        <Box sx={{ width: "100%", mt: 3 }}>
            {loading ? (
                <CircularProgress sx={{ display: "block", mx: "auto" }} />
            ) : (
                <>
                    <Line data={lineChart} />

                    {/* Buttons below chart */}
                    <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                        {timeframes.map((tf) => (
                            <Button
                                key={tf.label}
                                variant={days === tf.value ? "contained" : "outlined"}
                                sx={{
                                    color: days === tf.value ? "gold" : "white",
                                    borderColor: "gold",
                                    fontWeight: "bold",
                                }}
                                onClick={() => setDays(tf.value)}
                            >
                                {tf.label}
                            </Button>
                        ))}
                    </Stack>
                </>
            )}
        </Box>
    );
};

export default CoinInfo;
