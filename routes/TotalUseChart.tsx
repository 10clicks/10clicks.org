import { renderChart } from "$fresh_charts/mod.ts";
import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request) {
    // extract query parameters from the url
    const url = new URL(req.url);
    const data = url.searchParams.get("data");
    if (!data) {
      return new Response("Missing data query parameter", { status: 400 });
    }
    try {
      const labels = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        // get the day name shortened
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        labels.push(day);
      }

      // parse the data query parameter into an array of numbers
      const parsedData = data.split(",").map((x) => parseInt(x, 10));

      return renderChart({
        type: "bar",
        options: {
          scales: { 
            y: {
              ticks: {
                font: {
                  size: 15
                }
              }
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 15
                }
              }
            }
          }
        },
        data: {
          labels,
          datasets: [{
            label: "Total Clicks Over the Past 7 Days",
            data: parsedData,
            borderColor: '#323233',
            backgroundColor: '#1db855',
            borderWidth: 1.5,
          }]
        },
      })
    } catch (e) {
      return new Response("Unable to process request", { status: 400 });
    }
  }
}