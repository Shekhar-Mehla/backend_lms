import SessionShema from "./SessionShema.js";


// insert new data into session collection


export const SessionCollection = async(obj) => {
  return (
    await SessionShema(obj).save()
  )
}

