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
import crypto, { randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';

import { IContext, toHex } from '../index';
import { PrivateKey, PublicKey } from './index';

export default class Secp256k1Context implements IContext {
  getAlgorithmName(): string {
    return 'secp256k1';
  }

  sign(message: Uint8Array, privateKey: PrivateKey): string {
    const hash = crypto
      .createHash('sha256')
      .update(message)
      .digest();

    const result = secp256k1.sign(hash, Buffer.from(privateKey.asBytes()));
    return toHex(result.signature);
  }

  verify(signature: string, message: Uint8Array, key: PublicKey): boolean {
    const hash = crypto
      .createHash('sha256')
      .update(message)
      .digest();

    const verified = secp256k1.verify(
      hash,
      Buffer.from(signature, 'hex'),
      key.asBytes()
    );
    return verified ? true : false;
  }

  getPublicKey(privateKey: PrivateKey): PublicKey {
    return new PublicKey(secp256k1.publicKeyCreate(privateKey.asBytes()));
  }

  newRandomPrivateKey(): PrivateKey {
    let privateKey;
    do {
      privateKey = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKey));

    return new PrivateKey(privateKey);
  }
}
