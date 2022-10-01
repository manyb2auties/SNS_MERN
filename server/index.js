import express from "express";
// import bodyParser from "body-parser";
// 최신 버전의 express에는 bodyParser 모듈이 내장되어있다.
// express 미들웨어 함수는 서버와 클라이언트 간의 요청과 응답 사이에 실행되는 함수이다.
import mongoose from "mongoose";
import cors from 'cors'

import postRoutes from "./routes/posts.js";

const app = express();

app.use('/posts', postRoutes);
// postRoutes(post.js)에 있는 모든 routes는 실제로는 그 앞에 '/posts' 가 붙는다.

// app.use(bodyParser.json({ limit: "30mb", extended:true })) - 옛날 코드
app.use(express.json({ limit: "30mb"}))
// express.json() -> JSON format으로 보내진 데이터를 JS object 형태로 파싱한다.
// limit option controls the maximum request body size. 디폴트는 "100kb"

// app.use(bodyParser.unlencoded({ limit:"30mb", extended:true})) - 옛날 코드
app.use(express.urlencoded({ limit:"30mb", extended:true}))
// express.urlencoded() -> URL에 인코딩된 데이터를 파싱한다. (주로 string이나 array)
// extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
// true 일때 content-type이 'x-www-form-urlencoded'인 것 파싱할 수 있다.

app.use(cors())
// 모든 도메인에서 제한 없이 해당 서버에 요청을 보내고 응답을 받을 수 있다.

const CONNECTION_URL = 'mongodb+srv://dami_javascriptmastery:javascriptmastery12@cluster0.y8hvsbb.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT, () => console.log(`Server running in port: ${PORT}`)))
.catch((error) => console.log(error.messege))

// mongoose.set('useFindAndModify', false);
// 최신버전은 이거 해줄 필요 없음
// Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.