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

export * from './addressing';
export { TransactionBuilder as SabreTransactionBuilder } from './transaction';

// The Sawtooth Sabre transaction family name (sabre)
export const SABRE_FAMILY_NAME = 'sabre';
// The Sawtooth Sabre transaction family version (0.4)
export const SABRE_FAMILY_VERSION = '0.5';
