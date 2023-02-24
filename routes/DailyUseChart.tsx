import { renderChart } from "$fresh_charts/mod.ts";
import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    return renderChart({
      type: "bar",
      options: {
        scales: { },
      },
      data: {
        labels: ["Sleep", "Read", "Workout", "Journal", "Dulce", "Food", "Socialize", "Clean", "Hobby", "Goal"],
        datasets: [{
          label: "Checklist Items Vs. Times Completed Today (Fake Data)",
          data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
          borderColor: '#323233',
          backgroundColor: '#1db855',
          borderWidth: 1.5,
        }]
      },
    })
  }
}