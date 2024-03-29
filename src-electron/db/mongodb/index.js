import mongoose from 'mongoose'
import { loggerArr } from '../../api/logger'

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/bs`,
    { useNewUrlParser: true }
  )
  .then(() => {
    loggerArr(3, 'Device Control', 'Mongodb Connected')
    // logger({ level: 3, message: 'Mongodb Connected' })
  })
  .catch((e) => {
    loggerArr(5, 'Device Control', `Mongodb Connect Error ${e}`)
  })

export default mongoose.connection
