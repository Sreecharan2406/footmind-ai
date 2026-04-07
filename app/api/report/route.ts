export async function POST(req: Request) {
  const { passes, accuracy, turnovers } = await req.json();

  return Response.json({
    report: `
Match Summary:
Team showed decent possession but struggled in midfield.

Strengths:
- Passing volume: ${passes}
- Structured gameplay

Weaknesses:
- Turnovers: ${turnovers}
- Accuracy: ${accuracy}%

Recommendation:
Improve midfield control and reduce risky passes.
`,
  });
}