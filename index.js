var express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post')

//config
    //Tamplate Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');

    //Body-Parser
    app.use(bodyParser.urlencoded({ extended:false}))
    app.use(bodyParser.json())

    //rotas
    app.get('/', function(req, res){
        Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts})
        })
    })

    app.get('/cad', function(req, res){
        res.render('formulario')
    })
    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
        // req.body.conteudo
        // res.send('<h1> Texto: </h1> ' +req.body.titulo+ ' <h1> Conteudo: </h1> '+ req.body.conteudo)
    })

    app.get('/deletar/:id', function (req, res){
        Post.destroy({where:{'id':req.params.id}}).then(function(){
            // res.send("postagem deletada com sucesso")
            res.redirect('/')
        }).catch(function(erro){
            res.send("esta postagem não existe!")
        })
    })

app.listen(8081, function(){
    console.log('servidor rodando na url http://localhost:8081');
});