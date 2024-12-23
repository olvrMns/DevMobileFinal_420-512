import supertest from "supertest";
import { app } from "../app";

describe("Acceptance testing", () => {

    describe("Auth", () => {
        it("login", async () => {
            const res = (await supertest(app).post("/users/signin")).setEncoding({usernameOrEmail: "test", pwd: "test"});
        })

        // it("signUp", async () => {
            
        // })
    })

    describe("game", () => {

    })
})