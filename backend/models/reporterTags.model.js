import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import reporterModel from "./reporter.model.js";
import tagsModel from "./tags.model.js";

 const  reporterTagsModel=sequelize.define('ReporterTags', {
    reporter_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:reporterModel,
            key:'id'}, 
            tags_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                    model:tagsModel,
                    key:'id'
                }
            }}})

export default reporterTagsModel