import cookieParser = require('cookie-parser')
import express = require('express')
import session = require('express-session')
import sessionFileStore = require('session-file-store')

interface IUser {
  id: string
  name: string
}

declare module 'express-session' {
  interface SessionData {
    user?: IUser
  }
}

/**
 * express 인스턴스 설정
 */
const app = express()

/**
 * 쿠키 파서 미들웨어 초기화
 */
app.use(cookieParser())

/**
 * 바디 파서 미들웨어 초기화
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * 스토어 인스턴스 초기화
 */
const FileStore = sessionFileStore(session)
const store = new FileStore()

const oneSecond = 1000
const oneMinute = oneSecond * 60

/**
 * 세션 스토어 초기화
 */
app.use(
  session({
    secret: 'keyboard cat', // 세션 암호화에 사용하는 키값
    name: 'cat', // 웹 브라우저에서의 세션 이름(default: connect.sid)
    resave: false, // true로 설정하면, 값이 바뀌지 않더라도 새로저장
    saveUninitialized: true, // 접속후에 바로 세션을 생성하는가?
    store,
    cookie: {
      // 클라이언트 쿠키
      path: '/', // 쿠키의 경로
      httpOnly: true, // 이 쿠키는 자바스크립트로 접근할 수 없는가?
      secure: false, // 브라우저에서 https로만 쿠키를 전송하는가?
      maxAge: oneMinute, // 만료 기간
      domain: 'localhost', // 크키의 도메인
    },
  }),
)

// eslint-disable-next-line unused-imports/no-unused-vars
const isValidUser = (user: IUser) => true

/**
 * 로그인
 */
app.post('/login', (req, res) => {
  console.log(req.body)

  const user = req.session?.user
  if (user) {
    return res.status(200).json({ message: 'loggedin' })
  }

  // 세션에 유저를 추가
  // eslint-disable-next-line functional/immutable-data
  req.session.user = {
    id: 'cinos',
    name: '서재원',
  }

  // 로그인 정보를 클라이언트에 쿠키로 전달
  res.cookie('user',{
    id: req.session.user.id,
    authorized : true
  });

  return res.status(200).json({ message: 'login' })
})

app.post('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err)
      }
      console.log('logout')
    })
  } catch (e) {
    console.error(`logout error: ${e}`)
  }

  return res.status(200).json({ message: 'logout' })
})

/**
 * 서버 실행
 */
app.listen(4000, () => console.log('started at 3000 port'))
