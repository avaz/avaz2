import { type AsyncDuckDB, AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";

let database: AsyncDuckDB | null = null;

export default () => {
  const setDatabase = (db: AsyncDuckDB) => {
    database = db;
  };

  const queryOne = async <T>(
    type: { new (): T },
    sql: string,
  ): Promise<T | null> => {
    const result = await query(type, sql);
    return result.length > 0 ? result[0] : null;
  };

  const query = async <T>(type: { new (): T }, sql: string): Promise<T[]> => {
    return runQuery(type, sql);
  };

  const runQuery = async <T>(
    type: { new (): T },
    sql: string,
  ): Promise<T[]> => {
    let t: T[] = [];
    let connection: AsyncDuckDBConnection | undefined;
    try {
      // FIXME database can be null because duckdb-wasm is being loaded only
      //  in the client due to the use of a web worker that is not compatible
      //  with SSR/Nuxt
      connection = await database?.connect();
      const result = await connection?.query(sql);
      const json = result?.toArray().map((row) => row.toJSON());
      if (json) {
        t = json.map((row: any) => {
          let instance = new type();
          if (typeof type === "string") {
            instance = row["name"];
          }
          for (const key in instance) {
            if (Object.prototype.hasOwnProperty.call(row, key)) {
              instance[key] = row[key];
            }
          }
          return instance;
        });
      }
    } finally {
      if (connection) {
        await connection.close();
      }
    }
    return t;
  };

  return {
    queryOne,
    query,
    setDatabase,
  };
};
