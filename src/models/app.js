
export default (app) => {
    app.model(require('./login').default)
    app.model(require('./index').default)
}