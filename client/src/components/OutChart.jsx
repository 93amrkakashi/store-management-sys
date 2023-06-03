import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function OutChart({ dataOut }) {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataOut}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="OUT" />
          <Tooltip />
          <Legend />
          <Bar dataKey="OUT" fill="#E27396" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OutChart;
