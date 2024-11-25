import * as SQLite from 'expo-sqlite/legacy';

class DbManger {
  constructor () {
    this.db = SQLite.openDatabase('database.db');
  }

  async createTable(tableName, columns) {
    const columnsInfo = columns.map(column => `${column.name} ${column.type}`).join(', ');
    try{
      this.db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${columnsInfo}
          );`,
          [],
          () => console.log(`Table ${tableName} created successfully`),
          (txObj, error) => console.error(`Error creating table ${tableName}:`, error)
        );
      });
      
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
      return new Promise((resolve, reject) => {
  
        this.db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO ${tableName} (${columnsInfo}) VALUES (${placeholders});`,
            values,
            (_, result) => {
              resolve(result.insertId)
            },
            (_, error) => reject(error)
          );
        });
      });
    } catch (error) {
      console.error(`Error inserting data into '${tableName}':`, error);
    }
  }

  async getAllItem(tableName) {
    try {
      return new Promise((resolve, reject) => {
        this.db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM ${tableName};`,
            [],
            (_, { rows }) => {
              resolve(rows._array); 
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async getItem(tableName, column, condition) {
    try {
      return new Promise((resolve, reject) => {
        this.db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM ${tableName} WHERE ${column} = ?`,
            [condition],
            (_, { rows }) => {
              resolve(rows._array);
            },
            (_, error) => {
              reject(error);
            }
          )
        })
      })
    } catch(error) {
      throw(error);
    }
  }
  
  async updateItem(tableName, column, value, id) {    
    try {
      return new Promise((resolve, reject) => {
        console.log("Transaction started");
  
        this.db.transaction(tx => {
          tx.executeSql(
            `UPDATE ${tableName} SET ${column} = ? WHERE id = ?;`, // SQL 쿼리
            [value, id], // 파라미터 전달
            (_, result) => { // 성공 콜백
              console.log('Update complete');
              resolve(id);
            },
            (_, error) => { // 실패 콜백
              console.log(`Update failed: ${error}`);
              reject(error);
            }
          );
        },
        error => console.error("Transaction error:", error), // 트랜잭션 오류 콜백
        () => console.log("Transaction completed") // 트랜잭션 완료 콜백
        );
      });
    } catch (error) {
      console.error(`Error in updateItem:`, error);
      throw error;
    }
  }

  async deleteItem(tableName, id) {
    try {
      return new Promise((resolve, reject) => {
        this.db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM ${tableName} WHERE id = ?;`,
            [id],
            (_, result) => {
              console.log(`Successfully deleted item with id: ${id}`);
              resolve(id);
            },
            (_, error) => {
              console.log(`Failed to delete item with id: ${id}. Error:`, error);
              reject(error);
            }
          );
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async dropTable(tableName) {
    try {
      await this.db.execAsync([
        {
          sql: `DROP TABLE IF EXISTS ${tableName};`,
          args: [],
        },
      ], true);
      console.log(`Table '${tableName}' dropped successfully.`);
    } catch (error) {
      console.error(`Failed to drop table '${tableName}':`, error);
    }
  }
}

const dbManger = new DbManger();
export default dbManger;