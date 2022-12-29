 sequelize model:create --name Wishlist --attributes name:string,starRating:integer,address:string,thumbnailUrl:string,price:float,UserId:integer

 sequelize model:create --name Transaction --attributes name:string,starRating:integer,address:string,thumbnailUrl:string,price:float,paidStatus:boolean,UserId:integer
 
 const optionsHotel = {
              method: 'GET',
              url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
              params: {
                sort_order: 'STAR',
                location_id,
                date_checkout: '2022-12-16',
                date_checkin: '2022-12-15',
                star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
                rooms_number: '1',
                page_number: '1',
                // amenities_ids: 'FINTRNT,FBRKFST'
              },
              headers: {
                'X-RapidAPI-Key': '9ed40945d0msh1e9f5455b127c43p106fb0jsnc9347ce3026a',
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
                'Accept-Encoding': 'application/json'
              }
            };



{
        "hotelId": "23864106",
        "name": "Somerset Grand Citra Jakarta",
        "brand": "Independent",
        "starRating": 4,
        "location": {
            "address": {
                "addressLine1": "Jl. Prof. Dr. Satrio Kavling 1  ",
                "cityName": "Kuningan, Jakarta",
                "countryName": "Indonesia",
                "zip": "12940",
                "isoCountryCode": "ID"
            },
            "longitude": 106.82453,
            "latitude": -6.22425,
            "timeZone": "Asia/Jakarta",
            "neighborhoodId": "3000040026",
            "neighborhoodName": "Kuningan, Jakarta",
            "cityId": 3000040026
        },
        "thumbnailUrl": "https://mobileimg.priceline.com/htlimg/23864/23864106/thumbnail-150-square.jpg",
        "hotelFeatures": {
            "hotelAmenityCodes": [
                "FINTRNT",
                "FINTRPUB",
                "FPRKING",
                "HEALTHSVCS",
                "SPOOL",
                "AIRSHUTTL",
                "KITCHEN",
                "RESTRNT",
                "FITSPA",
                "SPA",
                "PETALLOW",
                "HANDFAC",
                "NSMKFAC"
            ]
        },
        "overallGuestRating": 7.5,
        "totalReviewCount": 407,
        "proximity": 1.6674465067971924,
        "ratesSummary": {
            "minPrice": "71.30",
            "minCurrencyCode": "USD",
            "pclnId": "CBECF1B80ED23B6DBA8E6099CBE588004AD6A354419E77974CA8AF36933ABF263CA78E9C64CF5FA0B24F66467301A535D66EC0ED61D2BB7762EBCAC71C4359D2902DB941831FA6BD5ECFE1C9DC127BAF408E232E179DAC6F",
            "freeCancelableRateAvail": false,
            "payWhenYouStayAvailable": false,
            "roomLeft": 1,
            "gid": 3876,
            "rateIdentifier": "42AF0DB878C17FE9D0D031A3D5D9EC4824F637CE2F537A2AAA75C5FDCCBBDECEB1979E52E785C408B21C72743BDF2FB7DE41C31CF68112EA288781F9455544617C661E3929F13702",
            "ccNotRequiredAvailable": false,
            "applePayRateAvailable": false
        },
        "allInclusiveRateProperty": false,
        "displayRank": 9922,
        "recmdScore": 0,
        "merchandising": {},
        "media": {
            "source": "fastly",
            "url": "https://mobileimg.pclncdn.com/htlimg/master/238/6/4/23864106/master_23864106"
        }
    },