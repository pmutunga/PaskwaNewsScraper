var HeadlineController = require('./controllers/HeadlineController');
var NoteController = require('./controllers/BNoteController');

 
// Routes
module.exports = function(app){
     
    // Main Routes
     
    app.get('/', HeadlineController.Index);
    app.get('/other', HeadlineController.Other);   
 
    // Headline Routes
     
    app.get('/headlines', HeadlineController.Index);
    app.get('/headlines/add', HeadlineController.HeadlineAdd); 
    app.post('/headlines/add', HeadlineController.HeadlineCreate); 
    app.get('/headlines/edit/:id', HeadlineController.HeadlineEdit);
    app.post('/headlines/edit', HeadlineController.HeadlineUpdate); 
    app.get('/headlines/delete/:id', HeadlineController.HeadlineDelete);     
 
    // Notes Routes
     
    app.get('/notes', NoteController.Index);
    app.get('/notes/add', NoteController.AuthorAdd); 
    app.post('/notes/add', NoteController.NoteCreate); 
    app.get('/notes/edit/:id', NoteController.NoteEdit);
    app.post('/notes/edit', NoteController.NoteUpdate); 
    app.get('/notes/delete/:id', NoteController.NoteDelete);  
 
};
