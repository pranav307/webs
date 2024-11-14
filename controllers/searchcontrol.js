import { production } from "../model/production.models.js";

export const searchProduct = async (req, res) => {
    try {
        const { keyword } = req.params;

        // Validate the keyword format
        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                success: false,
                message: "Keyword is required and must be in string format"
            });
        }

        // Create regex for case-insensitive search
        const regEx = new RegExp(keyword, "i");
        const createSearchQuery = {
            $or: [
                { name: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx }
            ]
        };

        // Execute search
        const searchResults = await production.find(createSearchQuery);
        res.status(200).json({
            success: true,
            data: searchResults,
        });
    } catch (error) {
        // Log error to the console for debugging
        console.error("Search Error:", error);

        res.status(500).json({
            success: false,
            message: "Error processing search request",
        });
    }
};
