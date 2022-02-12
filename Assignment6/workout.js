var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var mysql = require("mysql");
var methodOverride = require('method-override')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_lixiaoyi',
    password: '8102',
    database: 'cs290_lixiaoyi',
    timezone: "08:00"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 8102);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
// Adapted from the assignment description to create a handler to set up the database table.
// This function only run once when the web is visited and then not used again.
app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        pool.query(createString, function(err){
            res.render("home",context);
        })
    });
});
// The following functions refer to lecture 'Using MySQL With Node'.
app.get('/', function(req, res, next){
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
        next(err);
        return;
    }
    var params = [];
    for(var row in rows){
        var addItem = {'name': rows[row].name, 
                    'reps': rows[row].reps, 
                    'weight': rows[row].weight, 
                    'date':rows[row].date, 
                    'id':rows[row].id,
                    'lbs':rows[row].lbs
                };
        params.push(addItem);
    }
    context.results = params;
    res.render("home",context);   
    })
});
app.post('/',function(req,res,next){
    var context = {};
    console.log(req.body.unitcheck)
    pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
    [req.body.exercise, 
    req.body.reps, 
    req.body.weight, 
    req.body.date, 
    req.body.unitcheck], 
    function(err, result){
        if(err){
          next(err);
          return;
        }         
        context.inserted = result.insertId;
        res.json(context);
    });
});
app.delete('/', function(req, res, next) {
    var context = {};    
    console.log(req.body.id);
    pool.query("DELETE FROM `workouts` WHERE id = ?",
        [req.body.id], 
        function(err, result) {
            if(err){
                next(err);
                return;
            }           
            res.json({"status":"success"})
    });
});
app.put('/', function(req, res, next){
    var context = {};
    console.log(req.body.exercise);
    pool.query("SELECT * FROM `workouts` WHERE id=?",
        [req.body.id], 
        function(err, result){
            if(err){
                next(err);
                return;
            }
            if(result.length == 1){                
                var current = result[0];           
                pool.query('UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
                [req.body.exercise || current.name, 
                req.body.reps || current.reps, 
                req.body.weight || current.weight, 
                req.body.date || current.date, 
                req.body.unitcheck, 
                req.body.id],
                function(err, result){
                    if(err){
                        next(err);
                        return;
                    }
                    pool.query('SELECT * FROM `workouts`', function(err, rows, fields){     
                        if(err){
                            next(err);
                            return;
                        }
                        var param = [];
                        for(var row in rows){
                            var addItem = {'name': rows[row].name,
                            'reps': rows[row].reps,
                            'weight': rows[row].weight, 
                            'date':rows[row].date, 
                            'id':rows[row].id,
                            'lbs':rows[row].lbs};                           
                            param.push(addItem);
                        }
                        context.results = param;
                        res.json({"status":"success"});
                    });
                });
            }
    });
});
app.use(function(req, res){
	res.status(404);
	res.render("404");
});
app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render("500");
});
// Override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))

app.listen(app.get("port"), function(){
	console.log("Express started on port 8102.");
});

