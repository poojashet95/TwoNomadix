import api from "../api/api";

export async function getDestinations(search = "") {
  const response = await api.get("/destinations", {
    params: search ? { search } : {},
  });
  return response.data;
}

export async function getDestination(name) {
  const response = await api.get(`/destinations/${encodeURIComponent(name)}`);
  return response.data;
}

export async function getActivities(name) {
  const response = await api.get(
    `/destinations/${encodeURIComponent(name)}/activities`
  );
  return response.data;
}

export async function getRecommendations(name) {
  const response = await api.get(
    `/destinations/${encodeURIComponent(name)}/recommendations`
  );
  return response.data;
}
