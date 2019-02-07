import * as bcrypt from "bcryptjs";
const BCRYPT_ROUNDS = 10;
export default class Bycrypt {
  /**
   * Get all
   * @param {*} password
   * @param {*} hash
   *
   */
  public async comparePassword(password:String, hash:String) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err:any, match:any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(match);
      });
    });
  }

  /**
   * Create
   * @param {*} password
   */
  public async hashPassword(password:String) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, BCRYPT_ROUNDS, (err, hash:String) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(hash);
      });
    });
  }
}
