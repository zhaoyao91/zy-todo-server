const Router = require('express').Router;
const router = new Router();
const R = require('ramda');
const Collections = require('services/collections');
const Todos = Collections.todos;

/**
 * @param content
 */
router.post('/create', (req, res, next)=> {
    const todo = req.body;

    Todos.insert({
        content: todo.content || '',
        checked: false,
        createdAt: new Date
    }, (err, insertedDoc)=> {
        if (err) next(err);
        else res.json(insertedDoc);
    });
});

/**
 * @param id
 */
router.post('/remove', (req, res, next)=> {
    const id = req.body.id;

    Todos.remove({_id: id}, {}, (err, removedCount)=> {
        if (err) next(err);
        else res.json(removedCount)
    })
});

/**
 * @param id
 * @param content
 * @param checked
 */
router.post('/update', (req, res, next)=> {
    req.checkBody({
        checked: {
            optional: true,
            isBoolean: true
        }
    });

    const errors = req.validationErrors();
    if (errors) return res.status(400).json({errors});

    req.sanitizeBody('checked').toBoolean();

    const id = req.body.id;
    const content = req.body.content;
    const checked = req.body.checked;

    const $set = R.pickBy(x=>x !== undefined, {content, checked});

    Todos.update({_id: id}, {$set: $set}, {}, (err, updatedCount)=> {
        if (err) next(err);
        else res.json(updatedCount);
    })
});

router.get('/', (req, res, next)=> {
    Todos.find({}, (err, todos)=> {
        if (err) next(err);
        else res.json({todos});
    })
});

module.exports = router;
