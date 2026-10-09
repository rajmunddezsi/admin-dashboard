import prisma from "@/lib/prisma";

async function main() {
  await prisma.product.deleteMany();

  const result = await prisma.product.createMany({
    data: [
      {
        title: "MacBook Air M4",
        description: "Lightweight laptop with Apple M4 chip",
        category: "laptops",
        price: 1199,
        rating: 4.8,
        availabilityStatus: "In Stock",
      },
      {
        title: "Lenovo ThinkPad X1 Carbon",
        description: "Business ultrabook with durable lightweight design",
        category: "laptops",
        price: 1649,
        rating: 4.6,
        availabilityStatus: "In Stock",
      },
      {
        title: "Dell XPS 13",
        description: "Compact premium laptop with high-resolution display",
        category: "laptops",
        price: 1399,
        rating: 4.5,
        availabilityStatus: "Low Stock",
      },
      {
        title: "iPhone 17 Pro",
        description: "Premium smartphone with advanced camera system",
        category: "smartphones",
        price: 1099,
        rating: 4.9,
        availabilityStatus: "In Stock",
      },
      {
        title: "Samsung Galaxy S26",
        description: "High-end Android smartphone with AMOLED display",
        category: "smartphones",
        price: 999,
        rating: 4.7,
        availabilityStatus: "In Stock",
      },
      {
        title: "Google Pixel 11 Pro",
        description:
          "Android smartphone focused on photography and AI features",
        category: "smartphones",
        price: 899,
        rating: 4.6,
        availabilityStatus: "Low Stock",
      },
      {
        title: "Sony WH-1000XM6",
        description: "Wireless over-ear headphones with noise cancellation",
        category: "audio",
        price: 449,
        rating: 4.8,
        availabilityStatus: "In Stock",
      },
      {
        title: "AirPods Pro",
        description: "Wireless earbuds with active noise cancellation",
        category: "audio",
        price: 249,
        rating: 4.7,
        availabilityStatus: "In Stock",
      },
      {
        title: "LG UltraGear 27",
        description: "27-inch gaming monitor with high refresh rate",
        category: "monitors",
        price: 549,
        rating: 4.4,
        availabilityStatus: "In Stock",
      },
      {
        title: "Logitech MX Master 4",
        description: "Wireless productivity mouse with ergonomic design",
        category: "accessories",
        price: 129,
        rating: 4.7,
        availabilityStatus: "Out of Stock",
      },
    ],
  });

  console.log(`Seeded ${result.count} products.`);
}

main()
  .catch((err) => {
    console.log(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
