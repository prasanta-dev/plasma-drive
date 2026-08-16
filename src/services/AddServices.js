import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

class AddServices {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.projectURL)
            .setProject(conf.projectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getServices() {
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.servicesCollectionId,
                [
                    Query.equal("active", true)
                ]
            );
        } catch (error) {
            console.log(error);
        }
    }

    // ✅ new — admin: every service, active or not
    async getAllServices() {
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.servicesCollectionId,
                [
                    Query.orderDesc("$createdAt"),
                    Query.limit(100)
                ]
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getSingleService(slug) {
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.servicesCollectionId,
                [
                    Query.equal("slug", slug)
                ]
            );
        } catch (error) {
            console.log(error);
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.bucketId,
            fileId
        );
    }

    // ✅ new — admin: upload a service image, returns Appwrite file object ($id is the fileId)
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    // ✅ new — admin: remove an uploaded image (e.g. if create fails after upload)
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(conf.bucketId, fileId);
        } catch (error) {
            throw error;
        }
    }

    // ✅ new — admin: create a service document
    async addService({ title, slug, description, category, price, imageId, active = true }) {
        try {
            return await this.database.createDocument(
                conf.databaseId,
                conf.servicesCollectionId,
                ID.unique(),
                { title, slug, description, category, price, imageId, active }
            );
        } catch (error) {
            throw error;
        }
    }

    // ✅ new — admin: toggle a service active/inactive
    async updateServiceActive(documentId, active) {
        try {
            return await this.database.updateDocument(
                conf.databaseId,
                conf.servicesCollectionId,
                documentId,
                { active }
            );
        } catch (error) {
            throw error;
        }
    }
}

const addServices = new AddServices();

export default addServices;
