module.exports.homepage = function (req, res) {
    console.log(req.session.userType);
    res.render('index', {title: 'Student'});
};

module.exports.homepageVisitor = function (req, res) {
    console.log(req.session.userType);
    res.render('index', {title: 'Visitor'});
};