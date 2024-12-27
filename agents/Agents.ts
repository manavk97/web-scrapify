import { USER_AGENTS } from "./CONSTANTS";

export class Agents {
    constructor() {}

    getAgent(): string {
        return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    }
}