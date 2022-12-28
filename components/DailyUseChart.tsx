import {
  BarChart,
  ChoroplethChart,
  DonutChart,
  LineChart,
  ScatterPlotChart,
} from "d3nodata";
export default function DailyUseChart() {
  return (
    <div>
      <BarChart 
        data = {[
          {x: "Sleep", y: 8},
          {x: "Read", y: 2},
          {x: "Workout", y: 1},
          {x: "Journal", y: 1},
          {x: "Dulce", y: 1},
          {x: "Food", y: 1},
          {x: "Socialize", y: 1},
          {x: "Clean", y: 1},
          {x: "Hobby", y: 1},
          {x: "Goal", y: 1},
        ]}
        width = {500}
        height = {500}
        setTitle="Daily Use"
        datasets={[{
          label:"Daily Use",
          color:"Green",
          data:[
            {x: "Sleep", y: 8},
            {x: "Read", y: 2},
            {x: "Workout", y: 1},
            {x: "Journal", y: 1},
            {x: "Dulce", y: 1},
            {x: "Food", y: 1},
            {x: "Socialize", y: 1},
            {x: "Clean", y: 1},
            {x: "Hobby", y: 1},
            {x: "Goal", y: 1},
          ]
        }]}
      />
    </div>
  )
}