interface ProductField {
    name: string;
    title: string;
    type: string;
    validation?: (Rule: any) => any;
    description?: string;
    options?: any;
    initialValue?: boolean | number | string;
    of?: Array<{ type: string }>;
}

interface ProductSchema {
    name: string;
    title: string;
    type: string;
    fields: ProductField[];
}

const productSchema: ProductSchema = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "images",
            title: "Product Images",
            type: "array",
            of: [{ type: "image" }],
            description: "Upload product images. Not required.",
        },
        {
            name: "name",
            title: "Product Name",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 200,
            },
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            description: "Brief details about the product.",
        },
        {
            name: "tag",
            title: "Tag",
            type: "string",
            description: "E.g., trending, latest, or any custom tag.",
        },
        {
            name: "highlyRated",
            title: "Highly Rated",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        },
        {
            name: "sizes",
            title: "Available Sizes",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: ["XS", "S", "M", "L", "XL", "XXL"],
            },
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            description: "Mens, Womens, Kids, etc.",
        },
        {
            name: "materialMade",
            title: "Material Made",
            type: "string",
            description: "Specify the materials used (e.g., leather, cotton, polyester).",
        },
    ],
};

export default productSchema;
