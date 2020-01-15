const Redis = require("ioredis");
const redis = new Redis();
const pub = new Redis();
const _ = require("lodash");
const fs = require("fs");
const axios = require("axios");
const { countOrder } = require("./order_count");

const prices = {
    result: [
        {
            c: "VND",
            vs: [
                23205.0,
                23200.0,
                -5.0,
                -0.02,
                0.0,
                "+",
                23205.0,
                23205.0,
                23205.0,
                23205.0,
                0.0,
                23200.0,
                0,
                23290.0,
                0,
                "09:00:12 PM",
                "10/18/2019"
            ],
            id: "39cf70bf-cd01-4092-ae37-bb29850f900b"
        },
        {
            c: "IDR",
            vs: [
                14143.0,
                14139.0,
                -4.0,
                -0.03,
                0.0,
                "+",
                14168.0,
                14130.0,
                14168.0,
                14143.0,
                0.0,
                14139.0,
                0,
                14149.0,
                0,
                "09:00:12 PM",
                "10/18/2019"
            ],
            id: "6acae6b3-a63a-4831-8cbc-298b132d5381"
        },
        {
            c: "INR",
            vs: [
                7.0765,
                7.0789,
                0.0024,
                0.03,
                0.0,
                "+",
                7.0873,
                7.07,
                7.08,
                7.08,
                0.0,
                7.079,
                0,
                7.08,
                0,
                "09:05:18 PM",
                "10/18/2019"
            ],
            id: "49d26c9b-3f1b-44c0-877f-5c93355e0555"
        },
        {
            c: "ICE",
            vs: [
                92.9,
                94.05,
                1.15,
                1.24,
                7623.0,
                "+",
                94.25,
                92.55,
                92.65,
                92.9,
                137748.0,
                94.05,
                7,
                94.1,
                19,
                "09:20:52 PM",
                "10/18/2019"
            ],
            id: "ad6789b9-b75c-43ac-8df7-14047fd376a2"
        },
        {
            c: "ICE",
            vs: [
                96.4,
                97.5,
                1.1,
                1.14,
                2431.0,
                "+",
                97.65,
                96.05,
                96.4,
                96.4,
                69231.0,
                97.5,
                11,
                97.55,
                1,
                "09:20:52 PM",
                "10/18/2019"
            ],
            id: "2e2cfc20-afd4-4923-9e16-832c00bcc1e0"
        },
        {
            c: "ICE",
            vs: [
                98.7,
                99.6,
                0.9,
                0.91,
                1465.0,
                "-",
                99.9,
                98.3,
                98.6,
                98.7,
                39249.0,
                99.7,
                25,
                99.8,
                2,
                "09:20:48 PM",
                "10/18/2019"
            ],
            id: "996d4c8e-3a15-494b-9a1d-6dda3cffa1dc"
        },
        {
            c: "ICE",
            vs: [
                100.8,
                101.9,
                1.1,
                1.09,
                1408.0,
                "+",
                102.0,
                100.5,
                100.8,
                100.8,
                26269.0,
                101.85,
                16,
                101.95,
                10,
                "09:20:49 PM",
                "10/18/2019"
            ],
            id: "2bf4396a-c63b-425d-b772-27c9691ada1f"
        },
        {
            c: "ICE",
            vs: [
                102.7,
                103.8,
                1.1,
                1.07,
                782.0,
                "+",
                103.9,
                102.4,
                103.0,
                102.7,
                18341.0,
                103.8,
                4,
                103.85,
                19,
                "09:20:52 PM",
                "10/18/2019"
            ],
            id: "e83f088d-1d96-4ff8-b4d0-0eb35dcac720"
        },
        {
            c: "ICE",
            vs: [
                108.35,
                109.35,
                1.0,
                0.92,
                328.0,
                "+",
                109.5,
                108.1,
                108.4,
                108.35,
                4702.0,
                109.25,
                14,
                109.4,
                2,
                "09:20:48 PM",
                "10/18/2019"
            ],
            id: "c06c6ac6-70e7-4aa5-80b9-622ae8c6f8ae"
        },
        {
            c: "Cotton",
            vs: [
                64.99,
                65.31,
                0.32,
                0.49,
                6349.0,
                "+",
                65.39,
                65.0,
                65.2,
                64.99,
                128751.0,
                65.3,
                3,
                65.33,
                8,
                "09:20:47 PM",
                "10/18/2019"
            ],
            id: "1713bc6a-2820-4cd4-90b6-ccd7c3759119"
        },
        {
            c: "Cotton",
            vs: [
                65.51,
                65.9,
                0.39,
                0.6,
                2649.0,
                "+",
                65.93,
                65.44,
                65.67,
                65.51,
                72476.0,
                65.89,
                1,
                65.92,
                10,
                "09:20:47 PM",
                "10/18/2019"
            ],
            id: "dd4e2150-3490-437f-9703-edccbd93df9d"
        },
        {
            c: "Cotton",
            vs: [
                65.89,
                66.33,
                0.44,
                0.67,
                687.0,
                "+",
                66.35,
                65.73,
                66.0,
                65.89,
                10211.0,
                66.3,
                2,
                66.33,
                1,
                "09:20:47 PM",
                "10/18/2019"
            ],
            id: "b0d82365-9389-4675-a4ad-917f4bf2ec46"
        },
        {
            c: "Cotton",
            vs: [
                66.13,
                66.69,
                0.56,
                0.85,
                522.0,
                "-",
                66.74,
                66.15,
                66.36,
                66.13,
                10483.0,
                66.67,
                7,
                66.71,
                1,
                "09:20:47 PM",
                "10/18/2019"
            ],
            id: "4e3a29a0-8614-4112-ac65-85f35c134213"
        },
        {
            c: "Cotton",
            vs: [
                66.0,
                66.0,
                -0.19,
                -0.29,
                0.0,
                "s",
                66.0,
                66.0,
                66.0,
                66.19,
                0.0,
                66.24,
                2,
                67.78,
                1,
                "09:20:47 PM",
                "10/18/2019"
            ],
            id: "87ce8e9f-7674-46b4-8aba-5eee2acf0b34"
        },
        {
            c: "Cotton",
            vs: [
                66.36,
                66.82,
                0.46,
                0.69,
                424.0,
                "+",
                66.85,
                66.5,
                66.7,
                66.36,
                18046.0,
                66.79,
                2,
                66.82,
                1,
                "09:20:47 PM",
                "10/18/2019"
            ],
            id: "c86ed086-6ab5-4d4a-af46-0eb7cb570620"
        },
        {
            c: "LIFFE",
            vs: [
                1194.0,
                1206.0,
                12.0,
                1.01,
                6835.0,
                "+",
                1208.0,
                1181.0,
                1198.0,
                1194.0,
                27020.0,
                1205.0,
                17,
                1206.0,
                10,
                "09:20:41 PM",
                "10/18/2019"
            ],
            id: "a6225921-0804-4dc3-a15a-4967659abbda"
        },
        {
            c: "LIFFE",
            vs: [
                1227.0,
                1242.0,
                15.0,
                1.22,
                7717.0,
                "+",
                1244.0,
                1213.0,
                1232.0,
                1227.0,
                63530.0,
                1241.0,
                8,
                1242.0,
                17,
                "09:20:43 PM",
                "10/18/2019"
            ],
            id: "f0538d6e-a937-4820-a8a6-934e4dde5724"
        },
        {
            c: "LIFFE",
            vs: [
                1252.0,
                1265.0,
                13.0,
                1.04,
                2401.0,
                "-",
                1267.0,
                1239.0,
                1256.0,
                1252.0,
                32544.0,
                1265.0,
                8,
                1266.0,
                6,
                "09:20:43 PM",
                "10/18/2019"
            ],
            id: "7cf1c98d-b646-479d-924d-9155ee2da13f"
        },
        {
            c: "LIFFE",
            vs: [
                1277.0,
                1291.0,
                14.0,
                1.1,
                1205.0,
                "+",
                1291.0,
                1264.0,
                1275.0,
                1277.0,
                13856.0,
                1290.0,
                8,
                1292.0,
                17,
                "09:20:43 PM",
                "10/18/2019"
            ],
            id: "93593aa4-957a-4ed0-aa7c-a0709951d12c"
        },
        {
            c: "LIFFE",
            vs: [
                1304.0,
                1316.0,
                12.0,
                0.92,
                866.0,
                "+",
                1318.0,
                1291.0,
                1301.0,
                1304.0,
                12574.0,
                1315.0,
                8,
                1317.0,
                17,
                "09:20:43 PM",
                "10/18/2019"
            ],
            id: "0ba25c32-415c-427b-8070-fa463adb4453"
        },
        {
            c: "LIFFE",
            vs: [
                1330.0,
                1339.0,
                9.0,
                0.68,
                326.0,
                "+",
                1339.0,
                1317.0,
                1328.0,
                1330.0,
                4389.0,
                1341.0,
                8,
                1344.0,
                17,
                "09:20:43 PM",
                "10/18/2019"
            ],
            id: "89ee81a5-a680-4207-ad25-6547d2ac9339"
        },
        {
            c: "PEPPER2",
            vs: [
                0.0,
                32940.0,
                -710.0,
                -2.11,
                0.0,
                "+",
                33000.0,
                32940.0,
                33000.0,
                33650.0,
                0.0,
                0.0,
                0,
                0.0,
                0,
                "06:44:53 PM",
                "10/18/2019"
            ],
            id: "d6264440-3153-4ee8-918f-e7ac0027c421"
        },
        {
            c: "PEPPER3",
            vs: [
                0.0,
                33369.25,
                -5.75,
                -0.02,
                0.0,
                "-",
                33483.35,
                33369.25,
                33375.0,
                33375.0,
                0.0,
                0.0,
                0,
                0.0,
                0,
                "09:20:34 PM",
                "10/18/2019"
            ],
            id: "52dd85fc-5389-4d59-a100-f3fef2cc4ca5"
        },
        {
            c: "CAO SU CHINA",
            vs: [
                10820.0,
                10900.0,
                80.0,
                0.74,
                158.0,
                "+",
                10920.0,
                10875.0,
                10890.0,
                10820.0,
                8754.0,
                10890.0,
                1,
                10900.0,
                9,
                "09:05:39 PM",
                "10/18/2019"
            ],
            id: "cfc46de3-fe29-4d33-b2df-a9f5f9575f4a"
        },
        {
            c: "CAO SU CHINA",
            vs: [
                11680.0,
                11750.0,
                70.0,
                0.6,
                52206.0,
                "+",
                11780.0,
                11725.0,
                11750.0,
                11680.0,
                332418.0,
                11745.0,
                101,
                11750.0,
                114,
                "09:05:48 PM",
                "10/18/2019"
            ],
            id: "b9262e56-ec40-42fe-b2dd-b7f17aca657a"
        },
        {
            c: "CAO SU CHINA",
            vs: [
                11855.0,
                11925.0,
                70.0,
                0.59,
                6016.0,
                "+",
                11945.0,
                11905.0,
                11945.0,
                11855.0,
                112996.0,
                11920.0,
                22,
                11925.0,
                14,
                "09:05:13 PM",
                "10/18/2019"
            ],
            id: "23e89a25-2cb0-4bad-ad81-b4de2660e54b"
        },
        {
            c: "Dollar.Index",
            vs: [
                97.607,
                97.463,
                -0.144,
                -0.15,
                0.0,
                "+",
                97.659,
                97.41,
                97.6,
                97.61,
                0.0,
                0.0,
                0,
                0.0,
                0,
                "09:20:51 PM",
                "10/18/2019"
            ],
            id: "ff5c8d83-de1d-4aab-aa25-b11d097cdb56"
        },
        {
            c: "Dollar.Index",
            vs: [
                97.335,
                97.195,
                -0.14,
                -0.14,
                9220.0,
                "+",
                97.395,
                97.14,
                97.36,
                97.34,
                51730.0,
                97.19,
                37,
                97.195,
                6,
                "09:20:50 PM",
                "10/18/2019"
            ],
            id: "cc49629a-6aa1-41af-9277-c8bc10a2f561"
        },
        {
            c: "Euro.Index",
            vs: [
                1.11272,
                1.11424,
                0.00152,
                0.14,
                0.0,
                "+",
                1.1153,
                1.11,
                1.11,
                1.11,
                0.0,
                1.114,
                0,
                1.114,
                0,
                "09:05:51 PM",
                "10/18/2019"
            ],
            id: "92a804ff-c277-4c71-9b51-414f50c31afb"
        },
        {
            c: "Vàng ( Cash)",
            vs: [
                1491.76,
                1489.64,
                -2.12,
                -0.14,
                0.0,
                "+",
                1494.09,
                1485.05,
                1491.72,
                1491.76,
                0.0,
                1489.64,
                0,
                1490.01,
                0,
                "09:05:51 PM",
                "10/18/2019"
            ],
            id: "2aa0138d-a3e8-4a22-b7a9-1b7d338d2f62"
        },
        {
            c: "Vàng Kỳ hạn",
            vs: [
                1498.3,
                1492.5,
                -5.8,
                -0.39,
                151630.0,
                "+",
                1497.9,
                1488.3,
                1495.6,
                1498.3,
                472436.0,
                1492.3,
                23,
                1492.4,
                8,
                "09:10:51 PM",
                "10/18/2019"
            ],
            id: "ee859744-4ddb-4232-a717-82f270981c13"
        },
        {
            c: "Crude Oil WTI NY ( CL )",
            vs: [
                53.93,
                54.3,
                0.37,
                0.69,
                80186.0,
                "-",
                54.62,
                53.73,
                54.09,
                53.93,
                79987.0,
                54.3,
                3,
                54.31,
                30,
                "09:10:51 PM",
                "10/18/2019"
            ],
            id: "886db8be-e935-4d67-9160-6beb413b5a9f"
        },
        {
            c: "YMM18",
            vs: [
                26993.0,
                26933.0,
                -59.0,
                -0.22,
                59143.0,
                "-",
                27023.0,
                26883.0,
                26995.0,
                26993.0,
                102001.0,
                26932.0,
                5,
                26933.0,
                5,
                "09:10:50 PM",
                "10/18/2019"
            ],
            id: "3806d6e7-386c-4576-8423-7d0df1717d6a"
        },
        {
            c: "ESY00",
            vs: [
                2998.0,
                2995.75,
                -2.25,
                -0.08,
                383301.0,
                "+",
                3001.25,
                2989.0,
                2997.75,
                2998.0,
                2447188.0,
                2995.75,
                104,
                2996.0,
                106,
                "09:10:51 PM",
                "10/18/2019"
            ],
            id: "ba29a075-c1d0-4de5-960f-fb176af984fb"
        },
        {
            c: "Cacao",
            vs: [
                1909.0,
                1905.0,
                -4.0,
                -0.21,
                3450.0,
                "-",
                1930.0,
                1905.0,
                1920.0,
                1909.0,
                81515.0,
                1905.0,
                21,
                1906.0,
                11,
                "09:20:50 PM",
                "10/18/2019"
            ],
            id: "28892858-6a90-4c67-9bb6-738037437995"
        },
        {
            c: "Cacao",
            vs: [
                1866.0,
                1866.0,
                0.0,
                0.0,
                3188.0,
                "-",
                1884.0,
                1859.0,
                1875.0,
                1866.0,
                94393.0,
                1865.0,
                9,
                1866.0,
                21,
                "09:20:50 PM",
                "10/18/2019"
            ],
            id: "6e6283a6-fc36-41a1-98dc-7a01ed1dd3ed"
        },
        {
            c: "Cacao",
            vs: [
                2488.0,
                2495.0,
                7.0,
                0.28,
                7832.0,
                "-",
                2538.0,
                2490.0,
                2515.0,
                2488.0,
                94636.0,
                2495.0,
                3,
                2496.0,
                20,
                "09:20:50 PM",
                "10/18/2019"
            ],
            id: "5c6a0a76-3c6d-4b4e-b16a-02045a4961b8"
        },
        {
            c: "Cacao",
            vs: [
                2511.0,
                2520.0,
                9.0,
                0.36,
                3343.0,
                "-",
                2560.0,
                2515.0,
                2532.0,
                2511.0,
                84505.0,
                2520.0,
                2,
                2521.0,
                24,
                "09:20:50 PM",
                "10/18/2019"
            ],
            id: "5a067c43-1067-4f75-83a9-cc1f837e4ead"
        },
        {
            c: "Cash",
            vs: [
                4.1632,
                4.1464,
                -0.0168,
                -0.4,
                0.0,
                "+",
                4.1654,
                4.14,
                4.16,
                4.16,
                0.0,
                4.146,
                0,
                4.148,
                0,
                "09:05:49 PM",
                "10/18/2019"
            ],
            id: "7ea02d36-55c0-4c43-b49e-f49e6703b5e3"
        },
        {
            c: "Brazil2",
            vs: [
                109.7,
                111.4,
                1.7,
                1.55,
                91.0,
                "-",
                111.5,
                110.45,
                110.75,
                109.7,
                3527.0,
                111.3,
                3,
                111.55,
                1,
                "09:20:30 PM",
                "10/18/2019"
            ],
            id: "ae58ee94-db82-449a-b5e0-22cd506431ec"
        },
        {
            c: "Brazil3",
            vs: [
                114.85,
                116.25,
                1.4,
                1.22,
                38.0,
                "+",
                116.25,
                115.7,
                116.0,
                114.85,
                1403.0,
                116.3,
                1,
                116.9,
                1,
                "09:20:30 PM",
                "10/18/2019"
            ],
            id: "80acf9b1-1dac-4d4f-972c-e9d5e26c19b4"
        },
        {
            c: "Brazil4",
            vs: [
                117.4,
                118.2,
                0.8,
                0.68,
                5.0,
                "+",
                118.2,
                118.2,
                118.2,
                117.4,
                439.0,
                118.3,
                1,
                119.7,
                2,
                "09:20:30 PM",
                "10/18/2019"
            ],
            id: "6ea25c9e-750c-403e-bfeb-29939b9272f6"
        },
        {
            c: "RUBBER",
            vs: [
                152.0,
                153.7,
                1.7,
                1.12,
                12.0,
                "+",
                153.7,
                152.2,
                152.2,
                152.0,
                1469.0,
                152.4,
                1,
                153.8,
                2,
                "04:57:01 PM",
                "10/18/2019"
            ],
            id: "48fb7b55-8d79-4974-a375-eae39df6f372"
        },
        {
            c: "RUBBER",
            vs: [
                156.9,
                158.2,
                1.3,
                0.83,
                28.0,
                "+",
                158.8,
                156.9,
                156.9,
                156.9,
                1400.0,
                157.5,
                1,
                159.6,
                1,
                "04:56:54 PM",
                "10/18/2019"
            ],
            id: "0cd185e8-243d-4c8e-aef2-4fad4de51237"
        },
        {
            c: "RUBBER",
            vs: [
                159.9,
                160.9,
                1.0,
                0.63,
                24.0,
                "+",
                161.4,
                159.9,
                159.9,
                159.9,
                2301.0,
                160.5,
                20,
                161.2,
                1,
                "04:55:01 PM",
                "10/18/2019"
            ],
            id: "05779c32-738d-444a-9e50-81915d43b56f"
        },
        {
            c: "RUBBER",
            vs: [
                163.2,
                164.3,
                1.1,
                0.67,
                86.0,
                "-",
                164.8,
                164.2,
                164.8,
                163.2,
                2897.0,
                164.0,
                1,
                164.3,
                1,
                "04:55:01 PM",
                "10/18/2019"
            ],
            id: "69102e7a-c696-4572-a498-fe795fcfb6f4"
        },
        {
            c: "COTTON",
            vs: [
                19540.0,
                19590.0,
                50.0,
                0.26,
                165.0,
                "-",
                19650.0,
                19560.0,
                19560.0,
                19540.0,
                873.0,
                19590.0,
                1,
                19620.0,
                2,
                "09:13:14 PM",
                "10/18/2019"
            ],
            id: "0ce0d936-46e0-4fb2-b6b8-57e68e4982e7"
        },
        {
            c: "COTTON",
            vs: [
                19260.0,
                19380.0,
                120.0,
                0.62,
                273.0,
                "-",
                19410.0,
                19300.0,
                19310.0,
                19260.0,
                1687.0,
                19370.0,
                1,
                19400.0,
                4,
                "09:14:00 PM",
                "10/18/2019"
            ],
            id: "9c09c803-8d49-4ea1-b110-56464664bae7"
        },
        {
            c: "COTTON",
            vs: [
                12315.0,
                12340.0,
                95.0,
                0.78,
                1254.0,
                "+",
                12340.0,
                12270.0,
                12280.0,
                12245.0,
                16164.0,
                12325.0,
                49,
                12335.0,
                1,
                "09:20:19 PM",
                "10/18/2019"
            ],
            id: "54c229cf-4727-4a71-8b9e-f0105c7d6c20"
        },
        {
            c: "COTTON",
            vs: [
                12680.0,
                12700.0,
                100.0,
                0.79,
                125390.0,
                "+",
                12730.0,
                12615.0,
                12680.0,
                12600.0,
                695874.0,
                12695.0,
                258,
                12700.0,
                84,
                "09:20:51 PM",
                "10/18/2019"
            ],
            id: "4b47ec36-11df-4913-ac61-08fa4ccfe429"
        },
        {
            c: "COTTON",
            vs: [
                12840.0,
                12880.0,
                75.0,
                0.59,
                2010.0,
                "+",
                12910.0,
                12800.0,
                12885.0,
                12805.0,
                50166.0,
                12880.0,
                10,
                12885.0,
                36,
                "09:20:48 PM",
                "10/18/2019"
            ],
            id: "f7720e71-f08b-417a-b4e1-86e5483cbc36"
        }
    ],
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true
};

