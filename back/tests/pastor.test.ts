import request from "supertest";
import app from "../src/config/server";

describe("Pastor API", () => {
  it("GET /pastors/:id → should return pastor details", async () => {
    const response = await request(app).get("/pastors/d097d9dc-5be7-4430-898a-394f79f20cdd");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "d097d9dc-5be7-4430-898a-394f79f20cdd");
    expect(response.body).toHaveProperty("name", "Bruno Panelli");
  });

  it("GET /pastors/:id → should return 404 for invalid ID", async () => {
    const response = await request(app).get("/pastors/non-existent-id");

    expect(response.status).toBe(404);
  });

	it("GET /pastors/:id/impact-map → should return paginated engagements", async () => {
    const response = await request(app).get("/pastors/d097d9dc-5be7-4430-898a-394f79f20cdd/impact-map?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("engagements");
    expect(response.body.engagements.length).toBeGreaterThan(0);
  });

  it("GET /pastors/:id/impact-map → should limit engagements to 300", async () => {
    const response = await request(app).get("/pastors/d097d9dc-5be7-4430-898a-394f79f20cdd/impact-map?limit=500");

    expect(response.status).toBe(200);
    expect(response.body.engagements.length).toBeLessThanOrEqual(300);
  });
});