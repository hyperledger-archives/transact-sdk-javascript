/**
 * Copyright 2020 Cargill Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PublicKey } from '../index';

export default class Secp256k1PublicKey extends PublicKey {
  publicKey: Uint8Array;

  /**
   * creates a Secp256k1PublicKey from a hex string
   * @param {string} publicKey hex representation of a public key
   * @return {PublicKey} a Secp256k1 public key
   */
  static fromHex(publicKey: string): PublicKey {
    const buffer = Buffer.from(publicKey, 'hex');
    return new this(Uint8Array.from(buffer));
  }

  constructor(publicKey: Uint8Array) {
    super(publicKey);
  }
}
