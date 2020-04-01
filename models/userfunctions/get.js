import { UserModel } from '../User'

async function getUserById(id) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email) {
  return await UserModel.findOne({ email: email }).exec()
}

async function getUserByName(name) {
  return await UserModel.findOne({ name: name }).exec()
}

// async function getUsersByLocation(location) {
//   return await UserModel.find({ location: location }).exec()
// }

//not completed dont use this
async function getUsersByReasonCode(reasoncode) {
  return await UserModel.find()
}



export { getUserById, getUserByEmail, getUserByName, getUsersByLocation, getUserByReasonCode }