export async function POST(req: Request) {
  const body = await req.json();

  const { passes, accuracy, turnovers, question } = body;

  let message = "";

  if (question?.toLowerCase().includes("improve")) {
    message = `
Based on your performance:

• Turnovers are slightly high — tighten midfield control  
• Passing accuracy (${accuracy}%) needs improvement  
• Overall structure is decent  

👉 Focus on reducing risk and improving build-up play.
`;
  } else if (turnovers > 30) {
    message = "You're losing possession too frequently.";
  } else {
    message = "Your performance is stable.";
  }

  return Response.json({ message });
}