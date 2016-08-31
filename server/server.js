// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var fs = require("fs");

var natural = require("natural")
var wordNet = require('wordnet-magic');
var wordNet = require("../node_modules/wordnet-magic/src/index.js");
var _ = require("underscore")
const readline = require('readline')

var util = require("util");
var router = express.Router();
 
// routes
router.get('/login', getUser);
router.get('/cert/:cert_id/scenario/:scid/topic/:tid', getScenario);
router.get('/cert/:cert_id/scenario/:scid/done', scenarioDone);
//router.get('/ce/:id/sceer/:sID/pro', getCurrentUser);
//router.put('/:_id', updateUser);
//router.delete('/:_id', deleteUser);

module.exports = router;

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Define to JSON type
 var jsonContent,userDetails;

function getParameterByName(name, req_url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(req_url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
 
function getUser(req, res) {
    var req_url = req.url.toString();
    var uid = getParameterByName('uid', req_url);
    var pass = getParameterByName('pass', req_url);
    console.log(pass);
    var example = fs.readFileSync("../data/users/"+uid+".json");
    // Define to JSON type
    userDetails = JSON.parse(example);
    if(userDetails){

        res.json(userDetails);
    }
}


function getScenario(req, res) {
    console.log("fetching scenario "+req+" "+req.params.scid);
    var example = fs.readFileSync("../data/certs/"+req.params.cert_id+"/"+req.params.scid+"/"+req.params.tid+".json");
    // Define to JSON type
    jsonContent = JSON.parse(example);

    var obj = zorkData(req);
    res.json(obj);
}


function scenarioDone(req, res) {
    console.log("fetching scenario "+req+" "+req.params.scid);
    var example = fs.readFileSync("../data/"+req.params.scid+".json");
    // Define to JSON type
    jsonContent = JSON.parse(example);

    var flag=0;
    for(var i=0;i<userDetails.certs.length;i++){
        if(userDetails.certs[i].name==req.params.cert_id){
            flag=1;
            for(var j=0;j<userDetails.certs[i].scenarios.length;j++){
                if(userDetails.certs[i].scenarios[j]==req.params.scid){
                    flag=2;
                    break;
                }
            }
            if(flag!=2){
                userDetails.certs[i].scenarios.push(req.params.scid);
            }
            break;
        }
    }

    if(flag==0){
        var obj ={};
        obj.name = req.params.cert_id;
        obj.state = "started";
        obj.total_scenarios = 9;
        obj.scenarios = [];
        obj.scenarios.push(req.params.scid);
        userDetails.certs.push(obj);
    }
    if(userDetails){

        res.json(userDetails);
    }
}

function getScenarioId(req, res) {
    console.log("fetching scenario "+req+" "+req.params.scid+" "+req.params.qid);
    var example = fs.readFileSync("../data/"+req.params.scid+".json");
    // Define to JSON type
    jsonContent = JSON.parse(example);
    if(jsonContent){
        var quesid = req.params.qid;
        res.json(jsonContent[quesid-1].question);
    }
}

function zorkData(req){

    //var target = 0;
    var req_url = req.url.toString();
    var qnum = getParameterByName('qnum', req_url);

    var i=0,flag=0,data;
    var max_data = {},ret_data = {};
    max_data.length = 0;
    max_data.target = 0;
    for(i=0;i<jsonContent.length;i++){
        if(jsonContent[i].node_num==qnum){
            data = jsonContent[i].transitions;
            break;
        }
    }
    if(data){
        for(var j=0;j<data.length;j++){
            ret_data = zork(data[j],req);
            if(ret_data.target!=0&&max_data.length<ret_data.length){
                max_data.length = ret_data.length;
                max_data.target = ret_data.target;
            }
            console.log(max_data);
        }
    }
    for(i=0;i<jsonContent.length;i++){
        if(jsonContent[i].node_num==max_data.target){
            return jsonContent[i];
        }
    }
    var obj = {}
    obj.node_num = qnum;
    obj.question = "I dont know what u r saying";
    return obj;
}


function zork(data,req){
    
    var wn = wordNet(null, false);

    var req_url = req.url.toString();
    var in1 = getParameterByName('ans', req_url);
    tokenizer = new natural.WordTokenizer();
    token_list = tokenizer.tokenize(in1);

    ////////////////////perform the lookalike//////////////////////////////////////
    // here we have 2 options one Levenshtein distance and  Jaro–Winkler string '
    //distance here i am using  Jaro–Winkler with strict checking(0.9) if we get the match greater than 09 we will replace the word with the token list

    for(var i =0;i<data.key_words.length;i++){

        for(var j = 0;j < token_list.length;j++){

            if(natural.JaroWinklerDistance(data.key_words[i],token_list[j]) > 0.85){
               
               token_list[j] = data.key_words[i]
                   

           }

        }


    }

    ///////////////////////////////////////////This is the subset check/////////////////////////
    var result = (data.key_words.length === _.intersection(data.key_words, token_list).length);

    if(result){

        console.log("good job")
        var obj = {};
        obj.length = data.key_words.length;
        obj.target = data.target_node_num;
        return obj;
    }

    else {
      //do_syn_check()
      console.log("bad job")
      var obj = {};
        obj.length = 0;
        obj.target = 0;
      return obj;
    }

    ///////////////////////////////////////// subset check is over/////////////////////////////////////////

    ///////here we are doing the synonyms  check////////////////////////////////////////////////////////////////


    //here we will comapre by the synsetid of the wordnet librabry so that we get only synonyms that we want

    /*function do_syn_check(){

      // now we have the sysnsetid but we need the synonyms list for the word so we are getting the index from synsetid 
      //we are getting the id and from id we are getting the synonyms list but this is very stupid way to do this 
      //for this problem we have to find the index of the verb'th or nouns so this becomes tedious while making the question
      //for performance i am opting for the first approach

      //var key = data.keywords.[0];
      var key = new wn.Word(data.keywords[0]);
      var syn_list1 = null;
      var syn_list=key.getSynsets()
      console.log(syn_list)
       
               
    }*/

    //var open = new wn.Word("open");
    //open.getSynsets(function(err, data){
     //  console.log(util.inspect(data, null, 3));
    //});
}
 
 
// listen (start app with node server.js) ======================================

app.use('/', router);

app.listen(8080);
console.log("App listening on port 8080");