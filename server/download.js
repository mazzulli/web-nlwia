import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando download... " + videoId)
  console.log(videoURL)

  ytdl(videoURL, {
    quality: "lowestaudio",
    filter: "audioonly",
  })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new error("A duração do video é maior que 60 segundos.")
      }
    })
    .on("end", () => {
      console.log("Download do video finalizado!")
    })
    .on("error", (error) => {
      console.log(
        "Não foi possível fazer o download do video...Error: " + error
      )
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
