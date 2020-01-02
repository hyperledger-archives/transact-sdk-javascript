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

import { PrivateKey, toHex } from '../index';

export default class Secp256k1PrivateKey extends PrivateKey {
  static fromHex(privateKey: string): Secp256k1PrivateKey {
    const buffer = Buffer.from(privateKey, 'hex');
    return new this(Uint8Array.from(buffer));
  }

  constructor(privateKey: Uint8Array) {
    super(privateKey);
  }

  asHex(): string {
    return toHex(this.privateKey);
  }

  asBytes(): Buffer {
    return Buffer.from(this.privateKey);
  }
}
