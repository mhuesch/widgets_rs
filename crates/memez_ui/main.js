import init, { run_app } from './pkg/memez_ui.js';
import { AppWebsocket, AdminWebsocket } from '@holochain/client';

async function main() {
  await init('/pkg/memez_ui_bg.wasm');
  let element = document.getElementById("memez_main");
  let admin_ws_js = await AdminWebsocket.connect("ws://localhost:9000");
  let app_ws_js = await AppWebsocket.connect("ws://localhost:9999");
  // TODO change this to `{ installed_app_id: 'memez' }`
  let app_info = await app_ws_js.appInfo({ installed_app_id: 'test-app' });
  let cell_id_js = app_info.cell_data[0].cell_id;
  run_app(element, admin_ws_js, app_ws_js, cell_id_js);
}
main()
