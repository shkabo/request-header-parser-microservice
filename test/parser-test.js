var request = require("supertest");

describe("parser test", function() {
    var server;
    beforeEach( function() {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
    });
    afterEach( function(done) {
        server.close(done);
    });
   
  it('get header request', function(done){
      request(server)
          .get('/useragent')
          .set('user-agent' , 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/49.0.2623.108 Chrome/49.0.2623.108 Safari/537.36')
          .expect('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/49.0.2623.108 Chrome/49.0.2623.108 Safari/537.36', done);
  });
   
   it('get header request ip', function(done){
        request(server)
            .get('/ip')
            .set('x-forwarded-for', '192.168.1.2')
            .expect(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, done);
   });
   
   it('get header language', function(done) {
        request(server) 
            .get('/language')
            .set('accept-language', 'en-GB,en-US;q=0.8,en;q=0.6')
            .expect('en-GB', done);
   });
   
   it('pass extract os string', function(done) {
        request(server)
            .get('/os')
            .set('user-agent' , 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/49.0.2623.108 Chrome/49.0.2623.108 Safari/537.36')
            .expect('X11; Linux x86_64', done);
    });
    
    it('pass api/whoami', function(done) {
        request(server)
            .get('/api/whoami')
            .set('user-agent' , 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/49.0.2623.108 Chrome/49.0.2623.108 Safari/537.36')
            .set('accept-language', 'en-GB,en-US;q=0.8,en;q=0.6')
            .set('x-forwarded-for', '192.168.1.2')
            .expect({"ipaddress": "192.168.1.2", "language": "en-GB", "software": "X11; Linux x86_64"}, done);
    });
   
    
});