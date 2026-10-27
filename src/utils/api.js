// One shared Fetch API helper keeps every page on the same backend URL.
const API_URL = "http://localhost:3001";
export async function apiRequest(resource, options = {}) {
    const { id, body, ...requestOptions } = options;
    const url = `${API_URL}/${resource}${id !== undefined && id !== null ? `/${id}` : ""}`;
    let response;
    try {
        response = await fetch(url, {
            ...requestOptions,
            headers: { "Content-Type": "application/json", ...(requestOptions.headers || {}) },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    }
    catch {
        throw new Error(`Cannot reach the API server at ${API_URL}. Keep a second terminal running: npm run api`);
    }
    if (!response.ok) {
        let detail = "";
        try {
            detail = (await response.json()).message || "";
        }
        catch { /* response was not JSON */ }
        throw new Error(detail || `API request failed (${response.status}) for ${resource}. Check the API server and endpoint.`);
    }
    if (response.status === 204)
        return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}
