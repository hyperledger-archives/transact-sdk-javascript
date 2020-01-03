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

import PrivateKey from './privateKey';
import PublicKey from './publicKey';
import Signer from './signer';

const KEY1_PRIV_HEX =
  '2f1e7b7a130d7ba9da0068b3bb0ba1d79e7e77110302c9f746c3c2a63fe40088';
const KEY1_PUB_HEX =
  '026a2c795a9776f75464aa3bda3534c3154a6e91b357b1181d3f515110f84b67c5';

const KEY2_PRIV_HEX =
  '51b845c2cdde22fe646148f0b51eaf5feec8c82ee921d5e0cbe7619f3bb9c62d';
const KEY2_PUB_HEX =
  '039c20a66b4ec7995391dbec1d8bb0e2c6e6fd63cd259ed5b877cb4ea98858cf6d';

const MSG1 = 'test';
const MSG1_KEY1_SIG =
  '5195115d9be2547b720ee74c23dd841842875db6eae1f5da8605b050a49e' +
  '702b4aa83be72ab7e3cb20f17c657011b49f4c8632be2745ba4de79e6aa0' +
  '5da57b35';

describe('Secp256k1', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('PrivateKey', () => {
    it('should parse private hex keys', () => {
      const privateKey = PrivateKey.fromHex(KEY1_PRIV_HEX);
      expect(privateKey.asHex()).toEqual(KEY1_PRIV_HEX);
    });
  });
  describe('Signer', () => {
    it('should return correct public key from private', () => {
      const key1 = PrivateKey.fromHex(KEY1_PRIV_HEX);
      const key2 = PrivateKey.fromHex(KEY2_PRIV_HEX);
      const signer1 = new Signer(key1);
      const signer2 = new Signer(key2);

      expect(KEY1_PUB_HEX).toEqual(signer1.getPublicKey().asHex());
      expect(KEY2_PUB_HEX).toEqual(signer2.getPublicKey().asHex());
    });
    it('should correctly produce a signature', () => {
      const key = PrivateKey.fromHex(KEY1_PRIV_HEX);
      const signer = new Signer(key);

      const signature = signer.sign(Uint8Array.from(Buffer.from(MSG1)));
      expect(MSG1_KEY1_SIG).toEqual(signature);
    });
    it('should verify on a correct public key', () => {
      const key = PrivateKey.fromHex(KEY1_PRIV_HEX);
      const signer = new Signer(key);

      const publicKey = PublicKey.fromHex(KEY1_PUB_HEX);

      expect(KEY1_PUB_HEX).toEqual(signer.getPublicKey().asHex());

      const signature = signer.sign(Uint8Array.from(Buffer.from(MSG1)));
      const result = signer.context.verify(
        signature,
        Uint8Array.from(Buffer.from(MSG1)),
        publicKey
      );
      expect(result).toEqual(true);
    });
    it('should fail to verify on an incorrect public key', () => {
      const key = PrivateKey.fromHex(KEY1_PRIV_HEX);
      const signer = new Signer(key);

      const publicKey = PublicKey.fromHex(KEY2_PUB_HEX);

      expect(KEY1_PUB_HEX).toEqual(signer.getPublicKey().asHex());

      const signature = signer.sign(Uint8Array.from(Buffer.from(MSG1)));
      const result = signer.context.verify(
        signature,
        Uint8Array.from(Buffer.from(MSG1)),
        publicKey
      );
      expect(result).toEqual(false);
    });
    it('should return the algorithm name', () => {
      const key = PrivateKey.fromHex(KEY1_PRIV_HEX);
      const signer = new Signer(key);

      expect('secp256k1').toEqual(signer.context.getAlgorithmName());
    });
  });
});
