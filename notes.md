// types of middleware
/\*

- built in
- third party
- custom
- error handling middleware (err, req, res, next) => {}

homies

- duo > trio > quartet

Application Mode

- error
- regular

[rm1] =next(new Error(something))> [rm2] =next()> [em1] =next()> [em2] => [rmn]

calling next() moves to the next regular middleware
calling next(arg) moves to the next error handling middleware

.then().catch(err => next(err))

// all the middleware

// all the route handlers

next('u401');

\***\*\*\*\*\*\*** NEVER TRUST THE CLIENT **\*\***\***\*\***
\*/

## Structuring our API

- by type (reducers, actions, components)
- by feature/resource (users, posts, friends)
- hybrid feature > type or type > feature

Patterns

- Model-View-Controller (MVC)
- Model-View-Presenter (MVP)
- Model-View-ViewModel (MVVM)
