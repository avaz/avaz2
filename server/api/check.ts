import { defineLazyEventHandler } from "h3";

export default defineLazyEventHandler(async () => {
  const importFn = () => import("@duckdb/duckdb-wasm");
  const {
    exports: { duckdb },
  } = await loadWasmInstance(
    // @ts-ignore
    importFn,
  );

  return (event) => {
    const { a = 0, b = 0 } = getQuery(event);
    return { sum: duckdb(a, b) };
  };
});

async function loadWasmInstance(importFn: Function, imports = {}) {
  const init = await importFn().then((m: any) => m.default || m);
  const { instance } = await init(imports);
  return instance;
}
