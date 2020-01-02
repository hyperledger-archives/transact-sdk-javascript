// Copyright 2020 Cargill Incorporated
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import crypto from 'crypto';

// The namespace registry prefix for global state
const NAMESPACE_REGISTRY_PREFIX = '00ec00';

// The contract prefix for global state
const CONTRACT_PREFIX = '00ec02';

// The contract registry prefix for global state
const CONTRACT_REGISTRY_PREFIX = '00ec01';

/**
 * Calculates the registry address for a namespace.
 * @param  {String} namespace The namespace to calculate the registry address for.
 * @return {String}           Namespace registry address
 */
export function calculateNamespaceRegistryAddress(namespace: string): string {
  const prefix = namespace.slice(0, 6);
  const hash = crypto
    .createHash('sha512')
    .update(prefix)
    .digest('hex')
    .slice(0, 64);
  return `${NAMESPACE_REGISTRY_PREFIX}${hash}`;
}

/**
 * Calculates the contract address for a version of a contract.
 * @param  {String} name    The name of the contract.
 * @param  {String} version The version of the contract.
 * @return {String}         Contract address
 */
export function computeContractAddress(name: string, version: string): string {
  const input = `${name},${version}`;
  const hash = crypto
    .createHash('sha512')
    .update(input)
    .digest('hex')
    .slice(0, 64);
  return `${CONTRACT_PREFIX}${hash}`;
}

/**
 * Calculates the registry address for a contract.
 * @param  {String} name The name of the contract to calculate the registry address for.
 * @return {String}      Contract registry address
 */
export function computeContractRegistryAddress(name: string): string {
  const hash = crypto
    .createHash('sha512')
    .update(name)
    .digest('hex')
    .slice(0, 64);
  return `${CONTRACT_REGISTRY_PREFIX}${hash}`;
}
