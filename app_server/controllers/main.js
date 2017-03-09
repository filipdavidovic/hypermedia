/* homepage */
module.exports.homepage = function (req, res) {
    console.log(req.session.userType);
    res.render('index', {title: 'Student', userType: req.session.userType});
};

module.exports.homepageVisitor = function (req, res) {
    console.log(req.session.userType);
    res.render('index', {title: 'Visitor', userType: req.session.userType});
};
