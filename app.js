const express =  require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemsSchema ={
  name:String
};

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
  name: "Welcome to your ToDo List!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<--- Hit this to delete an item."
});

const defaultItems = [item1,item2,item3];

app.get("/",function(req,res){
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };


app.post("/",function(req,res){
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId,function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Deleted successfully.");
      res.redirect("/");
    }
  });

});

  let numday = today.getDay();
  let day = today.toLocaleDateString("en-US",options);

  Item.find({},function(err, foundItems){
    if(err){
      console.log(err);
    } else{
      console.log("found succcessfully");
      if (foundItems.length === 0){
        Item.insertMany(defaultItems,function(err){
            if(err){
             console.log(err);
            } else {
              console.log("Action completed successfully");
            }
         });
         res.redirect("/");
      } else{
        res.render("list",{
          day: day,
          items: foundItems
        });
      }
    }
  });




});


app.listen(2050,function(){
  console.log("Server started on port 2050");
});
