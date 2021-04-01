const router = require('express').Router();

router.route('/')
    .get()
    .post();

router.route('/userID')
    .get()
    .put()
    .delete();

module.exports = router;
