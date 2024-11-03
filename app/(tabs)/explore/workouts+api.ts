/**
 * Saves the workout in the users records of exercises
 * @param request
 * @returns
 */
export async function Post(request: Request) {
  const body: any = await request.json();

  // Write Code here ...
  return Response.json({ message: "Save Workout" });
}
