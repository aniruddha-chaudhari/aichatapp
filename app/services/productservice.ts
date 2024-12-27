import supabase from "@/config/supabaseConfig";

export interface Product {
    id: string;
    category: string;
    description: string;
    image_url: string;
    name: string;
    price: number;
    rating: number;
}

const getproducts = async (): Promise<Product[]> => {
    try {
        const { data, error } = await supabase
            .from("menu_items")
            .select("*");

        if (error) {
            console.error("Error fetching products:", error.message);
            throw new Error(error.message);
        }

        if (!data) {
            return [];
        }

        return data.map(item => ({
            ...item,
            id: item.id.toString()
        }));
    } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
    }
}

export default getproducts;