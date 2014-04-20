'use strict';

angular.module('RadioFrequencies')
   .factory('radioReference', function($http) {
      var user = {
         username: '',
         password: '',
         loggedIn: false
      };

      var cache = {
         country : {
            info : Array()
         },
         state: {
            info : Array()
         },
         county: {
            info : Array(),
         },
         cats: {
            frequencies: Array()
         },
         subcats: {
            frequencies: Array()
         },
         system: {
            info : Array(),
            sites: Array(),
            talkgroupCategories : Array(),
            talkgroups: Array()
         },
         agency: {
            info : Array()
         },
         user: Array()
      };

      var radioReference = {

         request: function(request, data) {
            if (request !== 'user' && !user.loggedIn) {
                   return $http.get('api/?request=error');
                }

            if (!data) {
               data = {}
            }

            data.request = request;
            data.username = user.username;
            data.password = user.password;

            return $http.post('api/', data);
         },

         /*
            countries() Returns list of countries.
         */
         countries: function() {
            if (!cache.countries) {
               cache.countries = this.request('countries');
            }

            return cache.countries;
         },

         /*
            country(coid) Returns country information for coid.
               coid: Country id.
         */
         country: function(coid) {
            if (!cache.country.info[coid]) {
               cache.country.info[coid] = this.request('country', { coid: coid });
            }

            return cache.country.info[coid];
         },

         /*
            state(stid) Returns state information for stid.
               stid: State id.
         */
         state: function(stid) {
            if (!cache.state.info[stid]) {
               cache.state.info[stid] = this.request('state', { stid: stid });
            }

            return cache.state.info[stid];
         },

         /*
            county(ctid) Returns county information for ctid.
                        NOTE: Some information contained within are not immediately provided.
               ctid: County id.
         */
         county: function(ctid) {
            if (!cache.county.info[ctid]) {
               cache.county.info[ctid] = this.request('county', { ctid: ctid })

               cache.county.info[ctid].then(function(response) {
                  var county = response.data;

                  for (var i = 0; i < county.cats.length; ++i) {
                     for (var ii = 0; ii < county.cats[i].subcats.length; ++ii) {
                        (function(_this, subcat) {
                           _this.subcatFrequencies(subcat.scid).then(function(response) {
                              subcat.frequencies = response.data;
                           }, function(error) {
                              console.log(error);
                              subcat.frequencies = Array();
                           });
                        })(radioReference, county.cats[i].subcats[ii]);
                     }
                  }
               });
            }

            return cache.county.info[ctid];
         },

         /*
            subcatFrequencies(scid) Returns frequency information for scid.
               scid: Subcat id.
         */
         subcatFrequencies: function(scid) {
            if (!cache.subcats.frequencies[scid]) {
               cache.subcats.frequencies[scid] = this.request('subcatFrequencies', { scid: scid });
            }

            return cache.subcats.frequencies[scid];
         },

         /*
            system(sid) Returns system information for sid.
               sid: System id.
         */
         system: function(sid) {
            if (!cache.system.info[sid]) {
               cache.system.info[sid] = this.request('system', { sid: sid });

               cache.system.info[sid].then(function(response) {
                  var system = response.data;

                  radioReference.systemSites(sid).then(function(response) {
                     system.sites = response.data;
                  }, function(error) {
                     console.log(error);
                     system.sites = Array();
                  });

                  radioReference.systemTalkgroupCategories(sid).then(function(response) {
                     system.talkgroupCategories = response.data;
                  }, function(error) {
                     console.log(error);
                     system.talkgroupCategories = Array();
                  });
               });
            }

            return cache.system.info[sid];
         },

         systemSites : function(sid) {
            if (!cache.system.sites[sid]) {
               cache.system.sites[sid] = this.request('systemSites', { sid: sid });
            }

            return cache.system.sites[sid];
         },

         systemTalkgroupCategories : function(sid) {
            if (!cache.system.talkgroupCategories[sid]) {
               cache.system.talkgroupCategories[sid] = this.request('systemTalkgroupCategories', { sid: sid });

               cache.system.talkgroupCategories[sid].then(function(response) {
                  var categories = response.data;

                  for (var i = 0; i < categories.length; ++i) {
                     (function(_this, cat) {
                        _this.systemTalkgroups(sid, cat.tgCid).then(function(response) {
                           cat.talkgroups = response.data;
                        }, function(error) {
                           console.log(error);
                           cat.talkgroups = Array();
                        });
                     })(radioReference, categories[i]);
                  }
               });
            }

            return cache.system.talkgroupCategories[sid];
         },

         systemTalkgroups : function(sid, tgCid) {
            if (!cache.system.talkgroups[tgCid]) {
               cache.system.talkgroups[tgCid] = this.request('systemTalkgroups', { sid: sid, tgCid: tgCid });
            }

            return cache.system.talkgroups[tgCid];
         },

         agency : function(aid) {
            if (!cache.agency.info[aid]) {
               cache.agency.info[aid] = this.request('agency', { aid: aid });

               cache.agency.info[aid].then(function(response) {
                  var agency = response.data;

                  for (var i = 0; i < agency.cats.length; ++i) {
                     for (var ii = 0; ii < agency.cats[i].subcats.length; ++ii) {
                        (function(_this, subcat) {
                           _this.subcatFrequencies(subcat.scid).then(function(response) {
                              subcat.frequencies = response.data;
                           }, function(error) {
                              console.log(error);
                              subcat.frequencies = Array();
                           });
                        })(radioReference, agency.cats[i].subcats[ii]);
                     }
                  }
               });
            }

            return cache.agency.info[aid];
         },

         user: function() {
            if (!cache.user[user.username]) {
               cache.user[user.username] = this.request('user');
            }

            return cache.user[user.username];
         },

         loggedIn: function(loggedInCallback, loggedOutCallback) {
            if (user.loggedIn && loggedInCallback) {
               loggedInCallback();
            } else if (!user.loggedIn && loggedOutCallback) {
               loggedOutCallback();
            }

            return user.loggedIn;
         },

         login: function(username, password) {
            user.username = username;
            user.password = password;

            var response = this.user();

            response.then(function(response) {
               user.loggedIn = true;
            }, function(error) {
               user.username = '';
               user.password = '';
               user.loggedIn = false;
            });

            return response;
         },

         logout: function() {
            user.username = '';
            user.password = '';
            user.loggedIn = false;
         }

      };

      return radioReference;
   });
