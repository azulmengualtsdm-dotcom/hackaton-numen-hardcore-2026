import { Sequelize } from 'sequelize'

export const sequelize=new Sequelize(
    process.env.DB_NAME || 'db_central_org',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host:process.env.DB_HOST || 'localhost',
        dialect:'mysql', 
        logging:false,
        define:{
            timestamps:true,
            underscored:true
        }
    }
)

export const startDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a MySQL establecida con éxito.');
    
    await sequelize.sync({ force: false });
    console.log(' Todas las tablas han sido sincronizadas.');
  } catch (error) {
    console.error(' Error al conectar la base de datos:', error.message);
  }
};

export default sequelize;