import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthServices {
    client = this.client;
    account;

    constructor() {
        this.client = new Client()
            .setProject(conf.projectId)
            .setEndpoint(conf.projectURL)
        this.account = new Account(this.client)
    }

    async createUser({ email, password, name }) {
        try {
            await this.account.create(ID.unique(), email, password, name)
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }
}

const authService = new AuthServices();
export default authService;