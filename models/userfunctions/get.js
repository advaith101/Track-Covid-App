import { UserModel } from '../User'

async function getUserById(id) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email) {
  return await UserModel.findOne({ email }).exec()
}

async function getUserByName(name) {
  return await UserModel.findOne({ name }).exec()
}

async function getUsersByLocation(location) {
  return await UserModel.findOne({ location }).exec()
}

export { getUserById, getUserByEmail, getUserByName }