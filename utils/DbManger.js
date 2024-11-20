import * as SQLite from 'expo-sqlite';

class DbManger {
  constructor (dbName) {
    this.dbName = dbName;
    this.db = null;
  }

  async initializeDB(tableName, columns) {
    try {
      this.db = await SQLite.openDatabaseAsync(this.dbName);
      await this.createTable(tableName, columns);

      console.log(`Database '${this.dbName}' initialized successfully.`);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async createTable(tableName, columns) {
    const columnsInfo = columns.map(column => `${column.name} ${column.type}`).join(', ');
    console.log( `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${columnsInfo}
    );`)
    
    try{
      await this.db.execAsync([
        {
          sql: `CREATE TABLE IF NOT EXISTS \`${tableName}\` (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${columnsInfo}
            );`,
          args: [],
        },
      ], true);
      
    } catch (error) {
      console.error(`fail to create Table ${tableName}:`, error);
      throw error;
    }
  }
    
  async insertItem(tableName, data) {
    const columnsInfo = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    
    try {
      await this.db.execAsync(
        [
          {
            sql: `INSERT INTO ${tableName} (${columnsInfo}) VALUES (${placeholders});`,
            args: values,
          },
        ], true
      );
      console.log(`Data inserted into '${tableName}' successfully. ${result}`);
    } catch (error) {
      console.error(`Error inserting data into '${tableName}':`, error);
    }
  }
}

const dbManger = new DbManger('database.db');
export default dbManger;