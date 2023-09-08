export default function ProblemSolvingTest() {
  // Question number 3
  function timeConversion(value: string): string {
    const isPM = value.includes("PM");
    const timeParts = value.replace(/(AM|PM)/, "").split(":");
    let hours = parseInt(timeParts[0], 10);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const militaryTime = `${hours.toString().padStart(2, "0")}:${timeParts[1]}:${timeParts[2]}`;
    return militaryTime;
  }
  //
  return (
    <div className="flex flex-col">
      <div>
        <div>Answer Number 3</div>
        <div>{timeConversion("07:05:45PM")}</div>
      </div>
    </div>
  );
}
