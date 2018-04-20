// 定时任务（定时清除无用的电影宣传片资源）
const schedule = require('node-schedule')

export default function() {

  schedule.scheduleJob('59 23 * * * 7', function(){
    let files = []
    const moviePath = path.join(__dirname, './cache/movieFiles')

    if(fs.existsSync(moviePath)) {
      files = fs.readdirSync(moviePath)
      files.forEach(file => {
        fs.unlinkSync(moviePath + "/" + file)
      })
    }
  })
}
