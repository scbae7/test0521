import express from 'express';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// DB 연결
db.connect((err) => {
  if (err) {
    console.error('❌ DB 연결 실패:', err.code, err.message);
  } else {
    console.log('✅ DB 연결 성공');
  }
});

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

// 테스트용 라우터
app.get('/', (req, res) => {
  db.query('SELECT NOW() as time', (err, result) => {
    if (err) {
      console.error('쿼리 에러:', err.message);
      return res.status(500).send('쿼리 실패');
    }
    res.send(`DB 시간: ${result[0].time}`);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
