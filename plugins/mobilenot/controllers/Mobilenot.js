'use strict';

/**
 * Mobilenot.js controller
 *
 * @description: A set of functions called "actions" of the `mobilenot` plugin.
 */
const PushNotifications = require('@pusher/push-notifications-server');
  let pushNotifications = new PushNotifications({
    instanceId: 'aad2fbc4-731f-4569-b6b3-3ed338854261',
    secretKey: 'A594158B01DD5C74E17E382C233FC5F'
});

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async function(ctx) {
    console.log("controllera geldi")
    const _interest =ctx.request.body.interest;
    const _title= ctx.request.body.title;
    const _body = ctx.request.body.body;
    const _badge = ctx.request.body.badge;
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
       console.log('Mobil Bildirim Gönderildi:', publishResponse);
    }).catch((error) => {
        reject(error)
        console.log('Error:', error);
    });
  });
  }
};
