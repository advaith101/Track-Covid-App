import { UserModel } from '../User'

async function createUser({
  name,
  email,
  password,
  date,
  absences,
  currentabsence
}) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ email })

    if (user) {
      reject('Email is already in use')
    }

    resolve(
      await UserModel.create({
        name,
        email,
        password,
        date,
        admin,
        password,
        absences,
        currentabsence
      })
    )
  })
}

export { createUser }