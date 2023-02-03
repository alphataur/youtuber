const yt = require("youtube-search-without-api-key")
const express = require("express")
const morgan = require("morgan")
const app = express()

morgan(':method :url :status :res[content-length] - :response-time ms')


app.get("/alexa", async (req, res) => {
  let query = req.query.sterm
  if(query === undefined) return res.json({ success: false, error: "no search term provided" })
  let result = await searchMusic(query)
  return res.json({ success: true, error: false, data: result})
})

async function searchMusic(query){
  try{
    const results = await yt.search(query)
    if(results.length === 0){
      throw new Error("empty result from youtube")
    }
    else{
      return results[0]
    }
  }
  catch(e){
    return null
  }
}

app.listen(7292)
