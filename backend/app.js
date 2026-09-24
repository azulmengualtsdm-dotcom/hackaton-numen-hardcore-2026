import express  from "express"
import { startDb } from "./config/database.js"
import  usermodel  from "./models/user.model.js"
import tagsModel  from "./models/tags.model.js"
import reportermodel  from "./models/reporter.model.js"
import profileModel  from "./models/profile.model.js"
import productsModel  from "./models/products.model.js"
import reporterTagsModel  from "./models/reporterTags.model.js"

const app=express()

app.use(express.json())

usermodel.hasOne(profileModel, { foreignKey: 'user_id', as: 'profile' });
profileModel.belongsTo(usermodel, { foreignKey: 'user_id', as: 'user' });

usermodel.hasMany(reportermodel, { foreignKey: 'user_id', as: 'reports' });
reportermodel.belongsTo(usermodel, { foreignKey: 'user_id', as: 'author' });

productsModel.belongsTo(usermodel, { foreignKey: 'supplier_id', as: 'supplier' });
usermodel.hasMany(productsModel, { foreignKey: 'supplier_id', as: 'products' });

reportermodel.belongsToMany(tagsModel, { through: reporterTagsModel, foreignKey: 'reporter_id', as: 'tags' });
tagsModel.belongsToMany(reportermodel, { through: reporterTagsModel, foreignKey: 'tag_id', as: 'reports' });

const port=3005

app.listen(port, async()=>{
        await startDb()
        console.log('corriendo en el puerto ', port)
    })