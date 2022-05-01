"use strict";
exports.__esModule = true;
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");
var session = require("express-session");
var sessionFileStore = require("session-file-store");
/**
 * express 인스턴스 생성
 */
var app = express();
/**
 * 쿠키 파서 미들웨어 초기화
 */
app.use(cookieParser());
/**
 * 바디 파서 미들웨어 초기화
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/**
 * 통신이 가능한 도메인을 추가
 */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
/**
 * 스토어 인스턴스 초기화
 */
var FileStore = sessionFileStore(session);
var store = new FileStore();
var oneSecond = 1000;
var oneMinute = oneSecond * 60;
/**
 * 세션 스토어 초기화
 */
app.use(session({
    secret: 'keyboard cat',
    // name: 'cat', // 웹 브라우저에서의 세션 이름(default: connect.sid)
    resave: false,
    saveUninitialized: false,
    store: store,
    // 세션 쿠키 초기화
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: oneMinute,
        domain: 'localhost'
    }
}));
/**
 *  사용자 인증
 * @param id
 * @param pass
 */
var isValidUser = function (id, pass) {
    return id === 'a' && pass === 'a';
};
/**
 * 로그인
 */
app.post('/login', function (req, res) {
    var _a = req.body, id = _a.id, pass = _a.pass;
    console.log('req.sessionID', req.sessionID);
    if (!isValidUser(id, pass)) {
        return res.status(401).json({ message: 'error' });
    }
    // // 세션에 유저를 추가
    // // eslint-disable-next-line functional/immutable-data
    // req.session.user = {
    //   id,
    //   name: pass,
    // }
    req.session.save();
    return res.status(200).json({ message: 'login' });
});
app.post('/logout', function (req, res) {
    console.log('req.session', req.session);
    try {
        req.session.destroy(function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
    catch (e) {
        console.error("logout error: ".concat(e));
    }
    // @ts-ignore
    // eslint-disable-next-line functional/immutable-data
    req.session = null;
    return res.status(200).json({ message: 'logout' });
});
/**
 * 서버 실행
 */
app.listen(4000, function () { return console.log('started at 4000 port'); });
