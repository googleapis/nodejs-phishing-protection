// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const assert = require('assert');

const phishingprotectionModule = require('../src');

const FAKE_STATUS_CODE = 1;
const error = new Error();
error.code = FAKE_STATUS_CODE;

describe('PhishingProtectionServiceV1Beta1Client', () => {
  it('has servicePath', () => {
    const servicePath = phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint = phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no options', () => {
    const client = new phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client({fallback: true});
    assert(client);
  });

  describe('reportPhishing', () => {
    it('invokes reportPhishing without error', done => {
      const client = new phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.projectPath('[PROJECT]');
      const uri = 'uri116076';
      const request = {
        parent: formattedParent,
        uri: uri,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.reportPhishing = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.reportPhishing(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes reportPhishing with error', done => {
      const client = new phishingprotectionModule.v1beta1.PhishingProtectionServiceV1Beta1Client({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.projectPath('[PROJECT]');
      const uri = 'uri116076';
      const request = {
        parent: formattedParent,
        uri: uri,
      };

      // Mock Grpc layer
      client._innerApiCalls.reportPhishing = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.reportPhishing(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

});

function mockSimpleGrpcMethod(expectedRequest, response, error) {
  return function(actualRequest, options, callback) {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}
