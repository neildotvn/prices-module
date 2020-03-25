const Redis = require("ioredis");
const redis = new Redis();
const pub = new Redis();
const _ = require("lodash");
const fs = require("fs");
const axios = require("axios");
const { countOrder } = require("./order_count");

let isLocal = false;
let isAuthError = false;

try {
    if (fs.existsSync("./local.js")) {
        isLocal = true;
    }
} catch (e) {
    console.log("Development environment", e);
}

const commodityMap = {
    arabica: {
        nyb: [3, 4, 5, 6, 7, 8],
        nybTerms: ["05/20", "07/20", "09/20", "12/20", "03/21", "05/21"]
    },
    robusta: {
        ice: [15, 16, 17, 18, 19, 20],
        iceTerms: ["05/20", "07/20", "09/20", "11/20", "01/21", "03/21"]
    },
    cotton: {
        nyb: [9, 10, 11, 12, 13, 14],
        nybTerms: ["05/20", "07/20", "10/20", "12/20", "03/21", "05/21"],
        code: 9
    },
    cocoa: {
        ice: [34, 35],
        nyb: [36, 37],
        iceTerms: ["05/20", "07/20"],
        nybTerms: ["05/20", "07/20"],
        code: 11
    },
    rubber: {
        nyb: [42, 43, 44, 45],
        nybTerms: ["04/20", "05/20", "06/20", "07/20"],
        code: 10
    }
};

const processRemoteData = (object, commodityMap) => {
    // magic numbers: 1,2,6,7,11,13 - map data from tincaphe.com
    return new Promise((resolve, reject) => {
        // redis
        //     .get("orders-count")
        //     .then(orderCount => {
        //         console.log(orderCount);
        //         orderCount = JSON.parse(orderCount);

                try {
                    const magicNumbers = [1, 2, 6, 7];
                    const processedData = {};
                    for (key of Object.keys(commodityMap)) {
                        processedData[key] = {};
                        const com = commodityMap[key];
                        const ice = com.ice;
                        const nyb = com.nyb;
                        if (ice) {
                            const arr = [];
                            for (let i = 0; i < ice.length; i++) {
                                try {
                                    const rowIndex = ice[i];
                                    const rawData = object.result[rowIndex].vs;
                                    const rowData = rawData.filter(
                                        (data, index) =>
                                            magicNumbers.includes(index)
                                    );
                                    rowData.push(rawData[4])
                                    rowData.push(
                                        !(
                                            rawData[2][0] === "-" ||
                                            rawData[2] < 0
                                        )
                                    );
                                    rowData.unshift(com.iceTerms[i]);
                                    arr.push(rowData);
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                            processedData[key].ice = arr;
                        }
                        if (nyb) {
                            const arr = [];
                            for (let i = 0; i < nyb.length; i++) {
                                try {
                                    const rowIndex = nyb[i];
                                    const rawData = object.result[rowIndex].vs;
                                    const rowData = rawData.filter(
                                        (data, index) =>
                                            magicNumbers.includes(index)
                                    );
                                    rowData.push(rawData[4])
                                    rowData.push(
                                        !(
                                            rawData[2][0] === "-" ||
                                            rawData[2] < 0
                                        )
                                    );
                                    rowData.unshift(com.nybTerms[i]);
                                    arr.push(rowData);
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                            processedData[key].nyb = arr;
                        }
                    }
                    resolve(processedData);
                } catch (err) {
                    reject(err);
                }
            // })
            // .catch(err => reject(err));
    });
};

const getTerm = fullTerm => {
    return `${fullTerm.substring(0, 2)}/${fullTerm.substring(
        fullTerm.length - 2
    )}`;
};

const readInvestingData = () => {
    try {
        return JSON.parse(
            fs.readFileSync(
                isLocal
                    ? "/Users/neilann/dev/projects/investing-crawler/investing.json"
                    : "/home/neil/dev/investing-crawler/investing.json"
            )
        ); 
    } catch (err) {
        console.log(err)
        return {}
    }
};

const setData = (tincapheData, investingData) => {
    const data = { ...tincapheData, ...investingData };

    redis
        .set("prices", JSON.stringify(data))
        .then(result => {
            console.log("added to redis");
            pub.publish("prices", "prices updated!");
        })
        .catch(err => console.log(err));
};

const getData = () =>
    new Promise((resolve, reject) => {
        redis.get("tincaphe-token").then(result => {
            // console.log("token = " + result);

            const instance = axios.create({
                baseURL: "http://tincaphe.com/api",
                timeout: 2000,
                headers: {
                    authorization: result,
                    "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
                }
            });

            instance
                .post("/services/app/priceTableClient/GetValues")
                .then(response => {
                    console.log("Thanh cong roi, oh yeah", response.data); //, response);
                    resolve(response.data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    });

setInterval(() => {
    getData()
        .then(data => {
            processRemoteData(data, commodityMap).then(processedData => {
                setData(processedData, readInvestingData());
            });
        })
        .catch(err => {
            console.log("Loi tincaphe cmnr", err);
            setData({}, readInvestingData());
            isAuthError = true;
            if (isAuthError) {
                axios
                .post("http://tincaphe.com/api/account/authenticate", {
                    grant_type: "password",
                    client_id: "APP",
                    usernameOrEmailAddress: "minhtram",
                    password: "3415",
                    tenancyName: "Default",
                    rememberMe: false
                })
                .then(response => {
                    redis.set(
                        "tincaphe-token",
                        `Bearer ${response.data.result.access_token}`
                    );
                    isAuthError = false
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        });
}, 2000);

// countOrder();
