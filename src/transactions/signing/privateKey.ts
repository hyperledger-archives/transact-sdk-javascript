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

import { toHex } from './index';

interface IPrivateKey {
  asHex: () => string;
  asBytes: () => Buffer;
}

export default class PrivateKey implements IPrivateKey {
  privateKey: Uint8Array;

  /**
   * converts a hex representation of a private key into a PrivateKey
   * @param {string} privateKey hex representation of a private key
   * @return {PrivateKey}
   */
  static fromHex(privateKey: string): PrivateKey {
    const buffer = Buffer.from(privateKey, 'hex');
    return new this(Uint8Array.from(buffer));
  }

  constructor(privateKey: Uint8Array) {
    this.privateKey = privateKey;
  }

  /**
   * converts a PrivateKey to its hex representation
   * @return {string} hex representation of the PrivateKey
   */
  asHex(): string {
    return toHex(this.privateKey);
  }

  /**
   * converts a PrivateKey to its byte representation
   * @return {Buffer} byte representation of the PrivateKey
   */
  asBytes(): Buffer {
    return Buffer.from(this.privateKey);
  }
}
