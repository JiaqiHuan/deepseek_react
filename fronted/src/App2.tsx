import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SteelData {
  id: number;
  time: string;
  time_minutes: number;
  inlet_temp_c: number;
  heat_power_kN: number;
  co_concentration_percent: number;
  strip_thickness_mm: number;
  strip_length_mm: number;
  outlet_temp_c: number;
  carbon_content_percent: number;
  so2_concentration_mg_m3: number;
  alpha_t: number;
}

const SteelDataDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(
    format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [data, setData] = useState<SteelData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'outlet_temp_c',
    'inlet_temp_c'
  ]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/steel-data', {
        params: {
          start: startDate,
          end: endDate
        }
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching steel data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const metricOptions = [
    { key: 'inlet_temp_c', label: 'Inlet Temp (°C)' },
    { key: 'outlet_temp_c', label: 'Outlet Temp (°C)' },
    { key: 'heat_power_kN', label: 'Heat Power (kN)' },
    { key: 'co_concentration_percent', label: 'CO Concentration (%)' },
    { key: 'carbon_content_percent', label: 'Carbon Content (%)' },
    { key: 'so2_concentration_mg_m3', label: 'SO2 Concentration (mg/m³)' },
  ];

  return (
    <div className="steel-data-dashboard">
      <h1>Steel Production Data</h1>
      
      <div className="date-controls">
        <div>
          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <button onClick={fetchData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="metric-selector">
        <h3>Select Metrics to Display:</h3>
        {metricOptions.map(option => (
          <label key={option.key}>
            <input
              type="checkbox"
              checked={selectedMetrics.includes(option.key)}
              onChange={() => handleMetricToggle(option.key)}
            />
            {option.label}
          </label>
        ))}
      </div>

      {data.length > 0 ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(time) => format(new Date(time), 'MMM dd HH:mm')}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(time) => format(new Date(time), 'yyyy-MM-dd HH:mm:ss')}
              />
              <Legend />
              
              {selectedMetrics.includes('inlet_temp_c') && (
                <Line
                  type="monotone"
                  dataKey="inlet_temp_c"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Inlet Temp (°C)"
                />
              )}
              
              {selectedMetrics.includes('outlet_temp_c') && (
                <Line
                  type="monotone"
                  dataKey="outlet_temp_c"
                  stroke="#82ca9d"
                  name="Outlet Temp (°C)"
                />
              )}
              
              {selectedMetrics.includes('heat_power_kN') && (
                <Line
                  type="monotone"
                  dataKey="heat_power_kN"
                  stroke="#ff7300"
                  name="Heat Power (kN)"
                />
              )}
              
              {selectedMetrics.includes('co_concentration_percent') && (
                <Line
                  type="monotone"
                  dataKey="co_concentration_percent"
                  stroke="#413ea0"
                  name="CO Concentration (%)"
                />
              )}
              
              {selectedMetrics.includes('carbon_content_percent') && (
                <Line
                  type="monotone"
                  dataKey="carbon_content_percent"
                  stroke="#ff0000"
                  name="Carbon Content (%)"
                />
              )}
              
              {selectedMetrics.includes('so2_concentration_mg_m3') && (
                <Line
                  type="monotone"
                  dataKey="so2_concentration_mg_m3"
                  stroke="#00ffff"
                  name="SO2 Concentration (mg/m³)"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        !isLoading && <div>No data available for the selected time range.</div>
      )}
    </div>
  );
};

export default SteelDataDashboard;