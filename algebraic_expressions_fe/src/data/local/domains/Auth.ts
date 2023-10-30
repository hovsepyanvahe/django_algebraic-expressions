import {deleteData, readData, writeData} from "../storage";

export class AuthStorage {
  static async saveAccessToken(token: string) {
    await writeData("token", { token });
  }

  static async getAccessToken() {
    const t = await readData<{ token: string }>("token");
    return t ? t.token : null;
  }

  static async signOut() {
    await deleteData('token');
  }
}
