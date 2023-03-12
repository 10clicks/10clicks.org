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
      // parse the data query parameter into an array of numbers
      const parsedData = data.split(",").map((x) => parseInt(x, 10));
      return renderChart({
        type: "line",
        // set tick font size

        options: {
          scales: {
            y: {
              ticks: {
                font: {
                  size: 30
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 20
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 30
                }
              }
            }
          }
        },
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [{
            label: "Your Total Clicks per Day",
            data: parsedData,
            borderColor: '#323233',
            backgroundColor: '#1db855',
            borderWidth: 1.5,
          }]
        },
        height: 600,
      })
    } catch (e) {
      return new Response("Unable to process request", { status: 400 });
    }
  }
}