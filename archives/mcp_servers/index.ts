import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const OPEN_WEATHER_API_KEY = "";

const server = new McpServer({
  name: "Weather Server",
  version: "1.0.0",
});

server.tool(
  "get-weather",
  "Tool to get the weather of a city",
  {
    city: z.string().describe("The name of the city to get the weather for"),
  },
  async ({ city }) => {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${OPEN_WEATHER_API_KEY}`
    );
    const geoLocations = await res.json();
    const geoLocation = geoLocations?.[0];

    if (geoLocation && geoLocation?.["lat"] && geoLocation?.["lon"]) {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${geoLocation?.["lat"]}&lon=${geoLocation?.["lon"]}&appid=${OPEN_WEATHER_API_KEY}`
      );
      const weatherInfo = await res.json();
      const { main, description } = weatherInfo?.["current"]?.["weather"]?.[0];
      const weather = `${main} and it happens to be as following ${description}`;

      return {
        content: [
          {
            type: "text",
            text: `The weather in ${city} is ${weather}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Unable to find the weather info!!`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
