'use strict';

/**
 * Mobilenot.js controller
 *
 * @description: A set of functions called "actions" of the `mobilenot` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    const { interest, title, body, badge } = ctx.request.body;
        try {
      // Send an not to the user.
      await strapi.plugins['mobilenot'].services.mobile({
        interest: interest,
        title:  title,
        body: body,
        badge: badge
            });
    } catch (err) {
      return ctx.badRequest(null, err);
    }
    ctx.send({
      message: 'ok'
    });
  }
};
