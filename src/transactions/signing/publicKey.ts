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

interface IPublicKey {
  publicKey: Uint8Array;
  asHex: () => string;
  asBytes: () => Buffer;
}

export default class PublicKey implements IPublicKey {
  publicKey: Uint8Array;

  /**
   * converts a hex representation of a public key to a PublicKey
   * @param {string} publicKey hex representation of a public key
   * @return {PublicKey}
   */
  static fromHex(publicKey: string): PublicKey {
    const buffer = Buffer.from(publicKey, 'hex');
    return new this(Uint8Array.from(buffer));
  }

  constructor(publicKey: Uint8Array) {
    this.publicKey = publicKey;
  }

  /**
   * converts a PublicKey to its hex representation
   * @return {string} hex representation of a PublicKey
   */
  asHex(): string {
    return toHex(this.publicKey);
  }

  /**
   * converts a PublicKey to its byte representation
   * @return {Buffer} byte representation of a PublicKey
   */
  asBytes(): Buffer {
    return Buffer.from(this.publicKey);
  }
}
