const conf = {
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    projectURL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectName: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    servicesCollectionId: String(import.meta.env.VITE_APPWRITE_SERVICES_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tableId: String(import.meta.env.VITE_APPWRITE_TABLES_ID) 
}

export default conf;
