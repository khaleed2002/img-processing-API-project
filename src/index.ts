import express from 'express';
import route from './routes/resize/resize';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`<h1 style='text-align:center;padding:10px;margin:10px'>Home Page</h1>
    <p style='font-size: 20px;
    font-weight: bold;'>use /resize?fileName=(image name)&height=(for example 100)&width=(for example 100)</p>
    <p style='font-size: 20px;
    font-weight: bold;'>Then press enter</p>
    `);
});
app.use('/resize', route);
app.listen(port, () =>
  console.log(`listening on port: http://localhost:${port}`)
);

export default app;
