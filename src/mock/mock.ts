export const IMAGES_LIST = [
    "https://res.cloudinary.com/ybmedia/image/upload/c_crop,h_1333,w_2000,x_0,y_0/c_fill,f_auto,h_1200,q_auto,w_1600/v1/m/4/2/422c917a5d3d306a7b992a5dd256dbe25916d183/20-essential-tips-successful-road-trip.jpg",
    "https://media.cntraveller.com/photos/66dab99cca79963e5f03ff9d/4:3/w_4256,h_3192,c_limit/GettyImages-1588291549.jpg",
    "https://imageio.forbes.com/specials-images/imageserve//62bdd4a21a6dc599d18bca9b/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    "https://www.wayfairertravel.com/hs-fs/hubfs/Imported%20sitepage%20images/shutterstock_2398908619_fbl654.jpg?width=1920&height=590&name=shutterstock_2398908619_fbl654.jpg",
    "https://www.travelanddestinations.com/wp-content/uploads/2020/02/Travel-Destinations.jpg",
    "https://static.independent.co.uk/2024/01/05/15/newFile-6.jpg",
    "https://lonelyplanetstatic.imgix.net/marketing/2025/global_nav/nav_bit.jpg?auto=format,compress&q=72",
    "https://d1bv4heaa2n05k.cloudfront.net/user-images/1444124382002/shutterstock-59760706small_destinationMain_1444124438669.jpeg",
    "https://media.iatitravelinsurance.com/wp-content/uploads/sites/2/2023/08/03165238/banner.jpg",
    "https://media.worldnomads.com/Explore/europe/5-things-italy.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbNAulfZ-wIXKBQdKuzNVettqn8j7axtWncQ&s",
    "https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/sagrada-familia-basilica-in-spain-1581307108-785X440.jpg",
    "https://getcaddle.com/media/2018/11/France-Image-2.jpg",
    "https://www.travelandleisure.com/thmb/y9S6jErf5uFuvXdmyuLQdGa11CM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-vienna-lead-image-VIENNATG1123-20cc4869275043b1b9c370d0c7f69d51.jpg",
    "https://cdn.kimkim.com/files/a/content_articles/featured_photos/0e3794a0b646d638627afb626bf9ee46f472feb1/big-0bb2a2bea537c680f141d40cb484d888.jpg",
    "https://aliatravelegypt.com/wp-content/uploads/2024/01/alia-travelegypt-cairo-7-800x450.webp",

];
export function getUniqueRandomThreeImages(images: string[]): { id: string; url: string }[] {
    const uniqueUrls = Array.from(new Set(images));

    if (uniqueUrls.length < 3) {
        throw new Error("Not enough unique images");
    }

    const shuffled = uniqueUrls.sort(() => 0.5 - Math.random()).slice(0, 3);

    return shuffled.map((url, index) => ({
        id: (index + 1).toString(),
        url,
    }));
}