import supertest from "supertest";
import { app } from "../app";

const regularTest = async (endpoint, body, expectedCode) => {
    const res = await supertest(app).post(endpoint).send(body);
    expect(res.statusCode).toBe(expectedCode);
}

describe("Acceptance testing", () => {

    describe("Auth", () => {
        it("sigin", async () => regularTest("/users/signin", {usernameOrEmail: "test", pwd: "test"}, 200))

        //async () => regularTest("/users", {username: "salut", pwd: "salut", email: "salut@salut.com"}, 201)
        it("signUp", async () => regularTest("/users", {username: "salut2", pwd: "salut2", email: "salut2@salut.com"}, 201))
    })

    describe("game", () => {

    })
})