import path from "path";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);

// Parse and validate the days to run
const daysToRun = (() => {
  const dayId = args[0];

  if (!dayId) {
    // Run all days (1 to 25)
    return Array.from({ length: 25 }, (_, i) => formatAndValidateDay(i + 1));
  }

  try {
    // Run specific days passed as a comma-separated list
    const days = dayId.split(",");
    return days.map((day) => formatAndValidateDay(parseInt(day, 10)));
  } catch (error) {
    console.error(`Invalid input for days: ${dayId}`, error);
    process.exit(1); // Exit with an error code
  }
})();

if (daysToRun.length > 0) {
  for (const day of daysToRun) {
    await runDay(day);
  }
}

// Dynamically run the solution for the given day
async function runDay(day: string) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.resolve(path.dirname(__filename), "../");
  const filePath = path.join(__dirname, `day${day}`);
  try {
    const dayImport = await import(filePath);

    console.log(`Running day ${day}...`);
    await dayImport.run();
    console.log(`Finished running day ${day}\n`);
  } catch (error) {

    // handle errors when day is not found
    if (error instanceof Error && 'code' in error && error.code === "ERR_MODULE_NOT_FOUND") {
      console.error(`Day ${day} not found`);
      return;
    }
    console.error(`Failed to run day ${day}:`, error);
  }
}

function formatAndValidateDay(day: number): string {
  if (isNaN(day) || day < 1 || day > 25) {
    throw new Error(`Day id must be a number between 1 and 25, received: ${day}`);
  }

  return day < 10 ? `0${day}` : day.toString();
}