import { useState, useEffect } from "react";
import addServices from "../services/AddServices";
import { useSelector } from "react-redux";

const useServiceDetails = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchQuery = useSelector((state) => state.search.query);

    const fetchServices = async () => {
        try {
            const resp = await addServices.getServices();
            setServices(resp.documents);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [])

    // const filteredServices = services.filter((s) =>
    //     s.title?.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const filteredServices = services.filter((s) => {
        const query = searchQuery.toLowerCase();
        return (
            s.title?.toLowerCase().includes(query) ||
            s.description?.toLowerCase().includes(query) ||
            s.category?.toLowerCase().includes(query)
        );
    });

    return { services, loading, filteredServices }
}
export default useServiceDetails;