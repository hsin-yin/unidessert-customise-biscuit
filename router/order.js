var express = require('express');
var mysql = require('mysql');
var app = express.Router();

var sql = "SELECT * FROM orderlist WHERE oid = ? and recipient = ? and order_total =? ";
app.get("/order", (req, res) => {
    DB.query(sql, [req.body.oid, req.body.recipient, req.body.order_total], (err, data) => {
        if (!err) {
            console.log(data)
            res.render('member.ejs', {
                orderlist: data
            })
            // res.send(JSON.stringify(data))
        } else {
            res.send('查不到訂單')
        }
    });
});

module.exports = app

