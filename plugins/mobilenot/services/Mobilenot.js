'use strict';

/**
 * Mobilenot.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
const PushNotifications = require('@pusher/push-notifications-server');

let pushNotifications = new PushNotifications({
  instanceId: 'aad2fbc4-731f-4569-b6b3-3ed338854261',
  secretKey: 'A594158B01DD5C74E17E382C233FC5F'
});

module.exports = {
  mobile: async function(options) {
    let _interest = options.interest;
      let _title = options.title
      let _badge = options.badge
      let _body = options.body
    return new Promise((resolve, reject) => {
              pushNotifications.publish([_interest], {
                  apns: {
                    aps: {
                      alert: {
                        title: _title,
                        body: _body
                      },
                      sound:"default",
                      badge:_badge
                    }
                  },
                  fcm:{
                    notification:{
                      title: _title,
                      body: _body,
                      sound: "default",
                      icon: "ic_launcher_small"
                      }
                    }
            }).then((publishResponse) => {
            resolve(publishResponse)
            console.log('Just published:', publishResponse.publishId);
            }).catch((error) => {
              reject(error)
              console.log('Error:', error);
            });
        })
    }
};
