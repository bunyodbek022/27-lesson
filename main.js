import express from "express";
import router from "./router/post.router.js";
const app = express()
app.use(express.json())
// Toliq kitoblar royxati
  app.use("/posts",router);

app.listen(3000, ()=>{
    console.log("Server is running on 3000 port");
})