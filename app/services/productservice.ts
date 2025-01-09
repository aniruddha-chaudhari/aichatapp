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

const getproducts = async (retryCount = 3): Promise<Product[]> => {
    try {
        for (let i = 0; i < retryCount; i++) {
            try {
                const { data, error } = await supabase
                    .from("menu_items")
                    .select("*");

                if (error) {
                    console.error(`Attempt ${i + 1}: Error getting products:`, error.message);
                    if (i === retryCount - 1) throw new Error(error.message);
                    continue;
                }

                if (!data) {
                    return [];
                }

                return data.map(item => ({
                    ...item,
                    id: item.id.toString()
                }));
            } catch (innerError) {
                if (i === retryCount - 1) throw innerError;
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
            }
        }
        throw new Error("Max retry attempts reached");
    } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
    }
}

export default getproducts;