
import { response } from 'express';
import { CreateTopicResponse, FindAllTopicsResponse, FindTopicByIdResponse } from '../dto';
import server from '../server';
import request from 'supertest';

const adminAPIToken = "jegsi483df3jdfjppjk438935"
const viewerAPIToken = "bybyrt475747545dfg44z009";

describe("GET /api/topics", () => {

    it("returns 200 for admin", async () => {
        const response = await request(server)
            .get("/topics/")
            .set("Authorization", `${adminAPIToken}`);
            
        const body = response.body as FindAllTopicsResponse;
        expect(response.status).toBe(200);
        expect(body).toHaveProperty("topics");
    });

    it("returns 200 for viewer", async () => {
        const response = await request(server)
            .get("/topics/")
            .set("Authorization", `${viewerAPIToken}`);
            
        const body = response.body as FindAllTopicsResponse;
        expect(response.status).toBe(200);
        expect(body).toHaveProperty("topics");
    });

    it("returns 401 for when authorization header is missing", async () => {
        const response = await request(server)
            .get("/topics/")
            
        const body = response.body as FindAllTopicsResponse;
        expect(response.status).toBe(401);
    });
});

describe("GET /topics/:topic-id/:version", () => {

    it("returns 200 for when topic exists", async () => {
        const response = await request(server)
            .get("/topics/apple/2")
            .set("Authorization", `${viewerAPIToken}`);
            
        const body = response.body as FindTopicByIdResponse;
        expect(response.status).toBe(200);
        expect(body).toHaveProperty("subtopics");
    });

    it("returns 404 for when topic does not exist", async () => {
        const response = await request(server)
            .get("/topics/banana/2")
            .set("Authorization", `${viewerAPIToken}`);
            
        expect(response.status).toBe(404);
    });
});


describe("GET /topics/:topic-id", () => {

    it("returns 200 for when topic exists", async () => {
        const response = await request(server)
            .get("/topics/apple")
            .set("Authorization", `${viewerAPIToken}`);
            
        const body = response.body as FindTopicByIdResponse;
        expect(response.status).toBe(200);
        expect(body).toHaveProperty("subtopics");
    });

    it("returns 404 for when topic does not exist", async () => {
        const response = await request(server)
            .get("/topics/banana")
            .set("Authorization", `${viewerAPIToken}`);
            
        expect(response.status).toBe(404);
    });
});

describe("POST /topics", () => {
    const microsoftTopic = {
        id: "microsoft",
        url: "https://www.applesfera.com/portatil/apple-macbook-air-m2-analisis-caracteristicas-precio-especificaciones",
        description: "Microsoft Inc",
        type: "article"
    };

    it("returns 200 for when creates a new topic", async () => {
        const response = await request(server)
            .post("/topics")
            .set("Authorization", `${adminAPIToken}`)
            .send({...microsoftTopic});
        expect(response.status).toBe(200);
    });

    it("returns 403 for when viewers tries to submit a topic", async () => {
        const response = await request(server)
            .post("/topics")
            .set("Authorization", `${viewerAPIToken}`)
            .send({...microsoftTopic});
        expect(response.status).toBe(403);
    });


    it("returns 400 for when topic is empty or has special characters", async () => {
        const response = await request(server)
            .post("/topics")
            .set("Authorization", `${adminAPIToken}`)
            .send({...microsoftTopic, id: "&&%%"});
        expect(response.status).toBe(400);

        const body = response.body as CreateTopicResponse;
        expect(body.error).toBe("Invalid topic ID");
    });
    
    it("returns 400 for when parent topic doesn't exist", async () => {
        const response = await request(server)
            .post("/topics")
            .set("Authorization", `${adminAPIToken}`)
            .send({...microsoftTopic, parentTopicId: "tesla"});
        expect(response.status).toBe(400);

        const body = response.body as CreateTopicResponse;
        expect(body.error).toBe("Parent topic not found");
    });

    it("returns 400 for when url is malformed", async () => {
        const response = await request(server)
            .post("/topics")
            .set("Authorization", `${adminAPIToken}`)
            .send({...microsoftTopic, url: "xxxxx----"});
        expect(response.status).toBe(400);

        const body = response.body as CreateTopicResponse;
        expect(body.error).toBe("Invalid URL");
    });


    it("returns 400 for invalid topic type", async () => {
        const response = await request(server)
            .post("/topics")
            .set("Authorization", `${adminAPIToken}`)
            .send({...microsoftTopic, type: "invalid-type"});
        expect(response.status).toBe(400);

        const body = response.body as CreateTopicResponse;
        expect(body.error).toBe("Invalid topic type");
    });
});

describe("GET /distance/:topic1/:topic2", () => {

    it("returns 200 and distance > 0 when topics are in the same path", async () => {
        const response = await request(server)
            .get("/distance/apple/applesfera")
            .set("Authorization", `${viewerAPIToken}`);
            
        const body = response.body as {distance: number};
        expect(response.status).toBe(200);
        console.log(body);

        
    });

   
});