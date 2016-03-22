var TodosModel = Stapes.subclass();  

var TodosView = Stapes.subclass({
    constructor : function(model) { 
        $("#inputform").on('change', function(e) {
            var _inp = $(this).find('input');
            model.push( _inp.val() );
            _inp.val('');			
			e.preventDefault();
        });
    }
});

var TodosController = Stapes.subclass({
    constructor : function() {
        var self = this;
        this.model = new TodosModel();
        this.view = new TodosView(this.model);

        this.model.on('change', function(did) {  //当数据发生变化时，根据这个数据的ID查找到该数据的值
            var text = self.model.get(did);
            $("#todos ul").append('<li>' + text + '</li>');
        });
    }
});

var controller = new TodosController();   

console.log(22);