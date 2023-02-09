import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export default function Home() {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <Chart
        type="bar"
        options={{
          devicePixelRatio: 1,
          scales: { },
        }}
        data={{
          labels: ["Sleep", "Read", "Workout", "Journal", "Dulce", "Food", "Socialize", "Clean", "Hobby", "Goal"],
          datasets: [{
            label: "Checklist Items Vs. Times Completed Today (Fake Data)",
            data: [10, 12, 8, 9, 10, 9, 6, 13, 8, 12],
            borderColor: '#323233',
            backgroundColor: '#1db855',
            borderWidth: 1.5,
          }],
        }}
      />
      </div>
  );
}