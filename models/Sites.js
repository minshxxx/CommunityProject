module.exports = function(sequelize, DataTypes){
    const Sites = sequelize.define('Sites',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            site: { type: DataTypes.STRING },
            subject : { type: DataTypes.STRING },
            url : { type: DataTypes.STRING },
            author : { type: DataTypes.STRING },
            date : { type: DataTypes.STRING },
            comment : { type: DataTypes.STRING },
            view : { type: DataTypes.STRING },
            like : { type: DataTypes.STRING },
        }
    );
    return Sites;
}