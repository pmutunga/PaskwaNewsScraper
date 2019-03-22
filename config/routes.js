module.exports = function(router) {
    //render home page
    router.get("/", function(req,res){
        releaseEvents.render("home");
    });
    //render saved page
    router.get("/saved", function(req, res){
        res.render("saved");
    })
}