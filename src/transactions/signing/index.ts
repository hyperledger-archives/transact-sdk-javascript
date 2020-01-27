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

export { default as IContext } from './context';
export { default as PrivateKey } from './privateKey';
export { default as PublicKey } from './publicKey';
export { default as ISigner } from './signer';

export {
  Context as Secp256k1Context,
  PrivateKey as Secp256k1PrivateKey,
  PublicKey as Secp256k1PublicKey,
  Signer as Secp256k1Signer
} from './secp256k1';

/**
 * Converts a buffer to its hex representation
 * @param {Uint8Array} buffer the buffer to convert
 * @return {string} the hex representation of the buffer
 */
export function toHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
