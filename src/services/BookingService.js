import { Client, ID, Databases, Query } from "appwrite";  // add Databases, Query
import conf from "../conf/conf";

class Booking {
    client = new Client();
    booking_table;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.projectURL)
            .setProject(conf.projectId);
        this.booking_table = new Databases(this.client); // use Databases
    }

    async addBooking({ userId, customerName, phone, address, serviceName, problemDescription, bookingStatus, imageId, price }) {
        try {
            return await this.booking_table.createDocument(
                conf.databaseId,
                conf.tableId,
                ID.unique(),
                { userId, customerName, phone, address, serviceName, problemDescription, bookingStatus, imageId, price }
            );
        } catch (error) {
            throw error;
        }
    }

    // ✅ existing method — bookings for one user
    async getBookings(userId) {
        try {
            return await this.booking_table.listDocuments(
                conf.databaseId,
                conf.tableId,
                [Query.equal("userId", userId)]
            );
        } catch (error) {
            throw error;
        }
    }

    // ✅ new — admin: get every booking, newest first
    async getAllBookings() {
        try {
            return await this.booking_table.listDocuments(
                conf.databaseId,
                conf.tableId,
                [
                    Query.orderDesc("$createdAt"),
                    Query.limit(100)
                ]
            );
        } catch (error) {
            throw error;
        }
    }

    // ✅ new — admin: change Pending / Completed / Cancelled
    async updateBookingStatus(documentId, bookingStatus) {
        try {
            return await this.booking_table.updateDocument(
                conf.databaseId,
                conf.tableId,
                documentId,
                { bookingStatus }
            );
        } catch (error) {
            throw error;
        }
    }
}

const booking = new Booking();
export default booking;