const priceObj = JSON.parse(JSON.stringify(prices));

let isLocal = false;
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
        nybTerms: ["03/20", "05/20", "07/20", "09/20", "12/20", "03/21"]
    },
    robusta: {
        ice: [15, 16, 17, 18, 19, 20],
        iceTerms: ["03/20", "05/20", "07/20", "09/20", "11/20", "01/21"]
    },
    cotton: {
        nyb: [9, 10, 11, 12, 13, 14],
        nybTerms: ["03/20", "05/20", "07/20", "10/20", "12/20", "03/21"],
        code: 9
    },
    cocoa: {
        ice: [34, 35],
        nyb: [36, 37],
        iceTerms: ["03/20", "05/20"],
        nybTerms: ["03/20", "05/20"],
        code: 11
    },
    rubber: {
        nyb: [42, 43, 44, 45],
        nybTerms: ["03/20", "04/20", "05/20", "06/20"],
        code: 10
    }
};

const processRemoteData = (object, commodityMap) => {
    // magic numbers: 1,2,6,7,11,13 - map data from tincaphe.com
    return new Promise((resolve, reject) => {
        redis
            .get("orders-count")
            .then(orderCount => {
                console.log(orderCount);
                orderCount = JSON.parse(orderCount);

                try {
                    const magicNumbers = [1, 2, 6, 7, 11, 13];
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
                                    // rowData.unshift(getTerm(rawData[16]));
                                    rowData.push(!(rawData[2][0] === "-" || rawData[2] < 0));
                                    // rowData.push(rawData[1] >= rawData[0]);
                                    rowData.unshift(com.iceTerms[i]);
                                    if (
                                        orderCount[key] &&
                                        orderCount[key].ice[rowData[0]]
                                    ) {
                                        rowData.push(
                                            orderCount[key].ice[rowData[0]].buy
                                        );
                                        rowData.push(
                                            orderCount[key].ice[rowData[0]].sell
                                        );
                                    }
                                    ice;
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
                                    // rowData.unshift(getTerm(rawData[16]));
                                    rowData.push(!(rawData[2][0] === "-" || rawData[2] < 0));
                                    // rowData.push(rawData[1] >= rawData[0]);
                                    rowData.unshift(com.nybTerms[i]);
                                    if (
                                        orderCount[key] &&
                                        orderCount[key].nyb[rowData[0]]
                                    ) {
                                        rowData.push(
                                            orderCount[key].nyb[rowData[0]].buy
                                        );
                                        rowData.push(
                                            orderCount[key].nyb[rowData[0]].sell
                                        );
                                    }
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
            })
            .catch(err => reject(err));
    });
};

const getTerm = fullTerm => {
    return `${fullTerm.substring(0, 2)}/${fullTerm.substring(
        fullTerm.length - 2
    )}`;
};

const readInvestingData = () => {
    return JSON.parse(
        fs.readFileSync(
            isLocal
                ? "/Users/neilann/dev/projects/investing-crawler/investing.json"
                : "/home/neil/dev/investing-crawler/investing.json"
        )
    );
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
                baseURL:
                    "http://tincaphe.com/api/services/app/priceTableClient/GetValues",
                timeout: 2000,
                headers: {
                    authorization: result,
                    "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
                }
            });

            instance
                .post("/")
                .then(response => {
                    console.log("Thanh cong roi, oh yeah"); //, response);
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
        });
}, 2000);

countOrder();
