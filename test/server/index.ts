import Server from 'koa';
import { Server as ListeningServer } from 'http';
import koaStatic from 'koa-static';
import Pug from 'koa-pug';
import path from 'path';
import { createLogger } from '../../src';

function startServer() {
  const logger = createLogger({ category: 'server' });
  logger.info('Starting server!');
  logger.debug('Debugging');
  logger.verbose('Verbosuosity');
  logger.warning('Warning!');
  logger.error('Error!');
  logger.debug('Here', { this: { is: { a: { very: { deep: { levelled: { item: 4, text: 'hey', bool: true } } } } } } });
  const app = new Server();
  let listeningServer: ListeningServer | undefined = undefined;
  (async () => {
    try {
      app.use(koaStatic(__dirname));
      new Pug({
        viewPath: path.resolve(__dirname, './views'),
        app,
      });
      app.use(ctx => ctx.render('index.pug'));
      await new Promise((resolve, reject) => {
        listeningServer = app
          .listen(3010)
          .on('error', error => {
            reject(error);
          })
          .on('listening', async () => {
            resolve(void 0);
          });
      });
    } catch (error) {
      /* do nothing */
    }
  })();
  return async () => {
    await new Promise(resolve => listeningServer ? listeningServer.close(resolve) : resolve(void 0));
  };
}

startServer();