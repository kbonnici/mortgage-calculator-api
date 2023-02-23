import app from "./src/app/app.js";

const port = 8000

app.listen(port, ()=> {
    console.log(`Now listening at http://localhost:${port}`);
})