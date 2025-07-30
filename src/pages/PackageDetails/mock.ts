


const url = 'https://picsum.photos/800/600';
function ImageDataFetch() {
    return () => {
        const data = [];
        for (let i = 0; i < 6; i++) {
            const url = `https://picsum.photos/seed/${Math.random()}/800/600`;
            data.push({ url, id: i });
        }
        return data;
    };
}


const imagesData: any =  [
    {
        url,
        id: "1"
    },
    {
        url,
        id: "2"
    },
    {
        url,
        id: "3"
    },
    {
        url,
        id: "4"
    }
]
const imagesData2: any =  ImageDataFetch()()

export const mockPackageDetailsPackP = {
    images: imagesData2,
    title: "Dubai Abu Dhabi Grand Mosque  & Qasr Watan Palace",
    locationName: "Dubai , United Arab Emirates",
    rating: 3,
    description: "Get to know Abu Dhabi on a day trip from Dubai that lets you explore the largest emirate on a time budget. All transportation is included",
    whatsIncluded:{
        hotel: true,
        tickets: true,
        visa: true,
        meal: true,
        cityTour: false
    },
    accommodationFacilities:{
        freeWifi: true,
        pool: true,
        restaurants: true,
        gym: true,
        parking: true,
        childFree: false
    }

}