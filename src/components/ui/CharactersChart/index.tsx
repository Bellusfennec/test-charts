import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartData } from "../../../types";
import { useMemo } from "react";
import { stringToColorCode } from "../../../utils/color";

interface CharacterChartProps {
  data: ChartData[];
}

export const CharacterChart = (props: CharacterChartProps) => {
  const { data } = props;
  const sum = useMemo(() => data.reduce((acc, el) => acc + el.value, 0), [data]);
  const COLORS = useMemo(() => data.map((item) => stringToColorCode(item.name)), [data]);

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: "#ffff", padding: "5px", border: "1px solid #cccc" }}>
          <p>
            {`${payload[0].name}: ${payload[0].value}`} ({`${((payload[0].value * 100) / sum).toFixed(2)}%`})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} cx="50%" cy="50%" label outerRadius={150} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={renderCustomTooltip} />
    </PieChart>
  );
};
