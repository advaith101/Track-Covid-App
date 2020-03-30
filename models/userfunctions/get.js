import { UserModel } from '../User'

async function getUserById(id) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email) {
  return await UserModel.findOne({ email }).exec()
}

async function getUserByProviderId(providerId) {
  return await UserModel.findOne({ providerId }).exec()
}

export { getUserById, getUserByEmail, getUserByProviderId }