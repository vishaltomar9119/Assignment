module.exports = function (nosql){

    nosql.model('Country' , new nosql.Schema({
        name: {
            type: String,
            required: true,
        }
    
    }))

    nosql.model('State' , new nosql.Schema({
        name: {
            type: String,
        },
        country_id:{ 
            type: nosql.Schema.Types.ObjectId,
            ref: 'Country',
            required: true
        }
    
    }))
    
    nosql.model('City', new nosql.Schema({
        name: {
            type: String,
        },
        country_id:{ 
            type: nosql.Schema.Types.ObjectId,
            ref: 'Country',
            required: true
        },
        state_id:{ 
            type: nosql.Schema.Types.ObjectId,
            ref: 'Country',
            required: true
        }

    }));
    
    };