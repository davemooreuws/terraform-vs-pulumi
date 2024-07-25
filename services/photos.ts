import { api, bucket } from "@nitric/sdk";

const photosAPI = api("photos");

const files = bucket("files").allow("read", "write");

photosAPI.get("/:name", async (ctx) => {
  const { name } = ctx.req.params;

  const data = await files.file(name).read();

  ctx.res.body = data;
  ctx.res.headers["Content-Type"] = ["image/jpeg"];

  return ctx;
});

photosAPI.post("/:name", async (ctx) => {
  const { name } = ctx.req.params;
  const data = ctx.req.data;

  await files.file(name).write(data);

  return ctx;
});
