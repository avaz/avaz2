import * as duckdb from "@duckdb/duckdb-wasm";
import { LogLevel } from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url";
import mvp_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url";
import duckdb_wasm_next from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import eh_worker from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";

const createBundle = async () => {
  return await duckdb.selectBundle({
    mvp: {
      mainModule: duckdb_wasm,
      mainWorker: mvp_worker,
    },
    eh: {
      mainModule: duckdb_wasm_next,
      mainWorker: eh_worker,
    },
  });
};

const createWorker = async (bundle: duckdb.DuckDBBundle) => {
  const mainWorker = bundle.mainWorker;
  if (!mainWorker) {
    throw Error(`No mainWorker: ${mainWorker}`);
  }
  return new Worker(mainWorker);
};

export default defineNuxtPlugin(async () => {
  const database = useDatabase();
  const init = async () => {
    // Instantiate worker
    const logger = new duckdb.ConsoleLogger(LogLevel.NONE);
    const bundle = await createBundle();
    const worker = await createWorker(bundle);
    // and asynchronous database
    const db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    await db.open({
      path: ":memory:",
      query: {
        castBigIntToDouble: true,
      },
    });
    const appConfig = useAppConfig();
    const cv = appConfig.tables.cv;
    const expertises = appConfig.tables.expertises;
    let data = await fetch(`${cv}`);
    await db.registerFileBuffer(cv, new Uint8Array(await data.arrayBuffer()));
    data = await fetch(`${expertises}`);
    await db.registerFileBuffer(
      expertises,
      new Uint8Array(await data.arrayBuffer()),
    );
    return db;
  };
  database.setDatabase(await init());
});
