import { OkPacket, RowDataPacket } from "mysql2/promise";
import { pool } from "./pool";

global.exports(
  "execute",
  (
    query: string,
    parameters: { [key: string]: any },
    callback: (result: any) => void
  ) => {
    pool
      .execute(query, parameters)
      .then((result) => {
        setImmediate(() => callback(result[0]));
      })
      .catch((error) => {
        setImmediate(() => callback(false));
        console.log(error);
      });
  }
);

global.exports(
  "single",
  (
    query: string,
    parameters: { [key: string]: any },
    callback: (result: RowDataPacket[] | false) => void
  ) => {
    pool
      .execute(query, parameters)
      .then((result) => {
        setImmediate(() => callback(result[0][0]));
      })
      .catch((error) => {
        setImmediate(() => callback(false));
        console.log(error);
      });
  }
);

global.exports(
  "scalar",
  (
    query: string,
    parameters: { [key: string]: any },
    callback: (result: unknown) => void
  ) => {
    pool
      .execute(query, parameters)
      .then((result) => {
        setImmediate(() => callback(Object.values(result[0][0])[0]));
      })
      .catch((error) => {
        setImmediate(() => callback(false));
        console.log(error);
      });
  }
);

global.exports(
  "insert",
  (
    query: string,
    parameters: { [key: string]: any },
    callback: (result: OkPacket | false) => void
  ) => {
    pool
      .execute(query, parameters)
      .then((result) => {
        setImmediate(() => callback(<OkPacket>result[0]));
      })
      .catch((error) => {
        setImmediate(() => callback(false));
        console.log(error);
      });
  }
);
