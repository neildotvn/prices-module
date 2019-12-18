const { pool } = require("./db/pool");
const Redis = require("ioredis");
const redis = new Redis();

const countOrder = () => {
    pool.connect()
        .then(client => {
            setInterval(() => {
                client
                    .query(
                        "SELECT product, COUNT(order_uid), order_type, exchange FROM orders WHERE order_status=1 GROUP BY product, order_type, exchange"
                    )
                    .then(results => {
                        mock = [
                            {
                                product: "robusta",
                                count: "2",
                                order_type: 3,
                                exchange: "ICE 01/20"
                            },
                            {
                                product: "robusta",
                                count: "1",
                                order_type: 2,
                                exchange: "ICE 01/20"
                            },
                            {
                                product: "arabica",
                                count: "1",
                                order_type: 5,
                                exchange: "NYB 12/19"
                            },
                            {
                                product: "robusta",
                                count: "2",
                                order_type: 3,
                                exchange: "ICE 01/20"
                            },
                            {
                                product: "robusta",
                                count: "1",
                                order_type: 2,
                                exchange: "ICE 01/20"
                            },
                            {
                                product: "arabica",
                                count: "1",
                                order_type: 5,
                                exchange: "NYB 12/19"
                            }
                        ];

                        const obj = {};
                        results.rows.forEach(row => {
                            const exchangeAndTerm = row.exchange.split(" ");
                            const exchange = exchangeAndTerm[0].toLowerCase();
                            const term = exchangeAndTerm[1];
                            const value = Number(row.count);
                            if (!obj[row.product]) {
                                obj[row.product] = {
                                    ice: {},
                                    nyb: {}
                                };
                            }

                            if (!obj[row.product][exchange]) {
                                obj[row.product][exchange] = {};
                            }

                            if (!obj[row.product][exchange][term]) {
                                obj[row.product][exchange][term] = {
                                    buy: 0,
                                    sell: 0
                                };
                            }

                            if (row.order_type % 2 === 0) {
                                obj[row.product][exchange][term].buy += value;
                            } else {
                                obj[row.product][exchange][term].sell += value;
                            }
                        });

                        console.log(obj);

                        redis.set("orders-count", JSON.stringify(obj), err => {
                            if (err) console.log(err);
                        });
                    })
                    .catch(err => console.log(err));
            }, 5000);
        })
        .catch(err => console.log(err));
};

// countOrder();

module.exports = { countOrder };
