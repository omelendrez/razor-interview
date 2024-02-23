import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const timeThreshold = 60

const prisma = new PrismaClient()

const needsUpdate = (time) => time > timeThreshold

export const scheduled = async () => {
  try {
    const resp = await axios.get('https://shows-remote-api.com')
    const remoteShows = await resp.data

    const localShows = await prisma.show.findMany()

    const updatesArray = []
    let updates = {}

    let seconds = 0

    localShows.map((localShow) => {
      const remoteShow = remoteShows.find(
        (remoteShow) =>
          remoteShow.id === localShow.id &&
          remoteShow.quantity !== localShow.quantity &&
          needsUpdate(localShow.last_update)
      )

      if (remoteShow) {
        updatesArray.push(remoteShow.id)
        updates = { ...updates, [`${remoteShow.id}`]: seconds }
        seconds += 15
      }
    })

    return { updates, updatesArray }
  } catch (error) {
    console.log(error)
  }
}

// info@razortech.com.ar
