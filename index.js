import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.post('/', async (req,res)=>{
    try {
        const result = await axios.get(
          "https://v2.jokeapi.dev/joke/Programming?type=twopart"
        );
        res.render('index.ejs' , {
            content: JSON.stringify(result.data.setup),
            rest: JSON.stringify(result.data.delivery)
        })
        console.log(result.data.delivery);
    } catch (error) {
        res.render('index.ejs' , {content: JSON.stringify(error.data)})
    }
})

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})