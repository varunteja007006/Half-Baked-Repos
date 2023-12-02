const URL = "http://localhost:3000";

export async function getData(path) {
  const resp = await fetch(`${URL}/games`);
  const data = await resp.json();
  return data;
}
